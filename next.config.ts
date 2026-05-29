import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dash.grabpay.id",
        port: "3443",
        pathname: "/staging/vecsys/api/public/**",
      },
    ],
  },
};

export default nextConfig;
