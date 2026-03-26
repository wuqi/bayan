function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var SoundFont2 = createCommonjsModule(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(window, function() {
    return function(e) {
      var t = {};
      function r(n) {
        if (t[n])
          return t[n].exports;
        var o = t[n] = {i: n, l: false, exports: {}};
        return e[n].call(o.exports, o, o.exports, r), o.l = true, o.exports;
      }
      return r.m = e, r.c = t, r.d = function(e2, t2, n) {
        r.o(e2, t2) || Object.defineProperty(e2, t2, {enumerable: true, get: n});
      }, r.r = function(e2) {
        typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e2, "__esModule", {value: true});
      }, r.t = function(e2, t2) {
        if (1 & t2 && (e2 = r(e2)), 8 & t2)
          return e2;
        if (4 & t2 && typeof e2 == "object" && e2 && e2.__esModule)
          return e2;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {enumerable: true, value: e2}), 2 & t2 && typeof e2 != "string")
          for (var o in e2)
            r.d(n, o, function(t3) {
              return e2[t3];
            }.bind(null, o));
        return n;
      }, r.n = function(e2) {
        var t2 = e2 && e2.__esModule ? function() {
          return e2.default;
        } : function() {
          return e2;
        };
        return r.d(t2, "a", t2), t2;
      }, r.o = function(e2, t2) {
        return Object.prototype.hasOwnProperty.call(e2, t2);
      }, r.p = "", r(r.s = "./src/index.ts");
    }({"./src/chunk.ts": function(e, t, r) {
      r.r(t), r.d(t, "SF2Chunk", function() {
        return f;
      });
      var n = r("./src/riff/index.ts"), o = r("./src/constants.ts"), i = r("./src/chunks/index.ts");
      function s(e2) {
        return (s = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      function u(e2, t2) {
        for (var r2 = 0; r2 < t2.length; r2++) {
          var n2 = t2[r2];
          n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, n2.key, n2);
        }
      }
      function a(e2) {
        return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(e3) {
          return e3.__proto__ || Object.getPrototypeOf(e3);
        })(e2);
      }
      function c(e2, t2) {
        return (c = Object.setPrototypeOf || function(e3, t3) {
          return e3.__proto__ = t3, e3;
        })(e2, t2);
      }
      function l(e2) {
        if (e2 === void 0)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e2;
      }
      var f = function(e2) {
        function t2(e3) {
          var r3, n2, o2, i2, u2, c2;
          return function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, t2), n2 = this, r3 = !(o2 = a(t2).call(this, e3.id, e3.length, e3.buffer, e3.subChunks)) || s(o2) !== "object" && typeof o2 != "function" ? l(n2) : o2, i2 = l(l(r3)), c2 = void 0, (u2 = "subChunks") in i2 ? Object.defineProperty(i2, u2, {value: c2, enumerable: true, configurable: true, writable: true}) : i2[u2] = c2, r3.subChunks = e3.subChunks.map(function(e4) {
            return new t2(e4);
          }), r3;
        }
        var r2, f2;
        return function(e3, t3) {
          if (typeof t3 != "function" && t3 !== null)
            throw new TypeError("Super expression must either be null or a function");
          e3.prototype = Object.create(t3 && t3.prototype, {constructor: {value: e3, writable: true, configurable: true}}), t3 && c(e3, t3);
        }(t2, e2), r2 = t2, (f2 = [{key: "getMetaData", value: function() {
          if (this.id !== "LIST")
            throw new n.ParseError("Unexpected chunk ID", "'LIST'", "'".concat(this.id, "'"));
          var e3 = this.subChunks.reduce(function(e4, t3) {
            if (t3.id === "ifil" || t3.id === "iver") {
              if (t3.length !== o.SF_VERSION_LENGTH)
                throw new n.ParseError("Invalid size for the '".concat(t3.id, "' sub-chunk"));
              e4[t3.id] = "".concat(t3.getInt16(), ".").concat(t3.getInt16(2));
            } else
              e4[t3.id] = t3.getString();
            return e4;
          }, {});
          if (!e3.ifil)
            throw new n.ParseError("Missing required 'ifil' sub-chunk");
          if (!e3.INAM)
            throw new n.ParseError("Missing required 'INAM' sub-chunk");
          return {version: e3.ifil, soundEngine: e3.isng || "EMU8000", name: e3.INAM, rom: e3.irom, romVersion: e3.iver, creationDate: e3.ICRD, author: e3.IENG, product: e3.IPRD, copyright: e3.ICOP, comments: e3.ICMT, createdBy: e3.ISFT};
        }}, {key: "getSampleData", value: function() {
          if (this.id !== "LIST")
            throw new n.ParseError("Unexpected chunk ID", "'LIST'", "'".concat(this.id, "'"));
          var e3 = this.subChunks[0];
          if (e3.id !== "smpl")
            throw new n.ParseError("Invalid chunk signature", "'smpl'", "'".concat(e3.id, "'"));
          return e3.buffer;
        }}, {key: "getPresetData", value: function() {
          if (this.id !== "LIST")
            throw new n.ParseError("Unexpected chunk ID", "'LIST'", "'".concat(this.id, "'"));
          return {presetHeaders: Object(i.getPresetHeaders)(this.subChunks[0]), presetZones: Object(i.getZones)(this.subChunks[1], "pbag"), presetModulators: Object(i.getModulators)(this.subChunks[2], "pmod"), presetGenerators: Object(i.getGenerators)(this.subChunks[3], "pgen"), instrumentHeaders: Object(i.getInstrumentHeaders)(this.subChunks[4]), instrumentZones: Object(i.getZones)(this.subChunks[5], "ibag"), instrumentModulators: Object(i.getModulators)(this.subChunks[6], "imod"), instrumentGenerators: Object(i.getGenerators)(this.subChunks[7], "igen"), sampleHeaders: Object(i.getSampleHeaders)(this.subChunks[8])};
        }}]) && u(r2.prototype, f2), t2;
      }(n.RIFFChunk);
    }, "./src/chunks/generators.ts": function(e, t, r) {
      r.r(t), r.d(t, "getGenerators", function() {
        return c;
      });
      var n = r("./src/riff/index.ts"), o = r("./src/types/index.ts"), i = r("./src/constants.ts"), s = [o.GeneratorType.StartAddrsOffset, o.GeneratorType.EndAddrsOffset, o.GeneratorType.StartLoopAddrsOffset, o.GeneratorType.EndLoopAddrsOffset, o.GeneratorType.StartAddrsCoarseOffset, o.GeneratorType.EndAddrsCoarseOffset, o.GeneratorType.StartLoopAddrsCoarseOffset, o.GeneratorType.KeyNum, o.GeneratorType.Velocity, o.GeneratorType.EndLoopAddrsCoarseOffset, o.GeneratorType.SampleModes, o.GeneratorType.ExclusiveClass, o.GeneratorType.OverridingRootKey], u = [o.GeneratorType.Unused1, o.GeneratorType.Unused2, o.GeneratorType.Unused3, o.GeneratorType.Unused4, o.GeneratorType.Reserved1, o.GeneratorType.Reserved2, o.GeneratorType.Reserved3], a = [o.GeneratorType.KeyRange, o.GeneratorType.VelRange], c = function(e2, t2) {
        if (e2.id !== t2)
          throw new n.ParseError("Unexpected chunk ID", "'".concat(t2, "'"), "'".concat(e2.id, "'"));
        if (e2.length % i.SF_GENERATOR_SIZE)
          throw new n.ParseError("Invalid size for the '".concat(t2, "' sub-chunk"));
        return e2.iterate(function(e3) {
          var r2 = e3.getInt16();
          return o.GeneratorType[r2] ? t2 === "pgen" && s.includes(r2) || t2 === "igen" && u.includes(r2) ? null : a.includes(r2) ? {id: r2, range: {lo: e3.getByte(), hi: e3.getByte()}} : {id: r2, value: e3.getInt16BE()} : null;
        });
      };
    }, "./src/chunks/index.ts": function(e, t, r) {
      r.r(t);
      var n = r("./src/chunks/instruments/index.ts");
      r.d(t, "getInstrumentHeaders", function() {
        return n.getInstrumentHeaders;
      });
      var o = r("./src/chunks/presets/index.ts");
      r.d(t, "getPresetHeaders", function() {
        return o.getPresetHeaders;
      });
      var i = r("./src/chunks/samples/index.ts");
      r.d(t, "getSampleHeaders", function() {
        return i.getSampleHeaders;
      });
      var s = r("./src/chunks/generators.ts");
      r.d(t, "getGenerators", function() {
        return s.getGenerators;
      });
      var u = r("./src/chunks/modulators.ts");
      r.d(t, "getModulators", function() {
        return u.getModulators;
      });
      var a = r("./src/chunks/zones.ts");
      r.d(t, "getZones", function() {
        return a.getZones;
      }), r.d(t, "getItemsInZone", function() {
        return a.getItemsInZone;
      });
    }, "./src/chunks/instruments/headers.ts": function(e, t, r) {
      r.r(t), r.d(t, "getInstrumentHeaders", function() {
        return i;
      });
      var n = r("./src/riff/index.ts"), o = r("./src/constants.ts"), i = function(e2) {
        if (e2.id !== "inst")
          throw new n.ParseError("Unexpected chunk ID", "'inst'", "'".concat(e2.id, "'"));
        if (e2.length % o.SF_INSTRUMENT_HEADER_SIZE)
          throw new n.ParseError("Invalid size for the 'inst' sub-chunk");
        return e2.iterate(function(e3) {
          return {name: e3.getString(), bagIndex: e3.getInt16()};
        });
      };
    }, "./src/chunks/instruments/index.ts": function(e, t, r) {
      r.r(t);
      var n = r("./src/chunks/instruments/headers.ts");
      r.d(t, "getInstrumentHeaders", function() {
        return n.getInstrumentHeaders;
      });
    }, "./src/chunks/modulators.ts": function(e, t, r) {
      r.r(t), r.d(t, "getModulators", function() {
        return s;
      });
      var n = r("./src/riff/index.ts"), o = r("./src/constants.ts"), i = function(e2) {
        return {type: e2 >> 10 & 63, polarity: e2 >> 9 & 1, direction: e2 >> 8 & 1, palette: e2 >> 7 & 1, index: 127 & e2};
      }, s = function(e2, t2) {
        if (e2.id !== t2)
          throw new n.ParseError("Unexpected chunk ID", "'".concat(t2, "'"), "'".concat(e2.id, "'"));
        if (e2.length % o.SF_MODULATOR_SIZE)
          throw new n.ParseError("Invalid size for the '".concat(t2, "' sub-chunk"));
        return e2.iterate(function(e3) {
          return {source: i(e3.getInt16BE()), id: e3.getInt16BE(), value: e3.getInt16BE(), valueSource: i(e3.getInt16BE()), transform: e3.getInt16BE()};
        });
      };
    }, "./src/chunks/presets/headers.ts": function(e, t, r) {
      r.r(t), r.d(t, "getPresetHeaders", function() {
        return i;
      });
      var n = r("./src/riff/index.ts"), o = r("./src/constants.ts"), i = function(e2) {
        if (e2.id !== "phdr")
          throw new n.ParseError("Invalid chunk ID", "'phdr'", "'".concat(e2.id, "'"));
        if (e2.length % o.SF_PRESET_HEADER_SIZE)
          throw new n.ParseError("Invalid size for the 'phdr' sub-chunk");
        return e2.iterate(function(e3) {
          return {name: e3.getString(), preset: e3.getInt16(), bank: e3.getInt16(), bagIndex: e3.getInt16(), library: e3.getUInt32(), genre: e3.getUInt32(), morphology: e3.getUInt32()};
        });
      };
    }, "./src/chunks/presets/index.ts": function(e, t, r) {
      r.r(t);
      var n = r("./src/chunks/presets/headers.ts");
      r.d(t, "getPresetHeaders", function() {
        return n.getPresetHeaders;
      });
    }, "./src/chunks/samples/headers.ts": function(e, t, r) {
      r.r(t), r.d(t, "getSampleHeaders", function() {
        return i;
      });
      var n = r("./src/riff/index.ts"), o = r("./src/constants.ts"), i = function(e2) {
        if (e2.id !== "shdr")
          throw new n.ParseError("Unexpected chunk ID", "'shdr'", "'".concat(e2.id, "'"));
        if (e2.length % o.SF_SAMPLE_HEADER_SIZE)
          throw new n.ParseError("Invalid size for the 'shdr' sub-chunk");
        return e2.iterate(function(e3) {
          return {name: e3.getString(), start: e3.getUInt32(), end: e3.getUInt32(), startLoop: e3.getUInt32(), endLoop: e3.getUInt32(), sampleRate: e3.getUInt32(), originalPitch: e3.getByte(), pitchCorrection: e3.getChar(), link: e3.getInt16(), type: e3.getInt16()};
        });
      };
    }, "./src/chunks/samples/index.ts": function(e, t, r) {
      r.r(t);
      var n = r("./src/chunks/samples/headers.ts");
      r.d(t, "getSampleHeaders", function() {
        return n.getSampleHeaders;
      });
    }, "./src/chunks/zones.ts": function(e, t, r) {
      r.r(t), r.d(t, "getZones", function() {
        return s;
      }), r.d(t, "getItemsInZone", function() {
        return u;
      });
      var n = r("./src/riff/index.ts"), o = r("./src/constants.ts"), i = r("./src/types/index.ts"), s = function(e2, t2) {
        if (e2.id !== t2)
          throw new n.ParseError("Unexpected chunk ID", "'".concat(t2, "'"), "'".concat(e2.id, "'"));
        if (e2.length % o.SF_BAG_SIZE)
          throw new n.ParseError("Invalid size for the '".concat(t2, "' sub-chunk"));
        return e2.iterate(function(e3) {
          return {generatorIndex: e3.getInt16(), modulatorIndex: e3.getInt16()};
        });
      }, u = function(e2, t2, r2, n2, o2, s2) {
        for (var u2 = [], l2 = 0; l2 < e2.length; l2++) {
          for (var f = e2[l2], d = e2[l2 + 1], p = f.bagIndex, h = d ? d.bagIndex : t2.length, y = [], v = void 0, g = p; g < h; g++) {
            var E = a(g, t2, r2), m = c(g, t2, n2), b = m[i.GeneratorType.KeyRange] && m[i.GeneratorType.KeyRange].range, S = m[s2];
            if (S) {
              var T = o2[S.value];
              T && y.push({keyRange: b, modulators: E, generators: m, reference: T});
            } else
              g - p == 0 && (v = {keyRange: b, modulators: E, generators: m});
          }
          u2.push({header: f, globalZone: v, zones: y});
        }
        return u2;
      }, a = function(e2, t2, r2) {
        var n2 = t2[e2], o2 = t2[e2 + 1], i2 = n2.modulatorIndex, s2 = o2 ? o2.modulatorIndex : t2.length;
        return l(i2, s2, r2);
      }, c = function(e2, t2, r2) {
        var n2 = t2[e2], o2 = t2[e2 + 1], i2 = n2.generatorIndex, s2 = o2 ? o2.generatorIndex : t2.length;
        return l(i2, s2, r2);
      }, l = function(e2, t2, r2) {
        for (var n2 = {}, o2 = e2; o2 < t2; o2++) {
          var i2 = r2[o2];
          i2 && (n2[i2.id] = i2);
        }
        return n2;
      };
    }, "./src/constants.ts": function(e, t, r) {
      r.r(t), r.d(t, "SF_VERSION_LENGTH", function() {
        return n;
      }), r.d(t, "SF_PRESET_HEADER_SIZE", function() {
        return o;
      }), r.d(t, "SF_BAG_SIZE", function() {
        return i;
      }), r.d(t, "SF_MODULATOR_SIZE", function() {
        return s;
      }), r.d(t, "SF_GENERATOR_SIZE", function() {
        return u;
      }), r.d(t, "SF_INSTRUMENT_HEADER_SIZE", function() {
        return a;
      }), r.d(t, "SF_SAMPLE_HEADER_SIZE", function() {
        return c;
      }), r.d(t, "DEFAULT_SAMPLE_RATE", function() {
        return l;
      });
      var n = 4, o = 38, i = 4, s = 10, u = 4, a = 22, c = 46, l = 22050;
    }, "./src/index.ts": function(e, t, r) {
      r.r(t);
      var n = r("./src/types/index.ts");
      for (var o in n)
        ["default"].indexOf(o) < 0 && function(e2) {
          r.d(t, e2, function() {
            return n[e2];
          });
        }(o);
      var i = r("./src/chunk.ts");
      r.d(t, "SF2Chunk", function() {
        return i.SF2Chunk;
      });
      var s = r("./src/constants.ts");
      r.d(t, "SF_VERSION_LENGTH", function() {
        return s.SF_VERSION_LENGTH;
      }), r.d(t, "SF_PRESET_HEADER_SIZE", function() {
        return s.SF_PRESET_HEADER_SIZE;
      }), r.d(t, "SF_BAG_SIZE", function() {
        return s.SF_BAG_SIZE;
      }), r.d(t, "SF_MODULATOR_SIZE", function() {
        return s.SF_MODULATOR_SIZE;
      }), r.d(t, "SF_GENERATOR_SIZE", function() {
        return s.SF_GENERATOR_SIZE;
      }), r.d(t, "SF_INSTRUMENT_HEADER_SIZE", function() {
        return s.SF_INSTRUMENT_HEADER_SIZE;
      }), r.d(t, "SF_SAMPLE_HEADER_SIZE", function() {
        return s.SF_SAMPLE_HEADER_SIZE;
      }), r.d(t, "DEFAULT_SAMPLE_RATE", function() {
        return s.DEFAULT_SAMPLE_RATE;
      });
      var u = r("./src/soundFont2.ts");
      r.d(t, "SoundFont2", function() {
        return u.SoundFont2;
      });
    }, "./src/riff/chunkIterator.ts": function(e, t, r) {
      r.r(t), r.d(t, "ChunkIterator", function() {
        return u;
      });
      var n = r("./src/utils/index.ts");
      function o(e2, t2) {
        if (!(e2 instanceof t2))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e2, t2) {
        for (var r2 = 0; r2 < t2.length; r2++) {
          var n2 = t2[r2];
          n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, n2.key, n2);
        }
      }
      function s(e2, t2, r2) {
        return t2 in e2 ? Object.defineProperty(e2, t2, {value: r2, enumerable: true, configurable: true, writable: true}) : e2[t2] = r2, e2;
      }
      var u = function() {
        function e2(t3) {
          var r3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          o(this, e2), s(this, "target", []), s(this, "chunk", void 0), s(this, "position", 0), this.chunk = t3, this.position = r3;
        }
        var t2, r2;
        return t2 = e2, (r2 = [{key: "iterate", value: function(e3) {
          for (; this.position < this.chunk.length; ) {
            var t3 = e3(this);
            t3 && this.target.push(t3);
          }
        }}, {key: "getString", value: function() {
          var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 20, t3 = Object(n.getStringFromBuffer)(this.getBuffer(this.position, e3));
          return this.position += e3, t3;
        }}, {key: "getInt16", value: function() {
          return this.chunk.buffer[this.position++] | this.chunk.buffer[this.position++] << 8;
        }}, {key: "getInt16BE", value: function() {
          return this.getInt16() << 16 >> 16;
        }}, {key: "getUInt32", value: function() {
          return (this.chunk.buffer[this.position++] | this.chunk.buffer[this.position++] << 8 | this.chunk.buffer[this.position++] << 16 | this.chunk.buffer[this.position++] << 24) >>> 0;
        }}, {key: "getByte", value: function() {
          return this.chunk.buffer[this.position++];
        }}, {key: "getChar", value: function() {
          return this.chunk.buffer[this.position++] << 24 >> 24;
        }}, {key: "skip", value: function(e3) {
          this.position += e3;
        }}, {key: "getBuffer", value: function(e3, t3) {
          return this.chunk.buffer.subarray(e3, e3 + t3);
        }}, {key: "currentPosition", get: function() {
          return this.position;
        }}]) && i(t2.prototype, r2), e2;
      }();
    }, "./src/riff/index.ts": function(e, t, r) {
      r.r(t);
      var n = r("./src/riff/chunkIterator.ts");
      r.d(t, "ChunkIterator", function() {
        return n.ChunkIterator;
      });
      var o = r("./src/riff/parseError.ts");
      r.d(t, "ParseError", function() {
        return o.ParseError;
      });
      var i = r("./src/riff/parser.ts");
      r.d(t, "parseBuffer", function() {
        return i.parseBuffer;
      }), r.d(t, "getChunk", function() {
        return i.getChunk;
      }), r.d(t, "getChunkLength", function() {
        return i.getChunkLength;
      }), r.d(t, "getSubChunks", function() {
        return i.getSubChunks;
      }), r.d(t, "getChunkId", function() {
        return i.getChunkId;
      });
      var s = r("./src/riff/riffChunk.ts");
      r.d(t, "RIFFChunk", function() {
        return s.RIFFChunk;
      });
    }, "./src/riff/parseError.ts": function(e, t, r) {
      function n(e2) {
        return (n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      function o(e2, t2) {
        return !t2 || n(t2) !== "object" && typeof t2 != "function" ? function(e3) {
          if (e3 === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e3;
        }(e2) : t2;
      }
      function i(e2) {
        var t2 = typeof Map == "function" ? new Map() : void 0;
        return (i = function(e3) {
          if (e3 === null || (r2 = e3, Function.toString.call(r2).indexOf("[native code]") === -1))
            return e3;
          var r2;
          if (typeof e3 != "function")
            throw new TypeError("Super expression must either be null or a function");
          if (t2 !== void 0) {
            if (t2.has(e3))
              return t2.get(e3);
            t2.set(e3, n2);
          }
          function n2() {
            return u(e3, arguments, c(this).constructor);
          }
          return n2.prototype = Object.create(e3.prototype, {constructor: {value: n2, enumerable: false, writable: true, configurable: true}}), a(n2, e3);
        })(e2);
      }
      function s() {
        if (typeof Reflect == "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy == "function")
          return true;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), true;
        } catch (e2) {
          return false;
        }
      }
      function u(e2, t2, r2) {
        return (u = s() ? Reflect.construct : function(e3, t3, r3) {
          var n2 = [null];
          n2.push.apply(n2, t3);
          var o2 = new (Function.bind.apply(e3, n2))();
          return r3 && a(o2, r3.prototype), o2;
        }).apply(null, arguments);
      }
      function a(e2, t2) {
        return (a = Object.setPrototypeOf || function(e3, t3) {
          return e3.__proto__ = t3, e3;
        })(e2, t2);
      }
      function c(e2) {
        return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function(e3) {
          return e3.__proto__ || Object.getPrototypeOf(e3);
        })(e2);
      }
      r.r(t), r.d(t, "ParseError", function() {
        return l;
      });
      var l = function(e2) {
        function t2(e3, r2, n2) {
          return function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, t2), o(this, c(t2).call(this, "".concat(e3).concat(r2 && n2 ? ", expected ".concat(r2, ", received ").concat(n2) : "")));
        }
        return function(e3, t3) {
          if (typeof t3 != "function" && t3 !== null)
            throw new TypeError("Super expression must either be null or a function");
          e3.prototype = Object.create(t3 && t3.prototype, {constructor: {value: e3, writable: true, configurable: true}}), t3 && a(e3, t3);
        }(t2, e2), t2;
      }(i(Error));
    }, "./src/riff/parser.ts": function(e, t, r) {
      r.r(t), r.d(t, "parseBuffer", function() {
        return s;
      }), r.d(t, "getChunk", function() {
        return u;
      }), r.d(t, "getChunkLength", function() {
        return a;
      }), r.d(t, "getSubChunks", function() {
        return c;
      }), r.d(t, "getChunkId", function() {
        return l;
      });
      var n = r("./src/riff/parseError.ts"), o = r("./src/utils/buffer.ts"), i = r("./src/riff/riffChunk.ts"), s = function(e2) {
        var t2 = l(e2);
        if (t2 !== "RIFF")
          throw new n.ParseError("Invalid file format", "RIFF", t2);
        var r2 = l(e2, 8);
        if (r2 !== "sfbk")
          throw new n.ParseError("Invalid signature", "sfbk", r2);
        var o2 = e2.subarray(8), s2 = c(o2.subarray(4));
        return new i.RIFFChunk(t2, o2.length, o2, s2);
      }, u = function(e2, t2) {
        var r2 = l(e2, t2), n2 = a(e2, t2 + 4), o2 = [];
        return r2 !== "RIFF" && r2 !== "LIST" || (o2 = c(e2.subarray(t2 + 12))), new i.RIFFChunk(r2, n2, e2.subarray(t2 + 8), o2);
      }, a = function(e2, t2) {
        return ((e2 = e2.subarray(t2, t2 + 4))[0] | e2[1] << 8 | e2[2] << 16 | e2[3] << 24) >>> 0;
      }, c = function(e2) {
        for (var t2 = [], r2 = 0; r2 <= e2.length - 8; ) {
          var n2 = u(e2, r2);
          t2.push(n2), r2 = (r2 += 8 + n2.length) % 2 ? r2 + 1 : r2;
        }
        return t2;
      }, l = function(e2) {
        var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        return Object(o.getStringFromBuffer)(e2.subarray(t2, t2 + 4));
      };
    }, "./src/riff/riffChunk.ts": function(e, t, r) {
      r.r(t), r.d(t, "RIFFChunk", function() {
        return u;
      });
      var n = r("./src/riff/chunkIterator.ts"), o = r("./src/utils/index.ts");
      function i(e2, t2) {
        for (var r2 = 0; r2 < t2.length; r2++) {
          var n2 = t2[r2];
          n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, n2.key, n2);
        }
      }
      function s(e2, t2, r2) {
        return t2 in e2 ? Object.defineProperty(e2, t2, {value: r2, enumerable: true, configurable: true, writable: true}) : e2[t2] = r2, e2;
      }
      var u = function() {
        function e2(t3, r3, n2, o2) {
          !function(e3, t4) {
            if (!(e3 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), s(this, "id", void 0), s(this, "length", void 0), s(this, "buffer", void 0), s(this, "subChunks", void 0), this.id = t3, this.length = r3, this.buffer = n2, this.subChunks = o2;
        }
        var t2, r2;
        return t2 = e2, (r2 = [{key: "getString", value: function() {
          var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t3 = arguments.length > 1 ? arguments[1] : void 0;
          return Object(o.getStringFromBuffer)(this.getBuffer(e3, t3 || this.length - e3));
        }}, {key: "getInt16", value: function() {
          var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          return this.buffer[e3++] | this.buffer[e3] << 8;
        }}, {key: "getUInt32", value: function() {
          var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          return (this.buffer[e3++] | this.buffer[e3++] << 8 | this.buffer[e3++] << 16 | this.buffer[e3] << 24) >>> 0;
        }}, {key: "getByte", value: function() {
          var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          return this.buffer[e3];
        }}, {key: "getChar", value: function() {
          var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          return this.buffer[e3] << 24 >> 24;
        }}, {key: "iterator", value: function() {
          var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          return new n.ChunkIterator(this, e3);
        }}, {key: "iterate", value: function(e3) {
          var t3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r3 = new n.ChunkIterator(this, t3);
          return r3.iterate(e3), r3.target;
        }}, {key: "getBuffer", value: function(e3, t3) {
          return this.buffer.subarray(e3, e3 + t3);
        }}]) && i(t2.prototype, r2), e2;
      }();
    }, "./src/soundFont2.ts": function(e, t, r) {
      r.r(t), r.d(t, "SoundFont2", function() {
        return d;
      });
      var n = r("./src/types/index.ts"), o = r("./src/chunk.ts"), i = r("./src/riff/index.ts"), s = r("./src/chunks/index.ts"), u = r("./src/utils/index.ts");
      function a(e2) {
        for (var t2 = 1; t2 < arguments.length; t2++) {
          var r2 = arguments[t2] != null ? arguments[t2] : {}, n2 = Object.keys(r2);
          typeof Object.getOwnPropertySymbols == "function" && (n2 = n2.concat(Object.getOwnPropertySymbols(r2).filter(function(e3) {
            return Object.getOwnPropertyDescriptor(r2, e3).enumerable;
          }))), n2.forEach(function(t3) {
            f(e2, t3, r2[t3]);
          });
        }
        return e2;
      }
      function c(e2, t2) {
        for (var r2 = 0; r2 < t2.length; r2++) {
          var n2 = t2[r2];
          n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, n2.key, n2);
        }
      }
      function l(e2, t2, r2) {
        return t2 && c(e2.prototype, t2), r2 && c(e2, r2), e2;
      }
      function f(e2, t2, r2) {
        return t2 in e2 ? Object.defineProperty(e2, t2, {value: r2, enumerable: true, configurable: true, writable: true}) : e2[t2] = r2, e2;
      }
      var d = function() {
        function e2(t2) {
          if (function(e3, t3) {
            if (!(e3 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), f(this, "chunk", void 0), f(this, "metaData", void 0), f(this, "sampleData", void 0), f(this, "samples", void 0), f(this, "presetData", void 0), f(this, "instruments", void 0), f(this, "presets", void 0), f(this, "banks", void 0), !(t2 instanceof o.SF2Chunk)) {
            var r2 = Object(i.parseBuffer)(t2);
            t2 = new o.SF2Chunk(r2);
          }
          if (t2.subChunks.length !== 3)
            throw new i.ParseError("Invalid sfbk structure", "3 chunks", "".concat(t2.subChunks.length, " chunks"));
          this.chunk = t2, this.metaData = t2.subChunks[0].getMetaData(), this.sampleData = t2.subChunks[1].getSampleData(), this.presetData = t2.subChunks[2].getPresetData(), this.samples = this.getSamples(), this.instruments = this.getInstruments(), this.presets = this.getPresets(), this.banks = this.getBanks();
        }
        return l(e2, null, [{key: "from", value: function(t2) {
          return new e2(t2);
        }}]), l(e2, [{key: "getKeyData", value: function(e3) {
          var t2 = this, r2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          return Object(u.memoize)(function(e4, r3, n3) {
            var o2 = t2.banks[r3];
            if (o2) {
              var i2 = o2.presets[n3];
              if (i2) {
                var s2 = i2.zones.filter(function(r4) {
                  return t2.isKeyInRange(r4, e4);
                });
                if (s2.length > 0) {
                  var u2 = true, c2 = false, l2 = void 0;
                  try {
                    for (var f2, d2 = s2[Symbol.iterator](); !(u2 = (f2 = d2.next()).done); u2 = true) {
                      var p = f2.value, h = p.instrument, y = h.zones.filter(function(r4) {
                        return t2.isKeyInRange(r4, e4);
                      });
                      if (y.length > 0) {
                        var v = true, g = false, E = void 0;
                        try {
                          for (var m, b = y[Symbol.iterator](); !(v = (m = b.next()).done); v = true) {
                            var S = m.value, T = S.sample, I = a({}, p.generators, S.generators), k = a({}, p.modulators, S.modulators);
                            return {keyNumber: e4, preset: i2, instrument: h, sample: T, generators: I, modulators: k};
                          }
                        } catch (e5) {
                          g = true, E = e5;
                        } finally {
                          try {
                            v || b.return == null || b.return();
                          } finally {
                            if (g)
                              throw E;
                          }
                        }
                      }
                    }
                  } catch (e5) {
                    c2 = true, l2 = e5;
                  } finally {
                    try {
                      u2 || d2.return == null || d2.return();
                    } finally {
                      if (c2)
                        throw l2;
                    }
                  }
                }
              }
            }
            return null;
          })(e3, r2, n2);
        }}, {key: "isKeyInRange", value: function(e3, t2) {
          return e3.keyRange === void 0 || e3.keyRange.lo <= t2 && e3.keyRange.hi >= t2;
        }}, {key: "getBanks", value: function() {
          return this.presets.reduce(function(e3, t2) {
            var r2 = t2.header.bank;
            return e3[r2] || (e3[r2] = {presets: []}), e3[r2].presets[t2.header.preset] = t2, e3;
          }, []);
        }}, {key: "getPresets", value: function() {
          var e3 = this.presetData, t2 = e3.presetHeaders, r2 = e3.presetZones, o2 = e3.presetGenerators, i2 = e3.presetModulators;
          return Object(s.getItemsInZone)(t2, r2, i2, o2, this.instruments, n.GeneratorType.Instrument).filter(function(e4) {
            return e4.header.name !== "EOP";
          }).map(function(e4) {
            return {header: e4.header, globalZone: e4.globalZone, zones: e4.zones.map(function(e5) {
              return {keyRange: e5.keyRange, generators: e5.generators, modulators: e5.modulators, instrument: e5.reference};
            })};
          });
        }}, {key: "getInstruments", value: function() {
          var e3 = this.presetData, t2 = e3.instrumentHeaders, r2 = e3.instrumentZones, o2 = e3.instrumentModulators, i2 = e3.instrumentGenerators;
          return Object(s.getItemsInZone)(t2, r2, o2, i2, this.samples, n.GeneratorType.SampleId).filter(function(e4) {
            return e4.header.name !== "EOI";
          }).map(function(e4) {
            return {header: e4.header, globalZone: e4.globalZone, zones: e4.zones.map(function(e5) {
              return {keyRange: e5.keyRange, generators: e5.generators, modulators: e5.modulators, sample: e5.reference};
            })};
          });
        }}, {key: "getSamples", value: function() {
          var e3 = this;
          return this.presetData.sampleHeaders.filter(function(e4) {
            return e4.name !== "EOS";
          }).map(function(t2) {
            if (t2.name !== "EOS" && t2.sampleRate <= 0)
              throw new Error("Illegal sample rate of ".concat(t2.sampleRate, " hz in sample '").concat(t2.name, "'"));
            return t2.originalPitch >= 128 && t2.originalPitch <= 254 && (t2.originalPitch = 60), t2.startLoop -= t2.start, t2.endLoop -= t2.start, {header: t2, data: new Int16Array(new Uint8Array(e3.sampleData.subarray(2 * t2.start, 2 * t2.end)).buffer)};
          });
        }}]), e2;
      }();
    }, "./src/types/bank.ts": function(e, t) {
    }, "./src/types/generator.ts": function(e, t, r) {
      var n, o;
      function i(e2, t2, r2) {
        return t2 in e2 ? Object.defineProperty(e2, t2, {value: r2, enumerable: true, configurable: true, writable: true}) : e2[t2] = r2, e2;
      }
      r.r(t), r.d(t, "GeneratorType", function() {
        return o;
      }), r.d(t, "DEFAULT_GENERATOR_VALUES", function() {
        return s;
      }), function(e2) {
        e2[e2.StartAddrsOffset = 0] = "StartAddrsOffset", e2[e2.EndAddrsOffset = 1] = "EndAddrsOffset", e2[e2.StartLoopAddrsOffset = 2] = "StartLoopAddrsOffset", e2[e2.EndLoopAddrsOffset = 3] = "EndLoopAddrsOffset", e2[e2.StartAddrsCoarseOffset = 4] = "StartAddrsCoarseOffset", e2[e2.ModLFOToPitch = 5] = "ModLFOToPitch", e2[e2.VibLFOToPitch = 6] = "VibLFOToPitch", e2[e2.ModEnvToPitch = 7] = "ModEnvToPitch", e2[e2.InitialFilterFc = 8] = "InitialFilterFc", e2[e2.InitialFilterQ = 9] = "InitialFilterQ", e2[e2.ModLFOToFilterFc = 10] = "ModLFOToFilterFc", e2[e2.ModEnvToFilterFc = 11] = "ModEnvToFilterFc", e2[e2.EndAddrsCoarseOffset = 12] = "EndAddrsCoarseOffset", e2[e2.ModLFOToVolume = 13] = "ModLFOToVolume", e2[e2.Unused1 = 14] = "Unused1", e2[e2.ChorusEffectsSend = 15] = "ChorusEffectsSend", e2[e2.ReverbEffectsSend = 16] = "ReverbEffectsSend", e2[e2.Pan = 17] = "Pan", e2[e2.Unused2 = 18] = "Unused2", e2[e2.Unused3 = 19] = "Unused3", e2[e2.Unused4 = 20] = "Unused4", e2[e2.DelayModLFO = 21] = "DelayModLFO", e2[e2.FreqModLFO = 22] = "FreqModLFO", e2[e2.DelayVibLFO = 23] = "DelayVibLFO", e2[e2.FreqVibLFO = 24] = "FreqVibLFO", e2[e2.DelayModEnv = 25] = "DelayModEnv", e2[e2.AttackModEnv = 26] = "AttackModEnv", e2[e2.HoldModEnv = 27] = "HoldModEnv", e2[e2.DecayModEnv = 28] = "DecayModEnv", e2[e2.SustainModEnv = 29] = "SustainModEnv", e2[e2.ReleaseModEnv = 30] = "ReleaseModEnv", e2[e2.KeyNumToModEnvHold = 31] = "KeyNumToModEnvHold", e2[e2.KeyNumToModEnvDecay = 32] = "KeyNumToModEnvDecay", e2[e2.DelayVolEnv = 33] = "DelayVolEnv", e2[e2.AttackVolEnv = 34] = "AttackVolEnv", e2[e2.HoldVolEnv = 35] = "HoldVolEnv", e2[e2.DecayVolEnv = 36] = "DecayVolEnv", e2[e2.SustainVolEnv = 37] = "SustainVolEnv", e2[e2.ReleaseVolEnv = 38] = "ReleaseVolEnv", e2[e2.KeyNumToVolEnvHold = 39] = "KeyNumToVolEnvHold", e2[e2.KeyNumToVolEnvDecay = 40] = "KeyNumToVolEnvDecay", e2[e2.Instrument = 41] = "Instrument", e2[e2.Reserved1 = 42] = "Reserved1", e2[e2.KeyRange = 43] = "KeyRange", e2[e2.VelRange = 44] = "VelRange", e2[e2.StartLoopAddrsCoarseOffset = 45] = "StartLoopAddrsCoarseOffset", e2[e2.KeyNum = 46] = "KeyNum", e2[e2.Velocity = 47] = "Velocity", e2[e2.InitialAttenuation = 48] = "InitialAttenuation", e2[e2.Reserved2 = 49] = "Reserved2", e2[e2.EndLoopAddrsCoarseOffset = 50] = "EndLoopAddrsCoarseOffset", e2[e2.CoarseTune = 51] = "CoarseTune", e2[e2.FineTune = 52] = "FineTune", e2[e2.SampleId = 53] = "SampleId", e2[e2.SampleModes = 54] = "SampleModes", e2[e2.Reserved3 = 55] = "Reserved3", e2[e2.ScaleTuning = 56] = "ScaleTuning", e2[e2.ExclusiveClass = 57] = "ExclusiveClass", e2[e2.OverridingRootKey = 58] = "OverridingRootKey", e2[e2.Unused5 = 59] = "Unused5", e2[e2.EndOper = 60] = "EndOper";
      }(o || (o = {}));
      var s = (i(n = {}, o.StartAddrsOffset, 0), i(n, o.EndAddrsOffset, 0), i(n, o.StartLoopAddrsOffset, 0), i(n, o.EndLoopAddrsOffset, 0), i(n, o.StartAddrsCoarseOffset, 0), i(n, o.ModLFOToPitch, 0), i(n, o.VibLFOToPitch, 0), i(n, o.ModEnvToPitch, 0), i(n, o.InitialFilterFc, 13500), i(n, o.InitialFilterQ, 0), i(n, o.ModLFOToFilterFc, 0), i(n, o.ModEnvToFilterFc, 0), i(n, o.EndAddrsCoarseOffset, 0), i(n, o.ModLFOToVolume, 0), i(n, o.ChorusEffectsSend, 0), i(n, o.ReverbEffectsSend, 0), i(n, o.Pan, 0), i(n, o.DelayModLFO, -12e3), i(n, o.FreqModLFO, 0), i(n, o.DelayVibLFO, -12e3), i(n, o.FreqVibLFO, 0), i(n, o.DelayModEnv, -12e3), i(n, o.AttackModEnv, -12e3), i(n, o.HoldModEnv, -12e3), i(n, o.DecayModEnv, -12e3), i(n, o.SustainModEnv, 0), i(n, o.ReleaseModEnv, -12e3), i(n, o.KeyNumToModEnvHold, 0), i(n, o.KeyNumToModEnvDecay, 0), i(n, o.DelayVolEnv, -12e3), i(n, o.AttackVolEnv, -12e3), i(n, o.HoldVolEnv, -12e3), i(n, o.DecayVolEnv, -12e3), i(n, o.SustainVolEnv, 0), i(n, o.ReleaseVolEnv, -12e3), i(n, o.KeyNumToVolEnvHold, 0), i(n, o.KeyNumToVolEnvDecay, 0), i(n, o.StartLoopAddrsCoarseOffset, 0), i(n, o.KeyNum, -1), i(n, o.Velocity, -1), i(n, o.InitialAttenuation, 0), i(n, o.EndLoopAddrsCoarseOffset, 0), i(n, o.CoarseTune, 0), i(n, o.FineTune, 0), i(n, o.SampleModes, 0), i(n, o.ScaleTuning, 100), i(n, o.ExclusiveClass, 0), i(n, o.OverridingRootKey, -1), n);
    }, "./src/types/index.ts": function(e, t, r) {
      r.r(t);
      var n = r("./src/types/bank.ts");
      for (var o in n)
        ["default"].indexOf(o) < 0 && function(e2) {
          r.d(t, e2, function() {
            return n[e2];
          });
        }(o);
      var i = r("./src/types/generator.ts");
      r.d(t, "GeneratorType", function() {
        return i.GeneratorType;
      }), r.d(t, "DEFAULT_GENERATOR_VALUES", function() {
        return i.DEFAULT_GENERATOR_VALUES;
      });
      var s = r("./src/types/instrument.ts");
      for (var o in s)
        ["default", "GeneratorType", "DEFAULT_GENERATOR_VALUES"].indexOf(o) < 0 && function(e2) {
          r.d(t, e2, function() {
            return s[e2];
          });
        }(o);
      var u = r("./src/types/key.ts");
      for (var o in u)
        ["default", "GeneratorType", "DEFAULT_GENERATOR_VALUES"].indexOf(o) < 0 && function(e2) {
          r.d(t, e2, function() {
            return u[e2];
          });
        }(o);
      var a = r("./src/types/metaData.ts");
      for (var o in a)
        ["default", "GeneratorType", "DEFAULT_GENERATOR_VALUES"].indexOf(o) < 0 && function(e2) {
          r.d(t, e2, function() {
            return a[e2];
          });
        }(o);
      var c = r("./src/types/modulator.ts");
      r.d(t, "ControllerType", function() {
        return c.ControllerType;
      }), r.d(t, "ControllerPolarity", function() {
        return c.ControllerPolarity;
      }), r.d(t, "ControllerDirection", function() {
        return c.ControllerDirection;
      }), r.d(t, "ControllerPalette", function() {
        return c.ControllerPalette;
      }), r.d(t, "Controller", function() {
        return c.Controller;
      }), r.d(t, "TransformType", function() {
        return c.TransformType;
      }), r.d(t, "DEFAULT_INSTRUMENT_MODULATORS", function() {
        return c.DEFAULT_INSTRUMENT_MODULATORS;
      });
      var l = r("./src/types/preset.ts");
      for (var o in l)
        ["default", "GeneratorType", "DEFAULT_GENERATOR_VALUES", "ControllerType", "ControllerPolarity", "ControllerDirection", "ControllerPalette", "Controller", "TransformType", "DEFAULT_INSTRUMENT_MODULATORS"].indexOf(o) < 0 && function(e2) {
          r.d(t, e2, function() {
            return l[e2];
          });
        }(o);
      var f = r("./src/types/presetData.ts");
      for (var o in f)
        ["default", "GeneratorType", "DEFAULT_GENERATOR_VALUES", "ControllerType", "ControllerPolarity", "ControllerDirection", "ControllerPalette", "Controller", "TransformType", "DEFAULT_INSTRUMENT_MODULATORS"].indexOf(o) < 0 && function(e2) {
          r.d(t, e2, function() {
            return f[e2];
          });
        }(o);
      var d = r("./src/types/sample.ts");
      r.d(t, "SampleType", function() {
        return d.SampleType;
      });
      var p = r("./src/types/zone.ts");
      for (var o in p)
        ["default", "GeneratorType", "DEFAULT_GENERATOR_VALUES", "ControllerType", "ControllerPolarity", "ControllerDirection", "ControllerPalette", "Controller", "TransformType", "DEFAULT_INSTRUMENT_MODULATORS", "SampleType"].indexOf(o) < 0 && function(e2) {
          r.d(t, e2, function() {
            return p[e2];
          });
        }(o);
    }, "./src/types/instrument.ts": function(e, t) {
    }, "./src/types/key.ts": function(e, t) {
    }, "./src/types/metaData.ts": function(e, t) {
    }, "./src/types/modulator.ts": function(e, t, r) {
      r.r(t), r.d(t, "ControllerType", function() {
        return n;
      }), r.d(t, "ControllerPolarity", function() {
        return o;
      }), r.d(t, "ControllerDirection", function() {
        return i;
      }), r.d(t, "ControllerPalette", function() {
        return s;
      }), r.d(t, "Controller", function() {
        return u;
      }), r.d(t, "TransformType", function() {
        return a;
      }), r.d(t, "DEFAULT_INSTRUMENT_MODULATORS", function() {
        return l;
      });
      var n, o, i, s, u, a, c = r("./src/types/generator.ts");
      !function(e2) {
        e2[e2.Linear = 0] = "Linear", e2[e2.Concave = 1] = "Concave", e2[e2.Convex = 2] = "Convex", e2[e2.Switch = 3] = "Switch";
      }(n || (n = {})), function(e2) {
        e2[e2.Unipolar = 0] = "Unipolar", e2[e2.Bipolar = 1] = "Bipolar";
      }(o || (o = {})), function(e2) {
        e2[e2.Increasing = 0] = "Increasing", e2[e2.Decreasing = 1] = "Decreasing";
      }(i || (i = {})), function(e2) {
        e2[e2.GeneralController = 0] = "GeneralController", e2[e2.MidiController = 1] = "MidiController";
      }(s || (s = {})), function(e2) {
        e2[e2.NoController = 0] = "NoController", e2[e2.NoteOnVelocity = 2] = "NoteOnVelocity", e2[e2.NoteOnKeyNumber = 3] = "NoteOnKeyNumber", e2[e2.PolyPressure = 10] = "PolyPressure", e2[e2.ChannelPressure = 13] = "ChannelPressure", e2[e2.PitchWheel = 14] = "PitchWheel", e2[e2.PitchWheelSensitivity = 16] = "PitchWheelSensitivity", e2[e2.Link = 127] = "Link";
      }(u || (u = {})), function(e2) {
        e2[e2.Linear = 0] = "Linear", e2[e2.Absolute = 2] = "Absolute";
      }(a || (a = {}));
      var l = [{id: c.GeneratorType.InitialAttenuation, source: {type: n.Concave, polarity: o.Unipolar, direction: i.Decreasing, palette: s.GeneralController, index: u.NoteOnVelocity}, value: 960, valueSource: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.NoController}, transform: a.Linear}, {id: c.GeneratorType.InitialFilterFc, source: {type: n.Linear, polarity: o.Unipolar, direction: i.Decreasing, palette: s.GeneralController, index: u.NoteOnVelocity}, value: -2400, valueSource: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.NoController}, transform: a.Linear}, {id: c.GeneratorType.VibLFOToPitch, source: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.ChannelPressure}, value: 50, valueSource: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.NoController}, transform: a.Linear}, {id: c.GeneratorType.VibLFOToPitch, source: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.MidiController, index: 1}, value: 50, valueSource: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.NoController}, transform: a.Linear}, {id: c.GeneratorType.InitialAttenuation, source: {type: n.Concave, polarity: o.Unipolar, direction: i.Decreasing, palette: s.MidiController, index: 7}, value: 960, valueSource: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.NoController}, transform: a.Linear}, {id: c.GeneratorType.InitialAttenuation, source: {type: n.Linear, polarity: o.Bipolar, direction: i.Increasing, palette: s.MidiController, index: 10}, value: 1e3, valueSource: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.NoController}, transform: a.Linear}, {id: c.GeneratorType.InitialAttenuation, source: {type: n.Concave, polarity: o.Unipolar, direction: i.Decreasing, palette: s.MidiController, index: 11}, value: 960, valueSource: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.NoController}, transform: a.Linear}, {id: c.GeneratorType.ReverbEffectsSend, source: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.MidiController, index: 91}, value: 200, valueSource: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.NoController}, transform: a.Linear}, {id: c.GeneratorType.ChorusEffectsSend, source: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.MidiController, index: 93}, value: 200, valueSource: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.NoController}, transform: a.Linear}, {id: c.GeneratorType.CoarseTune, source: {type: n.Linear, polarity: o.Bipolar, direction: i.Increasing, palette: s.GeneralController, index: u.PitchWheel}, value: 12700, valueSource: {type: n.Linear, polarity: o.Unipolar, direction: i.Increasing, palette: s.GeneralController, index: u.PitchWheelSensitivity}, transform: a.Linear}];
    }, "./src/types/preset.ts": function(e, t) {
    }, "./src/types/presetData.ts": function(e, t) {
    }, "./src/types/sample.ts": function(e, t, r) {
      var n;
      r.r(t), r.d(t, "SampleType", function() {
        return n;
      }), function(e2) {
        e2[e2.EOS = 0] = "EOS", e2[e2.Mono = 1] = "Mono", e2[e2.Right = 2] = "Right", e2[e2.Left = 4] = "Left", e2[e2.Linked = 8] = "Linked", e2[e2.RomMono = 32769] = "RomMono", e2[e2.RomRight = 32770] = "RomRight", e2[e2.RomLeft = 32772] = "RomLeft", e2[e2.RomLinked = 32776] = "RomLinked";
      }(n || (n = {}));
    }, "./src/types/zone.ts": function(e, t) {
    }, "./src/utils/buffer.ts": function(e, t, r) {
      r.r(t), r.d(t, "getStringFromBuffer", function() {
        return n;
      });
      var n = function(e2) {
        var t2 = new TextDecoder("utf8").decode(e2), r2 = t2.indexOf("\0");
        return (r2 === -1 ? t2 : t2.slice(0, r2)).trim();
      };
    }, "./src/utils/index.ts": function(e, t, r) {
      r.r(t);
      var n = r("./src/utils/buffer.ts");
      r.d(t, "getStringFromBuffer", function() {
        return n.getStringFromBuffer;
      });
      var o = r("./src/utils/memoize.ts");
      r.d(t, "memoize", function() {
        return o.memoize;
      });
    }, "./src/utils/memoize.ts": function(e, t, r) {
      r.r(t), r.d(t, "memoize", function() {
        return n;
      });
      var n = function(e2) {
        var t2 = {};
        return function() {
          for (var r2 = arguments.length, n2 = new Array(r2), o = 0; o < r2; o++)
            n2[o] = arguments[o];
          var i = JSON.stringify(n2);
          if (i in t2)
            return t2[i];
          var s = e2.apply(void 0, n2);
          return t2[i] = s, s;
        };
      };
    }});
  });
});
var __pika_web_default_export_for_treeshaking__ = /* @__PURE__ */ getDefaultExportFromCjs(SoundFont2);
var SoundFont2$1 = SoundFont2.SoundFont2;
export default __pika_web_default_export_for_treeshaking__;
export {SoundFont2$1 as SoundFont2, SoundFont2 as __moduleExports};
