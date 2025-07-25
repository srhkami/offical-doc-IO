import {ReactNode, useEffect, useState} from 'react';
import { FiMoon, FiSun  } from "react-icons/fi";
import {MDBBtn} from "mdb-react-ui-kit";

export default function BtnThemeToggle():ReactNode{
  const [darkMode, setDarkMode] = useState(()=>{
    return localStorage.getItem('darkTheme') !== 'false';
  });

  useEffect(() => {
    //監聽darkMode值是否有變化，有則儲存進localStorage
    localStorage.setItem('darkTheme', JSON.stringify(darkMode));
    const htmlElement = document.querySelector('html') as HTMLElement;
    htmlElement.setAttribute('data-mdb-theme',
      darkMode ? 'dark' : 'light');
  },[darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const htmlElement = document.querySelector('html') as HTMLElement;
    htmlElement.setAttribute('data-mdb-theme',
      darkMode ? 'dark' : 'light');
  };

  return (
    <MDBBtn color='tertiary' className='px-2 mx-1' onClick={toggleTheme}>
      {darkMode ? <FiMoon className='i-15'/> : <FiSun className='i-15'/>  }
    </MDBBtn>
  )
}