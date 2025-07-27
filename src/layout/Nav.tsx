import BtnThemeToggle from "./BtnThemeToggle";
import {MenuUser, ModalLogin} from "@/features";
import {useContext} from "react";
import {AuthContext} from "@/auth";
import {Link} from "react-router";
import {APP_VERSION} from "@/utils/info.ts";

export default function Nav() {

  const {isAuthenticated} = useContext(AuthContext)

  return (
    <div className="navbar md:px-6 sticky top-0 z-30 bg-base-200/50 backdrop-blur-sm">

      <div className="flex-1">
        <Link to='/' className='btn btn-ghost text-xl'>
          民興所收送文系統
        </Link>
        <span className='text-sm opacity-50'>
          v.{APP_VERSION}
        </span>

      </div>
      <div className="flex-none flex gap-2">
       <BtnThemeToggle/>
        {isAuthenticated ? <MenuUser/> : <ModalLogin/>}
      </div>
    </div>
  )
}