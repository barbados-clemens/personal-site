import React from "react"
import { navigate } from "gatsby-link"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default class Newsletter extends React.Component {
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
      <form
      style={{
        display: 'block'
      }}
        name="newsletter"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        <input type="hidden" name="form-name" value="newsletter" />
        <div hidden>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </div>
        <input
          style={{
            marginBottom: '1rem'
          }}
          aria-label="input your email"
          className="input"
          type={"email"}
          name={"email"}
          onChange={this.handleChange}
          id={"email"}
          required={true}
          placeholder="Your email"
        />
        <button aria-label="Submit form" type="submit">
          Sign Up
        </button>
        <small>
          I only plan on sending around 12 emails a year, once a month if there
          are any new blog posts 😃
        </small>
      </form>
    )
  }
}
