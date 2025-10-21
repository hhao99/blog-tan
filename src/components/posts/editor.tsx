
import React from 'react';
import { MDXEditor } from '@mdxeditor/editor'
import { headingsPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
export default function Mdxditor({text,setText}: {text: string, setText: (md: string)=>void}) {
  return (
    <div>
        <h3>MDX Editor  </h3>
        <MDXEditor markdown={text} onChange={setText} plugins={[headingsPlugin()]} />
    </div>
  );    
}