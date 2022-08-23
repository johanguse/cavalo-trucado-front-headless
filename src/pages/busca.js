import algoliasearch from 'algoliasearch/lite';
import { withInstantSearch } from 'next-instantsearch';
import {
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
        <Highlight attribute="name" hit={hit} />
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
);

const searchClient = algoliasearch(
  'KPIBSPP2CK',
  '8c468ce75049176cd39237055ad7565e'
);

export default withInstantSearch({
  indexName: 'wp_posts_vehicle',
  searchClient,
})(Page);
