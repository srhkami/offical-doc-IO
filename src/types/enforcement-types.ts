import {JSONContent} from "@tiptap/react";

export type TreeNode = {
  id: number,
  name: string,
  depth: number,
  has_content: boolean,
  children
    : Array<TreeNode>
}

export type NodePostForm = {
  node_id: number,
  name: string,
}

export type EnforcementNote = {
  'id': number,
  'name': string,
  'path': string,
  'depth': number,
  'content'?: EnforcementContent,
}

export type EnforcementContent = {
  preface: JSONContent | null, //引言
  sop: Array<EnforcementLink>, //作業程序
  law: Array<EnforcementLink>, // 法規
  files: Array<EnforcementLink>, //檔案
  manual: Array<{ id: string }>, // 犯偵手冊
  procedure: Array<{ id: string }>, //刑訴法
}
export type EnforcementLink = {
  id: string,
  title: string,
  url: string
}
