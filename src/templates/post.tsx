import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import Tags from "../components/tags"
import "./posts.scss"
import "./../components/layout/layout.scss";

const Template = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.frontmatter.description} />
      <div className="post">
        <div
          className="post post--header"
          style={{
            padding: `32px 0 64px 0px`,
          }}
        >
          <Link
            style={{
              paddingLeft: "10px",
            }}
            to="/"
          >
            Home
          </Link>{" "}
          / <Link to="/blog">Blogs</Link> /
          <h1 className="post post--title"> {post.frontmatter.title}</h1>
          <div className="post post__metadata">
            <div className="item">
              <div className="post__metadata--title">Author</div>
              Caleb Ukle
            </div>
            <div>
              <div className="post__metadata--title">Published</div>
              {post.frontmatter.date}
            </div>
            <div>
              <div className="post__metadata--title">Time to Read</div>
              {post.timeToRead > 1
                ? `${post.timeToRead} mins`
                : `${post.timeToRead} min`}
            </div>
          </div>
          <Tags tags={post.frontmatter.tags} />
        </div>
        <p className="post post--desc">{post.frontmatter.description}</p>
        <p
          className="post post--body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr />
        <p>
          Got any questions about this article or want to tell me how much it
          sucked? Tweet me{" "}
          <a
            href="http://twitter.com/cu_galaxy"
            target="_blank"
            rel="noopener noreferrer"
          >
            @cu_galaxy
          </a>
        </p>
      </div>
    </Layout>
  )
}

export default Template

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        description
      }
      timeToRead
    }
  }
`
