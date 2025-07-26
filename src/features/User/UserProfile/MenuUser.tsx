import {useContext} from "react";
import AuthContext from "../../../auth/AuthContext.tsx";
import {Dropdown, DropdownContent, DropdownToggle} from "@/component";
import {showToast} from "@/utils/handleToast.ts";
import {handleLogout} from "../handleUser.ts";

export default function MenuUser() {

  const {setIsAuthenticated, userInfo} = useContext(AuthContext)

  const logout = () => {
    showToast(
      handleLogout()
    )
      .then(() => {
        setIsAuthenticated(false);
        // alert('您已登出')
      })
      .catch((err) => console.log(err))
  }

  return (
    <Dropdown aligns='end'>
      <DropdownToggle shape='circle' color='primary' dropdownIcon={false}>
        {userInfo.name ? userInfo.name.slice(0, 1) : '客'}
      </DropdownToggle>
      <DropdownContent size='lg' className='z-1 mt-3 w-52 p-2 shadow font-semibold'>
        <ul className='menu w-full'>
          <li>
            <button className='py-2 flex justify-center text-error' onClick={logout}>
              登出
            </button>
          </li>
        </ul>
      </DropdownContent>
    </Dropdown>
  )
}