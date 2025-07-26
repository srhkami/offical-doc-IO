import {useEffect, useState} from 'react';
import HtmlTitle from "../../layout/HtmlTitle.tsx";
import {BottomButton, DataViewPage} from "@/component";
import {ROOT_IP} from '@/utils/info.ts';
import type {DocOutDetail, TypeOrderList} from "@/types/doc-types.ts";
import type {ApiResData} from "@/types/api-types.ts";
import {useAxios} from "@/hooks";
import {fetchData} from "@/component/DataViewPage/handleFetchData.ts";
import {MdHistory} from "react-icons/md";
import {useNavigate} from "react-router";
import {ModalSendOut} from "@/features/DocOut/modals/ModalSendOut.tsx";
import ModalAddOut from "@/features/DocOut/modals/ModalAddOut.tsx";
import {FaFileCircleExclamation} from "react-icons/fa6";
import ModalRevoke from "@/features/DocOut/modals/ModalRevoke.tsx";

export default function OutManage() {

  const api = useAxios();
  const navi = useNavigate();

  const [pageCount, setPageCount] = useState(0) //頁碼總數
  const [data, setData] = useState<Array<DocOutDetail>>([]); //從API取得的資料，初始值為空
  const [reload, setReload] = useState(false); // 是否為載入中的狀態

  // 請求資料
  const requestData = async () => {
    const res = await api({
      method: 'get',
      url: ROOT_IP + '/doc/out/',
      params: {
        page_size: 999, //單頁顯示數量
        page: 1, // 當前頁碼1
        status: 0,
      }
    })
    return res.data as ApiResData<DocOutDetail[]>
  }// 從API取得資料，並回傳資料的值

  useEffect(() => {
    fetchData<DocOutDetail>(requestData, setData, setPageCount)
  }, [reload]);


  const orderList: TypeOrderList = [
    {text: '最早', param: {ordering: 'id'}},
    {text: '最後', param: {ordering: '-id'}},
  ]

  const dataList = data.map(doc => {
      return (
        <li key={doc.id} className='list-row hover:bg-base-200'>
          <div className='flex items-center justify-center'>
            <FaFileCircleExclamation className='text-xl text-info'/>
          </div>
          <div className="list-col-grow">
            <div className='flex items-center'>
              <span className='font-bold text-primary mr-2'>{doc.number}</span>
              <div className='text-secondary'>{doc.username}（{doc.groupName}）</div>
            </div>
            <div className="text-xs uppercase opacity-60">{doc.title}</div>
          </div>
          <ModalRevoke id={doc.id} setReload={setReload}/>
        </li>
      )
    }
  )

  return (
    <>
      <HtmlTitle title='待送公文'/>
      <DataViewPage
        header={
          <h4 className="text-2xl font-bold">
            待送公文
          </h4>
        }
        placeholder='搜尋標題/組別/承辦人'
        orderList={orderList}
        pageOption={{count: pageCount, show: 3}}
        mainButton={
          <ModalSendOut setReload={setReload}/>
        }
        bottomButtons={
          <>
            <ModalAddOut setReload={setReload}/>
            <BottomButton title='送文紀錄'
                          onClick={() => navi('/out/history/1?ordering=-id')}>
              <MdHistory className='text-xl'/>
            </BottomButton>
          </>
        }
      >
        <ul className='list'>
          {dataList}
        </ul>
      </DataViewPage>
    </>
  )
}