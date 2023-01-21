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
    <div className="w-full py-5 bg-gray-100">
      <div className="container flex flex-col items-center justify-center flex-1 mx-auto max-w-7xl sm:px-10 lg:px-12">
        <div className="w-full px-4" {...autocomplete.getRootProps({})}>
          <form
            {...autocomplete.getFormProps({ inputElement: inputRef.current })}
          >
            <label class="relative block">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
              </span>
              <input
                class="w-full bg-white placeholder:font-italitc border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:ring-red-600/60 focus:border-red-600/60"
                {...autocomplete.getInputProps({})}
                placeholder="Busque por marca, modelo, ano..."
                type="text"
              />
            </label>
          </form>

          <div className="relative" {...autocomplete.getPanelProps({})}>
            {autocompleteState.isOpen &&
              autocompleteState.collections.map((collection, index) => {
                const { source, items } = collection;

                return (
                  <div
                    key={`source-${index}`}
                    className="absolute z-50 w-full transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg lg:w-11/12 left-1/2"
                  >
                    {items.length > 0 && (
                      <ul {...autocomplete.getListProps()}>
                        {items.map((item) => {
                          return (
                            <li
                              key={item.post_id}
                              {...autocomplete.getItemProps({
                                item,
                                source,
                              })}
                            >
                              <Link href={item.slug}>
                                <div className="block w-full px-5 py-2 cursor-pointer hover:bg-lightGray">
                                  <div className="md:shrink-0">
                                    <img
                                      src={item.vehicle_main_photo}
                                      width="150"
                                      className="object-cover w-full h-48 md:h-full md:w-48"
                                    />
                                  </div>
                                  <span className="block text-sm font-bold text-purple">
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
      </div>
    </div>
  );
};

export default Search;
