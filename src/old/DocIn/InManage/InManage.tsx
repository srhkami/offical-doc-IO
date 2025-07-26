import React, {useEffect, useState} from 'react';
import {Link} from "react-router";
import {Row, Col} from "react-bootstrap";
import {MdOutlineHistory} from "react-icons/md";
import ModalAddIn from "../modals/ModalAddIn.tsx";
import ModalReaded from "../modals/ModalReaded.tsx";
import {useAxios} from "../../../utils/useAxios.ts";
import {ApiResData, DocInDetail, TypeOrderList, UserDetail} from "../../../utils/types.ts";
import {ROOT_IP} from "../../../utils/info.tsx";
import CardDatabaseList, {fetchData} from "@/old/layout/CardDatabaseList.tsx";
import InManageTable, {InManageListMobile} from "./InManageTable.tsx";
import HtmlTitle from "../../../layout/HtmlTitle.tsx";

export default function InManage() {

  const api = useAxios();

  const [pageCount, setPageCount]
    = useState(0) //頁碼總數
  const [data, setData]
    = useState<Array<DocInDetail>>([]); //從API取得的資料，初始值為空
  const [userData, setUserData] = useState<Array<UserDetail>>([]);//從API取得的使用者資料，初始值為空
  const [isLoading, setIsLoading]
    = useState(false); // 是否為載入中的狀態

  // 請求資料
  const requestData = async () => {
    const res = await api({
      method: 'get',
      url: ROOT_IP + '/doc/in/',
      params: {
        page_size: 500, //單頁顯示數量
        page: 1, // 當前頁碼
        status: 0,
      }
    })
    return res.data as ApiResData<DocInDetail[]>
  }// 從API取得資料，並回傳資料的值

  useEffect(() => {
    fetchData(requestData, setData, setPageCount)
  }, [isLoading]);

  useEffect(() => {
    api({
      method: 'GET',
      url: ROOT_IP + '/doc/users/',
      params: {
        ordering: 'area',
      },
    })
      .then(res => {
        setUserData(res.data.results);
      })
  }, []);

  const orderList: TypeOrderList = [
    {text: '最先', param: {ordering: 'id'}},
    {text: '最後', param: {ordering: '-id'}},
  ]

  return (
    <>
      <HtmlTitle title='待批公文'/>
      <Row>
        <Col xs='12' className='mb-3 d-flex'>
          <ModalAddIn setIsLoading={setIsLoading}/>
          <ModalReaded setIsLoading={setIsLoading}/>
          <Link to='history/1?ordering=-id' className="btn btn-sm btn-secondary ms-3 my-auto d-flex">
            <MdOutlineHistory className='i-12 me-1 my-auto'/>
            查閱收文記錄
          </Link>
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
              <>
                <Row className='d-md-none'>
                  <InManageListMobile data={data} userData={userData} setIsLoading={setIsLoading}/>
                </Row>
                <Row className='d-none d-md-block'>
                  <InManageTable data={data} userData={userData} setIsLoading={setIsLoading}/>
                </Row>
              </>
            }
            path='/out/history/'
            pageCount={pageCount}
            pageNumber={1}
          />
        </Col>
      </Row>
    </>
  )
}