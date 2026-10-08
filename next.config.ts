import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project images are served from the Supabase "portfolio" storage bucket.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
