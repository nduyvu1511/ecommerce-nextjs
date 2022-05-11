/** @type {import('next').NextConfig} */
const withImages = require("next-images")
const { i18n } = require("./i18n.config")

module.exports = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ["demo.satavan.com", "cf.shopee.vn"],
  },
  i18n,
})
