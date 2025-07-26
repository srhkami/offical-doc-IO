import React, {useEffect, useState} from 'react';
import {Row, Col} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {IoArrowBackOutline} from "react-icons/io5";
import ModalSelectDate from "@/old/tools/ModalSelectDate.tsx";
import {useLocation, useParams} from "react-router";
import {ROOT_IP} from "../../../utils/info.tsx";
import {useAxios} from "../../../utils/useAxios.ts";
import {ApiResData, DocInDetail, TypeOrderList} from "../../../utils/types.ts";
import CardDatabaseList, {fetchData} from "@/old/layout/CardDatabaseList.tsx";
import {getQueryParams} from "../../../utils/url.ts";
import InHistoryTable from "./InHistoryTable.tsx";
import HtmlTitle from "../../../layout/HtmlTitle.tsx";

export default function InHistory() {

  const api = useAxios();
  const {pageNumber} = useParams(); // 網址的頁碼參數
  const location = useLocation();
  const params = getQueryParams(location.search);

  const [pageCount, setPageCount]
    = useState(0) //頁碼總數
  const [data, setData]
    = useState<Array<DocInDetail>>([]); //從API取得的資料，初始值為空

  // 請求資料
  const requestData = async () => {
    const res = await api({
      method: 'get',
      url: ROOT_IP + '/doc/in/',
      params: {
        ...params,
        page_size: 30, //單頁顯示數量
        page: pageNumber, // 當前頁碼
      }
    })
    return res.data as ApiResData<DocInDetail[]>
  }// 從API取得資料，並回傳資料的值

  useEffect(() => {
    fetchData<DocInDetail>(requestData, setData, setPageCount)
  }, [location, pageNumber]);


  const orderList: TypeOrderList = [
    {text: '最先', param: {ordering: 'id'}},
    {text: '最後', param: {ordering: '-id'}},
  ]


  return (
    <>
      <HtmlTitle title='收文紀錄'/>
      <Row>
        <Col xs='12' className='mb-3 d-flex'>
          <MDBBtn color='secondary' size='sm' className='d-flex' onClick={() => window.history.back()}>
            <IoArrowBackOutline className='me-1 my-auto'/>
            返回
          </MDBBtn>
          <ModalSelectDate mode='in'/>
        </Col>
        <Col xs='12'>
          <CardDatabaseList
            params={params}
            header={
              <h3 className="fw-bolder text-primary m-0">
                收文紀錄
              </h3>
            }
            orderList={orderList}
            table={
              <InHistoryTable data={data}/>
            }
            path='/in/history/'
            pageCount={pageCount}
            pageNumber={pageNumber}
          />
        </Col>
      </Row>
    </>
  )
}