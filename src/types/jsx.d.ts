import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module '*.jsx' {
  import type { ComponentType } from 'react';
  const component: ComponentType<{}>;
  export default component;
}
