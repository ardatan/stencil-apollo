import { JSX as StencilJSX } from '@stencil/core';

declare global {
  export namespace JSX {
    interface ElementChildrenAttribute {
      children: {};
    }
    type Element = StencilJSX.Element;
  }
}
export const Declarations = 'DECLARATIONS';

declare global {
  interface StencilGlobalHTMLAttributes {
    children? : any;
  }
}
