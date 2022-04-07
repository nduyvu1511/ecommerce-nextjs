/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config")
const withImages = require("next-images")

module.exports = withImages({
  reactStrictMode: true,
  i18n,
  images: {
    disableStaticImages: true,
    domains: ["erp.womart.vn"],
  },
})
