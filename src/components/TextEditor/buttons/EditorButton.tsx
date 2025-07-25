import {Editor} from "@tiptap/react";
import type {ButtonHTMLAttributes} from "react";
import {toggleBlockClass, toggleInlineClass} from "../CustomStyleMark.ts";
import { Button } from "@/component";

type Props = {
  className: string,
  title: string,
  editor: Editor,
  blockMode?: boolean,
}

export default function EditorButton({
                                       children,
                                       className,
                                       title,
                                       editor,
                                       onClick,
                                       blockMode = false
                                     }: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  if (!onClick) {
    if (blockMode) {
      return (
        <Button size='sm' color='neutral' style='soft' className='join-item text-base-content' title={title}
                onClick={() => toggleBlockClass(editor, className)}>
          {children}
        </Button>
      )
    }
    return (
      <Button size='sm' color='neutral' style='soft' className='join-item text-base-content' title={title}
              onClick={() => toggleInlineClass(editor, className)}>
        {children}
      </Button>
    )
  }
  return (
    <Button size='sm' color='neutral' style='soft' className='join-item text-base-content' title={title}
            onClick={onClick}>
      {children}
    </Button>
  )

}