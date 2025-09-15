import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getCalendarPosts, ResponseCalendarPosts} from '@/api/post';
import {UseQueryCustomOptions} from '@/types/api';
import {queryKeys} from '@/constants/keys';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPosts>,
) {
  return useQuery({
    queryKey: [
      queryKeys.POST,
      queryKeys.GET_POSTS,
      queryKeys.GET_CALENDAR_POSTS,
      year,
      month,
    ],
    placeholderData: keepPreviousData,
    queryFn: () => getCalendarPosts(year, month),
    ...queryOptions,
  });
}

export default useGetCalendarPosts;
