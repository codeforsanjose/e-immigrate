
declare module '*.svg?url' {
    import * as React from 'react';
  
    export const ReactComponent: React.FunctionComponent<React.SVGProps<
      SVGSVGElement
    > & { title?: string }>;
  
    const src: string;
    export default src;
  }


declare module "*.svg" {
  import React from "react";
  const SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}