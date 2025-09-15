import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import FeedItem from './FeedItem';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';

const FeedFavoriteList = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
    />
  );
};

export default FeedFavoriteList;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});
