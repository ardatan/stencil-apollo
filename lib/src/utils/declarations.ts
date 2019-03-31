declare global {
  export namespace JSX {
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}
export const Declarations = 'DECLARATIONS';

declare global {
  interface StencilGlobalHTMLAttributes {
    children? : any;
  }
}