import BtnThemeToggle from "./BtnThemeToggle";
import {MenuUser, ModalLogin} from "@/features";
import {useContext} from "react";
import {AuthContext} from "@/auth";

export default function Nav() {

  const {isAuthenticated} = useContext(AuthContext)

  return (
    <div className="navbar md:px-6 sticky top-0 z-30 bg-base-200/50 backdrop-blur-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">電子收送文系統</a>
      </div>
      <div className="navbar-end">
       <BtnThemeToggle/>
        {isAuthenticated ? <MenuUser/> : <ModalLogin/>}
      </div>
    </div>
  )
}