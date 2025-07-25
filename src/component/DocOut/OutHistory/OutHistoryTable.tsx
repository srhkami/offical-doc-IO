import {MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import React from "react";

export default function OutHistoryTable({data}){

  const dataList = data.map((obj) => {
      return (
        <tr key={obj.id}>
          <th scope="row">{obj.number}</th>
          <td>{obj.groupName}</td>
          <td>{obj.title}</td>
          <td>{obj.username}</td>
          <td>{obj.reportDate}</td>
          <td>{obj.sendDate}</td>
          <td>
            {obj.status_display}
          </td>
        </tr>
      )
    })

  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope="col">送文號</th>
          <th scope="col">組別</th>
          <th scope="col">主旨</th>
          <th scope="col">承辦人</th>
          <th scope="col">陳報日期</th>
          <th scope="col">送文日期</th>
          <th scope="col">狀態</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {dataList}
      </MDBTableBody>
    </MDBTable>
  )

}