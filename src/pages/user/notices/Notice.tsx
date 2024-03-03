import React from 'react';
import './style.scss';
import { Container, Content } from '../../../components/Container';
import { Heading } from '../../../components/Heading';
import { MenuBar } from '../../../components/MenuBar';
import { InfiniteHits, InstantSearch } from 'react-instantsearch';
import algoliasearch from 'algoliasearch/lite';
import { CustomSearchBox } from './CustomSearchBox';
import NoticeSkeleton from './NoticeSkeleton';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/routes/path';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID!,
  process.env.REACT_APP_ALGOLIA_USER_SEARCH_KEY!
);
export const Notice = () => {
  const navigate = useNavigate();

  const handleNoticeClick = (id: string) => {
    navigate(`${PATH.NOTICE}/${id}`);
  };

  return (
    <Container>
      <Content className='userNoticesContainer'>
        <Heading heading='notice' subText='daily check' />
        <InstantSearch indexName='notices' searchClient={searchClient}>
          <CustomSearchBox />
          <NoticeSkeleton />
          <InfiniteHits
            showPrevious={false}
            classNames={{
              root: 'infiniteHitsContainer',
              list: 'infiniteHitsList',
            }}
            hitComponent={({ hit }: any) => (
              <div
                className='noticeBox'
                onClick={() => handleNoticeClick(hit.objectID)}
              >
                <p className='kind'>{hit.kind}</p>
                <p className='title'>{hit.title}</p>
              </div>
            )}
          />
        </InstantSearch>
      </Content>
      <MenuBar actived='notice' />
    </Container>
  );
};
