import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Post} from '@/types/domain';
import {getBaseURL} from '@/api/axios';
import {getDateWithSeparator} from '@/utils/date';
import {colors} from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {FeedStackParamList} from '@/types/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Theme} from '@/store/theme';

interface FeedItemProps {
  post: Post;
}

const FeedItem = ({post}: FeedItemProps) => {
  const baseUrl = getBaseURL();
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('FeedDetail', {id: post.id})}>
      {post.images.length > 0 && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: `${baseUrl}/${post.images[0].uri}`}}
          />
        </View>
      )}
      {post.images.length === 0 && (
        <View style={[styles.emptyImageContainer, styles.imageContainer]}>
          <Text style={styles.descriptionText}>No Image</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>
          {getDateWithSeparator(post.date, '/')}
        </Text>
        <Text style={styles.titleText}>{post.title}</Text>
        <Text style={styles.descriptionText} numberOfLines={1}>
          {post.description}
        </Text>
      </View>
    </Pressable>
  );
};

export default FeedItem;

const styling = (theme: Theme) =>
  StyleSheet.create({
    imageContainer: {
      width: Dimensions.get('screen').width / 2 - 25,
      height: Dimensions.get('screen').width / 2 - 25,
    },
    container: {
      flex: 1,
      margin: 5,
      marginVertical: 12,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
      borderWidth: 1,
      borderRadius: 5,
    },
    textContainer: {
      marginTop: 7,
      gap: 2,
    },
    dateText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors[theme].PINK_700,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontWeight: '500',
      fontSize: 13,
    },
    descriptionText: {
      color: colors[theme].GRAY_500,
      fontSize: 13,
    },
  });
