import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PaginationStyles from './styles/PaginationStyles';
import Error from './ErrorMessage';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        // if (error) return <Error error={error} />;
        const { count } = data.itemsConnection.aggregate;
        const pages = Math.ceil(count / perPage);
        const { page } = props;
        return (
          <PaginationStyles>
            <Head>
              <title>
                Sick Fits! — Page {page} of {pages}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page - 1 }
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                &larr; Prev
              </a>
            </Link>
            <p>
              Page {page} of {pages}!
            </p>
            <p>{count} Items Total</p>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page + 1 }
              }}
            >
              <a className="next" aria-disabled={page >= pages}>
                Next &rarr;
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
