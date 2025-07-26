import {Card, Col, Row, Table} from "react-bootstrap";
import {FaUserCog} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {ROOT_IP} from "../../utils/info.tsx";
import ModalAddUser from "./ModalAddUser.tsx";
import ModalEditUser from "./ModalEditUser.tsx";
import {UserDetail} from "../../utils/types.ts";
import {useAxios} from "../../utils/useAxios.ts";
import CardUser from "@/old/tools/CardUser.tsx";

export default function SettingUser() {

  const api = useAxios();

  const [data, setData] = useState<Array<UserDetail>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api({
      method: 'GET',
      url: ROOT_IP + '/doc/users/',
      params: {
        ordering: 'area',
      },
    })
      .then(res => {
        setData(res.data.results);
      })
      .catch(err => console.log(err))
  }, [isLoading]);

  const cardList = data.map(obj => {
    return (
      <Col xs={12} key={obj.id} className='my-1'>
        <CardUser
          obj={obj}
          header={<ModalEditUser obj={obj} setIsLoading={setIsLoading}/>}
        />
      </Col>
    )
  })

  return (
    <Card className='p-0 shadow-lg rounded-3'>
      <Card.Header className='d-flex'>
        <FaUserCog className='me-2 my-auto i-18'/>
        <h3 className="fw-bolder m-0 my-auto">
          承辦人設定
        </h3>
        <ModalAddUser setIsLoading={setIsLoading}/>
      </Card.Header>
      <Card.Body>
        {/*<Table hover>*/}
        {/*  <thead>*/}
        {/*  <tr>*/}
        {/*    <th scope="col" className='text-center'>姓名</th>*/}
        {/*    <th scope="col" className='text-center'>勤區</th>*/}
        {/*    <th scope="col" className='text-center'>業務</th>*/}
        {/*    <th scope="col" className='text-center'>操作</th>*/}
        {/*  </tr>*/}
        {/*  </thead>*/}
        {/*  <tbody>*/}
        {/*  {dataList}*/}
        {/*  </tbody>*/}
        {/*</Table>*/}
        <Row>
          {cardList}
        </Row>
      </Card.Body>
    </Card>
  )
}