import { useMemo } from 'react';
import algoliasearch, {
  AlgoliaSearchOptions,
  SearchIndex,
} from 'algoliasearch/lite';
import { User } from 'src/types/types';
import { RequestOptions } from '@algolia/transporter/dist/transporter';

interface SearchOptions {
  index?: SearchIndex;
  query: string;
  options?: (RequestOptions & AlgoliaSearchOptions) | undefined;
}

interface SearchResponse {
  hits: User[];
  nbPages: number;
}

const useUsersSearch = () => {
  const usersSearchClient = useMemo(
    () =>
      algoliasearch(
        process.env.REACT_APP_ALGOLIA_APP_ID!,
        process.env.REACT_APP_ALGOLIA_USER_SEARCH_KEY!
      ),
    []
  );

  const usersIndex = useMemo<SearchIndex>(
    () => usersSearchClient.initIndex('user'),
    [usersSearchClient]
  );

  const searchUsers = async (
    { query, options }: SearchOptions,
    refresh: boolean // no cache
  ): Promise<SearchResponse> => {
    if (refresh) {
      await usersSearchClient.clearCache();
    }

    return usersIndex.search(query, options);
  };

  return {
    usersIndex,
    searchUsers,
  };
};

export default useUsersSearch;
