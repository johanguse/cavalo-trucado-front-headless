import { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Highlight,
  Hits,
  Pagination,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-hooks-web';

const HitComponent = ({ hit }) => {
  const { slug } = hit;
  return (
    <Link href={slug}>
      <div className="flex flex-col col-span-1 transition duration-300 bg-white border border-gray-200 rounded-lg hit hover:shadow-md">
        <div className="p-0">
          <div className="w-full cursor-pointer">
            {
              <Image
                className="rounded-t-lg"
                src={`${hit.vehicle_main_photo}`}
                alt={`${hit.brand} - ${hit.vehicle_model_name}`}
                title={`${hit.brand} - ${hit.vehicle_model_name}`}
                width="260"
                height="360"
                objectFit="cover"
              />
            }
          </div>
        </div>

        <div className="flex flex-wrap px-4 mb-1">
          <div className="flex flex-col">
            <span>{hit.vehicle_model_name}</span>
            <span>{hit.vehicle_year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

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
        <main className="w-full mb-5 bg-white border-t border-gray-200">
          <div className="container flex flex-col items-center justify-center flex-1 mx-auto bg-white max-w-7xl sm:px-6 lg:px-0">
            <div className="grid w-full grid-flow-row gap-4 p-8 space-y-6 md:grid-flow-col md:space-y-0 md:flex md:gap-6 lg:gap-12">
              <div className="search">
                <div className="text-search">
                  <SearchBox placeholder="Buscar..." />
                </div>
                <div className="mt-5">
                  <h3>Marca</h3>
                  <RefinementList attribute="taxonomies.brand" />
                </div>
                <div className="mt-5">
                  <h3>Ano</h3>
                  <RefinementList attribute="vehicle_year" />
                </div>
                <div className="mt-5">
                  <h3>Localização</h3>
                  <RefinementList attribute="vehicle_state.label" />
                </div>
              </div>
              <div className="order-none w-full mx-auto results md:order-last">
                <div className="flex flex-col w-full max-w-4xl px-2 py-8 mx-auto mb-5 space-y-6 sm:px-6 lg:px-8 md:flex">
                  <Hits hitComponent={HitComponent} />
                </div>
                <div className="mt-5 pagination">
                  <Pagination />
                </div>
              </div>
            </div>
          </div>
        </main>
      </InstantSearch>
    </>
  );
}
