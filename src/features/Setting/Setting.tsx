import HtmlTitle from "../../layout/HtmlTitle.tsx";
import {Col, Collapse, CollapseContent, CollapseTitle, Row} from "@/component";
import UserManage from "@/features/Setting/UserManage.tsx";
import GroupManage from "@/features/Setting/GroupManage.tsx";

export default function Setting() {
  return (
    <>
      <HtmlTitle title='設定'/>
      <Row className='justify-center'>
        <Col xs={12} md={10} lg={8}>
        <Collapse icon='plus' className='bg-base-100 my-2'>
          <CollapseTitle className='text-2xl font-bold'>
            人員設定
          </CollapseTitle>
          <CollapseContent>
            <UserManage/>
          </CollapseContent>
        </Collapse>
          <Collapse icon='plus' className='bg-base-100 my-2'>
            <CollapseTitle className='text-2xl font-bold'>
              組別設定
            </CollapseTitle>
            <CollapseContent>
              <GroupManage/>
            </CollapseContent>
          </Collapse>
        </Col>
      </Row>
      {/*<Row>*/}
      {/*  <Col xs={12} md={4} className='mb-3'>*/}
      {/*    <SettingGroup/>*/}
      {/*  </Col>*/}
      {/*  <Col xs={12} md={8}>*/}
      {/*    <SettingUser/>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
    </>
  );
}