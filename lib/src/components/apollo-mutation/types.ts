import { OperationVariables, MutationOptions } from "apollo-client";

import { FetchResult } from "apollo-link";

export type MutationFn<TData = {}, TVariables = OperationVariables> = <Data = TData, Variables = TVariables>(options: Partial<MutationOptions<Data, Variables>>) => Promise<FetchResult<Data>>
export type MutationRenderer<TData = {}, TVariables = OperationVariables> = (mutationFn: MutationFn<TData, TVariables>) => JSX.Element | JSX.Element[] | undefined | null;
