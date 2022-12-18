import styled from "styled-components";
import { Link } from "react-router-dom";
import history from "../../utils/history";
import Message from "../../Message";
import React from 'react';

import "./styles.css";
// import { Form, Select } from "../ProductDetail";
import { connect } from "react-redux";
import { message, Button, Space } from "antd";
import { DeleteFilled } from '@ant-design/icons'

import { addToCartAction, deleteItemCartAction } from "../../redux/actions";

const Cart = styled.div`
  margin: 2rem auto;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem 4rem;
  color: var(--white);
  background-color: var(--primary);
  font-weight: bold;
`;

const Td = styled.td`
  padding: 2rem 2rem;
  img {
    width: 8rem;
    height: 8rem;
    margin-right: 1rem;
  }
  &.total {
    font-weight: 700;
  }
`;

const CartInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.p`
  color: var(--black);
  font-size: 1.8rem;
  font-weight: 600;
  @media (max-width: 576px) {
    display: none;
  }
`;

const LinkWrapper = styled(Link)`
  color: var(--primary);
  font-size: 1.4rem;
  :hover {
    color: var(--primary);
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  flex-direction: column;
  margin-top: 2rem;
  div {
    margin-left: auto;
  }
`;

const TotalTable = styled.table`
  border-top: 3px solid var(--primary);
  width: 100%;
  max-width: 35rem;
`;

const TotalLink = styled.button`
  display: inline-block;
  background-color: var(--primary);
  color: var(--white);
  padding: 1.3rem 2rem;
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 3rem;
  outline: none;
  border: none;
  cursor: pointer;
`;

function CartPage({ cartList, addToCart, deleteItemCart }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  function handleIncreaseQuantity(productId, productDetail) {
    const indexOfProduct = cartList.data.findIndex(
      (item) => item.productId === parseInt(productId)
    );
    const newCartList = cartList.data;
    newCartList.splice(indexOfProduct, 1, {
      productId: parseInt(productId),
      count: cartList.data[indexOfProduct].count + 1,
      name: productDetail.name,
      price: productDetail.price,
      image: productDetail.image,
    });
    addToCart({
      userId: userInfo.id,
      carts: newCartList,
    });
  }

  function handleDecreaseQuantity(productId, productDetail) {
    const indexOfProduct = cartList.data.findIndex(
      (item) => item.productId === parseInt(productId)
    );
    const newCartList = cartList.data;
    newCartList.splice(indexOfProduct, 1, {
      productId: parseInt(productId),
      count: cartList.data[indexOfProduct].count - 1,
      name: productDetail.name,
      price: productDetail.price,
      image: productDetail.image,
    });
    addToCart({
      userId: userInfo.id,
      carts: newCartList,
    });
  }

  function handleDeteteItemCart(productId, productDetail) {
    const indexOfProduct = cartList.data.findIndex(
      (item) => item.productId === parseInt(productId)
    );
    const newCartList = cartList.data;
    newCartList.splice(indexOfProduct, 1);
    deleteItemCart({
      userId: userInfo.id,
      carts: newCartList,
    });
    message.error(`Đã xóa sách "${productDetail.name}" từ giỏ hàng`);
  }

  function totalPrice() {
    var total = 0;
    cartList.data.forEach((item) => {
      total = (total + item.count * item.price);
    });
    return total.toFixed(3).toLocaleString('VN-vi');
  }

  function renderCartList() {
    return cartList.data.map((cartItem, cartIndex) => {
      return (
        <tr style={{ borderBottom: "1px solid #cfcfcf" }} key={cartIndex}>
          <Td>
            <CartInfo>
              <Link>
                <img src={cartItem.image[0]} alt="" />
              </Link>
              <div>
                <Link to={`/product/${cartItem.productId}`}>
                  <Title>{cartItem.name}</Title>
                </Link>
                <span>
                  Giá:{" "}
                  {parseInt(cartItem.price).toFixed(3).toLocaleString("VN_vi")}{" "}
                  VNĐ
                </span>
                <br />
                <LinkWrapper
                  onClick={() =>
                    handleDeteteItemCart(cartItem.productId, {
                      name: cartItem.name,
                      price: cartItem.price,
                      image: cartItem.image,
                    })
                  }
                >
                  <DeleteFilled />
                </LinkWrapper>
              </div>
            </CartInfo>
          </Td>
          <Td>
            <div className="container-cart">
              <div className="quantity-control" data-quantity>
                <button
                  className="quantity-btn"
                  data-quantity-minus
                  onClick={() =>
                    handleDecreaseQuantity(cartItem.productId, {
                      name: cartItem.name,
                      price: cartItem.price,
                      image: cartItem.image,
                    })
                  }
                  disabled={cartItem.count === 1 ? true : false}
                >
                  <svg viewBox="0 0 409.6 409.6">
                    <g>
                      <g>
                        <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                      </g>
                    </g>
                  </svg>
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={cartItem.count}
                  name="quantity"
                />
                <button
                  className="quantity-btn"
                  data-quantity-plus
                  onClick={() =>
                    handleIncreaseQuantity(cartItem.productId, {
                      name: cartItem.name,
                      price: cartItem.price,
                      image: cartItem.image,
                    })
                  }
                >
                  <svg viewBox="0 0 426.66667 426.66667">
                    <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                  </svg>
                </button>
              </div>
            </div>
          </Td>
          <Td style={{color: 'var(--primary)', fontSize:'16px'}}>
            {parseInt(cartItem.price * cartItem.count)
              .toFixed(3)
              .toLocaleString("VN_vi")}{" "}
            VNĐ
          </Td>
        </tr>
      );
    });
  }

  return (
    <>
      {cartList.data.length === 0 ? (
        <>
          <Message type="warning" message="Giỏ hàng của bạn rỗng!" />
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-10rem",
              marginBottom: "5rem",
            }}
          >
            <Button
              onClick={() => {
                history.push("/products");
              }}
            >
              Tiếp tục mua sắm
            </Button>
          </Space>
        </>
      ) : (
        <Cart className="container">
          <Table>
            <thead>
              <tr>
                <Th>Sản Phẩm</Th>
                <Th>Số Lượng</Th>
                <Th>Giá</Th>
              </tr>
            </thead>
            <tbody>{renderCartList()}</tbody>
          </Table>

          <TotalPrice>
            <div>
              <TotalTable>
                <tbody>
                  <tr>
                    <Td>
                      Tổng Tiền (
                      {cartList.data.reduce((acc, item) => acc + item.count, 0)}
                      )
                    </Td>
                    <Td>
                      {/* {cartList.data
                        .reduce((acc, item) => acc + item.count * item.price, 0)
                        .toFixed(3)
                        .toLocaleString("VN_vi")}{" "}
                      VNĐ */}
                      {totalPrice()} VNĐ
                    </Td>
                  </tr>
                  <tr>
                    <Td>Thuế</Td>
                    <Td>0</Td>
                  </tr>
                  <tr>
                    <Td>Thành Tiền</Td>
                    <Td className="total">
                      {/* {cartList.data
                        .reduce((acc, item) => acc + item.count * item.price, 0)
                        .toFixed(3)
                        .toLocaleString("VN-vi")}{" "}
                      VNĐ */}
                      {totalPrice()} VNĐ
                    </Td>
                  </tr>
                </tbody>
              </TotalTable>
              <TotalLink type="button" onClick={() => history.push('/order')}>Thanh Toán</TotalLink>
            </div>
          </TotalPrice>
        </Cart>
      )}
    </>
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
    addToCart: (params) => dispatch(addToCartAction(params)),
    deleteItemCart: (params) => dispatch(deleteItemCartAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
