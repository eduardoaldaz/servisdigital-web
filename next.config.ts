import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The blog reads MDX files from disk at build time; ship them with the server output.
  outputFileTracingIncludes: { '/blog/**': ['./src/content/blog/**'] },
};

export default nextConfig;
