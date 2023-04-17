import { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  InfiniteHits,
  HitsPerPage,
  Pagination,
  RefinementList,
  SearchBox,
  PoweredBy,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';
import IconPointMap from '@/assets/icon_mappoint.svg';

const HitComponent = ({ hit }) => {
  const { slug } = hit;
  return (
    <Link href={slug}>
      <div className="flex flex-col col-span-1 transition w-full duration-300 bg-white border border-gray-200 rounded-lg hit hover:shadow-md">
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

        <div className="flex flex-wrap px-4 py-2 mb-1 justify-between">
          <div className="flex flex-col">
            <h5 className="font-semibold text-lg mb-1">
              {hit.brand}{' '}
              <span className="text-red-700">{hit.vehicle_model_name}</span>
            </h5>
            <p className=" text-[#3c3c3c] mb-3 font-semibold">
              R$ {hit.vehicle_price}
            </p>
            {/* <span>{hit.vehicle_model_name}</span> */}

            <span className="text-xs text-gray-700">
              Ano: {hit.vehicle_year}
            </span>
            <div className="flex items-center mt-1">
              <div className="pr-1 icon">
                <Image
                  src={IconPointMap}
                  alt="Localização"
                  width="18"
                  height="22"
                />
              </div>
              <span className="text-xs text-gray-700">
                {hit.vehicle_state.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure to not display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <div className="order-none w-full mx-auto results md:order-last">
      <p>
        Sem resultados para: <q>{indexUiState.query}</q>.
      </p>
    </div>
  );
}

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

const BreadcrumbData = [
  {
    title: 'Busca',
  },
];

export default function SearchPage({ vehicles }) {
  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
      >
        <Configure hitsPerPage={12} />
        <Head>
          <title>Cavalo Trucado - Compra e venda de caminhões - Busca</title>
          <meta
            name="description"
            content="Especializado na compra e venda de caminhões em todo Brasil."
          />
          <meta
            name="keywords"
            content="compra, venda, caminhões, carretas, cavalos"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
            integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc="
            crossorigin="anonymous"
          ></link>
        </Head>
        <Navbar />
        <Breadcrumb
          BreadcrumbData={[
            {
              title: 'Busca',
            },
          ]}
        />
        <main className="w-full mb-5 bg-white">
          <div className="container flex flex-col items-center justify-center flex-1 mx-auto bg-white max-w-7xl sm:px-6 lg:px-0">
            <div className="grid w-full grid-flow-row gap-2 p-8 space-y-6 md:grid-flow-col md:space-y-0 md:flex">
              <div className="search">
                <div className="text-search">
                  <h3>Filtros</h3>
                  <SearchBox
                    placeholder="Marca, modelo, ano..."
                    classNames={{
                      input:
                        'pl-10 w-full placeholder:italic placeholder:text-gray-500 shadow-inner border border-gray-300 rounded-md focus:ring-red-600/60 focus:border-red-600/60',
                    }}
                  />
                  <div className="mt-2 powered">
                    <PoweredBy />
                  </div>
                </div>
                <div className="mt-5">
                  <h3>Marca</h3>
                  <RefinementList
                    limit={10}
                    showMore={true}
                    attribute="taxonomies.brand"
                    translations={{
                      showMore(isShowingMore) {
                        return isShowingMore ? 'Mostrar menos' : 'Mostrar mais';
                      },
                      noResults: 'Sem resultados',
                      submitTitle: 'Submit your search query.',
                      resetTitle: 'Clear your search query.',
                      placeholder: 'Search here...',
                    }}
                    classNames={{
                      checkbox:
                        'shadow-inner border border-gray-300 rounded-md',
                    }}
                  />
                </div>
                <div className="mt-5">
                  <h3>Ano</h3>
                  <RefinementList
                    limit={5}
                    showMore={true}
                    attribute="vehicle_year"
                    translations={{
                      showMore(isShowingMore) {
                        return isShowingMore ? 'Mostrar menos' : 'Mostrar mais';
                      },
                      noResults: 'Sem resultados',
                      submitTitle: 'Submit your search query.',
                      resetTitle: 'Clear your search query.',
                      placeholder: 'Search here...',
                    }}
                    classNames={{
                      checkbox:
                        'shadow-inner border border-gray-300 rounded-md',
                    }}
                  />
                </div>
                <div className="mt-5">
                  <h3>Localização</h3>
                  <RefinementList
                    attribute="vehicle_state.label"
                    showMore
                    limit={5}
                    translations={{
                      showMore(isShowingMore) {
                        return isShowingMore ? 'Less' : 'More';
                      },
                      noResults: 'No results',
                      submitTitle: 'Submit your search query.',
                      resetTitle: 'Clear your search query.',
                      placeholder: 'Search here...',
                    }}
                    classNames={{
                      checkbox:
                        'shadow-inner border border-gray-300 rounded-md',
                    }}
                  />
                </div>
                <div className="mt-5">
                  <h3>Resultados por pagina</h3>
                  <HitsPerPage
                    items={[
                      { label: '8 por pagina', value: 8, default: true },
                      { label: '16 por pagina', value: 16 },
                    ]}
                  />
                </div>
              </div>
              <NoResultsBoundary fallback={<NoResults />}>
                <div className="order-none w-full mx-auto results md:order-last md:pl-[15px] md:pt-[15px]">
                  <div className="flex flex-col w-full px-2 pb-8 mx-auto mb-5 space-y-6 sm:px-6 lg:px-0 md:flex bus_ordered_list">
                    <InfiniteHits
                      showPrevious={false}
                      hitComponent={HitComponent}
                      translations={{
                        loadPrevious: 'Load previous',
                        loadMore: 'Mostrar mais',
                      }}
                    />
                  </div>
                  <div className="mt-5 pagination">
                    <Pagination />
                  </div>
                </div>
              </NoResultsBoundary>
            </div>
          </div>
        </main>
      </InstantSearch>
    </>
  );
}
