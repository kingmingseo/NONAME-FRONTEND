import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/types/navigation';
import useGetPost from '@/hooks/queries/useGetPost';
import ImageCarousel from '@/components/common/ImageCarousel';

type Props = StackScreenProps<FeedStackParamList, 'ImageZoom'>;

const ImageZoomScreen = ({route}: Props) => {
  const {id, index} = route.params;
  const {data: post} = useGetPost(id);
  return <ImageCarousel images={post?.imageUris ?? []} pressedIndex={index} />;
};

export default ImageZoomScreen;
