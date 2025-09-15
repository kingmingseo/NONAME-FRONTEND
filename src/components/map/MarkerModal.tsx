import {Image, Modal, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import useGetPost from '@/hooks/queries/useGetPost';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import {getBaseURL} from '@/api/axios';
import {Text} from 'react-native-gesture-handler';
import Ionicons from '@react-native-vector-icons/ionicons';
import {getDateWithSeparator} from '@/utils/date';
import {useNavigation} from '@react-navigation/native';

interface MarkerModalProps {
  markerId: number;
  isVisible: boolean;
  hide: () => void;
}

const MarkerModal = ({markerId, isVisible, hide}: MarkerModalProps) => {
  const {data: post, isPending, isError} = useGetPost(markerId);
  const baseUrl = getBaseURL();
  const navigation = useNavigation();

  if (isPending || isError) {
    return <></>;
  }

  const handlePress = () => {
    navigation.navigate('Feed', {
      screen: 'FeedDetail',
      params: {id: post.id},
      initial: false,
    });

    hide();
  };
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={styles.background} onTouchEnd={hide}>
        <Pressable style={styles.cardContainer}>
          <View style={styles.cardInner}>
            <View style={styles.cardAlign}>
              {post.imageUris.length > 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{uri: `${baseUrl}/${post.imageUris[0]?.uri}`}}
                    resizeMode="cover"
                  />
                </View>
              )}
              {post.imageUris.length === 0 && (
                <View
                  style={[styles.imageContainer, styles.emptyImageContainer]}>
                  <Text style={styles.emptyText}>No Image</Text>
                </View>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.addressContainer}>
                  <Ionicons
                    name="location-outline"
                    size={10}
                    color={colors.GRAY_500}
                  />
                  <Text
                    style={styles.addressText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {post.address}
                  </Text>
                </View>
                <Text
                  style={styles.titleText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {post.title}
                </Text>
                <Text style={styles.dateText}>
                  {getDateWithSeparator(post.date, '.')}
                </Text>
              </View>
            </View>
            <View style={styles.nextButton}>
              <Ionicons
                name="chevron-forward"
                size={25}
                color={colors.BLACK}
                onPress={handlePress}
              />
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default MarkerModal;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 15,
    boxShadow: '1px 1px 3px rbga(0,0,0,0.3)',
    justifyContent: 'space-between',
  },
  cardInner: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  emptyText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 15,
    gap: 5,
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 10,
  },
  cardAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  titleText: {
    color: colors.BLACK,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
  nextButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
