import type { NextConfig } from "next";

const CHESS_HOST = "chess.lakshya.space";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Serve the static 3D chess game at the root of chess.lakshya.space.
      // Its assets use <base href="/chess/">, so they load from /chess/* (static files)
      // on this host without any further rewrites.
      {
        source: "/",
        has: [{ type: "host", value: CHESS_HOST }],
        destination: "/chess/index.html",
      },
    ];
  },
};

export default nextConfig;
