import {
  Button,
  Card, Col, Form,
  Input, InputNumber,
  notification, Row, Space
} from "antd";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";

import { addToOrderAction } from "../../redux/actions";


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

function OrderPage({ cartList, addToOrder }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const openNotification = () => {
    notification.open({
      description: "Bạn đã đặt hàng thành công !"
    });
  };

  function handleAddOrder(values) {
    moment.locale("vi");
    const orderInfo = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      totalPrice: total,
      date: moment().format("hh:mm DD/MM/YYYY"),
    };
    addToOrder({
      orderInfo: orderInfo,
      userId: userInfo.id,
      cartList: cartList.data,
      status: 'waiting',
    });
    openNotification();
  }

  var total = 0;
  function totalPrice() {
    cartList.data.forEach((item) => {
      total = total + item.count * item.price;
    });
    return total.toFixed(3).toLocaleString("VN-vi");
  }

  function renderOrderItem() {
    return cartList.data.map((cartItem, index) => {
      return (
          <div style={{flex: 'none', margin: '8px 4px', padding: '4px', width: "100%", borderBottom: "1px solid #e6e4e4"}}>
            <Space align="center">
              <img style={{ width: "100px" }} src={cartItem.image[0]} alt="" />
              <div
                style={{
                  fontWeight: "600",
                  width: "150px",
                  marginRight: "8rem",
                }}
              >
                {cartItem.name}
              </div>
              <InputNumber value={cartItem.count} disabled /> <br />
              <div>
                Giá:{" "}
                {(cartItem.price * cartItem.count)
                  .toFixed(3)
                  .toLocaleString("VN-vi")}{" "}
                VNĐ
              </div>
            </Space>
          </div>
      );
    });
  }

  return (
    <div>
      <Row
        gutter={24}
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "4rem",
          maxWidth: '100%',
          height: '100%'
        }}
      >
        <Col span={12}>
          <Card  title="KIỂM TRA LẠI ĐƠN HÀNG">{renderOrderItem()}</Card>
          <Card>
            <Space
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: '7rem',
                fontWeight: "bold",
              }}
              align="center"
            >
              <div>Thành tiền:</div>
              <div>{totalPrice()} VNĐ</div>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="ĐỊA CHỈ GIAO HÀNG">
            <Form
              {...layout}
              name="basic"
              initialValues={{ name: "", email: "", phone: "", address: "" }}
              onFinish={(values) => handleAddOrder(values)}
            >
              <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập họ tên của bạn!' }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[
                { required: true, message: "Vui lòng nhập email của bạn!" },
                { type: "email", message: "Địa chỉ email không hợp lệ!" },
            ]}>
                <Input />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' }]}>
                <Input />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button block type="primary" htmlType="submit">
                  Đặt hàng
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { cartList } = state.cartReducer;
  return {
    cartList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToOrder: (params) => dispatch(addToOrderAction(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
