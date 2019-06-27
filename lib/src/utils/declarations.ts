declare module "@stencil/core" {
  export namespace h {
    export namespace JSX {
      interface ElementChildrenAttribute {
        inlist: {};
      }
    }
  }
}
export const Declarations = 'DECLARATIONS';

declare global {
  interface StencilGlobalHTMLAttributes {
    children? : any;
  }
}
