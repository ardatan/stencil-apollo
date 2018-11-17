import { ApolloQueryResult } from "apollo-client";
export type OnQueryReadyFn<T> = (result: ApolloQueryResult<T>) => JSX.Element | JSX.Element[] | undefined | null;
