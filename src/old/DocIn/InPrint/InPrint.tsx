import React, {useEffect, useState, useRef} from "react";
import {Card, Col, Row,} from "react-bootstrap";
import {useParams} from "react-router";
import {useReactToPrint} from 'react-to-print'
import {IoArrowBackOutline} from "react-icons/io5";
import {IoMdPrint} from "react-icons/io";
import {MDBBtn} from "mdb-react-ui-kit";
import {ROOT_IP} from "../../../utils/info.tsx";
import {useAxios} from "../../../utils/useAxios.ts";
import toast from "react-hot-toast";
import {ApiResData, DocInDetail} from "../../../utils/types.ts";
import InPrintTable from "./InPrintTable.tsx";
import HtmlTitle from "../../../layout/HtmlTitle.tsx";


export default function InPrint() {

  const api = useAxios();
  const {date} = useParams()

  const [data, setData] = useState<Array<DocInDetail>>([]);
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({contentRef})

  const requestData = async () => {
    const params = {receiveDate: date, ordering: 'groupName'}
    const res = await api({
      method: 'GET',
      url: ROOT_IP + '/doc/in/',
      params: params,
    })
    return res.data as ApiResData<Array<DocInDetail>>
  }

  useEffect(() => {
    toast.promise(
      requestData,
      {
        loading: '載入中...',
        error: '載入失敗，請重試'
      }
    )
      .then(data => setData(data.results))
      .catch(err => console.log(err));
  }, [date]);

  return (
    <>
      <HtmlTitle title='收文簿列印'/>
      <Row>
        <Col xs='12' className='ms-3 d-flex'>
          <MDBBtn color='secondary' size='sm' className='d-flex' onClick={() => window.history.back()}>
            <IoArrowBackOutline className='me-1 my-auto'/>
            返回
          </MDBBtn>
          <MDBBtn className='ms-3 d-flex' size='sm' onClick={handlePrint}>
            <IoMdPrint className='me-1 i-12 my-auto'/>
            列印
          </MDBBtn>
          {/*{date === '0' && <ModalSendOut}/>}*/}
        </Col>
        <Col xs='12' ref={contentRef} className='py-4'>
          <Card className='p-0 shadow-0 rounded-3'>
            <Card.Header className='d-flex'>
              <h3 className="fw-bolder text-primary my-auto">
                民興派出所收文簿
              </h3>
              <h4 className='fw-medium ms-auto my-auto'>
                {date}
              </h4>
            </Card.Header>
            <Card.Body>
              <InPrintTable data={data}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}