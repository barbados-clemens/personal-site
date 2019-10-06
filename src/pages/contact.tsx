import React, { Component } from "react"
import { navigate } from "gatsby-link"
import Layout from "../components/layout"
import SEO from "../components/seo"
import './main.scss';
import { getFirebaseInstance } from "../utils/firebase"
import { Debugger } from "inspector"

export default class Contact extends Component {
  fireFunctions: any;
  fireAnalytics: any;

  constructor(props) {
    super(props)
    this.state = { isFocus: false, isSubmit: false }
  }

  handleChange = e => {

    if (this.state.isFocus) {
      this.fireAnalytics.logEvent('contact_form', {
        isFocus: true
      })
    }


    this.setState({
      isFocus: true,
      ...this.state
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    console.log(form);
    const data = new FormData(form)

    const honeyPot = form[1].value;
    const name = form[2].value;
    const email = form[3].value;
    const msg = form[4].value;

    data.append('form-name', form.getAttribute('name'));

    if (!!this.fireAnalytics){
      this.fireAnalytics.logEvent('contact_form', {
        isSubmit: true
      });
    }

    if (!!this.fireFunctions && !honeyPot) {
      const callable = this.fireFunctions.httpsCallable("contactForm");

      callable({
        name,
        email,
        msg,
      })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }

    fetch("/", {
      method: "POST",
      body: data
    })
      .then(() => {
        this.setState({
          isSubmit: true,
          isFocus: true,
          ...this.state
        })
        navigate(form.getAttribute("action"))
      })
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
