import {Col, Row} from "react-bootstrap";
import React from "react";
import SettingUser from "./SettingUser.tsx";
import SettingGroup from "./SettingGroup.tsx";
import HtmlTitle from "../../layout/HtmlTitle.tsx";

export default function Setting() {
  return (
    <>
      <HtmlTitle title='設定'/>
      <Row>
        <Col xs={12} md={4} className='mb-3'>
          <SettingGroup/>
        </Col>
        <Col xs={12} md={8}>
          <SettingUser/>
        </Col>
      </Row>
    </>
  );
}