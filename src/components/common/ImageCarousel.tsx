import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ImageUri} from '@/types/domain';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import {getBaseURL} from '@/api/axios';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex: number;
}

const ImageCarousel = ({images, pressedIndex = 0}: ImageCarouselProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const deviceWidth = Dimensions.get('window').width;
  const [initialIndex, setInitialIndex] = useState(pressedIndex);
  const [currentIndex, setCurrentIndex] = useState(pressedIndex);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = e.nativeEvent;
    const index = Math.round(contentOffset.x / deviceWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButton, {marginTop: insets.top + 20}]}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color={colors.WHITE} />
      </Pressable>
      <FlatList
        data={images}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(pressedIndex);
        }}
        onScroll={handleScroll}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <Image
              source={{uri: `${getBaseURL()}/${item.uri}`}}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />
      <View style={[styles.pageContainer, {bottom: insets.bottom + 10}]}>
        {Array.from({length: images.length}, (_, index) => (
          <View
            key={index}
            style={[
              styles.pageDot,
              index === currentIndex && styles.currentPageDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BLACK,
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
    left: 20,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
  },
  pageDot: {
    margin: 4,
    backgroundColor: colors.GRAY_200,
    width: 8,
    height: 8,
    borderRadius: 8,
  },
  currentPageDot: {
    backgroundColor: colors.PINK_700,
  },
});
