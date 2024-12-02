import type { NextConfig } from "next";
import { withYak } from "next-yak/withYak";


const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
};

export default withYak(nextConfig);
