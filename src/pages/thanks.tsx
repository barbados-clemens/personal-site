import React from "react"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <section
      style={{
        display: "grid",
        height: "85vh",
        placeItems: "center",
      }}
    >
      <div className="content">
        <h1>Thank you!</h1>
        <p>I've got your info, and will be in contact! Have a nice day 😃</p>
      </div>
    </section>
  </Layout>
)
