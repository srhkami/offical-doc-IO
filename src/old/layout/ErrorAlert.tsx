import {Alert, Col, Row} from "react-bootstrap";
import {ReactNode, useContext} from "react";
import {MDBBtn} from "mdb-react-ui-kit";
import {USER_API} from "../../utils/info.tsx";
import {handleError} from "../../utils/handleError.ts";
import AuthContext from "../../utils/AuthContext.tsx";
import {useAxios} from "../../utils/useAxios.ts";


export default function ErrorAlert(): ReactNode {


  const api = useAxios();
  const {setIsAuthenticated} = useContext(AuthContext)

  const handleLogout = () => {
    api({
      method: 'get',
      url: USER_API + '/logout/',
      withCredentials: true,
    }).then(() => {
      setIsAuthenticated(false);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      alert('登出成功！');
      window.location.reload();
    }).catch(err => handleError(err))
  }

  return (
    <Row className='p-3 w-100'>
      <Col>
        <Alert variant='danger'>
          <Alert.Heading>您沒有瀏覽此頁面的權限</Alert.Heading>
          <hr/>
          <MDBBtn color='secondary' outline onClick={handleLogout}>登出</MDBBtn>
        </Alert>
      </Col>
    </Row>
  )
}
