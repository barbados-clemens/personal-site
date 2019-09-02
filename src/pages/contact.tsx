import React from "react"
import { navigate } from "gatsby-link"
import Layout from "../components/layout"
import SEO from "../components/seo"
import './main.scss';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <SEO title="Contact" />
        <form
          name="contact"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </div>
          <input
            aria-label="Input your name"
            className="input"
            type={"text"}
            name={"name"}
            onChange={this.handleChange}
            id={"name"}
            required={true}
            placeholder="Your Name"
          />
          <input
            aria-label="Input your email"
            className="input"
            type={"email"}
            name={"email"}
            onChange={this.handleChange}
            id={"email"}
            required={true}
            placeholder="Your email"
          />
          <textarea
            aria-label="Input your message"
            className="textarea"
            name={"message"}
            onChange={this.handleChange}
            id={"message"}
            required={false}
            placeholder="Your Message"
            rows={10}
          />

          <button aria-label="Submit form" type="submit">
            Send
          </button>
        </form>
      </Layout>
    )
  }
}
