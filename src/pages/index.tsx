import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import Head from 'next/head';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface ImageProps {
  data: Image[];
  after: number | null;
}

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }): Promise<ImageProps> => {
    const { data } = await api.get('api/images', {
      params: {
        after: pageParam,
      },
    });
    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => {
      const { after } = lastPage;
      if (after) {
        return after;
      }
      return null;
    },
  });

  // console.log('loading', isLoading);
  // console.log('erro', isError);
  // console.log('isFetchingNextPage', isFetchingNextPage);
  // console.log('hasNextPage', hasNextPage);

  const formattedData = useMemo(() => {
    const newData = data?.pages.map(page => {
      return page.data;
    });
    return newData?.flat();
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>UpFi</title>
        <link rel="shortcut icon" href="logo.svg" />
      </Head>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} mt="10">
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
