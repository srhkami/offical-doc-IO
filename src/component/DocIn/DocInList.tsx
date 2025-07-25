import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router";
import {Row, Col} from "react-bootstrap";
import {MdOutlineHistory} from "react-icons/md";
import ModalAddIn from "./modals/ModalAddIn.js";
import ModalReaded from "./modals/ModalReaded.js";
import {useAxios} from "../../utils/useAxios.ts";
import {ApiResData, DocInDetail, TypeOrderList, UserDetail} from "../../utils/types.ts";
import {ROOT_IP} from "../../utils/info.tsx";
import CardDatabaseList, {fetchData} from "../layout/CardDatabaseList.tsx";
import InManageTable, {InManageListMobile} from "./InManage/InManageTable.tsx";
import HtmlTitle from "../../layout/HtmlTitle.tsx";
import {getQueryParams} from "../../utils/url.ts";
import toast from "react-hot-toast";
import ModalSelectDate from "../tools/ModalSelectDate.tsx";
import {IoArrowBackOutline} from "react-icons/io5";
import InHistoryTable from "./InHistory/InHistoryTable.tsx";

type Props = {
  isHistory?: boolean, // 是否為歷史模式
}

export default function DocInList({isHistory = false}: Props) {

  const api = useAxios();
  const {pageNumber} = useParams(); // 網址的頁碼參數
  const location = useLocation();
  const params = getQueryParams(location.search);

  const [pageCount, setPageCount]
    = useState(0) //頁碼總數
  const [data, setData]
    = useState<Array<DocInDetail>>([]); //從API取得的資料，初始值為空
  const [userData, setUserData] = useState<Array<UserDetail>>([]);//從API取得的使用者資料，初始值為空
  const [loading, setLoading]
    = useState(false); // 切換載入中狀態

  // 請求資料
  const requestData = async () => {
    const res = await api({
      method: 'get',
      url: ROOT_IP + '/doc/in/',
      params: {
        ...params,
        page_size: 50, //單頁顯示數量
        page: pageNumber, // 當前頁碼
        status: isHistory ? 1 : 0,
      }
    })
    return res.data as ApiResData<DocInDetail[]>
  }// 從API取得資料，並回傳資料的值

  const requestUser = async () => {
    const res = await api({
      method: 'GET',
      url: ROOT_IP + '/doc/users/',
      params: {
        ordering: 'area',
      },
    })
    return res.data as ApiResData<Array<UserDetail>>
  }

  useEffect(() => {
    fetchData(requestData, setData, setPageCount)
  }, [location, pageNumber, loading]);

  useEffect(() => {
    toast.promise(
      async () => {
        const data = await requestUser();
        setUserData(data.results);
      },
      {
        loading: '載入中...',
        error: '取得成員資料錯誤',
      }
    )
      .catch(err => console.log(err));
  }, []);

  const orderList: TypeOrderList = [
    {text: '最後新增(預設)', param: {ordering: '-id'}},
    {text: '最先新增', param: {ordering: 'id'}},
    {text: '組別', param: {ordering: 'groupName'}}
  ]

  return (
    <>
      <HtmlTitle title={isHistory ? '收文紀錄' : '待批公文'}/>
      <Row>
        <Col xs='12' className='mb-3 d-flex'>
          {isHistory ?
            <>
              <Link to='/in/add/1' className="btn btn-sm btn-secondary d-flex">
                <IoArrowBackOutline className='me-1 my-auto'/>
                返回新增頁
              </Link>
              <ModalSelectDate mode='in'/>
            </>
            :
            <>
              <ModalAddIn setLoading={setLoading}/>
              <ModalReaded setLoading={setLoading}/>
              <Link to='/in/history/1?ordering=-id' className="btn btn-sm btn-secondary ms-3 my-auto d-flex">
                <MdOutlineHistory className='i-12 me-1 my-auto'/>
                查閱收文記錄
              </Link>
            </>
          }
        </Col>
        <Col xs='12'>
          <CardDatabaseList
            params={{}}
            header={
              <h4 className="fw-bolder m-0 my-auto">
                待批公文
              </h4>
            }
            orderList={orderList}
            table={
              isHistory ?
                <InHistoryTable data={data}/>
                :
                <>
                  <Row className='d-md-none'>
                    <InManageListMobile data={data} userData={userData} setLoading={setLoading}/>
                  </Row>
                  <Row className='d-none d-md-block'>
                    <InManageTable data={data} userData={userData} setLoading={setLoading}/>
                  </Row>
                </>
            }
            path={isHistory ? '/in/history/' : '/in/add/' }
            pageCount={pageCount}
            pageNumber={1}
          />
        </Col>
      </Row>
    </>
  )
}