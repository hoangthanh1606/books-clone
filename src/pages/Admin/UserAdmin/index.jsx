/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Space, Popconfirm, Button, Modal, Radio } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import {
  getUserListAction,
  editUserAdminAction,
  deleteUserAdminAction
} from '../../../redux/actions'


function AdminUserListPage(props) {

  const {
    getUserListAdmin,
    userListAdmin,
    deleteUserAdmin,
    editUserAdmin
  } = props

  useEffect(() => {
    getUserListAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [value, setValue] = useState("user");
  const [userSelected, setUserSelected] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);


  console.log("AdminUserListPage -> userSelected", userSelected)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))


  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };


  function ShowTable() {
    const columns = [
      {
        title: 'Name', dataIndex: 'name', key: 'name',
      },
      {
        title: 'Email', dataIndex: 'email', key: 'email',
      },
      {
        title: 'Ngày sinh', dataIndex: 'birthday', key: 'birthday',
      },
      {
        title: 'Address', dataIndex: 'address', key: 'address',
      },
      {
        title: 'Phone', key: 'phone', dataIndex: 'phone',
      },
      {
        title: 'Quyền truy cập', key: 'role', dataIndex: 'role',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => {
          return (
            <Space>
              <Button
                type="primary"
                ghost
                onClick={() => { setIsModalVisible(true); setUserSelected(record) }}
                disabled={record.email === userInfo.email ? true : false}
              >
                <EditOutlined />
              </Button>
              <Popconfirm
                title={`Bạn có chắc muốn xóa: ${record.name}`}
                onConfirm={() => handleDeleteUser(record.id)}
                okText="Xóa"
                cancelText="Hủy"
              >

                <Button danger disabled={record.email === userInfo.email ? true : false}><DeleteOutlined /></Button>
              </Popconfirm>
            </Space>
          )
        }
      },
    ];
    const dataSource = userListAdmin.data.map((userItem) => ({
      ...userItem,
      key: userItem.id
    }))
    return (
      <Table
        loading={userListAdmin.load}
        columns={columns}
        dataSource={dataSource}
      />
    )
  }


  function handleEdit() {
    editUserAdmin({
      id: userSelected.id,
      role: value
    })
    setIsModalVisible(false)
    console.log("handleEdit -> userSelected", userSelected)
  }

  if (userInfo.role === 'user') {
    return <Redirect to="/login" />
  }

  const handleDeleteUser = (id) => {
    deleteUserAdmin({ id })
  }


  return (
    <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
      <h2>Danh sách người dùng:</h2>
      {ShowTable()}
      <>
        <Modal title="Cập nhập người dùng"
          visible={isModalVisible}
          onOk={() => { handleEdit() }}
          onCancel={() => { setIsModalVisible(false) }}
          // getContainer={false}
        >
          <Radio.Group value={value} onChange={onChange} >
            <Space direction="vertical">

              <Radio value='user'>User</Radio>
              <Radio value="admin">Admin</Radio>
            </Space>
          </Radio.Group>

        </Modal>
      </>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserListAdmin: (params) => dispatch(getUserListAction(params)),
    deleteUserAdmin: (params) => dispatch(deleteUserAdminAction(params)),
    editUserAdmin: (params) => dispatch(editUserAdminAction(params))
  }
}

const mapStateToProps = (state) => {
  const { userListAdmin } = state.userAdminReducer
  return {
    userListAdmin
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminUserListPage);