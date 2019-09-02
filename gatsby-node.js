/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = ({actions, graphql}) => {
  const { createPage } = actions;

  const postTemplate = path.resolve('src/templates/post.tsx');

  return graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { publish: { eq: true } } }) {
        edges {
          node {
            id
            frontmatter {
              title
              path
              date(formatString: "MMMM DD, YYYY")
              tags
              description
            }
            timeToRead
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      console.error(res.errors)
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      })
    })
  })
}
