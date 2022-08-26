import React from 'react';
import Link from 'next/link';

import algoliasearch from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

const Search = () => {
  // (1) Create a React state.
  const inputRef = React.useRef(null);
  const [autocompleteState, setAutocompleteState] = React.useState({});
  const autocomplete = React.useMemo(
    () =>
      createAutocomplete({
        onStateChange({ state }) {
          // (2) Synchronize the Autocomplete state with the React state.
          setAutocompleteState(state);
        },
        getSources() {
          return [
            // (3) Use an Algolia index source.
            {
              sourceId: 'articles',
              getItemInputValue({ item }) {
                return item.query;
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
                      query,
                      params: {
                        hitsPerPage: 4,
                        highlightPreTag: '<mark>',
                        highlightPostTag: '</mark>',
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return item.url;
              },
            },
          ];
        },
      }),
    []
  );

  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <form
        className="aa-Form"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <input
          className="block w-full border-none pt-2 pb-1.5 pl-10 pr-3 text-sm placeholder-darkGray bg-lightGray focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:border-purple focus:ring-1 focus:ring-purple sm:text-sm"
          {...autocomplete.getInputProps({})}
          placeholder="Buscar..."
        />
      </form>

      <div className="relative aa-Panel" {...autocomplete.getPanelProps({})}>
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;

            return (
              <div
                key={`source-${index}`}
                className="absolute z-50 w-full bg-white border border-gray-300 aa-Source"
              >
                {items.length > 0 && (
                  <ul
                    className="aa-List custom-shadow"
                    {...autocomplete.getListProps()}
                  >
                    {items.map((item) => {
                      return (
                        <li
                          key={item.post_id}
                          className="aa-Item"
                          {...autocomplete.getItemProps({
                            item,
                            source,
                          })}
                        >
                          <Link href={item.slug}>
                            <div className="block w-full px-5 py-2 cursor-pointer SearchResult hover:bg-lightGray">
                              <div className="md:shrink-0">
                                <img
                                  src={item.vehicle_main_photo}
                                  width="150"
                                  className="object-cover w-full h-48 md:h-full md:w-48"
                                />
                              </div>
                              <span className="block text-sm font-bold SearchResult__titlee text-purple">
                                {item.vehicle_model_name}
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
