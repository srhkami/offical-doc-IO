import type {DocOutDetail} from "@/types/doc-types.ts";

type Props = {
  readonly data: Array<DocOutDetail>,
}

export default function OutPrintTable({data}: Props) {

  const dataList = data.map((doc) => {
    return (
      <tr key={doc.id}>
        <th scope="row" className='text-center p-2'>{doc.number}</th>
        <td className='text-center p-2'>{doc.groupName}</td>
        <td className='text-center p-2'>{doc.username}</td>
        <td className='p-2'>{doc.title}</td>
        <td className='p-2'></td>
      </tr>
    )
  })

  return (
    <table className='table'>
      <thead>
      <tr className='text-center py-2'>
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
    </table>
  )
}