import {Button} from "@/component";
import type {ButtonHTMLAttributes} from "react";
import {twMerge} from "tailwind-merge";

type Props = {
  color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error",
  style?: "outline" | "dash" | "soft" | "ghost" | "link",
  disabled?: boolean,
}

/**
 * 用在底端欄的主要按鈕
 * 預設為outline樣式
 * 帶有陰影
 * @param color
 * @param style
 * @param disabled
 * @param onClick
 * @param type
 * @param className
 * @param title
 * @param children
 * @constructor
 */
export default function BottomMainButton({
                                       color,
                                       style = 'outline',
                                       disabled = false,
                                       onClick,
                                       type,
                                       className,
                                       title,
                                       children
                                     }: Props & ButtonHTMLAttributes<HTMLButtonElement>) {

  const classes = twMerge(
    'backdrop-blur-xs shadow-md shadow-base-content/30',
    className)

  return (
    <Button shape='circle' style={style} color={color} type={type}
            disabled={disabled} title={title}
            className={classes} onClick={onClick}>
      {children}
    </Button>
  )
}