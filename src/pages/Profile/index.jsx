import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import { Button, Row, Avatar, Space, Col, Tabs, Card, Form, Input, Table, Select, Modal, DatePicker, message } from 'antd';
import { UserOutlined } from '@ant-design/icons'

import { getUserInfoAction, updateUserAction, changePasswordAction, getOrderListUserAction } from '../../redux/actions';

function Profile({ getUserInfo, userInfo, updateUser, changePassword, getOrderListUser, orderList }) {

  const { TabPane } = Tabs;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;


  const userInfoLocal = JSON.parse(localStorage.getItem('userInfo'))


  useEffect(() => {
    getUserInfo()
    getOrderListUser({ id: userInfoLocal.id })
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])


  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOke = () => {
    setIsModalVisible(false);
  };

  function handleUpdateUser(values) {
    updateUser({
      id: userInfo.data.id,
      ...values,
      birthday: moment(values.birthday).format("DD/MM/YYYY")
    })
    setIsModalVisible(false)
  }

  function handleChangePassword(values) {
    if (values.oldPassword !== userInfoLocal.password) {
      message.error('Mật khẩu cũ không đúng !')
    } else {
      changePassword({
        id: userInfo.data.id,
        ...values
      })
    }
  }

  const tableColumns = [

    {
      title: 'Tên người đặt',
      dataIndex: 'name',
      key: 'name',

    },
    {
      title: 'Đơn hàng',
      dataIndex: 'carts',
      key: 'index',

    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'index',

    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'index',

    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'index',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        if (record.status === 'waiting') {
          return (
            <p>Đợi xác nhận</p>
          )
        }
        else if (record.status === 'confirmed') {
          return <p>Đơn hàng được xác nhận</p>
        }
        else {
          return <p>Đơn hàng đã hủy</p>
        }
      }
    },
  ]
  const dataTable = orderList.data.map((orderListItem) => {
    console.log("Profile -> orderListItem", orderListItem)
    return {
      ...orderListItem,
      key: orderListItem.id,
      name: orderListItem.orderInfo.name,
      time: orderListItem.orderInfo.date,
      address: orderListItem.orderInfo.address,
      totalPrice: `${(orderListItem.orderInfo.totalPrice).toFixed(3)} VND`,
      carts: orderListItem.cartList.map((item, index) => {
        return (<p key={index}>Sách: {item.name}</p>)
      })
    }
  })

  return (
    <>
      <div style={{ margin: "20px 30px" }}>
        <Tabs tabPosition="left" defaultActiveKey="1" >
          <TabPane tab="Thông tin cá nhân" key="1">
            <>
              <Row >
                <Card title="Hồ Sơ Của Tôi:" style={{ width: "100%" }}>
                  <Row>
                    <Col flex={3} style={{ margin: '0 10px' }}>
                      <p>
                        Tên đăng nhập: <span style={{ fontSize: 16, color: "#000000" }}>{userInfo.data.name}</span>
                      </p>
                      <p>
                        Email đăng nhập: <span style={{ fontSize: 16, color: "#000000" }}>{userInfo.data.email}</span>
                      </p>
                      <p>
                        Số điện thoại: <span style={{ fontSize: 16, color: "#000000" }}>{userInfo.data.phone}</span>
                      </p>
                      <p>
                        Địa chỉ: <span style={{ fontSize: 16, color: "#000000" }}>{userInfo.data.address}</span>
                      </p>
                      <p>
                        Giới tính: <span style={{ fontSize: 16, color: "#000000" }}>{userInfo.data.gender}</span>
                      </p>
                      <p>
                        Ngày sinh: <span style={{ fontSize: 16, color: "#000000" }}>{userInfo.data.birthday}</span>
                      </p>

                      <Button
                        type="primary"
                        style={{ marginTop: 10, width: "100%" }}
                        onClick={() => { showModal() }}
                      >
                        Chỉnh sửa thông tin
                      </Button>
                      <Modal title="Chỉnh sửa thông tin cá nhân" visible={isModalVisible} onOk={handleOke} onCancel={handleCancel}>
                        <Form
                          layout="vertical"
                          name="Chỉnh sửa thông tin cá nhân"
                          initialValues={{
                            name: userInfo.data.name,
                            email: userInfo.data.email,
                            phone: userInfo.data.phone,
                            address: userInfo.data.address,
                            gender: userInfo.data.gender,
                            birthday: moment(userInfo.data.birthday, "DD/MM/YYYY")
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
                                message: 'Vui lòng nhập email của bạn!',
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
                            rules={[{ required: true, message: 'Vui lòng nhập giới tính!' }]}
                          >
                            <Select placeholder="select your gender">
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
                            <Button
                              style={{ width: "100%" }}
                              type="primary"
                              htmlType="submit"
                            >
                              Xác nhận
                    </Button>
                          </Form.Item>
                        </Form>
                      </Modal>
                    </Col>
                    <Col flex={2} style={{ borderLeft: "1px solid #f5222d" }} >
                      <div style={{ margin: "0 10px" }}>

                        <p>Thay đổi ảnh đại diện:</p>
                        <Space size="large" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <Avatar size={100} icon={<UserOutlined />} />
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Row >
            </>
          </TabPane>
          <TabPane tab="Thay đổi mật khẩu " key="2">
            <>
              <div style={{ margin: "10px", borderBottom: "1px solid #f5222d" }}>
                <h3>Thay đổi mật khẩu của bạn:</h3>
                <p>Để đảm bảo an toàn, vui lòng không chia sẻ mật khẩu cho người khác.</p>
              </div>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                <Form
                  style={{ width: "80%" }}
                  layout="vertical"
                  name="basic"
                  initialValues={{
                    // password: userListAdmin.data.password
                  }}
                  onFinish={handleChangePassword}
                >
                  <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
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

                          return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
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
          <TabPane tab="Lịch sử giao dịch" key="3">
            <>
              <div>
                <p>Danh sách lịch sử giao dịch của bạn</p>
              </div>
              <div>
                <Table columns={tableColumns} dataSource={dataTable} scroll={{ y: 450 }} />

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
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    updateUser: (params) => dispatch(updateUserAction(params)),
    changePassword: (params) => dispatch(changePasswordAction(params)),
    getOrderListUser: (params) => dispatch(getOrderListUserAction(params)),


  }
}
const mapStateToProps = (state) => {
  const { userInfo, orderList } = state.userReducer
  // console.log("mapStateToProps -> orderList", orderList)
  // console.log("mapStateToProps -> userInfo", userInfo)
  return {
    userInfo,
    orderList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
