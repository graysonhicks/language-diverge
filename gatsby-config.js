module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`
  },
  plugins: [
    {
      resolve: "gatsby-source-mongodb",
      options: {
        dbName: "cloud",
        collection: "documents",
        server: {
          address: "ds161304.mlab.com",
          port: "61304"
        },
        auth: {
          user: "admin",
          password: "12345"
        }
      }
    },
    "gatsby-plugin-react-helmet"
  ]
}
