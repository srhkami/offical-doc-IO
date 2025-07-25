import Nav from "./Nav.tsx";
import {Outlet, useLocation} from "react-router";
import {Toaster} from "react-hot-toast";
import {type ReactNode, useEffect} from "react";

type Prop = {
  readonly children?: ReactNode,
}

export default function Base({children}: Prop) {

  const {pathname} = useLocation();
  // 當網址有更動時，回到頁面最上方
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return (
    <div className='lg:px-10 xl:px-20 2xl:px-30 min-h-[100vh]'>
      <Nav/>
      <main className='px-2 sm:px-3 md:px-6 xl:px-10 py-3 min-h-100'>
        <Outlet/>
        {children}
      </main>
      <Toaster position='top-center'/>
    </div>
  )
}