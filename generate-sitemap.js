// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://yourdomain.com' }); // Change to your domain
  const writeStream = createWriteStream(resolve(__dirname, 'public', 'sitemap.xml'));

  sitemap.pipe(writeStream);

  // Add your static routes here
  const routes = [
    '/',
    '/#home',
    '/#features',
    '/#about',
    '/#missionvision',
    '/#services',
    '/#blog',
    '/#aviationform',
    '/blog',
  ];

  routes.forEach(route => {
    sitemap.write({ url: route, changefreq: 'monthly', priority: 0.8 });
  });

  sitemap.end();

  await streamToPromise(sitemap);
  console.log('✅ sitemap.xml generated!');
})();
