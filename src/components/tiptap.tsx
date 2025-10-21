import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({ content, onChange }: { content: string; onChange: (value: string) => void }) => {


    const editor = useEditor({
        extensions: [StarterKit], // define your extension array
        content, // initial content
        onUpdate: ({ editor }) => {
          onChange(editor.getText({blockSeparator: '\n'}))
        },
        immediatelyRender: false,
        editorProps: {
          attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
          },
        },
      });

  
      if (!editor) {
        return <div>Loading...</div>
      } else {
        return (
          <div>
            <EditorContent editor={editor} />
          </div>
        );
      }
    
}
  
  


export default Tiptap;