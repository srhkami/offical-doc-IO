import {useEffect, useState, useRef} from "react";
import {useNavigate, useParams} from "react-router";
import {useReactToPrint} from 'react-to-print'
import OutPrintTable from "./OutPrintTable.tsx";
import {IoArrowBackOutline} from "react-icons/io5";
import {getDate} from "@/utils/getDate.ts";
import {useAxios} from "@/hooks";
import type {DocOutDetail} from "@/types/doc-types.ts";
import {showToast} from "@/utils/handleToast.ts";
import {ROOT_IP} from "@/utils/info.ts";
import {HtmlTitle} from "@/layout";
import {BottomBar, BottomButton, BottomMainButton, Col, Row} from "@/component";
import {LuPrinterCheck} from "react-icons/lu";

export default function OutPrint() {

  const api = useAxios();
  const {date} = useParams()
  const navi = useNavigate();

  const today = getDate().today
  const [data, setData] = useState<Array<DocOutDetail>>([]);
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({contentRef})

  useEffect(() => {
    const params = date === '0' ? {status: 0, ordering: 'groupName'} : {
      sendDate: date,
      status: 1,
      ordering: 'groupName'
    }
    showToast(
      api({
        method: 'GET',
        url: ROOT_IP + '/doc/out/',
        params: params,
      }), {baseText: '載入'}
    )
      .then(res => setData(res.data.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <HtmlTitle title='列印送文簿'/>
      <div className='card card-border border-base-300 overflow-hidden'>
        <div ref={contentRef} className='card-body'>
          <Row>
            <Col xs={12} className='flex items-center'>
              <h4 className='text-2xl font-bold'>民興派出所送文清冊</h4>
              <h4 className='text-xl ml-2'>{date}</h4>
            </Col>
          </Row>
          <div className='divider m-0'></div>
          <OutPrintTable data={data}/>
          <div className='text-secondary mt-2'>
            ※ 公文經簽收後，請妥善保存此表，以利事後檢閱。
            {date !== today && `(此表為${getDate().today}重新列印)`}
          </div>
        </div>
      </div>
      <BottomBar mainButton={
        <BottomMainButton color='success' onClick={handlePrint} label='列印'>
          <LuPrinterCheck className='text-xl'/>
        </BottomMainButton>
      }>
        <BottomButton onClick={() => navi(-1)} label='返回'>
          <IoArrowBackOutline className='text-xl'/>
        </BottomButton>
      </BottomBar>
    </>
  )
}