import { ApolloQueryResult, OperationVariables } from "apollo-client";
export type QueryRenderer<TData = {}, _TVariables = OperationVariables> = (result: ApolloQueryResult<TData>) => JSX.Element | JSX.Element[] | undefined | null;
