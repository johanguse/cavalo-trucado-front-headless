import React from 'react';
import { connectPagination } from 'react-instantsearch-dom';

const PaginationComponent = ({ currentRefinement, nbPages, refine }) => (
  <Pagination
    count={nbPages}
    variant="outlined"
    shape="rounded"
    size="small"
    page={currentRefinement}
    disabled={nbPages <= 1}
    onChange={(event, value) => refine(value)}
  />
);

const ConnectedPagination = connectPagination(PaginationComponent);

export default ConnectedPagination;
