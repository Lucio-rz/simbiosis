import { MetadataRoute } from 'next';

const BASE_URL = 'https://simbiosis-woad.vercel.app'; // ← cambiá por tu URL real

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
