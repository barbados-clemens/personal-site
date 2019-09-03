import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Search from '../components/search';
import Card from '../components/card';

const Blog = () => {
  const topTen = useStaticQuery(graphql`
  query {
    allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { publish: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            tags
            description
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`);

  const { allMarkdownRemark } = topTen;

  return (
    <Layout>
      <SEO title="Blog" description="Content Created by Caleb" />
      <h1>Recent Posts</h1>
      <div className="card-container" style={{margin: 0, paddingBottom: '1.45rem'}}>
      {allMarkdownRemark.edges.map(({ node: post }) => (
        <Card
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        url={post.frontmatter.path}
        date={post.frontmatter.date}
        description={post.frontmatter.description}
        key={post.id}
        />
        ))}
        </div>
        <h3 style={{textAlign: 'center'}}>Didn't find what you're looking for?</h3>
      <Search />
    </Layout>
  )
}

export default Blog;
