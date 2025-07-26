import {Link} from "react-router";
import {Col, Row} from "@/component";
import {HtmlTitle} from "@/layout";
import { TbMailDown } from "react-icons/tb";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { FiFilePlus } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";

export default function Home() {
  return (
    <>
      <HtmlTitle title='首頁'/>
      <Row>
        <Col xs={12} md={6} className='px-2 mt-4'>
          <Link to='/out'>
            <div className='card bg-base-100 border border-base-300 hover:border-3'>
              <div className='card-body'>
                <div className='text-3xl font-bold flex justify-center'>
                  <BsFillSendArrowUpFill className='mr-4'/>送出公文
                </div>
                <div className='text-xl font-semibold opacity-50 flex justify-center'>
                  陳報單、公文回覆
                </div>
              </div>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} className='px-2 mt-4'>
          <Link to='/in' className="card mb-3 rounded-3 shadow-lg" style={{textDecoration: 'none'}}>
            <div className='card bg-base-100 border border-base-300 hover:border-3'>
              <div className='card-body'>
                <div className='text-3xl font-bold flex justify-center'>
                  <TbMailDown className='mr-4'/>收受公文
                </div>
                <div className='text-xl font-semibold opacity-50 flex justify-center'>
                  批閱、分派交辦單
                </div>
              </div>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} className='px-2'>
          <Link to='/in' className="card mb-3 rounded-3 shadow-lg" style={{textDecoration: 'none'}}>
            <div className='card bg-base-100 border border-base-300 hover:border-3'>
              <div className='card-body'>
                <div className='text-3xl font-bold flex justify-center'>
                  <FiFilePlus className='mr-4'/>新增陳報單
                </div>
                <div className='text-xl font-semibold opacity-50 flex justify-center'>
                  繕打、列印陳報單
                </div>
              </div>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} className='px-2'>
        <Link to='/setting' className="card mb-3 rounded-3 shadow-lg" style={{textDecoration: 'none'}}>
          <div className='card bg-base-100 border border-base-300 hover:border-3'>
            <div className='card-body'>
              <div className='text-3xl font-bold flex justify-center'>
                <IoSettingsSharp className='mr-4'/>系統設定
              </div>
              <div className='text-xl font-semibold opacity-50 flex justify-center'>
                編輯人員、組別、預設陳報單
              </div>
            </div>
          </div>
        </Link>
      </Col>
      </Row>
    </>
  )
}