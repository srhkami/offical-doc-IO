import BtnAction from "./buttons/BtnAction.tsx";
import {Editor, EditorContent, JSONContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Dispatch, SetStateAction, useCallback, useEffect} from "react";
import _ from "lodash";
import {CustomParagraph, CustomStyleMark} from "./CustomStyleMark.ts";
import BtnFontStyle from "./buttons/BtnFontStyle.tsx";
import BtnTextAlign from "./buttons/BtnTextAlign.tsx";
import {BulletList} from "@tiptap/extension-bullet-list";
import {OrderedList} from "@tiptap/extension-ordered-list";
import {ListItem} from "@tiptap/extension-list-item";
import BtnList from "./buttons/BtnList.tsx";
import {Blockquote} from "@tiptap/extension-blockquote";
import Image from '@tiptap/extension-image'
import BtnTextColor from "./buttons/BtnTextColor.tsx";
import {Row, Col} from "@/component";
import BtnImage from "@/component/TextEditor/buttons/BtnImage.tsx";

type Props = {
  content: JSONContent | null,
  setContent: Dispatch<SetStateAction<JSONContent>>,
}

export const tiptapExtensions = [
  StarterKit.configure({
    bulletList: false,
    orderedList: false,
    blockquote: false,
    codeBlock: false,
  }),
  CustomStyleMark,
  CustomParagraph,
  ListItem,
  Image,
  BulletList.extend({
    addAttributes() {
      return {
        class: {
          default: 'list-disc pl-6',
        },
      }
    },
  }),
  OrderedList.extend({
    addAttributes() {
      return {
        class: {
          default: 'list-decimal pl-6',
        },
      }
    },
  }),
  Blockquote.extend({
    addAttributes() {
      return {
        class: {
          default: 'border-l-4 border-gray-300 pl-4 text-gray-600 my-4',
        },
      }
    },
  }),
]

export default function TextEditor({content, setContent}: Props) {
  // const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
  const editor = useEditor({
    extensions: tiptapExtensions,
    content: content,
  }) as Editor;

  const saveToLocalStorage = useCallback(
    _.debounce(() => {
      localStorage.setItem('tiptap-content', JSON.stringify(editor.getJSON()));
      console.log('內容已儲存到 localStorage');
    }, 5000),
    []
  )

  useEffect(() => {
    // 每當有更新儲存
    editor.on('update', () => {
      setContent(editor.getJSON());
      // 定時自動儲存到localStorage，用以回復內文
      saveToLocalStorage();
    })
  }, [editor, saveToLocalStorage]);

  return (
    <div className="card bg-base-100 card-border border-base-300 overflow-hidden">
      <div className='card-body'>
        <Row className='gap-2 mb-2'>
          <Col xs={12}>
            <BtnAction editor={editor}/>
          </Col>
          <BtnFontStyle editor={editor}/>
          <BtnTextColor editor={editor}/>
          <BtnTextAlign editor={editor}/>
          <BtnList editor={editor}/>
          <BtnImage editor={editor}/>
        </Row>
        <EditorContent editor={editor}
                       className="bg-base-200 min-h-50"/>
      </div>
      {/*<div dangerouslySetInnerHTML={{*/}
      {/*  __html: editor.getHTML()*/}
      {/*}}>*/}
      {/*</div>*/}
    </div>
  )
}