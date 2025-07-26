import {useEffect, useState, useRef} from "react";
import {useNavigate, useParams} from "react-router";
import {useReactToPrint} from 'react-to-print';
import {IoArrowBackOutline} from "react-icons/io5";
import {useAxios} from "@/hooks";
import type {DocInDetail} from "@/types/doc-types.ts";
import {showToast} from "@/utils/handleToast.ts";
import {ROOT_IP} from "@/utils/info.ts";
import {HtmlTitle} from "@/layout";
import {BottomBar, BottomButton, BottomMainButton, Col, Row} from "@/component";
import {LuPrinterCheck} from "react-icons/lu";
import InPrintTable from "./InPrintTable";

export default function InPrint() {

  const api = useAxios();
  const {date} = useParams()
  const navi = useNavigate();

  const [data, setData] = useState<Array<DocInDetail>>([]);
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({contentRef})

  useEffect(() => {
    const params = date === '0' ? {status: 0, ordering: 'groupName'} : {
      receiveDate: date,
      status: 1,
      ordering: 'groupName'
    }
    showToast(
      api({
        method: 'GET',
        url: ROOT_IP + '/doc/in/',
        params: params,
      }), {baseText: '載入'}
    )
      .then(res => setData(res.data.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <HtmlTitle title='列印收文簿'/>
      <div className='card card-border border-base-300 overflow-hidden'>
        <div ref={contentRef} className='card-body'>
          <Row>
            <Col xs={12} className='flex items-center'>
              <h4 className='text-2xl font-bold'>民興派出所收文清冊</h4>
              <h4 className='text-xl ml-2'>{date}</h4>
            </Col>
          </Row>
          <div className='divider m-0'></div>
          <InPrintTable data={data}/>
        </div>
      </div>
      <BottomBar mainButton={
        <BottomMainButton color='success' onClick={handlePrint}>
          <LuPrinterCheck className='text-xl'/>
        </BottomMainButton>
      }>
        <BottomButton onClick={() => navi(-1)}>
          <IoArrowBackOutline className='text-xl'/>
        </BottomButton>
      </BottomBar>
    </>
  )
}