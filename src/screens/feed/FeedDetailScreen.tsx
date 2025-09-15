import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FeedStackParamList} from '@/types/navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import useGetPost from '@/hooks/queries/useGetPost';
import {getBaseURL} from '@/api/axios';
import {getDateWithSeparator} from '@/utils/date';
import Ionicons from '@react-native-vector-icons/ionicons';
import CustomButton from '@/components/common/CustomButton';
import PreviewImageList from '@/components/common/PreviewImageList';
import {useNavigation} from '@react-navigation/native';
import useLocationStore from '@/store/location';
import useModal from '@/hooks/useModal';
import FeedDetailActionSheet from '../../components/feed/FeedDetailActionSheet';
import useMutateFavoritePost from '@/hooks/queries/useMutateFavoritePost';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Theme} from '@/store/theme';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

const FeedDetailScreen = ({route}: Props) => {
  const {theme} = useThemeStorage();
  const {id} = route.params;
  const insets = useSafeAreaInsets();
  const {data: post, isPending, isError} = useGetPost(id);
  const baseUrl = getBaseURL();
  const navigation = useNavigation();
  const {setMoveLocation} = useLocationStore();
  const detailAction = useModal();
  const favoriteMutation = useMutateFavoritePost();
  const styles = styling(theme);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressLocation = () => {
    const {latitude, longitude} = post;
    setMoveLocation({latitude, longitude});

    navigation.navigate('Map', {
      screen: 'MapHome',
    });
  };
  return (
    <>
      <View style={[styles.header, {top: insets.top}]}>
        <Ionicons
          name="chevron-back"
          size={30}
          color={colors[theme].WHITE}
          onPress={() => navigation.goBack()}
        />
        <Ionicons
          name="ellipsis-vertical"
          size={30}
          color={colors[theme].WHITE}
          onPress={detailAction.show}
        />
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        <View style={styles.imageContainer}>
          {post.images.length > 0 && (
            <Image
              style={styles.image}
              source={{uri: `${baseUrl}/${post.images[0].uri}`}}
              resizeMode="cover"
            />
          )}
          {post.images.length === 0 && (
            <View style={styles.emptyImageContainer}>
              <Text>No Image</Text>
            </View>
          )}
        </View>
        <View style={styles.contentsContainer}>
          <View style={styles.addressContainer}>
            <Ionicons
              name="location"
              size={10}
              color={colors[theme].GRAY_500}
            />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {post.address}
            </Text>
          </View>
          <Text style={styles.titleText}>{post.title}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>방문날짜</Text>
                <Text style={styles.infoColumnValueText}>
                  {getDateWithSeparator(post.date, '.')}
                </Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>평점</Text>
                <Text style={styles.infoColumnValueText}>{post.score}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>마커색상</Text>
                <View
                  style={[styles.markerColor, {backgroundColor: post.color}]}
                />
              </View>
            </View>
          </View>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>
        <View style={{height: 10, backgroundColor: colors[theme].GRAY_200}} />
        {post.images.length > 0 && (
          <View style={styles.imageContentsContainer}>
            <PreviewImageList
              imageUris={post.images}
              showDeleteButton={false}
            />
          </View>
        )}
      </ScrollView>
      {!detailAction.isVisible && (
        <View
          style={[
            styles.bottomContainer,
            {paddingBottom: Math.max(insets.bottom, 20)},
          ]}>
          <CustomButton
            style={{paddingHorizontal: 5}}
            size="small"
            label={
              <Ionicons
                name="star"
                size={25}
                color={
                  post.isFavorite
                    ? colors[theme].YELLOW_500
                    : colors[theme].WHITE
                }
              />
            }
            onPress={() => favoriteMutation.mutate(post.id)}
          />
          <CustomButton
            style={{width: '90%'}}
            size="small"
            label="위치보기"
            onPress={handlePressLocation}
          />
        </View>
      )}

      <FeedDetailActionSheet
        id={post.id}
        isVisible={detailAction.isVisible}
        hideAction={detailAction.hide}
      />
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    header: {
      zIndex: 1,
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      width: '100%',
    },
    imageContainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    emptyImageContainer: {
      height: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors[theme].GRAY_200,
      borderColor: colors[theme].GRAY_200,
      borderWidth: 1,
    },
    contentsContainer: {
      backgroundColor: colors[theme].WHITE,
      padding: 20,
      marginBottom: 10,
    },
    addressContainer: {
      gap: 5,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addressText: {
      fontSize: 12,
      color: colors[theme].GRAY_500,
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
    },
    infoContainer: {
      gap: 8,
      marginVertical: 20,
    },
    infoRow: {
      flexDirection: 'row',
    },
    infoColumn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    infoColumnKeyText: {
      color: colors[theme].BLACK,
    },
    infoColumnValueText: {
      color: colors[theme].PINK_700,
    },
    markerColor: {
      width: 10,
      height: 10,
      borderRadius: 10,
    },
    descriptionText: {
      lineHeight: 25,
      color: colors[theme].BLACK,
      fontSize: 16,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 10,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingTop: 10,
      paddingHorizontal: 20,
      backgroundColor: colors[theme].WHITE,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors[theme].GRAY_200,
      gap: 5,
    },
    imageContentsContainer: {
      paddingVertical: 15,
      backgroundColor: colors[theme].WHITE,
      marginBottom: 10,
    },
  });

export default FeedDetailScreen;
