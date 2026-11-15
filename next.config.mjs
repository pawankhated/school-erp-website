/** Static site (any host / CDN). Plans and company details load from the API at runtime. */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
