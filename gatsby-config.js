module.exports = {
  siteMetadata: {
    title: `China King Oakville`,
    description: `Fast and affordable Chinese food located in Oakville, MO.`,
    author: `China King Oakville`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      // TODO: Swap out icon
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `china-king-oakville`,
        short_name: `china-king`,
        start_url: `/`,
        background_color: `#9a322d`,
        theme_color: `#9a322d`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
