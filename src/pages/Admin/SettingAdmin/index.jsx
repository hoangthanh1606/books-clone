import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'


import { Tabs, Card, Button, Col, Row, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { getUserInfoAdminAction, updateUserInfoAdminAction, changePasswordAction } from '../../../redux/actions';
const { TabPane } = Tabs;

function SettingAdmin({
  getUserInfoAdmin,
  userListAdmin,
  updateUserInfoAdmin,
  changePassword,
  userAdminInfo
}) {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { Option } = Select;

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleUpdateUser(values,) {
    updateUserInfoAdmin({
      ...values,
      id: userInfo.id,
      birthday: moment(values.birthday).format("DD/MM/YYYY")

    })
    setIsModalVisible(false)
  }



  function handleChangePassword(values) {
    if (values.oldPassword !== userInfo.password) {
        message.error('Mật khẩu cũ không đúng !')
    } else {
      changePassword({
        ...values,
        id: userInfo.id
      })
    }
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    getUserInfoAdmin({ id: userInfo.id });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return (
    <>
      <div style={{ width: '100%', height: 'calc(100vh - 80px)' }} >
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Thông tin cá nhân. " key="1">
            <>
              <Card title="Quản lý thông tin hồ sơ để bảo mật tài khoản: " style={{ width: "100%" }}

              >
                <Row>
                  <Col span={6} >Họ và tên:</Col>
                  <Col span={16}>{userAdminInfo.data.name}</Col>
                </Row>
                <Row>
                  <Col span={6}>Email:</Col>
                  <Col span={16}>{userAdminInfo.data.email}</Col>
                </Row>
                <Row>
                  <Col span={6}>Số điện thoại:</Col>
                  <Col span={16}> {userAdminInfo.data.phone} </Col>
                </Row>
                <Row>
                  <Col span={6}>Địa chỉ:</Col>
                  <Col span={16}>{userAdminInfo.data.address}</Col>
                </Row>
                <Row>
                  <Col span={6}>Giới tính:</Col>
                  <Col span={16}>{userAdminInfo.data.gender}</Col>
                </Row>
                <Row>
                  <Col span={6}>Ngày sinh:</Col>
                  <Col span={16}>{userAdminInfo.data.birthday}</Col>
                </Row>

              </Card>
              <Button style={{ margin: " 10px 150px" }} onClick={() => { showModal() }} > Chỉnh sửa thông tin cá nhân</Button>
              <Modal title="Chỉnh sửa thông tin cá nhân" visible={isModalVisible} onCancel={handleCancel}>
                <Form
                  layout="vertical"
                  name="Chỉnh sửa thông tin cá nhân"
                  initialValues={{
                    name: userAdminInfo.data.name,
                    email: userAdminInfo.data.email,
                    phone: userAdminInfo.data.phone,
                    address: userAdminInfo.data.address,
                    gender: userAdminInfo.data.gender,
                    // birthday: moment(userAdminInfo.data.birthday, "DD/MM/YYYY")
                  }}
                  onFinish={handleUpdateUser}

                >
                  <Form.Item
                    label="Tên"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tên của bạn!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu của bạn!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại của bạn!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập địa chỉ của bạn!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                  >
                    <Select placeholder="lựa chọn giới tính của bạn">
                      <Option value="Nam">Nam</Option>
                      <Option value="Nữ">Nữ</Option>
                      <Option value="Khác">Khác</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Ngày sinh"
                    name="birthday"
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Xác nhận
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </>
          </TabPane>

          <TabPane tab="Chỉnh sửa mật khẩu" key="2" >
            <>
              <div style={{ margin: "10px", borderBottom: "1px solid #f5222d" }}>
                <h3>Thay đổi mật khẩu của bạn:</h3>
                <p>Để đảm bảo an toàn, vui lòng không chia sẻ mật khẩu cho người khác.</p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Form
                  style={{ width: "50%" }}
                  layout="vertical"
                  name="basic"
                  initialValues={{
                    // password: userAdminInfo.data.password
                  }}
                  onFinish={handleChangePassword}
                >
                  <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    // dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu cũ!',
                      },
                     
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Mật khẩu mới"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Xác nhận lại mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng xác nhận lại mật khẩu!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error('Mật khẩu nhập lại không trùng khớp!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                      Xác nhận
                    </Button>
                  </Form.Item>
                </Form>

              </div>
            </>
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfoAdmin: (params) => dispatch(getUserInfoAdminAction(params)),
    updateUserInfoAdmin: (params) => dispatch(updateUserInfoAdminAction(params)),
    changePassword: (params) => dispatch(changePasswordAction(params)),
  }
}
const mapStateToProps = (state) => {
  const { userListAdmin, userAdminInfo } = state.userAdminReducer
  return {
    userListAdmin,
    userAdminInfo
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingAdmin);