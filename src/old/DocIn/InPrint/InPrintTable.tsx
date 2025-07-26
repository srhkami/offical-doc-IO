import {Table} from "react-bootstrap";
import React from "react";
import {DocInDetail} from "../../../utils/types.ts";

type Props = {
  data: Array<DocInDetail>,
}

export default function InPrintTable({data}: Props) {

  const dataList = data.map((obj) => {
    return (
      <tr key={obj.id} className='p-2'>
        <th className='text-center p-2'>{obj.groupName}</th>
        <td className='text-center p-2'>{obj.number}</td>
        <td className='p-2'>{obj.title}</td>
        <td className='text-center p-2'>{obj.readDate}</td>
        <td className='text-center p-2'>{obj.username}</td>
      </tr>
    )
  })


  return (
    <Table bordered>
      <thead>
      <tr className='text-center'>
        <th scope="col" style={{width: '10%'}}>組別</th>
        <th scope="col" style={{width: '10%'}}>收文號</th>
        <th scope="col" style={{width: '38%'}}>主旨</th>
        <th scope="col" style={{width: '15%'}}>批閱日期</th>
        <th scope="col" style={{width: '12%'}}>承辦人</th>
      </tr>
      </thead>
      <tbody>
      {dataList}
      </tbody>
    </Table>
  )
}