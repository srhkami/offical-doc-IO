import {createBrowserRouter} from "react-router";
import Login from "../component/pages/Login";
import Setting from "../component/Setting/Setting.tsx";
import InPrint from "../component/DocIn/InPrint/InPrint.tsx";
import OutManage from "../component/DocOut/OutManage/OutManage.tsx";
import OutHistory from "../component/DocOut/OutHistory/OutHistory.tsx";
import OutPrint from "../component/DocOut/OutPrint/OutPrint.tsx";
import DocInList from "../component/DocIn/DocInList.tsx";
import {Home} from "@/features";
import {Base} from "@/layout";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Base/>,
    children: [
      {
        path: '',
        element: <Home/>
      }
    ]
  },
  {
    path: '/out',
    element: <Base/>,
    children: [
      {
        path: '',
        element: <OutManage/>
      },
      {
        path: 'history/:pageNumber',
        element: <OutHistory/>
      },
      {
        path: 'print/:date',
        element: <OutPrint/>,
      }
    ],
  },
  {
    path: '/in',
    element: <Base/>,
    children: [
      {
        path: 'add',
        children: [
          {
            path: ':pageNumber',
            element: <DocInList/>
          }
        ]
      },
      {
        path: 'history',
        children: [
          {
            path: ':pageNumber',
            element: <DocInList isHistory/>
          }
        ]
      },
      {
        path: 'print',
        children: [
          {
            path: ':date',
            element: <InPrint/>
          }
        ]
      },
    ],
  },
  {
    path: '/setting',
    element: <Base content={<Setting/>}/>,
  },
  {
    path: '/login',
    element: <Base content={<Login/>}/>,
  },
])

export default routes;