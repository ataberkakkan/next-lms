"use client";

import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

const RenderContent = ({ json }: { json: JSONContent }) => {
  const editor = useEditor({
    editable: false,
    content: json,
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    immediatelyRender: false,
  });

  return (
    <div className="prose dark:prose-invert prose-li:marker:text-primary">
      <EditorContent editor={editor} />
    </div>
  );
};

export default RenderContent;
