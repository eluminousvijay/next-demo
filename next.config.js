/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  i18n: {
    locales: ["en-US", "fr", "nl-NL", "nl-BE"],
    defaultLocale: "en-US",

    domains: [
      {
        domain: "kra.betaeserver.com",
        defaultLocale: "en-US",
      },
      {
        domain: "example.fr",
        defaultLocale: "fr",
      },
      {
        domain: "example.nl",
        defaultLocale: "nl-NL",
        locales: ["nl-BE"],
      },
    ],
  },
  images: {
    domains: [
      "kra.betaeserver.com",
      "https://developervijay.vercel.app",
      "i.pinimg.com",
    ],
  },
};
