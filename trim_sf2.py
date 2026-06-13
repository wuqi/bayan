"""Trim GeneralUser.sf2 to keep only GM standard bank 0 instruments."""
import struct
import sys

def read_chunk(data, pos):
    """Read a RIFF chunk header at pos, return (id, size, data_start, data_end)"""
    ck_id = data[pos:pos+4]
    size = struct.unpack('<I', data[pos+4:pos+8])[0]
    return ck_id, size, pos + 8, pos + 8 + size

def find_list(data, pos, list_type):
    """Find a LIST chunk of given type, return (data_start, data_end) or None"""
    while pos + 8 <= len(data):
        ck_id, size, dstart, dend = read_chunk(data, pos)
        if ck_id == b'LIST' and data[dstart:dstart+4] == list_type:
            return dstart + 4, dend
        pos = dend
        if pos % 2:
            pos += 1
    return None

def parse_phdr(data):
    """Parse preset headers (38 bytes each)"""
    entries = []
    num = len(data) // 38
    for i in range(num):
        off = i * 38
        name = data[off:off+20].split(b'\x00')[0].decode('ascii', errors='replace')
        preset = struct.unpack('<H', data[off+20:off+22])[0]
        bank = struct.unpack('<H', data[off+22:off+24])[0]
        bag_idx = struct.unpack('<H', data[off+24:off+26])[0]
        entries.append({'name': name, 'preset': preset, 'bank': bank, 'bag_idx': bag_idx})
    return entries

def parse_bag(data):
    """Parse bag entries (4 bytes each: gen_idx, mod_idx)"""
    entries = []
    num = len(data) // 4
    for i in range(num):
        off = i * 4
        gen_idx = struct.unpack('<H', data[off:off+2])[0]
        mod_idx = struct.unpack('<H', data[off+2:off+4])[0]
        entries.append({'gen_idx': gen_idx, 'mod_idx': mod_idx})
    return entries

def parse_gen(data):
    """Parse generator entries (4 bytes each: type, value)"""
    entries = []
    num = len(data) // 4
    for i in range(num):
        off = i * 4
        gen_type = struct.unpack('<H', data[off:off+2])[0]
        gen_value = struct.unpack('<h', data[off+2:off+4])[0]
        entries.append({'type': gen_type, 'value': gen_value})
    return entries

def parse_inst(data):
    """Parse instrument headers (22 bytes each)"""
    entries = []
    num = len(data) // 22
    for i in range(num):
        off = i * 22
        name = data[off:off+20].split(b'\x00')[0].decode('ascii', errors='replace')
        bag_idx = struct.unpack('<H', data[off+20:off+22])[0]
        entries.append({'name': name, 'bag_idx': bag_idx})
    return entries

def parse_shdr(data):
    """Parse sample headers (46 bytes each)"""
    entries = []
    num = len(data) // 46
    for i in range(num):
        off = i * 46
        name = data[off:off+20].split(b'\x00')[0].decode('ascii', errors='replace')
        start = struct.unpack('<I', data[off+20:off+24])[0]
        end = struct.unpack('<I', data[off+24:off+28])[0]
        start_loop = struct.unpack('<I', data[off+28:off+32])[0]
        end_loop = struct.unpack('<I', data[off+32:off+36])[0]
        sample_rate = struct.unpack('<I', data[off+36:off+40])[0]
        orig_pitch = data[off+40]
        pitch_corr = struct.unpack('<b', data[off+41:off+42])[0]
        sample_link = struct.unpack('<H', data[off+42:off+44])[0]
        sample_type = struct.unpack('<H', data[off+44:off+46])[0]
        entries.append({
            'name': name, 'start': start, 'end': end,
            'start_loop': start_loop, 'end_loop': end_loop,
            'sample_rate': sample_rate, 'orig_pitch': orig_pitch,
            'pitch_corr': pitch_corr, 'sample_link': sample_link,
            'sample_type': sample_type
        })
    return entries

GEN_INSTRUMENT = 41
GEN_SAMPLEID = 53

def get_gen_range(bag_entries, bag_idx, default_end):
    """Get generator range [start, end) for a bag entry."""
    gen_start = bag_entries[bag_idx]['gen_idx']
    if bag_idx + 1 < len(bag_entries):
        gen_end = bag_entries[bag_idx + 1]['gen_idx']
    else:
        gen_end = default_end
    return gen_start, gen_end

def get_mod_range(bag_entries, bag_idx, default_end):
    """Get modulator range [start, end) for a bag entry."""
    mod_start = bag_entries[bag_idx]['mod_idx']
    if bag_idx + 1 < len(bag_entries):
        mod_end = bag_entries[bag_idx + 1]['mod_idx']
    else:
        mod_end = default_end
    return mod_start, mod_end

def keep_bank0_sf2(input_path, output_path):
    with open(input_path, 'rb') as f:
        data = bytearray(f.read())

    # Find the main chunks
    pos = 12  # skip RIFF header
    info_start, info_end = find_list(data, pos, b'INFO')
    sdta_start, sdta_end = find_list(data, pos, b'sdta')
    pdta_start, pdta_end = find_list(data, pos, b'pdta')

    if not all([info_start, sdta_start, pdta_start]):
        print("Error: Could not find SF2 chunks")
        return False

    # Parse pdta sub-chunks
    pdta = data[pdta_start:pdta_end]

    def get_pdta_chunk(pdta_data, chunk_id):
        pos = 0
        while pos + 8 <= len(pdta_data):
            cid, size, dstart, dend = read_chunk(pdta_data, pos)
            if cid == chunk_id:
                return pdta_data[dstart:dstart+size]
            pos = dend
            if pos % 2:
                pos += 1
        return None

    phdr_raw = get_pdta_chunk(pdta, b'phdr')
    pbag_raw = get_pdta_chunk(pdta, b'pbag')
    pgen_raw = get_pdta_chunk(pdta, b'pgen')
    pmod_raw = get_pdta_chunk(pdta, b'pmod')
    inst_raw = get_pdta_chunk(pdta, b'inst')
    ibag_raw = get_pdta_chunk(pdta, b'ibag')
    igen_raw = get_pdta_chunk(pdta, b'igen')
    imod_raw = get_pdta_chunk(pdta, b'imod')
    shdr_raw = get_pdta_chunk(pdta, b'shdr')

    phdr = parse_phdr(phdr_raw)
    pbag = parse_bag(pbag_raw)
    pgen = parse_gen(pgen_raw)
    inst = parse_inst(inst_raw)
    ibag = parse_bag(ibag_raw)
    igen = parse_gen(igen_raw)
    pmod = parse_bag(pmod_raw) if pmod_raw else []  # use bag parser for mod entries too
    shdr = parse_shdr(shdr_raw)
    num_pmod = len(pmod_raw) // 10 if pmod_raw else 0
    num_imod = len(imod_raw) // 10 if imod_raw else 0

    # Step 1: Find bank 0 presets + bank 128 preset 0 (GM drum kit)
    bank0_indices = [i for i in range(len(phdr) - 1) if phdr[i]['bank'] == 0]
    drum_indices = [i for i in range(len(phdr) - 1) if phdr[i]['bank'] == 128 and phdr[i]['preset'] == 0]
    terminator_idx = len(phdr) - 1
    all_keep = set(bank0_indices) | set(drum_indices)
    all_keep.add(terminator_idx)

    print(f"Keeping {len(bank0_indices)} bank 0 presets + {len(drum_indices)} drum kit + terminator")

    # Step 2: Find instrument indices referenced by ALL kept presets
    needed_inst = set()
    for idx in all_keep:
        if idx == terminator_idx:
            continue
        bag_start = phdr[idx]['bag_idx']
        bag_end = phdr[idx + 1]['bag_idx']
        for bi in range(bag_start, bag_end):
            if bi >= len(pbag):
                break
            gen_start, gen_end = get_gen_range(pbag, bi, len(pgen))
            for gi in range(gen_start, gen_end):
                if gi < len(pgen) and pgen[gi]['type'] == GEN_INSTRUMENT:
                    needed_inst.add(pgen[gi]['value'])

    print(f"Referenced instruments: {len(needed_inst)}")

    # Step 3: Find sample indices referenced by needed instruments
    needed_samples = set()
    for idx in sorted(needed_inst):
        if idx >= len(inst) - 1:
            continue
        ibag_start = inst[idx]['bag_idx']
        ibag_end = inst[idx + 1]['bag_idx']
        for bi in range(ibag_start, ibag_end):
            if bi >= len(ibag):
                break
            gen_start, gen_end = get_gen_range(ibag, bi, len(igen))
            for gi in range(gen_start, gen_end):
                if gi < len(igen) and igen[gi]['type'] == GEN_SAMPLEID:
                    sample_val = igen[gi]['value']
                    if 0 <= sample_val < len(shdr) - 1:
                        needed_samples.add(sample_val)

    print(f"Referenced samples: {len(needed_samples)}")

    if not needed_inst:
        print("Error: No instruments referenced!")
        return False

    # Step 4: Build new phdr, pbag, pgen, pmod
    new_phdr = bytearray()
    pgen_remap = {}  # old gen index -> new gen index
    pmod_remap = {}  # old mod index -> new mod index
    new_pgen_data = []
    new_pmod_data = []
    new_pbag_data = []

    for idx in sorted(all_keep):
        p = phdr[idx]
        bag_start = p['bag_idx']
        bag_end = phdr[idx + 1]['bag_idx'] if idx + 1 < len(phdr) else len(pbag)
        new_bag_start = len(new_pbag_data)

        for bi in range(bag_start, bag_end):
            if bi >= len(pbag):
                break
            gen_start, gen_end = get_gen_range(pbag, bi, len(pgen))
            mod_start, mod_end = get_mod_range(pbag, bi, num_pmod)

            # Copy generators for this bag range
            if gen_start not in pgen_remap:
                pgen_remap[gen_start] = len(new_pgen_data)
                for gi in range(gen_start, gen_end):
                    new_pgen_data.append(pgen_raw[gi*4:(gi+1)*4])

            # Copy modulators for this bag range
            if mod_start not in pmod_remap:
                pmod_remap[mod_start] = len(new_pmod_data)
                for mi in range(mod_start, mod_end):
                    if mi * 10 + 10 <= len(pmod_raw):
                        new_pmod_data.append(pmod_raw[mi*10:(mi+1)*10])

            new_pbag_data.append((pgen_remap[gen_start], pmod_remap[mod_start]))

        # Write preset header
        off = idx * 38
        new_phdr.extend(phdr_raw[off:off+38])
        struct.pack_into('<H', new_phdr, len(new_phdr) - 14, new_bag_start)

    # Add terminator pbag entry
    new_pbag_data.append((len(new_pgen_data), len(new_pmod_data)))

    # Build pbag bytes
    new_pbag = bytearray()
    for gen_idx, mod_idx in new_pbag_data:
        new_pbag.extend(struct.pack('<HH', gen_idx, mod_idx))

    new_pgen = bytearray().join(new_pgen_data)
    new_pmod = bytearray().join(new_pmod_data)

    # Step 5: Build new inst, ibag, igen, imod
    sorted_needed_inst = sorted(needed_inst)
    inst_remap = {old: new for new, old in enumerate(sorted_needed_inst)}

    # Add terminator instrument
    inst_terminator = len(inst) - 1
    if inst_terminator not in inst_remap:
        inst_remap[inst_terminator] = len(sorted_needed_inst)
        sorted_needed_inst.append(inst_terminator)

    new_inst = bytearray()
    new_ibag_data = []
    new_igen_data = []
    new_imod_data = []
    igen_remap = {}
    imod_remap = {}

    for old_inst_idx in sorted_needed_inst:
        i = inst[old_inst_idx]
        ibag_start = i['bag_idx']
        ibag_end = inst[old_inst_idx + 1]['bag_idx'] if old_inst_idx + 1 < len(inst) else len(ibag)
        new_ibag_start = len(new_ibag_data)

        for bi in range(ibag_start, ibag_end):
            if bi >= len(ibag):
                break
            gen_start, gen_end = get_gen_range(ibag, bi, len(igen))
            mod_start, mod_end = get_mod_range(ibag, bi, num_imod)

            # Copy generators for this bag range
            if gen_start not in igen_remap:
                igen_remap[gen_start] = len(new_igen_data)
                for gi in range(gen_start, gen_end):
                    new_igen_data.append(igen_raw[gi*4:(gi+1)*4])

            # Copy modulators for this bag range
            if mod_start not in imod_remap:
                imod_remap[mod_start] = len(new_imod_data)
                for mi in range(mod_start, mod_end):
                    if mi * 10 + 10 <= len(imod_raw):
                        new_imod_data.append(imod_raw[mi*10:(mi+1)*10])

            new_ibag_data.append((igen_remap[gen_start], imod_remap[mod_start]))

        # Write instrument header
        off = old_inst_idx * 22
        new_inst.extend(inst_raw[off:off+22])
        struct.pack_into('<H', new_inst, len(new_inst) - 2, new_ibag_start)

    # Add terminator ibag entry
    new_ibag_data.append((len(new_igen_data), len(new_imod_data)))

    # Build ibag bytes
    new_ibag = bytearray()
    for gen_idx, mod_idx in new_ibag_data:
        new_ibag.extend(struct.pack('<HH', gen_idx, mod_idx))

    new_imod = bytearray().join(new_imod_data)

    # Step 6: Remap sample IDs in the new igen data
    # Collect sample IDs from new_igen_data
    scratch_needed = set()
    for entry in new_igen_data:
        gen_type = struct.unpack('<H', entry[0:2])[0]
        gen_value = struct.unpack('<h', entry[2:4])[0]
        if gen_type == GEN_SAMPLEID:
            scratch_needed.add(gen_value)

    print(f"Sample IDs found in new_igen_data: {len(scratch_needed)}")

    if scratch_needed != needed_samples:
        print(f"Warning: sample set differs. Scratch={len(scratch_needed)}, computed={len(needed_samples)}")
        needed_samples = needed_samples | scratch_needed

    sorted_samples = sorted(needed_samples)

    # Add sample terminator
    shdr_term = len(shdr) - 1
    if shdr_term not in needed_samples:
        sorted_samples.append(shdr_term)

    sample_remap = {old: new for new, old in enumerate(sorted_samples)}

    # Remap sample IDs in new_igen_data
    for i in range(len(new_igen_data)):
        gen_type = struct.unpack('<H', new_igen_data[i][0:2])[0]
        if gen_type == GEN_SAMPLEID:
            old_val = struct.unpack('<h', new_igen_data[i][2:4])[0]
            if old_val in sample_remap:
                new_igen_data[i][2:4] = struct.pack('<h', sample_remap[old_val])
            else:
                print(f"Warning: sample ID {old_val} not in remap!")

    new_igen = bytearray().join(new_igen_data)

    # Step 7: Remap instrument IDs in new pgen data
    for i in range(0, len(new_pgen), 4):
        gen_type = struct.unpack('<H', new_pgen[i:i+2])[0]
        if gen_type == GEN_INSTRUMENT:
            old_val = struct.unpack('<h', new_pgen[i+2:i+4])[0]
            if old_val in inst_remap:
                struct.pack_into('<h', new_pgen, i+2, inst_remap[old_val])
            else:
                print(f"Warning: inst ID {old_val} not in remap!")

    # Step 8: Build new shdr
    new_shdr = bytearray()
    for idx in sorted_samples:
        new_shdr.extend(shdr_raw[idx*46:idx*46+46])

    # Step 9: Build new sdta (sample data)
    smpl_start = sdta_start + 8 + 4  # "LIST" + size + "sdta"
    # The smpl chunk starts after "smpl" + size
    smpl_raw_start = smpl_start + 8  # after "smpl" + size

    sample_ranges = []
    for idx in sorted_samples:
        if idx >= len(shdr) - 1:
            break
        s = shdr[idx]
        start_byte = s['start'] * 2
        end_byte = s['end'] * 2
        if end_byte > start_byte:
            sample_ranges.append((start_byte, end_byte, s['start'], s['end']))

    new_smpl = bytearray()
    sample_offset_remap = {}

    for start_byte, end_byte, old_start_word, old_end_word in sorted(sample_ranges, key=lambda x: x[0]):
        orig = data[smpl_raw_start + start_byte: smpl_raw_start + end_byte]
        new_word_offset = len(new_smpl) // 2
        sample_offset_remap[old_start_word] = new_word_offset
        new_smpl.extend(orig)

    if len(new_smpl) % 2:
        new_smpl.append(0)

    # Step 10: Fix sample offsets in new_shdr
    for i, idx in enumerate(sorted_samples):
        if idx >= len(shdr) - 1:
            break
        s = shdr[idx]
        off = i * 46
        old_start = s['start']
        if old_start in sample_offset_remap:
            new_word = sample_offset_remap[old_start]
            struct.pack_into('<I', new_shdr, off + 20, new_word)
            struct.pack_into('<I', new_shdr, off + 24, new_word + (s['end'] - s['start']))
            if s['start_loop'] > 0:
                loop_offset = s['start_loop'] - s['start']
                struct.pack_into('<I', new_shdr, off + 28, new_word + loop_offset)
                loop_end_offset = s['end_loop'] - s['start']
                struct.pack_into('<I', new_shdr, off + 32, new_word + loop_end_offset)

    # Step 11: Build final file
    info_raw = data[info_start:info_end]

    def add_chunk(buf, chunk_id, data_bytes):
        buf.extend(chunk_id)
        sz = len(data_bytes)
        buf.extend(struct.pack('<I', sz))
        buf.extend(data_bytes)
        if sz % 2:
            buf.append(0)

    pdta_data = bytearray()
    add_chunk(pdta_data, b'phdr', bytes(new_phdr))
    add_chunk(pdta_data, b'pbag', bytes(new_pbag))
    add_chunk(pdta_data, b'pmod', bytes(new_pmod))
    add_chunk(pdta_data, b'pgen', bytes(new_pgen))
    add_chunk(pdta_data, b'inst', bytes(new_inst))
    add_chunk(pdta_data, b'ibag', bytes(new_ibag))
    add_chunk(pdta_data, b'imod', bytes(new_imod))
    add_chunk(pdta_data, b'igen', bytes(new_igen))
    add_chunk(pdta_data, b'shdr', bytes(new_shdr))

    smpl_chunk = bytearray()
    add_chunk(smpl_chunk, b'smpl', bytes(new_smpl))

    info_list = bytearray()
    add_chunk(info_list, b'LIST', b'INFO' + info_raw)

    sdta_list = bytearray()
    add_chunk(sdta_list, b'LIST', b'sdta' + bytes(smpl_chunk))

    pdta_list = bytearray()
    add_chunk(pdta_list, b'LIST', b'pdta' + bytes(pdta_data))

    output = bytearray()
    total_size = 4 + len(info_list) + len(sdta_list) + len(pdta_list)
    output.extend(b'RIFF')
    output.extend(struct.pack('<I', total_size))
    output.extend(b'sfbk')
    output.extend(info_list)
    output.extend(sdta_list)
    output.extend(pdta_list)

    with open(output_path, 'wb') as f:
        f.write(output)

    input_size = len(data)
    output_size = len(output)
    print(f"\nDone! Size: {input_size:,} -> {output_size:,} bytes ({output_size/input_size*100:.1f}%)")
    print(f"Reduction: {(input_size-output_size)/1024/1024:.1f} MB smaller")
    print(f"Bank 0 presets: {len(bank0_indices)}")
    print(f"Instruments: {len(needed_inst)} -> {len(sorted_needed_inst) - 1} (excl. terminator)")
    print(f"Samples: {len(needed_samples)} -> {len(sorted_samples) - 1} (excl. terminator)")
    return True

if __name__ == '__main__':
    input_path = 'GeneralUser.sf2'
    output_path = 'GeneralUser_GM.sf2'
    if len(sys.argv) > 1:
        input_path = sys.argv[1]
    if len(sys.argv) > 2:
        output_path = sys.argv[2]
    keep_bank0_sf2(input_path, output_path)
