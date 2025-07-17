'use client'
import {useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import Image from '@tiptap/extension-image'
import ImageResize from "tiptap-extension-resize-image"
import { useEditorStore } from "@/store/use-editor-store"
import  UnderLine from "@tiptap/extension-underline"
import FontFamily from "@tiptap/extension-font-family"
import TextStyle from "@tiptap/extension-text-style"
import {Color} from "@tiptap/extension-color";
import HighLight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"


import { LineHeightExtension } from "@/extensions/line-height"
import { FontSizeExtension } from "@/extensions/font-size" // our new custom made extension
import Ruler from "./ruler"

// import Ruler from "./ruler"





export const Editor = () => {
  const {setEditor} = useEditorStore();
    const editor = useEditor({
      // this is onCreate .. whenever a button/tiptap thing is created pass it to the setEditor which uses Zustand so that that paticular thing is aviable everywhere and we need to pass it down the components 

      // Every time the editor changes (focus, content, selection, etc.), setEditor updates the global state.

      // the below are the instances where we call the setEditor... so that the state is changed !!
  
      onCreate({editor}) {
        setEditor(editor);
      },
      onDestroy(){
        setEditor(null);
      },
      onUpdate({editor}){
        setEditor(editor);
      },
      onSelectionUpdate({editor}){
        setEditor(editor)
      },
      onTransaction({editor}){
        setEditor(editor);

      },
      onFocus({editor}){
        setEditor(editor);
      },
      onBlur({editor}) {
        setEditor(editor)
      },
      onContentError({editor}){
        setEditor(editor);
      },
        editorProps:{
            attributes:{
                style : "padding-left: 56px; padding-right: 56px;",
                class: "focus:outline-none print:border-0 bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text border", 
                spellcheck : 'true',
            },
        },
        extensions: [
            StarterKit, 
            LineHeightExtension.configure({
              types: ['heading', "paragraph"],
              defaultLineHeight: "normal"
            }),
            FontSizeExtension,
            TextAlign.configure({
              types: ["heading", "paragraph"]
            }),
            Link.configure({
              openOnClick : true,
              autolink: true,
              defaultProtocol : "https"
            }),
            Color,
            HighLight.configure({
              multicolor: true
            }),
            ImageResize,
            FontFamily,
            Image,
            TextStyle,
            UnderLine,
            Table.configure({
                resizable: true,
            }),
            TableCell,
            TableHeader,
            TableRow,
            TaskItem.configure({
                nested: true,
            }),
            TaskList
         ], 
        immediatelyRender: false
    })


  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:overflow-visible print:bg-white">

        <Ruler/>
        
        <div className="min-w-max flex justify-center w-[816px]  py-4 print:py-0 mx-auto print:w-full print:min-w-0">

            <EditorContent editor={editor}/>

        </div>
    </div>
  )
}
