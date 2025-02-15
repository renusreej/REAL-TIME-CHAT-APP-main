module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled:true,
      origin: ["*"], // Allow frontend origin
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers:["Content-Type", "Authorization"], // Allow identifier
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];  