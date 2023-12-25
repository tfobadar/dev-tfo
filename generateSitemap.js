const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const axios = require('axios');
const fs = require('fs');

let preview_token = process.env.STORYBLOK_ACCESS_TOKEN;
let per_page = 100;
let page = 1;
let all_links = [];
const EXCLUDE_CATEGORIES_PATH = 'insights/categories';
const EXCLUDE_GLOBAL_PATH = 'global/';
const URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tfoweb-v2.vercel.app';

// Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
axios
  .get(
    `https://api.storyblok.com/v1/cdn/links?version=published&token=${preview_token}&per_page=${per_page}&page=${page}`,
  )
  .then((res) => {
    // push all links into our all_links variable
    Object.keys(res.data.links).forEach((key) => {
      if (
        !res.data.links[key].is_folder &&
        !res.data.links[key].slug.includes(EXCLUDE_CATEGORIES_PATH) &&
        !res.data.links[key].slug.includes(EXCLUDE_GLOBAL_PATH)
      ) {
        all_links.push(res.data.links[key]);
      }
    });
    // Check if there are more pages available otherwise thats all to do.
    const total = res.headers.total;
    const maxPage = Math.ceil(total / per_page);
    if (maxPage <= 1) {
      return;
    }

    // Since we know the total we now can pregenerate all requests we need to get all Links
    let contentRequests = [];

    // we will start with page two since the first one is already done.
    for (let page = 2; page <= maxPage; page++) {
      contentRequests.push(
        axios.get(
          `https://api.storyblok.com/v1/cdn/links?version=published&token=${preview_token}&per_page=${per_page}&page=${page}`,
        ),
      );
    }

    // Axios allows us to exectue all requests using axios.spread. We will then push our links into our all_links variable.
    axios.all(contentRequests).then(
      axios.spread((...responses) => {
        responses.forEach((response) => {
          Object.keys(response.data.links).forEach((key) => {
            if (
              !res.data.links[key].is_folder &&
              !res.data.links[key].slug.includes(EXCLUDE_CATEGORIES_PATH) &&
              !res.data.links[key].slug.includes(EXCLUDE_GLOBAL_PATH)
            ) {
              all_links.push(response.data.links[key]);
            }
          });
        });

        let sitemap_entries = all_links.map((link) => {
          // you got access to every property of those links here. Note the \n I've added to format it in the output - you don't need that in the real XML.
          return `\n<url>\n\t<loc>${URL}/en/${
            link.slug
          }</loc>\n\t<lastmod>${new Date().toISOString()}</lastmod>\n\t<changefreq>weekly</changefreq>\n</url>\n<url>\n\t<loc>${URL}/ar/${
            link.slug
          }</loc>\n\t<lastmod>${new Date().toISOString()}</lastmod>\n\t<changefreq>weekly</changefreq>\n</url>`;
        });

        // the actual sitemap with all it's entries.
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
	xmlns:xhtml="https://www.w3.org/1999/xhtml"
	xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
	xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
	xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">${sitemap_entries.join(
    '',
  )}
\n<url>\n\t<loc>${URL}/en</loc>\n\t<lastmod>${new Date().toISOString()}</lastmod>\n\t<changefreq>weekly</changefreq>\n</url>
\n<url>\n\t<loc>${URL}/ar</loc>\n\t<lastmod>${new Date().toISOString()}</lastmod>\n\t<changefreq>weekly</changefreq>\n</url>
\n<url>\n\t<loc>${URL}/en/insights</loc>\n\t<lastmod>${new Date().toISOString()}</lastmod>\n\t<changefreq>weekly</changefreq>\n</url>
\n<url>\n\t<loc>${URL}/ar/insights</loc>\n\t<lastmod>${new Date().toISOString()}</lastmod>\n\t<changefreq>weekly</changefreq>\n</url>
\n<url>\n\t<loc>${URL}/ar/sitemap</loc>\n\t<lastmod>${new Date().toISOString()}</lastmod>\n\t<changefreq>weekly</changefreq>\n</url>
\n<url>\n\t<loc>${URL}/en/sitemap</loc>\n\t<lastmod>${new Date().toISOString()}</lastmod>\n\t<changefreq>weekly</changefreq>\n</url>
</urlset>`;

        fs.writeFile('public/sitemap.xml', sitemap, (err) => {
          if (err) {
            // @ts-ignore
            // console.error(err);
          }
          // file written successfully
          // @ts-ignore
          // console.log('Successfully generated sitemap.xml');
        });
      }),
    );
  });
