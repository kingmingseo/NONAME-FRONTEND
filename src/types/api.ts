import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

type ResponseError = AxiosError<{
  statuscode: number;
  message: string;
  error: string;
}>;

type UseMutationCustomOptions<Tdata = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<Tdata, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;

export type {UseMutationCustomOptions, UseQueryCustomOptions, ResponseError};
