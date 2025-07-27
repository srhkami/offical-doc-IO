import {useEffect, useState} from 'react';
import {IoArrowBackOutline} from "react-icons/io5";
import ModalSelectDate from "@/features/General/ModalSelectDate.tsx";
import {useNavigate, useParams, useSearchParams} from "react-router";
import HtmlTitle from "../../layout/HtmlTitle.tsx";
import type {DocInDetail, TypeOrderList} from "@/types/doc-types.ts";
import {FaFileCircleCheck, FaFileCircleExclamation} from "react-icons/fa6";
import {BottomButton, DataViewPage} from "@/component";
import {useAxios} from "@/hooks";
import {ROOT_IP} from "@/utils/info.ts";
import type {ApiResData} from "@/types/api-types.ts";
import {fetchData} from "@/component/DataViewPage/handleFetchData.ts";
import ModalInDetail from "@/features/DocIn/modals/ModalInDetail.tsx";

export default function InHistory() {

  const api = useAxios();
  const navi = useNavigate();
  const {page} = useParams();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);   // 解析params，轉換為物件

  const [pageCount, setPageCount] = useState(0) //頁碼總數
  const [data, setData] = useState<Array<DocInDetail>>([]); //從API取得的資料，初始值為空


  // 請求資料
  const requestData = async () => {
    const res = await api({
      method: 'get',
      url: ROOT_IP + '/doc/in/',
      params: {
        ...params,
        page_size: 30, //單頁顯示數量
        page: page, // 當前頁碼
      }
    })
    return res.data as ApiResData<DocInDetail[]>
  }// 從API取得資料，並回傳資料的值

  useEffect(() => {
    fetchData<DocInDetail>(requestData, setData, setPageCount)
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
          </div>
          <div className="list-col-grow">
            <div className='flex items-center'>
              <span className='font-bold text-primary mr-2'>{doc.number}</span>
              <div>{doc.groupName}（{doc.username}）</div>
            </div>
            <div className="text-sm opacity-50">{doc.title}</div>
          </div>
          <ModalInDetail doc={doc}/>
        </li>
      )
    }
  )

  return (
    <>
      <HtmlTitle title='/收文紀錄'/>
      <DataViewPage
        header={
          <h4 className="text-2xl font-bold">
            收文紀錄
          </h4>
        }
        placeholder='搜尋標題/組別/承辦人'
        orderList={orderList}
        pageOption={{count: pageCount, show: 2}}
        mainButton={
          <ModalSelectDate mode='in'/>
        }
        bottomButtons={
          <BottomButton onClick={() => navi('/in')} title='返回'>
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