import React, {Dispatch, SetStateAction} from "react";
import {MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";
import {DocInDetail, UserDetail} from "../../../utils/types.ts";
import ModalAssign from "../modals/ModalAssign.tsx";
import ModalRemove from "../modals/ModalRemove.tsx";
import {Card, Col} from "react-bootstrap";

type Props = {
  readonly data: Array<DocInDetail>,
  readonly userData: Array<UserDetail>,
  readonly setLoading: Dispatch<SetStateAction<boolean>>,
}

  export default function InManageTable({data, userData, setLoading}: Props){

  const dataList = data.map((obj) => {
    return (
      <tr key={obj.id}>
        <th scope="row" className='text-center'>{obj.groupName}</th>
        <td className='text-center'>{obj.number}</td>
        <td>{obj.title}</td>
        <td className='d-flex justify-content-between'>
          <ModalAssign id={obj.id} userData={userData} setLoading={setLoading} username={obj.username}/>
          <ModalRemove id={obj.id} setLoading={setLoading}/>
        </td>
      </tr>
    )
  })

  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope="col" style={{width: '15%'}} className='text-center'>組別</th>
          <th scope="col" style={{width: '15%'}} className='text-center'>字號</th>
          <th scope="col" style={{width: '43%'}} className='text-center'>主旨</th>
          <th scope="col" style={{width: '25%'}} className='text-center'>操作</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {dataList}
      </MDBTableBody>
    </MDBTable>
  )
}



export function InManageListMobile({data, userData, setLoading}: Props) {

  const dataList = data.map(obj => {
    return (
      <Col xs={12} md={6} lg={4} key={obj.id} className='mb-3'>
        <Card className='bg-body-secondary'>
          <Card.Body className='p-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <div className='fw-bold text-primary'>{obj.number}</div>
                <div className='text-secondary'>{obj.groupName}</div>
              </div>
              <div className='d-flex mb-auto'>
                <ModalAssign id={obj.id} userData={userData} setLoading={setLoading}
                             username={obj.username}/>
                <ModalRemove id={obj.id} setLoading={setLoading}/>
              </div>
            </div>
            <div>{obj.title}</div>
          </Card.Body>
        </Card>
      </Col>
    )

  })
  return <>{dataList}</>
}