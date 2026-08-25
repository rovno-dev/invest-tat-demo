import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" },],
  },
  async rewrites() {
    // Normalize API base URL - always ensure it has a protocol
    let apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    if (!/^https?:\/\//i.test(apiBase)) {
      apiBase = `http://${apiBase}`;
    }

    return [
      {
        source: "/api/:path*",
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
