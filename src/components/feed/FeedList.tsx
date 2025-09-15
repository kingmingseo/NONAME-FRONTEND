import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import {FlatList} from 'react-native';
import FeedItem from './FeedItem';

const FeedList = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();
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

export default FeedList;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});
