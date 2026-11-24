"""Original royalty-free background track for the reels.
Usage: python music.py <seconds> <out.wav> [variant]
variant "fs" = bright (C major, 104 bpm); "sd" = warmer (A minor, 98 bpm).
"""
import sys, wave
import numpy as np

SR = 44100
dur = float(sys.argv[1]); out = sys.argv[2]; variant = sys.argv[3] if len(sys.argv) > 3 else 'fs'
rng = np.random.default_rng(7)

def midi(n): return 440.0 * 2 ** ((n - 69) / 12)

if variant == 'fs':
    bpm = 104
    prog = [[48, 55, 64, 67, 71], [43, 55, 62, 67, 71], [45, 57, 64, 67, 72], [41, 57, 64, 65, 69]]  # Cmaj7 G Am7 Fmaj7
else:
    bpm = 98
    prog = [[45, 57, 60, 64, 67], [41, 57, 60, 64, 65], [48, 55, 60, 64, 67], [43, 55, 59, 62, 67]]  # Am7 Fmaj7 C G

beat = 60 / bpm; bar = 4 * beat
N = int(dur * SR); t = np.arange(N) / SR
mix = np.zeros(N)

def add(sig, start):
    i = int(start * SR)
    if i >= N: return
    j = min(N, i + len(sig)); mix[i:j] += sig[: j - i]

def lowpass(x, a):
    y = np.empty_like(x); acc = 0.0
    for k in range(len(x)):
        acc += a * (x[k] - acc); y[k] = acc
    return y

nbars = int(np.ceil(dur / bar))
for b in range(nbars):
    ch = prog[b % 4]; t0 = b * bar
    # pad: detuned triangles, slow attack/release
    L = int(bar * SR); tt = np.arange(L) / SR
    env = np.minimum(1, tt / 0.35) * np.minimum(1, (bar - tt) / 0.4)
    pad = sum(np.abs(((tt * midi(n) * d) % 1) - .5) * 4 - 1 for n in ch[1:] for d in (1, 1.004))
    add(0.035 * env * pad, t0)
    # bass on beats 1 and 3 (+ pickup)
    for k, ln in ((0, 1.6), (2, 1.2), (3.5, 0.45)):
        Lb = int(ln * beat * SR); tb = np.arange(Lb) / SR
        f = midi(ch[0] - 12 if ch[0] > 44 else ch[0])
        s = (np.sin(2 * np.pi * f * tb) + .3 * np.sin(4 * np.pi * f * tb)) * np.exp(-tb * 2.2) * np.minimum(1, tb / .01)
        add(0.22 * s, t0 + k * beat)
    # pluck arpeggio in eighths
    pattern = [2, 3, 4, 3, 2, 4, 3, 4]
    for k, p in enumerate(pattern):
        f = midi(ch[p] + 12); Lp = int(0.5 * SR); tp = np.arange(Lp) / SR
        s = (np.sin(2 * np.pi * f * tp) + .25 * np.sin(6 * np.pi * f * tp)) * np.exp(-tp * 9)
        add(0.07 * s, t0 + k * beat / 2)
    if b == 0: continue  # intro bar: no drums
    for k in range(4):  # kick four-on-the-floor, light
        Lk = int(.25 * SR); tk = np.arange(Lk) / SR
        f = 50 + 90 * np.exp(-tk * 30)
        add(0.5 * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tk * 14), t0 + k * beat)
    for k in range(8):  # hats on offbeats
        if k % 2 == 1:
            Lh = int(.06 * SR); n = rng.standard_normal(Lh)
            n = n - lowpass(n, .5)
            add(0.05 * n * np.exp(-np.arange(Lh) / SR * 60), t0 + k * beat / 2)
    for k in (1, 3):  # soft clap
        Lc = int(.15 * SR); n = rng.standard_normal(Lc)
        add(0.06 * lowpass(n, .3) * np.exp(-np.arange(Lc) / SR * 25), t0 + k * beat)

# fades
fi = int(.4 * SR); fo = int(1.8 * SR)
mix[:fi] *= np.linspace(0, 1, fi); mix[-fo:] *= np.linspace(1, 0, fo)
mix = np.tanh(mix * 1.3) / np.max(np.abs(np.tanh(mix * 1.3))) * 0.8
st = np.stack([mix, np.roll(mix, int(.012 * SR)) * .97 + mix * .03], 1)
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype('<i2').tobytes())
print(out, dur)
