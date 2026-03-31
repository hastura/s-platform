import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/s-platform",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
