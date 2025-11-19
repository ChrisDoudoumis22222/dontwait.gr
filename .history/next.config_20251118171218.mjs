// next.config.js (ESM)

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
    // Αν θέλεις να απενεργοποιήσεις τον optimizer:
    // unoptimized: true,
  },
};

export default nextConfig;
