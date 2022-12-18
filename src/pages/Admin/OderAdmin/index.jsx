import { connect } from "react-redux"
import { useEffect } from "react"
import React from 'react';


import { Space, Button, Popconfirm, Row, Table, Select } from "antd"

import { getOrderListAdminAction, updateOrderAdminAction } from "../../../redux/actions"


function OderAdmin({ getOrderListAdmin, orderListAdmin, updateOrderAdmin }) {


  const { Option } = Select;

  useEffect(() => {
    getOrderListAdmin({
      status: null
    })
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  function onSelect(value) {
    getOrderListAdmin({
      status: value
    });
  }

  function handleUpdate(id) {
    updateOrderAdmin({
      id: id,
      status: "confirmed"
    })
  }
  function handleCancel(id) {
    updateOrderAdmin({
      id: id,
      status: "canceled"
    })
  }

  const tableColumns = [
    {
      title: 'Tên người nhận',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại ',
      dataIndex: 'phone',
      key: 'index',
    },
    {
      title: 'Đơn hàng',
      dataIndex: 'cart',
      key: 'name',

    },
    {
      title: 'Thời gian',
      dataIndex: 'times',
      key: 'index',

    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'index',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      // width: 150,
      render: (_, record) => {
        if (record.status === 'waiting') {
          return (
            <Space>
              <Button type="primary" onClick={() => { handleUpdate(record.id) }}>
                Xác nhận
              </Button>
              <Popconfirm
                title={`Bạn có chắc muốn xóa: ${record.name}`}
                onConfirm={() => { handleCancel(record.id) }}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button danger >Hủy</Button>
              </Popconfirm>
            </Space>
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

  const dataTable = orderListAdmin.data.map((orderListItem) => {
    return {
      ...orderListItem,
      key: orderListItem.id,
      name: orderListItem.orderInfo.name,
      address: orderListItem.orderInfo.address,
      phone: orderListItem.orderInfo.phone,
      times: orderListItem.orderInfo.date,
      totalPrice: `${(orderListItem.orderInfo.totalPrice).toFixed(3)} VND`,
      cart: orderListItem.cartList.map((item) => {
        return (<p>Sách: {item.name} </p>)
      }),
      count: orderListItem.cartList.map((item) => {
        return (<p> {item.count}</p>)
      }),

    }
  })

  return (
    <>
      <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <h2>Danh sách đơn hàng:</h2>
          <Select defaultValue="Chọn đơn hàng" style={{ width: 200 }} onSelect={onSelect}>
            <Option >Tất cả đơn hàng</Option>
            <Option value="waiting">Đang đợi xác nhận</Option>
            <Option value="confirmed">Đã xác nhận</Option>
            <Option value="canceled">Đã hủy</Option>
          </Select>
        </Row>
        <Table columns={tableColumns} dataSource={dataTable} scroll={{ x: 1400, y: 500 }} />
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { orderListAdmin } = state.orderAdminReducer
  console.log("mapStateToProps -> orderListAdmin", orderListAdmin)
  return {
    orderListAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderListAdmin: (params) => dispatch(getOrderListAdminAction(params)),
    updateOrderAdmin: (params) => dispatch(updateOrderAdminAction(params)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OderAdmin);