import type {DocInDetail} from "@/types/doc-types.ts";

type Props = {
  readonly data: Array<DocInDetail>,
}

export default function InPrintTable({data}: Props) {

  const dataList = data.map((doc) => {
    return (
      <tr key={doc.id}>
        <th className='text-center p-2'>{doc.groupName}</th>
        <td className='text-center p-2'>{doc.number}</td>
        <td className='p-2'>{doc.title}</td>
        <td className='text-center p-2'>{doc.readDate}</td>
        <td className='text-center p-2'>{doc.username}</td>
      </tr>
    )
  })

  return (
    <table className='table'>
      <thead>
      <tr className='text-center py-2'>
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
    </table>
  )
}