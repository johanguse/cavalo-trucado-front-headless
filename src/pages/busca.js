import Head from 'next/head';
import Navbar from '@/components/Navbar';
import algoliasearch from 'algoliasearch/lite';
import { withInstantSearch } from 'next-instantsearch';
import {
  InstantSearch,
  Configure,
  Highlight,
  Hits,
  Pagination,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-dom';

const HitComponent = ({ hit }) => (
  <div className="hit">
    <div>
      <div className="hit-picture">
        <img src={`${hit.vehicle_main_photo}`} />
      </div>
    </div>
    <div className="hit-content">
      <div>
        <Highlight attribute={hit.vehicle_model_name} hit={hit} />
        <span>{hit.vehicle_model_name}</span>
        <span>{hit.vehicle_year}</span>
      </div>
      <div className="hit-type">
        <Highlight attribute="type" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={hit} />
      </div>
    </div>
  </div>
);
/*
const Page = () => (
  <>
    <Configure hitsPerPage={12} />
    <header>
      <SearchBox />
    </header>
    <main>
      <div className="menu">
        <RefinementList attribute="categories" />
      </div>
      <div className="results">
        <Hits hitComponent={HitComponent} />
      </div>
    </main>
    <footer>
      <Pagination />
    </footer>
  </>
);*/

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export default function ContatoPage({ vehicles }) {
  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
      >
        <Configure hitsPerPage={12} />
        <Head>
          <title>
            Cavalo Trucado - Compra e venda de caminhões - Entre em Contato
          </title>
          <meta
            name="description"
            content="Especializado na compra e venda de caminhões em todo Brasil."
          />
          <meta
            name="keywords"
            content="compra, venda, caminhões, carretas, cavalos"
          />
        </Head>
        <Navbar />
        <div className="w-full border-b bg-gray-50 border-t-gray-200">
          <div className="container px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="py-3 space-y-6 text-xs text-gray-500 md:space-y-0">
              Busca
            </div>
          </div>
        </div>
        <main className="flex flex-col w-full max-w-4xl px-2 py-8 mx-auto mb-5 space-y-6 sm:px-6 lg:px-8 md:flex-row md:space-x-6 md:space-y-0 sm:p-12">
          <div className="grid grid-flow-row gap-4 md:grid-flow-col">
            <div className="search">
              <div className="text-search">
                <SearchBox />
              </div>
              <div className="mt-5">
                <RefinementList attribute="taxonomies.brand" />
              </div>
            </div>
            <div className="order-none mx-auto results md:order-last">
              <Hits hitComponent={HitComponent} />
              <div className="mt-5">
                <Pagination />
              </div>
            </div>
          </div>
        </main>
      </InstantSearch>
    </>
  );
}
