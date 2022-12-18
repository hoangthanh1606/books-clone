import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import React from 'react';


import { Row, Button, Space, Popconfirm, Table, Input, Modal, Form } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import {
  getCategoryAdminAction,
  createCategoryAdminAction,
  deleteCategoryAdminAction,
  updateCategoryAdminAction
} from '../../../redux/actions'





function AdminCategoryPage({
  getCategoryAdmin,
  categoryListAdmin,
  createCategoryAdmin,
  deleteCategoryAdmin,
  updateCategoryAdmin
}) {
  const { Search } = Input;

  const [form] = Form.useForm()

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [categorySelected, setCategorySelected] = useState({})

  useEffect(() => {
    getCategoryAdmin({})
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  useEffect(() => {
    form.resetFields()
  }, [categorySelected.id])

  function handleCreateCategory() {
    setIsModalVisible(true)
    setCategorySelected({})
  }

  function handleEditCategory(record) {
    setIsModalVisible(true)
    setCategorySelected(record)
  }

  function handleSubmitCategory() {
    const values = form.getFieldValue()
    if (categorySelected.id) {
      updateCategoryAdmin({ id: categorySelected.id, ...values })
    } else {
      createCategoryAdmin(values)
    }
    setIsModalVisible(false)
  }
  const onSearch = value => {
    getCategoryAdmin({ searchValue: value })
  }

  const tableColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 400
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 600
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" ghost onClick={() => handleEditCategory(record)} >
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Bạn có chắc muốn xóa: ${record.name}`}
              onConfirm={() => deleteCategoryAdmin({ id: record.id })}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger ><DeleteOutlined /></Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ]
  const dataTable = categoryListAdmin.data.map((categoryItem, categoryIndex) => {
    return {
      ...categoryItem,
      key: categoryItem.id,
      index: categoryIndex + 1,
    }
  })
  return (
    <>
      <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
        <Row justify="space-between" style={{ marginBottom: 16, }}>
          <h2>Danh sách thể loại sách</h2>
          <Search
            placeholder="Nhập để tìm kiếm"
            allowClear
            enterButton
            style={{ width: 400, margin: '0 0 20px 0' }}
            onSearch={onSearch}
          />
          <Button type="primary" onClick={() => handleCreateCategory()} >Thêm thể loại sách</Button>
        </Row>

        <Table loading={categoryListAdmin.load} columns={tableColumns} dataSource={dataTable} />
        <Modal
          title={categorySelected.id ? "Cập nhập thể loại: " : "Thêm thể loại :"}
          width={600}
          visible={isModalVisible}
          onOk={() => handleSubmitCategory()}
          onCancel={() => setIsModalVisible(false)}>
          <Form
            form={form}
            layout="vertical"
            name="categoryForm"
            initialValues={categorySelected.id
              ? { ...categorySelected }
              : {}
            }
          >
            <Form.Item
              label="Tên thể loại"
              name="name"
              rules={[
                { required: true, },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>

  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryAdmin: (params) => dispatch(getCategoryAdminAction(params)),
    createCategoryAdmin: (params) => dispatch(createCategoryAdminAction(params)),
    deleteCategoryAdmin: (params) => dispatch(deleteCategoryAdminAction(params)),
    updateCategoryAdmin: (params) => dispatch(updateCategoryAdminAction(params)),


  }
}
const mapStateToProps = (state) => {
  const { categoryListAdmin } = state.categoryAdminReducer
  return {
    categoryListAdmin
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryPage);