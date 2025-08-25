import {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {MdHistory} from "react-icons/md";
import ModalAddIn from "@/features/DocIn/modals/ModalAddIn.tsx";
import HtmlTitle from "../../layout/HtmlTitle.tsx";
import {useAxios, useCacheApi} from "@/hooks";
import type {DocInDetail, TypeOrderList, UserDetail} from "@/types/doc-types.ts";
import type {ApiResData} from "@/types/api-types.ts";
import {ROOT_IP} from "@/utils/info.ts";
import {BottomButton, DataViewPage} from "@/component";
import ModalRead from "@/features/DocIn/modals/ModalRead.tsx";
import {FaFileCircleExclamation} from "react-icons/fa6";
import ModalAssign from "@/features/DocIn/modals/ModalAssign.tsx";
import {fetchData} from "@/component/DataViewPage/handleFetchData.ts";
import {TbMailDown} from "react-icons/tb";

export default function InManage() {

  const api = useAxios();
  const navi = useNavigate();

  const [pageCount, setPageCount]
    = useState(0) //頁碼總數
  const [data, setData]
    = useState<Array<DocInDetail>>([]); //從API取得的資料，初始值為空

  const users = useCacheApi<ApiResData<Array<UserDetail>>>(ROOT_IP + '/doc/users/?ordering=area')

  // const [userData, setUserData] = useState<Array<UserDetail>>([]);//從API取得的使用者資料，初始值為空
  const [reload, setReload] = useState(false); // 是否為載入中的狀態

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
    fetchData<DocInDetail>(requestData, setData, setPageCount)
  }, [reload]);


  const orderList: TypeOrderList = [
    {text: '最先', param: {ordering: 'id'}},
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
              <div>{doc.groupName}</div>
            </div>
            <div className="text-sm opacity-50">{doc.title}</div>
          </div>
          <ModalAssign id={doc.id} userData={users.data?.results ?? []}
                       setReload={setReload} username={doc.username}/>
        </li>
      )
    }
  )

  return (
    <>

      <HtmlTitle title='待批公文'/>
      <DataViewPage
        header={
          <h4 className="text-2xl font-bold flex items-center">
            <TbMailDown className='mr-4'/>待批公文
          </h4>
        }
        placeholder='搜尋標題/組別/承辦人'
        orderList={orderList}
        pageOption={{count: pageCount, show: 2}}
        mainButton={
          <ModalRead setReload={setReload}/>
        }
        bottomButtons={
          <>
            <ModalAddIn setReload={setReload}/>
            <BottomButton label='收文紀錄'
                          onClick={() => navi('/in/history/1?ordering=-id')}>
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