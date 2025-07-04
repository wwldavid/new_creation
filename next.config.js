/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["pub-dfa54c71eca7429aa729b20255003b44.r2.dev"],
    // 如果你不想用 next/image 优化，也可以加：
    // unoptimized: true,
  },
};

module.exports = nextConfig;
