import {StyleSheet} from 'react-native';
import React, { Suspense } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import Indicator from '@/components/common/Indicator';

const FeedFavoriteScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={<Indicator size="large" />}>
        <FeedFavoriteList />
      </Suspense>
    </SafeAreaView>
  );
};

export default FeedFavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
