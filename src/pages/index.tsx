import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./main.scss"
import Card from "../components/card"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" description="Hey, my name is Caleb"/>
      <section id="greeting" className="greeting-container">
        <h1>👋 Hi, my name is Caleb</h1>
        <p>
          I'm a software developer, technology enthusiast, and simply enjoy learning new things.
        </p>

        <p>
          I've been a professional software developer since 2017, right before
          starting my career, I graduated with a B.S. in Electrical Engineering.
          I've been a problem solver for as long as I can remember, and I am
          always trying to find new things to learn.
        </p>
        <p>Learn more <Link to="/about">about me</Link></p>
      </section>

      <section id="blogs">
        <h2 style={{
          textAlign: 'center',
        }}>Here are some recent things I've written</h2>
        <div className="card-container">
          {data.allMarkdownRemark.edges.map(({ node: post }) => (
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
        <p style={{
          textAlign: 'center'
        }}>
        <Link to="/blog">See more posts</Link>
        </p>
      </section>
    </Layout>
  )
}

export const topTenPostsQuery = graphql`
    query TopTenBlogs {
        allMarkdownRemark(
            limit: 4
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
`

export default IndexPage
