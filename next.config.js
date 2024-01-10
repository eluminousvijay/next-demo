/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  i18n: {
    locales: ["en-US", "fr", "nl-NL", "nl-BE"],
    defaultLocale: "en-US",

    domains: [
      {
        domain: "localhost",
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
};
