import React from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web';

import {
  ConnectedSearchBox,
  ConnectedBrandList,
  ConnectedHits,
  ConnectedResults,
  ConnectedPagination,
} from '../instantsearch';

const SearchApp = ({ indexName, searchClient, searchState, ...restProps }) => {
  const classes = useStyles();

  return (
    <div>
      <InstantSearch
        indexName={indexName}
        searchClient={searchClient}
        searchState={searchState}
        resultsState={restProps.resultsState}
        onSearchParameters={restProps.onSearchParameters}
        onSearchStateChange={restProps.onSearchStateChange}
        createURL={restProps.createURL}
        {...restProps}
      >
        <Configure hitsPerPage={restProps.hitsPerPage || 4} />

        <ConnectedResults>
          <ConnectedHits />
        </ConnectedResults>

        <ConnectedPagination />
      </InstantSearch>
    </div>
  );
};

export default SearchApp;
