import { createPost } from '@/api/post';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants/keys';
import { UseMutationCustomOptions } from '@/types/api';
import { Marker } from '@/types/domain';
import { useMutation } from '@tanstack/react-query';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      const newMarker: Marker = {
        id: newPost.id,
        latitude: newPost.latitude,
        longitude: newPost.longitude,
        color: newPost.color,
        score: newPost.score,
      };
      // queryClient.invalidateQueries({
      //   [queryKeys.MARKER, queryKeys.GET_MARKERS]
      // })
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        (prev) => (prev ? [newMarker, ...prev] : [newMarker])
      );
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
