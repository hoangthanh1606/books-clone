import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import React from 'react';


import { Row, Button, Table, Input, Form, Modal, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import {
  getPublisherAdminAction,
  createPublisherAdminAction,
  updatePublisherAdminAction,
  deletePublisherAdminAction
} from '../../../redux/actions'

function AdminPublisherPage({
  getPublisherAdmin,
  publisherListAdmin,
  updatePublisherAdmin,
  createPublisherAdmin,
  deletePublisherAdmin
}) {
  const { Search } = Input;

  const [formPublisher] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [publisherSelected, setPublisherSelected] = useState({})

  useEffect(() => {
    getPublisherAdmin({})
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  useEffect(() => {
    formPublisher.resetFields()
  }, [publisherSelected.id])

  function handleCreatePublisher() {
    setIsModalVisible(true)
    setPublisherSelected({})
  }

  function handleEditPublisher(record) {
    setIsModalVisible(true)
    setPublisherSelected(record)
  }

  function handleSubmitForm() {
    const values = formPublisher.getFieldValue()
    if (publisherSelected.id) {
      updatePublisherAdmin({ id: publisherSelected.id, ...values })
    } else {
      createPublisherAdmin(values)
    }
    setIsModalVisible(false)
  }

  const onSearch = value => {
    getPublisherAdmin({ searchValue: value });
  }

  const tableColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 400
    },
    {
      title: 'Nhà xuất bản',
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
            <Button type="primary" ghost onClick={() => handleEditPublisher(record)}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Bạn có chắc muốn xóa: ${record.name}`}
              onConfirm={() => deletePublisherAdmin({ id: record.id })}
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

  const dataTable = publisherListAdmin.data.map((publisherItem, publisherIndex) => {
    return {
      ...publisherItem,
      key: publisherItem.id,
      index: publisherIndex + 1,
    }
  })
  return (
    <>
      <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <h2>Danh sách Nhà xuất bản</h2>
          <Search
            placeholder="Nhập để tìm kiếm"
            allowClear
            enterButton
            style={{ width: 400, margin: '0 0 20px 0' }}
            onSearch={onSearch}
          />
          <Button type="primary" onClick={() => handleCreatePublisher()} >Thêm nhà xuất bản</Button>
        </Row>

        <Table loading={publisherListAdmin.load} columns={tableColumns} dataSource={dataTable} />
        <Modal
          title={publisherSelected.id ? "Cập nhập nhà xuất bản: " : "Thêm nhà xuất bản:"}
          width={600}
          visible={isModalVisible}
          onOk={() => handleSubmitForm()}
          onCancel={() => setIsModalVisible(false)}
          >
          <Form
            form={formPublisher}
            layout="vertical"
            name="categoryForm"
            initialValues={publisherSelected.id
              ? { ...publisherSelected }
              : {}
            }
          >
            <Form.Item
              label="Nhà xuất bản"
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
    getPublisherAdmin: (params) => dispatch(getPublisherAdminAction(params)),
    createPublisherAdmin: (params) => dispatch(createPublisherAdminAction(params)),
    updatePublisherAdmin: (params) => dispatch(updatePublisherAdminAction(params)),
    deletePublisherAdmin: (params) => dispatch(deletePublisherAdminAction(params)),

  }
}

const mapStateToProps = (state) => {
  const { publisherListAdmin } = state.categoryAdminReducer
  return {
    publisherListAdmin
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPublisherPage);