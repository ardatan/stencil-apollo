import { FunctionalComponent } from "@stencil/core";

declare module '@stencil/state-tunnel' {
    export function createProviderConsumer<T extends object>(defaultState: T, consumerRender?: any): {
        Provider: FunctionalComponent<{
            state: T;
            children?: any;
        }>;
        Consumer: FunctionalComponent<{}>;
        wrapConsumer: (childComponent: any, fieldList: (keyof T)[]) => ({ children, ...props }: any) => any;
        injectProps: (childComponent: any, fieldList: (keyof T)[]) => void;
    };
}