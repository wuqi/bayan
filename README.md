# 巴扬键盘 / Bayan Keyboard

一个基于 Web 的巴扬（俄式键钮手风琴）虚拟键盘，支持加载 SF2 音色库播放 MIDI 音高。

A web-based virtual bayan (Russian button accordion) keyboard with SF2 soundfont playback.

---

## 功能 / Features

- **巴扬键钮布局** — 3×12 半音阶键钮矩阵（C 系统），每列 3 个半音，每行 1 个半音
- **SF2 音色库** — 支持加载外部 SF2 文件（URL 或本地上传），使用 smplr.js + soundfont2.js 解析播放
- **Web Audio API** — 基于 Web Audio 的低延迟音频输出
- **触屏支持** — 针对移动设备优化，强制横屏模式，多点触控
- **键盘快捷键** — 支持电脑键盘演奏
- **手绘风格** — 使用 rough.js 渲染键钮，呈现手绘质感

- **Bayan button layout** — 3×12 chromatic button matrix (C-system), 3 semitones per column, 1 semitone per row
- **SF2 soundfonts** — Load external SF2 files via URL or local file, powered by smplr.js + soundfont2.js
- **Web Audio API** — Low-latency audio output through Web Audio
- **Touch support** — Mobile-optimized, forced landscape mode, multi-touch
- **Keyboard shortcuts** — Play with your computer keyboard
- **Hand-drawn style** — rough.js renders buttons with a sketch-like texture

---

## 使用 / Usage

### 在线使用 / Online
直接在浏览器中打开 `index.html`。侧边控制面板支持：
- 调整音域范围（起始/结束音高）
- 切换 GM 音色（钢琴、手风琴、口琴等 128 种）
- SF2 文件加载（URL 或本地上传）
- 显示/隐藏音高标签

Open `index.html` in a browser. The sidebar panel lets you:
- Adjust the playable range (start/end pitch)
- Switch GM instruments (piano, accordion, harmonica, etc.)
- Load SF2 files (URL or local file)
- Toggle note labels on/off

### SF2 文件加载 / Loading SF2 Files
默认加载裁剪后的 `GeneralUser_GM.sf2`，你也可以在侧边栏输入任意 SF2 文件 URL 或上传本地文件。支持任何标准 SF2 音色库。

The app loads `GeneralUser_GM.sf2` by default. You can enter any SF2 URL or upload a local file. Any standard SF2 soundfont is supported.

---

## 文件结构 / File Structure

```
├── index.html          # 主应用 / Main application
├── smplr.js            # SF2 采样器播放引擎 / SF2 sampler engine
├── soundfont2.js       # SF2 文件解析器 / SF2 file parser
├── rough.js            # 手绘渲染引擎 / Hand-drawn rendering engine
├── trim_sf2.py         # SF2 裁剪工具 / SF2 trimming utility
├── GeneralUser_GM.sf2  # 裁剪后的 GM 音色库 / Trimmed GM soundfont
└── icon.png            # 应用图标 / App icon
```

---

## SF2 裁剪工具 / SF2 Trimming Tool

`trim_sf2.py` 用于将标准 SF2 文件裁剪为 GM 标准，仅保留 Bank 0（128 个旋律音色）和 Bank 128（标准鼓组），大幅减小文件体积。

`trim_sf2.py` trims a standard SF2 file to GM standard, keeping only Bank 0 (128 melodic presets) and Bank 128 (standard drum kit), significantly reducing file size.

```bash
python trim_sf2.py input.sf2 output.sf2
```

---

## 技术栈 / Tech Stack

- **smplr.js** — 浏览器端采样器库，封装 Web Audio API（`@danigb/smplr`）
- **soundfont2.js** — SF2 格式解析器，读取 RIFF 结构、预设、乐器、样本
- **rough.js** — 手绘风格矢量图库
- **Web Audio API** — 低延迟音频播放

---

## License

MIT
