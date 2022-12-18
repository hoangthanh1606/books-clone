import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
// import './styles.css'
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from '../Image/Image'

import history from "../../utils/history";
import { Select, Rate, message, notification, Button } from "antd";

import {
  addToCartAction,
  getCategoryListAction,
  getProductListAction,
  getPublisherListAction,
  getAllReviewListAction,
} from "../../redux/actions";

const WrapperProduct = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 1rem;
  @media only screen and (max-width: 996px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 567px) {
    grid-template-columns: 1fr;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  cursor: pointer;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

const LabelSale = styled.div `
  position: absolute;
  background-color: #F7941E;
  right: 0;
  top: 2px;
  width: 46px;
  height: 46px;
  border-radius: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 1.3rem 1.6rem; */
  span {
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0.6rem;
  background-color: #e7e7e7;
  border-radius: 50%;
  padding: 1.3rem 1.6rem;
  transition: all 300ms ease-in-out;
  :hover {
    background-color: var(--primary);
    color: var(--white);
  }
  &.disabled {
    /* pointer-event: none; */
    cursor: default;
  }
`;

const ProductItem = styled.div`
  overflow: hidden;
  padding: 2rem;
  margin-bottom: 2rem;
  i {
    transition: all 300ms ease-in-out;
  }
  :hover {
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
  }
  :hover ${IconWrapper} {
    border-radius: 1rem 0 0 0;
  }
`;

const Bottom = styled.div`
  padding: 1rem;
  text-align: left;
`;

const ProductLink = styled(Link)`
  margin-bottom: 1rem;
  font-weight: inherit;
  font-size: 1.5rem;
  color: var(--black);
  :hover {
    color: var(--primary);
  }
`;

const PriceLabel = styled.span`
  color: var(--primary);
  font-size: 1.8rem;
`;

const Price = styled.div``;

//
const SectionProduct = styled.section`
  /* margin-top: 10rem; */
  margin: 4rem auto;
`;

const ProductsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 0 1rem;
  /* padding: 10rem; */
  @media only screen and (max-width: 768px) {
    padding: 0 5rem;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4rem 0;
  }
`;

const LeftLayout = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  div {
    margin-bottom: 0.5rem;
  }
`;

const BlockTitle = styled.div`
  color: var(--grey1);
  margin-bottom: 1.6rem;
`;
const LeftHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
`;

const BlockContent = styled.ul`
  /* margin-top: -6rem; */
`;
const ListContent = styled.li`
  margin-bottom: 1rem;
`;

// const InputContent = styled.input`
//   outline: none;
//   height: auto;
//   cursor: pointer;
// `;

const LabelContent = styled.span`
  color: var(--black);
  margin-left: 1rem;
  font-size: 1.5rem;
  :hover {
    color: var(--primary);
    cursor: pointer;
  }
`;

const RightLayout = styled.div`
  text-align: center;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 3rem;
  label {
    color: var(--grey1);
  }
  select {
    padding: 1rem;
    width: 10rem;
    border: 1px solid #f2f2f2;
    outline: none;
  }
  button {
    display: inline-block;
    padding: 1rem 3rem;
    border-radius: 4rem;
    margin-right: 1rem;
    background-color: var(--primary);
    color: var(--white);
    transition: all 300ms ease-in-out;
    cursor: pointer;
    outline: none;
    :hover {
      background-color: var(--black);
    }
  }
`;
const ItemFilter = styled.div`
  margin-right: 1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem 0;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    height: 5rem;
    border-radius: 10%;
    color: var(--black);
    font-size: 1.5rem;
    border: 1px solid var(--grey2);
    margin-right: 0.5rem;
    cursor: pointer;
    :hover {
      border: 1px solid var(--primary);
      background-color: var(--primary);
      color: var(--white);
    }
  }
`;

function ProductPage({
  getCategoryList,
  getProductList,
  getPublisherList,
  categoryList,
  productList,
  publisherList,
  searchValue,
  addToCart,
  cartList,
  getAllReviewList,
  allReviewList,
}) {
  const [categorySelected, setCategorySelected] = useState(null);
  const [publisherSelected, setPublisherSelected] = useState(null);
  const [pageCurrent, setPageCurrent] = useState(1);
  const { Option } = Select;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    getCategoryList();
    getPublisherList();
    getProductList({
      page: 1,
      limit: 8,
      searchValue: searchValue.length > 0 ? searchValue[0].searchValue : "",
    });
    getAllReviewList();
    /* eslint-disable react-hooks/exhaustive-deps */

  }, [searchValue]);

  function handleFilterCategory(id) {
    setCategorySelected(id);
    setPageCurrent(1);
    getProductList({
      page: 1,
      limit: 8,
      categoryId: id,
    });
  }

  function handleFilterPublisher(id) {
    setPublisherSelected(id);
    setPageCurrent(1);
    getProductList({
      page: 1,
      limit: 8,
      publisherId: id,
    });
  }

  function handleLoadMore() {
    getProductList({
      loadMore: true,
      page: pageCurrent + 1,
      // page: productList.page + 1,
      limit: 8,
      categoryId: categorySelected,
      publisherId: publisherSelected,
    });
    setPageCurrent(pageCurrent + 1);
  }

  function handleChangePrice(value) {
    getProductList({
      sort: "price",
      order: value,
    });
  }
  function handleChangeOldNew(value) {
    getProductList({
      sort: "id",
      order: value,
    });
  }

  function handleAddToCart(id, name, price, image) {
    if (!userInfo) {
      const key = `open${Date.now()}`;
      return notification.warning({
        message: "Chưa đăng nhập",
        description: "Bạn cần đăng nhập để thêm vào giỏ hàng",
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push("/login");
            }}
          >
            Đăng nhập
          </Button>
        ),
      });
    } else {
      const existProductIndex = cartList.data.findIndex(
        (item) => item.productId === parseInt(id)
      );
      if (existProductIndex !== -1) {
        const newCartList = cartList.data;
        newCartList.splice(existProductIndex, 1, {
          productId: parseInt(id),
          count: cartList.data[existProductIndex].count + 1,
          name,
          price,
          image
        });
        addToCart({
          userId: userInfo.id,
          carts: newCartList,
        });
        message.success('Cập nhật giỏ hàng thành công!')
      } else {
        addToCart({
          userId: userInfo.id,
          carts: [
            ...cartList.data,
            {
              productId: parseInt(id),
              count: 1,
              name,
              price,
              image
            },
          ],
        });
        message.success('Thêm vào giỏ hàng thành công!')
      }
    }
  }

  function renderCategoryList() {
    return categoryList.data.map((item, index) => {
      return (
        <ListContent key={index}>
          <LabelContent
            onClick={() => handleFilterCategory(item.id)}
            style={{
              color: categorySelected === item.id ? "var(--primary)" : "",
            }}
          >
            {item.name}
          </LabelContent>
        </ListContent>
      );
    });
  }

  function renderPublisherList() {
    return publisherList.data.map((item, index) => {
      return (
        <ListContent key={index}>
          <LabelContent
            onClick={() => handleFilterPublisher(item.id)}
            style={{
              color: publisherSelected === item.id ? "var(--primary)" : "",
            }}
          >
            {item.name}
          </LabelContent>
        </ListContent>
      );
    });
  }
  
  function renderProductList() {
    if (productList.load)
      return (
        <img
          src="https://cdn0.fahasa.com/media/theme/default/loader.gif"
          alt=""
        />
      );
    return productList.data.map((productItem, productIndex) => {
      let totalRate = 0;
      let count = 0;
      allReviewList.data.forEach((item) => {
        if (productItem.id === item.productId) {
          totalRate = totalRate + item.rate;
          count += 1;
        }
      });
      return (
        <ProductItem key={productIndex}>
          <ImgContainer>
            <Link to={`/product/${productItem.id}`}>
              {/* <img src={productItem.image[0]} alt={productItem.name} /> */}
              <Image src={productItem.image[0]} alt={productItem.name} />
            </Link>
            {productItem.countInStock === 0 ? (
              <IconWrapper className="disabled">
                <i className="fas fa-shopping-cart"></i>
              </IconWrapper>
            ) : (
              <IconWrapper onClick={() => handleAddToCart(productItem.id, productItem.name, productItem.price, productItem.image)}>
                <i className="fas fa-shopping-cart"></i>
              </IconWrapper>
            )}
            {productItem.labelSale && (
              <LabelSale>
                <span>{productItem.labelSale}</span>
            </LabelSale>
            )}
          </ImgContainer>
          <Bottom>
            <div style={{ width: "100%", height: "4.2rem" }}>
              <ProductLink to={`/product/${productItem.id}`}>
                {productItem.name}
              </ProductLink>
            </div>
            <Price>
              <PriceLabel>
                {parseFloat(productItem.price)
                  .toFixed(3)
                  .toLocaleString("VN_vi")}{" "}
                đ
              </PriceLabel>
            </Price>
            <div style={{display: "flex", color: "#F6A500", fontWeight: "500"}}>
              <div>
                <Rate
                style={{color: "#F6A500", fontSize: '18px',  lineHeight: "20px"}}
                value={count !== 0 ? Math.ceil(totalRate / count) : 0}
                disabled
                />
              </div>
              <div>({count})</div>
            </div>
          </Bottom>
        </ProductItem>
      );
    });
  }

  // function renderProductList() {
  //   if (productList.load) return <img src="https://cdn0.fahasa.com/media/theme/default/loader.gif" alt="" />;
  //   return (
  //     <WrapperProduct>
  //       {productList.data.map((productItem, productIndex) => (
  //         <ProductItem key={productIndex}>
  //           <ImgContainer>
  //             <Link to={`/product/${productItem.id}`}>
  //               <img src={productItem.image[0]} alt={productItem.name} />
  //             </Link>
  //             {productItem.countInStock === 0 ? (
  //               <IconWrapper className="disabled">
  //                 <i className="fas fa-shopping-cart"></i>
  //               </IconWrapper>
  //             ) : (
  //               <IconWrapper onClick={() => handleAddToCart(productItem.id, productItem.name, productItem.price, productItem.image)}>
  //                 <i className="fas fa-shopping-cart" ></i>
  //               </IconWrapper>
  //             )}
  //           </ImgContainer>
  //           <Bottom>
  //             <div style={{ width: "100%", height: "4.2rem" }}>
  //               <ProductLink to={`/product/${productItem.id}`}>
  //                 {productItem.name}
  //               </ProductLink>
  //             </div>
  //             <Price>
  //               <PriceLabel>
  //                 {parseFloat(productItem.price)
  //                   .toFixed(3)
  //                   .toLocaleString("VN_vi")}
  //                 đ
  //               </PriceLabel>
  //             </Price>
  //           </Bottom>
  //         </ProductItem>
  //       ))}
  //     </WrapperProduct>
  //   );
  // }

  return (
    <SectionProduct className="container">
      <ProductsLayout>
        <LeftLayout>
          <div>
            <BlockTitle>
              <LeftHeading>DANH MỤC</LeftHeading>
            </BlockTitle>
            <BlockContent>
              <ListContent>
                <LabelContent
                  onClick={() => handleFilterCategory(null)}
                  style={{
                    color: categorySelected === null ? "var(--primary)" : "",
                  }}
                >
                  Tất Cả
                </LabelContent>
              </ListContent>
              {renderCategoryList()}
            </BlockContent>
          </div>
          <div style={{borderBottom: '2px solid #f6f6f6'}}></div>
          <div>
            <BlockTitle>
              <LeftHeading>NHÀ CUNG CẤP</LeftHeading>
            </BlockTitle>
            <BlockContent>
              <ListContent>
                <LabelContent
                  onClick={() => handleFilterPublisher(null)}
                  style={{
                    color: publisherSelected === null ? "var(--primary)" : "",
                  }}
                >
                  Tất Cả
                </LabelContent>
              </ListContent>
              {renderPublisherList()}
            </BlockContent>
          </div>
        </LeftLayout>
        <RightLayout>
          <div style={{borderBottom: '1px solid #ecebeb'}}>
          <Form>
            <ItemFilter>
              <label>Sắp xếp theo : </label>
              <Select
                defaultValue="asc"
                style={{ width: 130 }}
                onChange={handleChangePrice}
              >
                <Option value="asc">Giá tăng dần</Option>
                <Option value="desc">Giá giảm dần</Option>
              </Select>
            </ItemFilter>
            <ItemFilter>
              <Select
                style={{ width: 130 }}
                defaultValue="asc"
                onChange={handleChangeOldNew}
              >
                <Option value="asc">Cũ nhất</Option>
                <Option value="desc">Mới nhất</Option>
              </Select>
            </ItemFilter>
          </Form>
          </div>
          <WrapperProduct>
          {renderProductList()}
          </WrapperProduct>
          <Pagination
            style={{
              display: productList.data.length % 8 !== 0 ? "none" : "flex",
            }}
          >
            <span onClick={() => handleLoadMore()}>
              {productList.load ? "Đang tải..." : "Xem thêm"}
            </span>
          </Pagination>
        </RightLayout>
      </ProductsLayout>
    </SectionProduct>
  );
}


const mapStateToProps = (state) => {
  const { productList, categoryList, publisherList, searchValue } = state.productReducer;
  const { cartList } = state.cartReducer;
  const { allReviewList } = state.reviewReducer;
  return {
    productList: productList,
    categoryList: categoryList,
    publisherList: publisherList,
    cartList: cartList,
    searchValue,
    allReviewList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
    getPublisherList: (params) => dispatch(getPublisherListAction(params)),
    addToCart: (params) => dispatch(addToCartAction(params)),
    getAllReviewList: (params) => dispatch(getAllReviewListAction(params)),
    // getProductDetail: (params) => dispatch(getProductDetailAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
