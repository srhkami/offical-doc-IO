import React, {Dispatch, SetStateAction} from "react";
import {MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";
import {DocOutDetail} from "../../../utils/types.ts";
import {Card, Col} from "react-bootstrap";
import ModalRevoke from "@/features/DocOut/modals/ModalRevoke.tsx";

type Props = {
  readonly data: Array<DocOutDetail>,
  readonly setIsLoading: Dispatch<SetStateAction<boolean>>,
}


export default function OutManageTable({data, setIsLoading}: Props) {

  const dataList = data.map((obj) => {
    return (
      <tr key={obj.id}>
        <th scope="row" className='text-center'>{obj.number}</th>
        <td className='text-center'>{obj.username}</td>
        <td className='text-center'>{obj.groupName}</td>
        <td>{obj.title}</td>
        <td className='d-flex justify-content-center'>
          <ModalRevoke id={obj.id} setIsLoading={setIsLoading}/>
        </td>
      </tr>
    )
  })

  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope="col" style={{ width:'15%'}} className='text-center'>送文號</th>
          <th scope="col" style={{ width:'12%'}} className='text-center'>承辦人</th>
          <th scope="col" style={{ width:'10%'}} className='text-center'>組別</th>
          <th scope="col" style={{ width:'48%'}} className='text-center'>主旨</th>
          <th scope="col" style={{ width:'15%'}} className='text-center'>操作</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {dataList}
      </MDBTableBody>
    </MDBTable>
  )
}


export function OutManageListMobile({data, setIsLoading}:Props) {

  const dataList = data.map(obj => {
    return (
      <Col xs={12} md={6} lg={4} key={obj.id} className='mb-3'>
        <Card className='bg-body-secondary'>
          <Card.Body className='p-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <div className='fw-bold text-primary'>{obj.number}</div>
                <div className='text-secondary'>{obj.username}（{obj.groupName}）</div>
              </div>
              <div className='d-flex mb-auto'>
                <ModalRevoke id={obj.id} setIsLoading={setIsLoading}/>
              </div>
            </div>
            <div className=''>{obj.title}</div>
          </Card.Body>
        </Card>
      </Col>
    )

  })
  return <>{dataList}</>
}