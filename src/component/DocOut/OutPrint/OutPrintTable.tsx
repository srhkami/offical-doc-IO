import {Table} from "react-bootstrap";
import React from "react";
import {DocOutDetail} from "../../../utils/types.ts";

type Props = {
  data: Array<DocOutDetail>,
}

export default function OutPrintTable({data}: Props) {

  const dataList = data.map((obj) => {
    return (
      <tr key={obj.id} className='p-2'>
        <th scope="row" className='text-center p-2'>{obj.number}</th>
        <td className='text-center p-2'>{obj.groupName}</td>
        <td className='text-center p-2'>{obj.username}</td>
        <td className='p-2'>{obj.title}</td>
        <td className='p-2'></td>
      </tr>
    )
  })

  return (
    <Table bordered>
      <thead>
      <tr className='text-center'>
        <th scope="col" style={{width: '12%'}}>送文號</th>
        <th scope="col" style={{width: '12%'}}>組別</th>
        <th scope="col" style={{width: '15%'}}>承辦人</th>
        <th scope="col" style={{width: '46%'}}>主旨</th>
        <th scope="col" style={{width: '15%'}}>簽收</th>
      </tr>
      </thead>
      <tbody>
      {dataList}
      </tbody>
    </Table>
  )
}