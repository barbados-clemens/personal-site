import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import Tags from "../components/tags"
import "./posts.scss"
import "./../components/layout/layout.scss";

const copyToClipBoard = ($event) => {
  $event.preventDefault();
  if (!$event.currentTarget.dataset.href)
    return;

  const payload = `https://calebukle.com${$event.currentTarget.dataset.href}`

  const listener = (cbe: ClipboardEvent) => {
    let clipboard = cbe.clipboardData || window['clipboardData'];
    clipboard.clearData();
    clipboard.setData('text', payload);
    $event.preventDefault();
    console.log(clipboard);
    console.log(`Copied ${payload}`)
  }

  document.addEventListener("copy", listener, false)
  document.execCommand("copy");
  document.removeEventListener("copy", listener, false);
}

const Template = ({ data }) => {
  const { markdownRemark: post } = data

  const shareTitle = encodeURI(post.frontmatter.title)
  const shareUrl = encodeURI(`https://calebukle.com${post.frontmatter.path}`)

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.frontmatter.description}  url={`https://calebukle.com${post.frontmatter.path}`} />
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
          / <Link to="/blog">Blog</Link> /
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
        <div
          className="post post--body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr />
        <p>
          Got any questions? <a className="twitter-share-button"
                     href={`https://twitter.com/intent/tweet?text=${shareTitle}${encodeURI(' |')}&url=${shareUrl}&via=CU_galaxy`}
                                rel="noreferrer nofollow noopener"
                                target="_blank"
                                aria-label="Ask me a question on Twitter"
        >Tweet me</a>.
        </p>
        <p className="share-sheet">
        Share this article
          <br/>
          <a className="twitter-share-button"
             href={`https://twitter.com/intent/tweet?text=${shareTitle}${encodeURI(' |')}&url=${shareUrl}&via=CU_galaxy`}
             rel="noreferrer nofollow noopener"
             target="_blank"
             aria-label="Share on Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="rgb(29, 161, 242)" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"/></svg>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            rel="noreferrer nofollow noopener"
            target="_blank"
            aria-label="Share on Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="rgb(59,89,152)" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
          </a>
          <a href={`mailto:?subject=${post.frontmatter.title}&body=https://calebukle.com${post.frontmatter.path}`}
             rel="noreferrer nofollow noopener"
             target="_blank"
             aria-label="Share via Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="tomato" viewBox="0 0 512 512"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>
          </a>
          {/*<a onClick={copyToClipBoard}*/}
          {/*  data-href={post.frontmatter.path}*/}
          {/*  aria-label="copy to clipboard"*/}
          {/*>*/}
          {/*  <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="36" fill="black" viewBox="0 0 448 512"><path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/></svg>*/}
          {/*</a>*/}
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
