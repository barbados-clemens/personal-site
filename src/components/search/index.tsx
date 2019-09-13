import React from "react"
import { connectHighlight, Hits, InstantSearch, PoweredBy, SearchBox } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import Tags from "../tags"
import { Link } from "gatsby"

import "../card/card.scss"

import "./search.scss"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || "",
  process.env.GATSBY_ALGOLIA_SEARCH_KEY || "",
)


const Search = () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="Posts"
      stalledSearchDelay={2000}
    >
      <SearchBox autoFocus={true}/>
      <Hits hitComponent={Hit}/>
      <a
        href="https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=calebukle.com&utm_campaign=customlink"
        target="_blank"
        rel="noreferrer nofollow noopener"
        className="algolia-insta-search">
        Search by Algolia
        <br/>
        <svg viewBox="0 0 50 50" width="30" height="auto" xmlns="http://www.w3.org/2000/svg">
          <g fill="none">
            <path
              d="M6.502 0h36.379c3.58 0 6.502 2.92 6.502 6.529v36.53c0 3.596-2.908 6.528-6.502 6.528H6.502C2.922 49.587 0 46.669 0 43.06V6.512C0 2.92 2.905 0 6.502 0"
              fill="#5468FF"/>
            <path
              d="M29.837 11.07v-1.7c0-1.189-.96-2.152-2.144-2.151h-4.998a2.148 2.148 0 0 0-2.144 2.15v1.746c0 .195.18.33.375.285a15.564 15.564 0 0 1 4.35-.615 15.8 15.8 0 0 1 4.201.57.29.29 0 0 0 .36-.285M16.14 13.295l-.854-.857a2.138 2.138 0 0 0-3.03 0l-1.021 1.022a2.147 2.147 0 0 0 0 3.04l.84.843c.135.134.33.103.45-.031a16.46 16.46 0 0 1 1.635-1.926 15.523 15.523 0 0 1 1.935-1.653c.15-.09.164-.302.045-.438m9.12 5.399v7.355c0 .21.227.362.42.256l6.513-3.384c.148-.074.193-.256.12-.405a8.097 8.097 0 0 0-6.752-4.107c-.15 0-.3.12-.3.285m0 17.719c-5.43 0-9.842-4.424-9.842-9.868s4.412-9.866 9.842-9.866c5.432 0 9.842 4.422 9.842 9.866s-4.395 9.868-9.842 9.868m0-23.884c-7.712 0-13.967 6.272-13.967 14.016 0 7.746 6.255 14.004 13.967 14.004 7.712 0 13.967-6.273 13.967-14.018 0-7.746-6.24-14.002-13.967-14.002"
              fill="#FFF"/>
          </g>
        </svg>
      </a>
    </InstantSearch>
  )
}

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedDescHit = highlight({
    highlightProperty: "_highlightResult",
    attribute: "description",
    hit,
  })
  const parsedTitleHit = highlight({
    highlightProperty: "_highlightResult",
    attribute: "title",
    hit,
  })
  const input = document.querySelector("input")

  if (!!input && !!hit && !!input.value) {
    return (
      <Link className="card search-card" to={hit.path}>
        <span className="card--subtitle">{hit.date}</span>
        <h3 className="card--title" key={hit.id}>
          {parsedTitleHit.map(({ isHighlighted, value }, idx) =>
            isHighlighted ? <mark key={idx + hit.id}>{value}</mark> : value,
          )}
        </h3>
        <p className="card--body">
          {parsedDescHit.map(({ isHighlighted, value }, idx) =>
            isHighlighted ? <mark key={idx + hit.objectID}>{value}</mark> : value,
          )}
        </p>
        <div className="card--spacer"></div>
        <Tags tags={hit.tags}/>
      </Link>
    )
  }

  if (!hit && !!input && input.value.length > 1) {
    return <span>No Results 🙁</span>
  }

  return null
})

const Hit = ({ hit }) => {
  return (
    <CustomHighlight attribute="description" hit={hit}/>
  )
}

export default Search
