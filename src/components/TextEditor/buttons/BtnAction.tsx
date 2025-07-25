import {Editor} from "@tiptap/react";
import {MdUndo, MdRedo} from "react-icons/md";
import {Button} from "@/component";

type Props = {
  editor: Editor,
}

/* 復原操作的元件 */
export default function BtnAction({editor}: Props) {

  // const savedContent = localStorage.getItem('tiptap-content')

  return (
    <div className='join'>
      <Button size='sm' color='neutral' style='soft' className='join-item text-base-content' title='復原'
              onClick={() => editor.chain().focus().undo().run()}>
        <MdUndo className='text-lg'/>
      </Button>
      <Button size='sm' color='neutral' style='soft' className='join-item text-base-content' title='重做'
              onClick={() => editor.chain().focus().redo().run()}>
        <MdRedo className='text-lg'/>
      </Button>
      {/*<Button size='sm' color='neutral' style='soft' className='join-item text-base-content' title='復原文章'*/}
      {/*        onClick={handleRescue}>*/}
      {/*  <MdHistory className='text-lg'/>*/}
      {/*</Button>*/}
    </div>
  )
}