import {useEffect, useState} from 'react';
import HtmlTitle from "../../layout/HtmlTitle.tsx";
import {BottomButton, DataViewPage} from "@/component";
import {ROOT_IP} from '@/utils/info.ts';
import type {DocOutDetail, TypeOrderList} from "@/types/doc-types.ts";
import type {ApiResData} from "@/types/api-types.ts";
import {useAxios} from "@/hooks";
import {fetchData} from "@/component/DataViewPage/handleFetchData.ts";
import {useNavigate, useParams, useSearchParams} from "react-router";
import {IoArrowBackOutline} from "react-icons/io5";
import {ModalSelectDate} from "@/features";
import {FaFileCircleCheck, FaFileCircleExclamation,FaFileCircleXmark} from "react-icons/fa6";
import ModalOutDetail from "@/features/DocOut/modals/ModalOutDetail.tsx";

export default function OutManage() {

  const api = useAxios();
  const navi = useNavigate();
  const {page} = useParams();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);   // 解析params，轉換為物件

  const [pageCount, setPageCount] = useState(0) //頁碼總數
  const [data, setData] = useState<Array<DocOutDetail>>([]); //從API取得的資料，初始值為空


  // 請求資料
  const requestData = async () => {
    const res = await api({
      method: 'get',
      url: ROOT_IP + '/doc/out/',
      params: {
        ...params,
        page_size: 30, //單頁顯示數量
        page: page, // 當前頁碼
      }
    })
    return res.data as ApiResData<DocOutDetail[]>
  }// 從API取得資料，並回傳資料的值

  useEffect(() => {
    fetchData<DocOutDetail>(requestData, setData, setPageCount)
  }, [searchParams, page]);


  const orderList: TypeOrderList = [
    {text: '最早', param: {ordering: 'id'}},
    {text: '最後', param: {ordering: '-id'}},
  ]

  const dataList = data.map(doc => {
      return (
        <li key={doc.id} className='list-row hover:bg-base-200'>
          <div className='flex items-center justify-center'>
            {doc.status === 0 &&
              <FaFileCircleExclamation className='text-xl text-info'/>
            }
            {doc.status === 1 &&
              <FaFileCircleCheck className='text-xl text-success'/>
            }
            {doc.status === 2 &&
              <FaFileCircleXmark className='text-xl text-error'/>
            }
          </div>
          <div className="list-col-grow">
            <div className='flex items-center'>
              <span className='font-bold text-primary mr-2'>{doc.number}</span>
              <div className='text-secondary'>{doc.username}（{doc.groupName}）</div>
            </div>
            <div className="text-xs uppercase opacity-60">{doc.title}</div>
          </div>
          <ModalOutDetail doc={doc}/>
        </li>
      )
    }
  )

  return (
    <>
      <HtmlTitle title='/送文紀錄'/>
      <DataViewPage
        header={
          <h4 className="text-2xl font-bold">
            送文紀錄
          </h4>
        }
        placeholder='搜尋標題/組別/承辦人'
        orderList={orderList}
        pageOption={{count: pageCount, show: 2}}
        mainButton={
          <ModalSelectDate mode='out'/>
        }
        bottomButtons={
          <BottomButton onClick={() => navi('/out')} title='返回'>
            <IoArrowBackOutline className='text-xl'/>
          </BottomButton>
        }
      >
        <ul className='list'>
          {dataList}
        </ul>
      </DataViewPage>
    </>
  )
}