// Usage: node record.mjs <page.html> <out.mp4> [fps]
// Renders window.render(t) frame by frame with system Chrome, then encodes with ffmpeg.
import puppeteer from 'puppeteer-core';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const [page, out, fpsArg] = process.argv.slice(2);
const fps = +(fpsArg || 30);
const dir = mkdtempSync(join(tmpdir(), 'reel-'));
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--hide-scrollbars'],
});
const tab = await browser.newPage();
await tab.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
await tab.goto('file://' + resolve(page), { waitUntil: 'networkidle0' });
await tab.evaluate(() => document.fonts.ready);
const total = await tab.evaluate(() => window.TOTAL);
const frames = Math.round(total * fps);
for (let i = 0; i < frames; i++) {
  await tab.evaluate((t) => window.render(t), i / fps);
  await tab.screenshot({ path: join(dir, `f${String(i).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 92 });
}
await browser.close();
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', join(dir, 'f%05d.jpg'),
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-crf', '18', '-movflags', '+faststart', resolve(out)]);
rmSync(dir, { recursive: true });
console.log(`${out}: ${frames} frames, ${total}s`);
