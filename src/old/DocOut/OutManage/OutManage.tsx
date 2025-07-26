import React, {useEffect, useState} from 'react';
import {Link} from "react-router";
import {Row, Col} from "react-bootstrap";
import ModalAddOut from "@/features/DocOut/modals/ModalAddOut.tsx";
import ModalSendOut from "@/features/DocOut/modals/ModalSendOut.tsx";
import {MdOutlineHistory} from "react-icons/md";
import {useAxios} from "../../../utils/useAxios.js";
import {ApiResData, DocOutDetail, TypeOrderList} from "../../../utils/types.ts";
import {ROOT_IP} from "../../../utils/info.tsx";
import CardDatabaseList, {fetchData} from "@/old/layout/CardDatabaseList.tsx";
import OutManageTable, {OutManageListMobile} from "./OutManageTable.tsx";
import HtmlTitle from "../../../layout/HtmlTitle.tsx";

export default function OutManage() {

  const api = useAxios();

  const [pageCount, setPageCount]
    = useState(0) //頁碼總數
  const [data, setData]
    = useState<Array<DocOutDetail>>([]); //從API取得的資料，初始值為空
  const [isLoading, setIsLoading]
    = useState(false); // 是否為載入中的狀態

  // 請求資料
  const requestData = async () => {
    const res = await api({
      method: 'get',
      url: ROOT_IP + '/doc/out/',
      params: {
        page_size: 500, //單頁顯示數量
        page: 1, // 當前頁碼1
        status: 0,
      }
    })
    return res.data as ApiResData<DocOutDetail[]>
  }// 從API取得資料，並回傳資料的值

  useEffect(() => {
    fetchData<DocOutDetail>(requestData, setData, setPageCount)
  }, [isLoading]);


  const orderList: TypeOrderList = [
    {text: '最早', param: {ordering: 'id'}},
    {text: '最後', param: {ordering: '-id'}},
  ]

  return (
    <>
      <HtmlTitle title='待送公文'/>
      <Row>
        <Col xs='12' className='mb-3 d-flex'>
          <ModalAddOut setIsLoading={setIsLoading}/>
          <ModalSendOut setIsLoading={setIsLoading}/>
          <Link to='history/1?ordering=-id' className="btn btn-sm btn-secondary ms-3 my-auto d-flex">
            <MdOutlineHistory className='i-12 me-1 my-auto'/>
            查閱送文記錄
          </Link>
        </Col>
        <Col xs='12'>
          <CardDatabaseList
            params={{}}
            header={
              <h4 className="fw-bolder m-0 my-auto">
                待送公文
              </h4>
            }
            orderList={orderList}
            table={
              <>
                <Row className='d-md-none'>
                  <OutManageListMobile data={data} setIsLoading={setIsLoading}/>
                </Row>
                <Row className='d-none d-md-block'>
                  <OutManageTable data={data} setIsLoading={setIsLoading}/>
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