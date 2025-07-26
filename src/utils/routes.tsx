import {createBrowserRouter} from "react-router";
import {Home, OutHistory, OutManage, OutPrint} from "@/features";
import {Base} from "@/layout";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Base/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'out',
        children: [
          {
            path: '',
            element: <OutManage/>
          },
          {
            path: 'history',
            children: [
              {path: ':page', element: <OutHistory/>}
            ]
          },
          {
            path: 'print',
            children: [
              {path: ':date', element: <OutPrint/>}
            ]
          }
        ]
      },
    ]
  },
  // {
  //   path: '/out',
  //   element: <Base/>,
  //   children: [
  //     {
  //       path: '',
  //       element: <OutManage/>
  //     },
  //     {
  //       path: 'history/:pageNumber',
  //       element: <OutHistory/>
  //     },
  //     {
  //       path: 'print/:date',
  //       element: <OutPrint/>,
  //     }
  //   ],
  // },
  // {
  //   path: '/in',
  //   element: <Base/>,
  //   children: [
  //     {
  //       path: 'add',
  //       children: [
  //         {
  //           path: ':pageNumber',
  //           element: <DocInList/>
  //         }
  //       ]
  //     },
  //     {
  //       path: 'history',
  //       children: [
  //         {
  //           path: ':pageNumber',
  //           element: <DocInList isHistory/>
  //         }
  //       ]
  //     },
  //     {
  //       path: 'print',
  //       children: [
  //         {
  //           path: ':date',
  //           element: <InPrint/>
  //         }
  //       ]
  //     },
  //   ],
  // },
  // {
  //   path: '/setting',
  //   element: <Base content={<Setting/>}/>,
  // },
  // {
  //   path: '/login',
  //   element: <Base content={<Login/>}/>,
  // },
])

export default routes;