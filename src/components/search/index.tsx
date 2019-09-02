import React from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectHighlight,
  PoweredBy
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import Tags from '../tags';
import { Link } from 'gatsby';
import '../card/card.scss';

import './search.scss';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_SEARCH_KEY || ''
);


const Search = () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="Posts"
      stalledSearchDelay={2000}
    >
      <SearchBox autoFocus={true} showLoadingIndicator={true} />
      <Hits hitComponent={Hit} />
      <PoweredBy/>
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
  const input = document.querySelector('input');

  if (!!input && !!hit && !!input.value) {
    return (
      <Link className="card search-card" to={hit.path}>
        <span className="card--subtitle">{hit.date}</span>
        <h3 className="card--title" key={hit.id}>
          {parsedTitleHit.map(({ isHighlighted, value }, idx) =>
            isHighlighted ? <mark key={idx + hit.id}>{value}</mark> : value
          )}
        </h3>
        <p className="card--body">
          {parsedDescHit.map(({ isHighlighted, value }, idx) =>
            isHighlighted ? <mark key={idx + hit.objectID}>{value}</mark> : value
          )}
        </p>
        <div className="card--spacer"></div>
        <Tags tags={hit.tags} />
      </Link>
    )
  }

  if(!hit && !!input && input.value.length > 1) {
    return <span>No Results 🙁</span>
  }

  return null;
})

const Hit = ({ hit }) => {
  return (
      <CustomHighlight attribute="description" hit={hit} />
    )
}

export default Search;
