import React, { Component } from "react"
import { navigate } from "gatsby-link"
import Layout from "../components/layout"
import SEO from "../components/seo"
import './main.scss';
import { getFirebaseInstance } from "../utils/firebase"

export default class Contact extends Component {
  fireFunctions: any;
  fireAnalytics: any;

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
    const data = new FormData(form)

    data.append('form-name', form.getAttribute('name'));

    if (!!this.fireAnalytics){
      this.fireAnalytics.logEvent('contact_form', {
        ...this.state
      });
    }
    if (!!this.fireFunctions) {
      const callable = this.fireFunctions.httpsCallable("contact_form");

      callable({
        created_at: new Date(),
        ...this.state
      })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }

    fetch("/", {
      method: "POST",
      body: data
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  componentDidMount(): void {
    const lazyApp = import('firebase/app');
    const lazyFunctions = import('firebase/functions');
    const lazyAnalytics = import('firebase/analytics');

    Promise.all([lazyApp, lazyFunctions, lazyAnalytics])
      .then(([firebase]) => {
        this.fireFunctions = getFirebaseInstance(firebase).functions();
        this.fireAnalytics = getFirebaseInstance(firebase).analytics();
      })
      .catch(err => {
        console.warn('issue loading module(s)', err)
      })
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
