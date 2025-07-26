import {Pagination} from "react-bootstrap";
import {Link} from "react-router";
import {FaAngleDoubleLeft, FaAngleDoubleRight} from "react-icons/fa";
import {ReactNode} from "react";

type AppProps = {
  readonly path: string,
  readonly pageNumber: number,
  readonly pageCount: number,
  readonly showPages?: number,
  readonly params?: string, // ?開頭的參數
}

export default function PageBtn({path, pageNumber, pageCount, showPages = 2,params=''}: AppProps): ReactNode {
  // 傳入：
  // path：路徑
  // pageNumber：當前頁碼
  // pageCount：總頁數
  // showPages：顯示左右其他頁碼的數量，預設為2 (包含現有頁數共為5）

  let first = pageNumber - 2;
  let last = pageNumber + 2;
  if (pageCount <= showPages * 2 + 1) {
    first = 1;
    last = pageCount;
  } else if (pageNumber <= showPages) {
    first = 1;
    last = showPages * 2 + 1;
  } else if (pageCount - pageNumber <= showPages) {
    first = pageCount - showPages * 2;
    last = pageCount;
  }
  const list = Array.from({length: last - first + 1}, (_, i) => first + i);
  const PageList = () => list.map((i: number): ReactNode => {
    return (
      <li className={'page-item ' + (i === pageNumber ? 'active' : '')} key={i}>
        <Link
          to={path + i + params}
          className='page-link'
        >
          {i}
        </Link>
      </li>
    )
  })

  return (
    <Pagination>
      <li className={'page-item ' + (pageNumber === 1 ? 'disabled' : '')}>
        <Link
          to={path + 1 + params}
          className='page-link'
        >
          <FaAngleDoubleLeft/>
        </Link>
      </li>
      <PageList/>
      <li className={'page-item ' + (pageNumber === pageCount ? 'disabled' : '')}>
        <Link
          to={path + pageCount + params}
          className='page-link'
        >
          <FaAngleDoubleRight/>
        </Link>
      </li>
    </Pagination>
  )
}
