import {Card, Col, Form} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router";
import {MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle} from "mdb-react-ui-kit";
import PageBtn from "./PageBtn.tsx";
import {Dispatch, ReactNode, SetStateAction} from "react";
import {ApiKeywordForm, ApiResData, TypeOrderList} from "../../utils/types.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {getQueryParams} from "../../utils/url.ts";
import isEqual from 'fast-deep-equal';

type TWithId = { id: number };

export function fetchData<T extends TWithId>(
  requestData: () => Promise<ApiResData<Array<T>>>,
  setData: Dispatch<SetStateAction<Array<T>>>,
  setPageCount: Dispatch<SetStateAction<number>>
) {
  toast.promise(
    async () => {
      try {
        const resData = await requestData();
        const newItems = resData.results;
        setPageCount(resData.page_count)
        setData(prevItems => {
          // 建立一個映射以方便比對
          const prevMap = new Map(prevItems.map(item => [item.id, item]));
          // 建立一個最後輸出的清單
          const updated: Array<T> = [];
          // 處理新增與更新
          for (const newItem of newItems) {
            const prevItem = prevMap.get(newItem.id);
            if (!prevItem || !isEqual(prevItem, newItem)) {
              updated.push(newItem); // 新增或已變更
            } else {
              updated.push(prevItem); // 沒變則保留原參考
            }
          }
          return updated;
        });
      } catch (err) {
        console.error('Fetch error:', err);
      }
    },
    {
      loading: '載入中...',
      error: '載入失敗',
    }
  )
}

type Props = {
  readonly params: Record<string, string>,
  readonly header?: ReactNode,
  readonly placeholder?: string,
  readonly orderList: TypeOrderList,
  readonly table: ReactNode,
  readonly path: string,
  readonly pageCount: number,
  readonly pageNumber: string | number | undefined,
  readonly showPages?: number,
}

export default function CardDatabaseList(
  {
    params,
    header = <></>,
    placeholder = '輸入關鍵字',
    orderList,
    table,
    path,
    pageCount,
    pageNumber,
    showPages = 3,
  }: Props) {

  /* 用來某項特定資料的卡片
  *  params: 從網址列讀取的參數
  *  header: 顯示的標題文字或組件
  *  placeholder: 搜尋組件的預設文字
  *  orderList: 用以刷出排序組件的清單
  *  table: 資料表格的組件
  *  path: 此頁面的根路徑
  *  pageCount: 頁碼總數，從API獲得
  *  pageNumber: 第幾頁，從路徑獲得
  *  showPages: 顯示的頁碼數量
  */

  const navigate = useNavigate();
  const location = useLocation();
  const {register, handleSubmit, reset} = useForm<ApiKeywordForm>();


  // 關鍵字搜尋
  const searchKeyword: SubmitHandler<ApiKeywordForm> = (formData) => {
    const keyword = formData.keyword;
    const newParams = {
      ...params,
      search: keyword,
    };
    navigate(`${path}1?${new URLSearchParams(newParams).toString()}`); // 轉化為網址
  }


  // 經由排序清單繪製下拉選單組件
  const orderItems = orderList.map(item => {
    // 從網址讀取現有params
    const params = getQueryParams(location.search);
    // 將現有params與項目本身傳入的param結和
    const newParams = new URLSearchParams({...params, ...item.param});
    return (
      <MDBDropdownItem link childTag='button' key={item.text} onClick={() => {
        navigate(`${path}1?${newParams.toString()}`);
        reset();
      }}>
        {item.text}
      </MDBDropdownItem>
    )
  })


  return (
    <div className="row m-1 w-100">
      <Card className='col-12 p-0 shadow-lg rounded-3'>
        <Card.Header className='row m-0 px-2'>
          <Col xs={12} md={6} className='mb-2'>
            {header}
          </Col>
          <Col xs={12} md={6} className='d-flex justify-content-end'>
            <Form method='get' onSubmit={handleSubmit(searchKeyword)}>
              <Form.Control type='text' className='border-2 border-primary'
                            placeholder={placeholder} size='sm'
                            {...register('keyword')}/>
            </Form>
            <MDBDropdown className='ms-2'>
              <MDBDropdownToggle size='sm' color='secondary'>
                排序方式
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                {orderItems}
              </MDBDropdownMenu>
            </MDBDropdown>
          </Col>
        </Card.Header>
        <Card.Body>
          {table}
        </Card.Body>
        <Card.Footer>
          <div className='mt-1 d-flex justify-content-center'>
            <PageBtn
              path={path}
              pageCount={Number(pageCount)}
              pageNumber={Number(pageNumber)}
              showPages={showPages}
              params={location.search}/>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}