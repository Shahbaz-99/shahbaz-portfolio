const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/shahbaz-portfolio" : ""; // repo name; blank on local dev

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;