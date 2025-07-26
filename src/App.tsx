import {AuthProvider} from "@/auth/AuthContext.tsx";
import {RouterProvider} from "react-router";
import routes from "@/utils/routes.tsx";
import './App.css'

export default function App(){

  return(
    <AuthProvider>
      <RouterProvider router={routes}/>
    </AuthProvider>
  )
}