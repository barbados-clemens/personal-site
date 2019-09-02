import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import Tags from "../components/tags"


const AboutPage = () => {
  return (
    <Layout>
      <SEO title="About"/>
      <h1>About Caleb</h1>

      <h2>Projects</h2>
      <p>
        You can usually find out what I'm tinkering with by checking out my{" "}
        <a
          href="http://gitlab.com/caleb-ukle"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gitlab
        </a>{" "}
        profile. You can also find me on{" "}
        <a
          href="http://twitter.com/cu_galaxy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        .
      </p>
      <p>
        If you have any questions or want to get in touch with me, then head
        over to the <Link to="/contact">contact</Link> page and leave me a
        message.
      </p>
      <h3>Panorama</h3>
      <p>
      <Tags tags={["Angular", ".NET", "SQL Server"]}/>
      </p>
      <p>
        This is my current on going project at work. This project is a web app built with Angular, .NET, and SQL
        Server.
        The goal of this web app is an internal tool aimed at being the <em>great aggregator</em> of our client data.
      </p>
      <p>
        Some features include:
      </p>
      <ul>
        <li>Custom map components to visual customer data</li>
        <li>Integrating with various enterprise applications</li>
        <li>Providing cross domain metric reports</li>
      </ul>
      <p>
        This application is a never ending application as it is always being enhanced with user feedback and feature
        sets. I consider it one of my pride and joys as I have built the entire frontend myself, with some libraries,
        and aided in building the backend as well.
      </p>
      <p>
        Since this application is internal and contains sensitive customer data, please reach out to me via my <Link
        to="/contact">contact form</Link> to learn more.
      </p>

      <h3>Drag Draft</h3>
      <p>
        <Tags tags={["Angular", "Firebase"]}/>
      </p>
      <p>
        Drag draft is a fantasy drafting application for <a href="http://www.vh1.com/shows/rupauls-drag-race"
                                                            target="_blank" rel="noreferrer noopener">RuPaul's Drag
        Race</a>. this web app is built with Angular and Firebase.
        The web app came as most ideas start; talking about an existing app, proclaiming <em>"I could do that"</em>,
        buying a url, and spending the next 24 hours coding up an initial app.
      </p>
      <p>
        This was the first time I have used firebase so most of that time was learning about the features and abilities
        of firebase.
      </p>
      <p>
        <a href="https://gitlab.com/caleb-ukle/drag-draft" target="_blank" rel="noreferrer noopener">View Code
          Repository</a>
      </p>
      <h2>Experience</h2>
      <p>
        My educational background is in engineering. While I currently don't do any electrical engineering work, I use
        my problem solving skills every day.
      </p>
      <p>
        Technologies I'm familiar with are:
      </p>
      <ul>
        <li>
          Javascript/Typescript
          <ul>
            <li>Specifically Angular</li>
          </ul>
        </li>
        <li>.NET</li>
        <li>SQL Server</li>
        <li>Docker</li>
      </ul>

      <p>
        I have also spent time with various other technologies, just not as proficient with.
      </p>
    </Layout>
  )
}

export default AboutPage
