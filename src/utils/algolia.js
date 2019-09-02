const postQuery = `{
  posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/posts/"}, frontmatter: {publish: {eq: true}}}) {
    edges {
      node {
        id
        frontmatter {
          title
          path
          description
          tags
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
}
`

const flatten = arr => arr.map(({node: {frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }));

const settings = { attributesToSnippet: [`excerpt: 20`]};

const queries = [
  {
    query: postQuery,
    transformer: ({data}) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  }
]

module.exports = queries;

