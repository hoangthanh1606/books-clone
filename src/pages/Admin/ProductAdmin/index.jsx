/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Modal, Button, Form, Input, InputNumber, Upload, Space, Popconfirm, Table, Row, Select } from 'antd';
import { UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';



import {
  getProductListAdminAction,
  addProductAdminAction,
  deleteProductAdminAction,
  updateProductAdminAction,
  getCategoryAdminAction,
  getPublisherAdminAction
} from '../../../redux/actions'

function ProductListAdminPage({
  getProductListAdmin,
  productListAdmin,
  addProductAdmin,
  deleteProductAdmin,
  updateProductAdmin,
  getCategoryAdmin,
  categoryListAdmin,
  getPublisherAdmin,
  publisherListAdmin
}) {
  const { Search } = Input;

  const [productForm] = Form.useForm()

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [productSelected, setProductSelected] = useState({})
  const formImages = productSelected.id
    ? productSelected.image.map((image, index) => ({
      uid: index,
      name: `image-${index + 1}.jpg`,
      type: 'image/jpeg',
      thumbUrl: image,
    }))
    : []
  const initialValues = productSelected.id
    ? {
      ...productSelected,
      image: formImages,
    }
    : {}

  useEffect(() => {
    getProductListAdmin({})
    getCategoryAdmin({})
    getPublisherAdmin({})
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])


  useEffect(() => {
    productForm.resetFields()
  }, [productSelected.id])


  function handelEditProduct(record) {
    setIsModalVisible(true)
    setProductSelected(record)
  }

  function handleCreateProduct() {
    setIsModalVisible(true);
    setProductSelected({});
  }

  function handleSubmitForm() {
    const values = productForm.getFieldValue();
    const newImages = values.image.map((file) => file.thumbUrl);
    console.log("🚀 ~ file: index.jsx ~ line 61 ~ handleSubmitForm ~ newImages", newImages)
    const newValue = {
      ...values,
      image: newImages,
    }
    if (productSelected.id) {
      updateProductAdmin({ id: productSelected.id, ...newValue })
    }
    else {
      addProductAdmin(newValue)
      productForm.resetFields()
    }
    setIsModalVisible(false)
  }

  function renderCategory() {
    return categoryListAdmin.data.map((categoryItem, categoryIndex) => {
      return (
        <Select.Option key={categoryIndex} value={categoryItem.id}>
          {categoryItem.name}
        </Select.Option>
      )
    })
  }
  function renderPublisher() {
    return publisherListAdmin.data.map((publisherItem, publisherIndex) => {
      return (
        <Select.Option key={publisherIndex} value={publisherItem.id}>
          {publisherItem.name}
        </Select.Option>
      )
    })
  }
  const onSearch = value => {
    getProductListAdmin({ searchValue: value })
  }

  const tableColumns = [
    {
      title: 'Tên sách',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: text => <Link style={{ color: 'black' }}>{text}</Link>,
    },
    {
      title: 'Loại sách',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'publisherName',
      key: 'publisherName',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => {
        return (
          <img alt='' src={record.image[0]} style={{ height: '100px', width: '100px' }} />
        )
      },
      width: 150,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      // width: 200,
      ellipsis: true,
    },

    {
      title: 'Số lượng',
      dataIndex: 'countInStock',
      key: 'countInStock',
    },
    {
      title: 'Giá (VND)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" ghost onClick={() => handelEditProduct(record)} >
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Bạn có chắc muốn xóa: ${record.name}`}
              onConfirm={() => deleteProductAdmin({ id: record.id })}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger ><DeleteOutlined /></Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  const dataTable = productListAdmin.data.map((productItem, productIndex) => {
    return {
      ...productItem,
      key: productItem.id,
      publisherName: productItem.publisher.name,
      categoryName: productItem.category.name,
      price: `${parseInt((productItem.price)).toFixed(3)} VNĐ`,
      image: productItem.image,
    }
  })


  return (
    <>
      <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <h2>Danh sách sản phẩm</h2>
          <Search
            placeholder="Nhập để tìm kiếm"
            allowClear
            enterButton
            style={{ width: 400, margin: '0 0 20px 0' }}
            onSearch={onSearch}
          />
          <Button type="primary" onClick={() => handleCreateProduct()}>
            Thêm sản phẩm
        </Button>
        </Row>

        <Table
          loading={productListAdmin.load}
          columns={tableColumns}
          dataSource={dataTable}
          scroll={{ y: 450 }}
        />
        <Modal
          title={productSelected.id ? "Cập nhập sản phẩm: " : "Thêm sản phẩm:"}
          width={700}
          style={{ top: 20 }}
          visible={isModalVisible}
          onOk={() => handleSubmitForm()}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form
            form={productForm}
            layout="vertical"
            name="productFrom"
            initialValues={initialValues}
          >
            <Form.Item
              label="Tên Sách"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên của sách!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="Loại sách"
              rules={[{ required: true, message: "Vui lòng nhập loại sách!" }]}
            >
              <Select placeholder="Loại sản phẩm">{renderCategory()}</Select>
            </Form.Item>
            <Form.Item
              label="Nhà cung cấp"
              name="publisherId"
              rules={[
                { required: true, message: "Vui lòng nhập tên nhà cung cấp!" },
              ]}
            >
              <Select placeholder="Loại sản phẩm">{renderPublisher()}</Select>
            </Form.Item>

            <Form.Item
              valuePropName="fileList"
              label="Hình ảnh"
              name="image"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) return e;
                return e && e.fileList;
              }}
              validateFirst
              rules={[
                { required: true, message: "Vui lòng tải ảnh lên!" },
                () => ({
                  validator(_, value) {
                    if (!["image/png", "image/jpeg"].includes(value[0].type)) {
                      return Promise.reject("File không đúng định dạng");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Upload listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Mô tả" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Số lượng sách"
              name="countInStock"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng của sách!" },
              ]}
            >
              <InputNumber style={{ width: 200 }} min="0" />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá của sách" }]}
            >
              <InputNumber style={{ width: 200 }} min="0" />
            </Form.Item>
            <Form.Item label="Mã hàng" name="code">
              <Input />
            </Form.Item>
            <Form.Item label="Tác giả" name="author">
              <Input />
            </Form.Item>
            <Form.Item label="Năm xuất bản" name="publicYear">
              <InputNumber style={{ width: 200 }} min="0" />
            </Form.Item>
            <Form.Item label="Trọng lượng (g)" name="weight">
              <InputNumber style={{ width: 200 }} min="0" />
            </Form.Item>
            <Form.Item label="Kích thước" name="size">
              <Input />
            </Form.Item>
            <Form.Item label="Số trang" name="numberPages">
              <InputNumber style={{ width: 200 }} min="0" />
            </Form.Item>
            <Form.Item label="Hình thức" name="formality">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductListAdmin: (params) => dispatch(getProductListAdminAction(params)),
    addProductAdmin: (params) => dispatch(addProductAdminAction(params)),
    deleteProductAdmin: (params) => dispatch(deleteProductAdminAction(params)),
    updateProductAdmin: (params) => dispatch(updateProductAdminAction(params)),
    getCategoryAdmin: (params) => dispatch(getCategoryAdminAction(params)),
    getPublisherAdmin: (params) => dispatch(getPublisherAdminAction(params))
  }
}
const mapStateToProps = (state) => {
  const { productListAdmin } = state.productAdminReducer
  const { categoryListAdmin, } = state.categoryAdminReducer
  const { publisherListAdmin } = state.categoryAdminReducer
  return {
    productListAdmin,
    categoryListAdmin,
    publisherListAdmin
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListAdminPage);



