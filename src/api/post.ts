import {Post} from '@/types/domain';
import {axiosInstance} from './axios';

async function createPost(body: Omit<Post, 'id'>): Promise<Post> {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
}

async function getPost(id: number): Promise<Post> {
  const {data} = await axiosInstance.get(`/posts/${id}`);
  return data;
}

async function getPosts(page = 1): Promise<Post[]> {
  const {data} = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
}

async function deletePost(id: number) {
  const {data} = await axiosInstance.delete(`/posts/${id}`);

  return data;
}

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'latitude' | 'longitude' | 'address'>;
};

async function updatePost({id, body}: RequestUpdatePost): Promise<Post> {
  const {data} = await axiosInstance.patch(`/posts/${id}`, body);
  return data;
}

async function updateFavoritePost(id: number): Promise<number> {
  const {data} = await axiosInstance.post(`/favorites/${id}`);
  return data;
}

async function getFavoritePosts(page = 1): Promise<Post[]> {
  const {data} = await axiosInstance.get(`/favorites/my?page=${page}`);
  return data;
}

export type CalendarPost = {
  id: number;
  title: string;
  address: string;
};

export type ResponseCalendarPosts = Record<number, CalendarPost[]>;

async function getCalendarPosts(
  year: number,
  month: number,
): Promise<ResponseCalendarPosts> {
  const {data} = await axiosInstance.get(`/posts?year=${year}&month=${month}`);
  return data;
}

export {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
  updateFavoritePost,
  getFavoritePosts,
  getCalendarPosts,
};
