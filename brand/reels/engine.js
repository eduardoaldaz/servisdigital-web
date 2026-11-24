// Deterministic reel timeline. window.render(t) draws the frame at t seconds.
// <section class="s" data-start="0" data-end="3"> … elements with data-in="0.2" (sec after scene start)
// and optional data-fx="up|pop|left|fade|type|count".
(function () {
  const ease = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
  const scenes = [...document.querySelectorAll('.s')].map((el) => ({
    el,
    start: +el.dataset.start,
    end: +el.dataset.end,
    items: [...el.querySelectorAll('[data-in]')].map((n) => ({
      n,
      at: +n.dataset.in,
      fx: n.dataset.fx || 'up',
      dur: +(n.dataset.dur || 0.55),
      text: n.dataset.fx === 'type' ? n.textContent : null,
    })),
  }));
  const total = Math.max(...scenes.map((s) => s.end));
  window.TOTAL = total;
  const bar = document.querySelector('.bar i');

  window.render = function (t) {
    if (bar) bar.style.width = (Math.min(t / total, 1) * 100).toFixed(3) + '%';
    for (const s of scenes) {
      const on = t >= s.start && t < s.end;
      s.el.style.display = on ? '' : 'none';
      if (!on) continue;
      const local = t - s.start;
      const out = s.end - t; // fade the scene out in its last 0.3 s (not the final scene)
      const last = s.end >= total;
      const so = last ? 1 : ease(out / 0.3);
      s.el.style.opacity = so;
      s.el.style.transform = last ? '' : `translateY(${(-24 * (1 - so)).toFixed(2)}px)`;
      for (const it of s.items) {
        const p = ease((local - it.at) / it.dur);
        const st = it.n.style;
        if (it.fx === 'type') {
          const n = Math.round(it.text.length * Math.min(Math.max((local - it.at) / it.dur, 0), 1));
          it.n.textContent = it.text.slice(0, n);
          st.opacity = local >= it.at ? 1 : 0;
          continue;
        }
        st.opacity = p;
        if (it.fx === 'up') st.transform = `translateY(${(60 * (1 - p)).toFixed(2)}px)`;
        else if (it.fx === 'left') st.transform = `translateX(${(-80 * (1 - p)).toFixed(2)}px)`;
        else if (it.fx === 'pop') st.transform = `scale(${(0.6 + 0.4 * p + 0.06 * Math.sin(p * Math.PI)).toFixed(3)})`;
        else if (it.fx === 'grow') st.transform = `scaleX(${p.toFixed(3)})`;
      }
    }
  };
  window.render(0);
})();
