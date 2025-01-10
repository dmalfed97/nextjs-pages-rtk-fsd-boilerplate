/** @type {import('next-i18next').UserConfig} */
module.exports = {
  debug: process.env.NODE_ENV === 'development',

  i18n: {
    defaultLocale: 'en-GB',
    locales: ['en-GB', 'ru-RU'],
  },

  pluralSeparator: '_',

  reloadOnPrerender: process.env.NODE_ENV === 'development',
  trailingSlash: true,
}
