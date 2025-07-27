import {Link} from "react-router";
import {Col, Row} from "@/component";
import {HtmlTitle} from "@/layout";
import {TbMailDown} from "react-icons/tb";
import {BsFillSendArrowUpFill} from "react-icons/bs";
import {FiFilePlus} from "react-icons/fi";
import {IoSettingsSharp} from "react-icons/io5";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <>
      <HtmlTitle title='首頁'/>
      <Row>
        <Col xs={12} md={6} className='px-2 mt-4'>
          <Link to='/out'>
            <div className='card bg-base-100 border-2 border-base-300 hover:border-primary'>
              <div className='card-body'>
                <div className='text-3xl font-bold flex justify-center items-center'>
                  <BsFillSendArrowUpFill className='mr-4'/>送公文
                </div>
                <div className='text-xl font-semibold opacity-50 flex justify-center'>
                  陳報單、公文回覆
                </div>
              </div>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} className='px-2 mt-4'>
          <Link to='/in' className="card mb-3 rounded-3 shadow-lg">
            <div className='card bg-base-100 border-2 border-base-300 hover:border-primary'>
              <div className='card-body'>
                <div className='text-3xl font-bold flex justify-center items-center'>
                  <TbMailDown className='mr-4'/>收公文
                </div>
                <div className='text-xl font-semibold opacity-50 flex justify-center'>
                  批閱、分派交辦單
                </div>
              </div>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} className='px-2'>
          <Link to='/' className="card mb-3 rounded-3 shadow-lg" onClick={()=>toast.error('本功能尚未加入')}>
            <div className='card bg-base-100 border-2 border-base-300 hover:border-error'>
              <div className='card-body'>
                <div className='text-3xl font-bold flex justify-center items-center'>
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
          <Link to='/setting' className="card mb-3 rounded-3 shadow-lg">
            <div className='card bg-base-100 border-2 border-base-300 hover:border-primary'>
              <div className='card-body'>
                <div className='text-3xl font-bold flex justify-center items-center'>
                  <IoSettingsSharp className='mr-4'/>系統設定
                </div>
                <div className='text-xl font-semibold opacity-50 flex justify-center'>
                  編輯人員、組別、預設陳報單
                </div>
              </div>
            </div>
          </Link>
        </Col>
        <Col xs={12} className='divider text-sm opacity-70 font-semibold'>
          可使用本所帳號直接瀏覽以下網站資源
        </Col>
        <Col xs={12} md={6} className='px-2'>
          <Link to='https://pigeonhand.tw' className="card mb-3 rounded-3 shadow-lg">
            <div className='card bg-base-100 border-2 border-base-300 hover:border-primary'>
              <div className='card-body'>
                <div className='text-3xl font-bold flex justify-center items-center'>
                  <img src='/Logo_PH.png' alt="" className='w-8 h-8 mr-4'/>
                  前往「鴿手」
                </div>
                <div className='text-xl font-semibold opacity-50 flex justify-center'>
                  查詢行政、刑事相關資料及法規
                </div>
              </div>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} className='px-2'>
          <Link to='https://traffic.pigeonhand.tw/' className="card mb-3 rounded-3 shadow-lg">
            <div className='card bg-base-100 border-2 border-base-300 hover:border-primary'>
              <div className='card-body'>
                <div className='text-3xl font-bold flex justify-center items-center'>
                  <img src="/Logo_TP.png" alt="" className='w-8 h-8 mr-4'/>
                  前往「交通鴿手」
                </div>
                <div className='text-xl font-semibold opacity-50 flex justify-center'>
                  查詢交通相關法規、函釋
                </div>
              </div>
            </div>
          </Link>
        </Col>
      </Row>
    </>
  )
}