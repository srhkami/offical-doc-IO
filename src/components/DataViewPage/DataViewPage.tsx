import type {ReactNode} from "react";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router";
import {type SubmitHandler, useForm} from "react-hook-form";
import PageButtons from "../Button/PageButtons.tsx";
import {ApiKeywordForm, DataOrderList} from "@/types/api-types.ts";
import {Row, Col, BottomBar} from "@/component";
import ModalFilter from "@/component/DataViewPage/ModalFilter.tsx";

type Props = {
  readonly header?: ReactNode,
  readonly placeholder?: string,
  readonly orderList: DataOrderList,
  readonly pageOption: { count: number, show: number }
  readonly mainButton?: ReactNode,
  readonly bottomButtons?: ReactNode,
  readonly children: ReactNode,
}

/**
 *  顯示資料的卡片組件，通常作為一個頁面
 * @param header 標題文字或組件
 * @param placeholder 搜尋組件的預設文字
 * @param orderList 排序篩選方式，要傳入特定的物件類別DataOrderList
 * @param pageOption 總頁數，從API獲取，作為一個State、顯示的頁碼數量
 * @param mainButton 底端欄的主按鈕
 * @param bottomButtons 底端欄的按鈕
 * @param children 主體內的列表或表格
 * @constructor
 */
export default function DataViewPage({
                                       header,
                                       placeholder = '搜尋關鍵字',
                                       orderList,
                                       pageOption,
                                       mainButton,
                                       bottomButtons,
                                       children,
                                     }: Props) {

  const navigate = useNavigate();
  const {page} = useParams(); // 頁數
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);   // 解析params，轉換為物件
  const path = useLocation().pathname.replace(`/${page}`, ""); // 取得基礎網址
  const {register, handleSubmit} = useForm<ApiKeywordForm>({values: {keyword: params.search}});

  // 關鍵字搜尋
  const handleSearch: SubmitHandler<ApiKeywordForm> = (formData) => {
    const keyword = formData.keyword;
    const newParams = new URLSearchParams({...params, search: keyword,}); // 將現有params與搜尋關鍵字param結合
    navigate(`${path}/1?${newParams.toString()}`); // 轉化為網址
  }

  return (
    <div>
      <div className='card bg-base-100 card-border border-base-300 overflow-hidden'>
        <div className='card-body'>
          <Row>
            <Col xs={8}>
              {header}
            </Col>
            <Col xs={4} className='flex justify-end'>
              <form onSubmit={handleSubmit(handleSearch)}>
                <input type="text" placeholder={placeholder} className="input input-sm max-w-36"
                       {...register('keyword')}/>
              </form>
            </Col>
          </Row>
          <div className='divider m-0'></div>
          {children}
          <div className='flex justify-center my-3'>
            <PageButtons pageCount={pageOption.count} showPages={pageOption.show}/>
          </div>
        </div>
      </div>
      <BottomBar mainButton={mainButton}>
        {bottomButtons}
        <ModalFilter path={path} orderList={orderList}/>
      </BottomBar>
    </div>
  )
}