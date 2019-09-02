import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./header.scss"

const Header = ({ siteTitle }) => (
  <header role="navigation">
    <div
      className="nav-container"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1rem 1.0875rem`,
      }}
    >
        <Link
        className="nav-link"
        to="/"
        activeClassName="active"
        >
          Home
        </Link>
        <Link
        className="nav-link" activeClassName="active"
        to="/blog">
          Blog
        </Link>
        <Link
        className="nav-link" activeClassName="active"
        to="/contact">
          Contact
        </Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
