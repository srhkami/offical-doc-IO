import {MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";
import {DocInDetail} from "../../../utils/types.ts";

type Props = {
  readonly data: Array<DocInDetail>,
}


export default function InHistoryTable({data}: Props) {

  const dataList = data.map((obj) => {
    return (
      <tr key={obj.id}>
        <th scope="row">{obj.number}</th>
        <td>{obj.receiveDate}</td>
        <td>{obj.groupName}</td>
        <td>{obj.title}</td>
        <td>{obj.readDate}</td>
        <td>{obj.username}</td>
        <td>{obj.status_display}</td>
      </tr>
    )
  })


  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope="col">字號</th>
          <th scope="col">收文日期</th>
          <th scope="col">組別</th>
          <th scope="col">主旨</th>
          <th scope="col">批閱日期</th>
          <th scope="col">承辦人</th>
          <th scope="col">狀態</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {dataList}
      </MDBTableBody>
    </MDBTable>
  )
}