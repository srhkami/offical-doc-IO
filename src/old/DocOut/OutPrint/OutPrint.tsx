import React, {useEffect, useState, useRef} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {useParams} from "react-router";
import {useReactToPrint} from 'react-to-print'
import OutPrintTable from "./OutPrintTable.tsx";
import {IoArrowBackOutline} from "react-icons/io5";
import {IoMdPrint} from "react-icons/io";
import {MDBBtn} from "mdb-react-ui-kit";
import {getDate} from "@/utils/getDate.js";
import {ROOT_IP} from "../../../utils/info.tsx";
import {useAxios} from "../../../utils/useAxios.js";
import {DocOutDetail} from "../../../utils/types.ts";
import toast from "react-hot-toast";
import {handleError} from "../../../utils/handleError.ts";
import HtmlTitle from "../../../layout/HtmlTitle.tsx";


export default function OutPrint() {

  const api = useAxios();
  const {date} = useParams()

  const today = getDate().today
  const [data, setData] = useState<Array<DocOutDetail>>([]);
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({contentRef})

  useEffect(() => {
    toast.loading('載入中，請稍候...')
    const params = date === '0' ? {status: 0, ordering: 'groupName'} : {
      sendDate: date,
      status: 1,
      ordering: 'groupName'
    }
    api({
      method: 'GET',
      url: ROOT_IP + '/doc/out/',
      params: params,
    })
      .then(res => {
        setData(res.data.results);
        toast.dismiss()
      })
      .catch(err => handleError(err));
  }, []);

  return (
    <>
      <HtmlTitle title='列印送文簿'/>
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
        </Col>
        <Col xs='12' ref={contentRef} className='py-4'>
          <Card className='p-0 shadow-0 rounded-3'>
            <Card.Header className='d-flex'>
              <h3 className="fw-bolder text-primary my-auto">
                民興派出所送文簿
              </h3>
              <h4 className='fw-medium ms-auto my-auto'>
                {date}
              </h4>
            </Card.Header>
            <Card.Body>
              <OutPrintTable data={data}/>
              <div className='text-secondary'>
                ※ 公文經簽收後，請妥善保存此表，以利事後檢閱。
                {date !== today && `(此表為${getDate().today}重新列印)`}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}