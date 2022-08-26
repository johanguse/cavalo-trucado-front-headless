import Link from 'next/link';
import React, { useMemo } from 'react';
import {
  Highlight,
  PoweredBy,
  Panel,
  connectHits,
} from 'react-instantsearch-hooks-web';

export const AlgoliaHitItem = ({ hit }) => {
  const { permalink } = hit;
  const slug = useMemo(() => {
    return permalink.replace(/https:\/\/headless.example.com/, '');
  }, [permalink]);
  return (
    <Link href={slug}>
      <Highlight attribute="post_title" hit={hit} />
    </Link>
  );
};
export const AlgoliaSearchResult = connectHits(({ hits }) => {
  if (!hits || hits.length < 1) return null;
  if (!showResult) return null;
  return (
    <Panel footer={<PoweredBy />}>
      {hits.map((hit) => (
        <AlgoliaHitItem key={hit.objectID} hit={hit} />
      ))}
    </Panel>
  );
});
