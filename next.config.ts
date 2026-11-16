import type { NextConfig } from 'next';

// Static export: the site is plain HTML/CSS/JS served by GitHub Pages (see .github/workflows/pages.yml).
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Folder URLs (/contacto/ → contacto/index.html), which is how GitHub Pages serves pages.
  trailingSlash: true,
};

export default nextConfig;
