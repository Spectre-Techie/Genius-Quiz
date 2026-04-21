/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
	// Keep separate artifact directories so running dev and build workflows
	// from different terminals cannot corrupt each other's chunk caches.
	distDir: isDev ? ".next-dev" : ".next",
};

export default nextConfig;
