module.exports = {
    siteUrl: 'https://specialistplus.com.au',
    generateRobotsTxt: true,
    exclude: [], // No exclusions, include all pages
    additionalPaths: async (config) => [
      { loc: '/doctors/poh-yong', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/dion-suyapto', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/arun-gupta', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/joshua-kartika', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/bill-papps', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/gilles-hammond', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/ishita-gupta', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/aiden-tieu', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/cecilia-yong', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/devinder-raju', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/kristy-yang', changefreq: 'daily', priority: 0.7 },
      { loc: '/doctors/katherine-murray-smith', changefreq: 'daily', priority: 0.7 },
    ],
  };