/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Remove or update unsupported keys.
      // For example, remove appDir if your version does not support it.
      // appDir: true,
    },
    images: {
      // Replace domains with remotePatterns
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.ibb.co",
        },
      ],
    },
  };
  
  export default nextConfig;
  