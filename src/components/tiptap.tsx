
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from '@tiptap/markdown'

const Tiptap = ({ content, onChange }: { content: string; onChange: (value: string) => void }) => {

   
    const editor = useEditor({
        extensions: [StarterKit,Markdown], // define your extension array
        content, // initial content
        editorProps: {
        attributes: {
          class: 'p-2 prose-sm min-h-60 prose-h1:mb-0 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:outline-none',
          },
        },
        immediatelyRender: false,
      });

  
      if (!editor) {
        return <div>Loading...</div>
      } else {
          editor.on('update', () => {
            try {
              const markdown = editor.getMarkdown();
              onChange(markdown);
            } catch (err) {
              console.log("error getting markdown:", err);
              onChange(editor.getText());
            } 
          })
        return (
          <div>
            <EditorContent editor={editor} />
          </div>
        );
      }
    
}
  
  


export default Tiptap;