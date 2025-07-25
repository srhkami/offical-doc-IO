import {Card, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import React from "react";
import {MDBBtn} from "mdb-react-ui-kit";
import {useContext} from "react"
import AuthContext from "../../utils/AuthContext.js";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios"
import {ROOT_IP} from "../../utils/info.tsx";
import toast from "react-hot-toast";
import {handleError} from "../../utils/handleError.ts";
import {UserLoginForm} from "../../utils/types.ts";

export default function Login() {


  const {setIsAuthenticated} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,  // 錯誤內容
    }
  } = useForm<UserLoginForm>()

  const onSubmit: SubmitHandler<UserLoginForm> = (formData) => {
    toast.loading('登入中...');
    axios({
      method: 'post',
      url: ROOT_IP + '/user/login/',
      data: formData,
    })
      .then(res => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        toast.dismiss();
        setIsAuthenticated(true);
        alert('登入成功！');
        window.location.reload();
      })
      .catch(err => {
        handleError(err);
        const errorData = err.response.data; //取得後端回傳的錯誤訊息
        Object.keys(errorData).forEach((key: any) => {
          setError(key, {message: errorData[key]}) //逐一顯示
        })
      })
  }

  return (
    <Row>
      <Col xs={12} sm={10} md={6} xl={4} className='d-flex mx-auto'>
        <Card className='w-100'>
          <Card.Header className='d-flex'>
            <h3 className="fw-bolder text-primary mx-auto my-auto">登入</h3>
          </Card.Header>
          <Card.Body>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              <FloatingLabel label='帳號' className='mb-3'>
                <input
                  className='form-control'
                  type='text'
                  placeholder=''
                  {...register('email', {required: '請勿留空',})}
                />
              </FloatingLabel>
              <FloatingLabel label='密碼' className='mb-3'>
                <input
                  className='form-control'
                  type='password'
                  placeholder=''
                  {...register('password', {required: '請勿留空',})}
                />
                <span className='text-danger f-07 fw-bolder'>{errors.email?.message}</span>
              </FloatingLabel>
              <Row className='mt-3'>
                <Col xs={12}>
                  <MDBBtn type='submit' className='w-100'>登入</MDBBtn>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}