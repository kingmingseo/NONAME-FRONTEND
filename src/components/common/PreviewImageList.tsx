import {Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {ImageUri} from '@/types/domain';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Theme} from '@/store/theme';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {FeedStackParamList} from '@/types/navigation';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  showDeleteButton?: boolean;
}
const PreviewImageList = ({
  imageUris,
  onDelete,
  showDeleteButton = false,
}: PreviewImageListProps) => {
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();
  const route = useRoute<RouteProp<FeedStackParamList, 'ImageZoom'>>();
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  const handlePressImage = (index: number) => {
    navigation.navigate('ImageZoom', {
      id: route.params.id,
      index,
    });
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {imageUris.map(({uri}, index) => {
        return (
          <Pressable
            key={uri}
            style={styles.imageContainer}
            onPress={() => handlePressImage(index)}>
            <Image
              style={styles.image}
              source={{uri: uri}}
              resizeMode="cover"
            />
            {showDeleteButton && (
              <Pressable
                style={styles.deleteButton}
                onPress={() => onDelete?.(uri)}>
                <Ionicons name="close" size={16} color={colors[theme].WHITE} />
              </Pressable>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default PreviewImageList;

const styling = (theme: Theme) =>
  StyleSheet.create({
    imageContainer: {
      width: 70,
      height: 70,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    container: {
      gap: 15,
      paddingHorizontal: 15,
    },
    deleteButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: colors[theme].BLACK,
    },
  });
