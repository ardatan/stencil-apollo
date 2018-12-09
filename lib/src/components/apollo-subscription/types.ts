import { OperationVariables } from "apollo-client";
export type OnSubscriptionReadyFn<TData = {}, _TVariables = OperationVariables> = (result: TData) => JSX.Element | JSX.Element[] | undefined | null;
