/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Title from "../../Title";

import { useEffect } from 'react';
import { connect } from "react-redux";
import { getProductListAction, addToCartAction, getAllReviewListAction } from "../../redux/actions";

import { Rate } from "antd";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// style promotion
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  @media (max-width: 996px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CollectionTitle = styled.h3`
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5rem;
  padding: 0.7rem 1.4rem;
  font-size: 1.7rem;
  font-weight: inherit;
  margin-bottom: 1rem;
  transition: all 300ms ease-in-out;
  & a {
    color: var(--white);
  }
  @media (min-width: 1200px) {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 5rem;
    padding: 0.7rem 1.4rem;
    font-size: 1.6rem;
  }
`;

const CollectionItem = styled.div`
  overflow: hidden;
  position: relative;
  z-index: 0;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    transition: all 500ms ease-in-out;
  }
  :hover ${CollectionTitle}  {
    & a {
    color: var(--black);
  }
    background-color: var(--white);
  }
  :hover img {
    transform: scale(1.2);
  }
  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    visibility: hidden;
    transition: all 500ms ease-in-out;
  }
  :hover::after {
    visibility: visible;
    opacity: 1;
  }
`;

const CollectionContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: (--white);
  text-align: center;
  z-index: 3;
`;

const CollectionLink = styled(Link)`
  transition: all 300ms ease-in-out;
  font-size: 1.4rem;
  color: var(--white);
  :hover {
    color: var(--primary);
  }
`;

// style for products
const WrapperProduct = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
  /* padding: 0 10rem; */
  margin-bottom: 5rem;
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
  right: 1.5rem;
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
  right: 1.5rem;
  bottom: 0.6rem;
  /* background-color: var(--white); */
  background-color: #e8e8e8;
  border-radius: 50%;
  padding: 1.3rem 1.6rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
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
  background-color: white;
  padding: 2rem 0;
  border-radius: 0.5rem;
  /* margin-bottom: 2rem; */
  overflow: hidden;
  i {
    transition: all 300ms ease-in-out;
  }
  :hover {
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
  }
  :hover ${IconWrapper} {
    border-radius: 1rem 0 0 0;
  }
`;

const Bottom = styled.div`
  padding: 1rem;
  text-align: start;
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

function Home({ getProductList, productList, addCart, getAllReviewList, allReviewList }) {
  const CollectionData = [
    {
      url: "/images/promo1.jpeg",
      label: "Alphabooks",
      path: "/",
    },
    {
      url: "https://images.unsplash.com/photo-1520467795206-62e33627e6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
      label: "MCBOOKS",
      path: "/",
    },
    {
      url: "/images/promo3.jpeg",
      label: "Nhã Nam",
      path: "/",
    },
    {
      url: "/images/promo4.jpeg",
      label: "NXB Kim Đồng",
      path: "/",
    },
    {
      url: "https://images.unsplash.com/photo-1466583985723-b74122659346?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80",
      label: "NXB Trẻ",
      path: "/",
    },
    {
      url: "https://images.unsplash.com/photo-1471417834049-cbf30bf7a2a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1185&q=80",
      label: "Bách Việt",
      path: "/",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };

  useEffect(() => {
    getProductList({
      page: 1,
      limit: 10,
    });
    getAllReviewList()
  }, []);

  function renderProductList() {
    if (productList.load)
      return (<img src="https://cdn0.fahasa.com/media/theme/default/loader.gif" alt="" />);

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
              <img src={productItem.image[0]} alt={productItem.name} />
            </Link>
            {productItem.countInStock === 0 ? (
              <IconWrapper className="disabled">
                <i className="fas fa-shopping-cart"></i>
              </IconWrapper>
            ) : (
              <IconWrapper>
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

  return (
    <>
      <section className="section-slider">
        <div className="container-slider">
          <Slider {...settings}>
              <img src="https://cdn0.fahasa.com/media/magentothem/banner7/flower-store-920_x_420.png" alt=""/>
              <img src="https://cdn0.fahasa.com/media/magentothem/banner7/BigSale_T1221_mainbanner__920x420.jpg" alt=""/>
              <img src="https://cdn0.fahasa.com/media/magentothem/banner7/manga_comic_920_x_420.png" alt=""/>
              <img src="https://cdn0.fahasa.com/media/magentothem/banner7/moca_920_x_420.png" alt=""/>
              <img src="https://cdn0.fahasa.com/media/magentothem/banner7/PCSC-T10_920x420.png" alt=""/>
              <img src="https://cdn0.fahasa.com/media/magentothem/banner7/dcvp2.jpg" alt=""/>
              <img src="https://cdn0.fahasa.com/media/magentothem/banner7/920x420_1.3.png" alt=""/>
              <img src="https://cdn0.fahasa.com/media/magentothem/banner7/phienchodocu920x420.png" alt=""/>
              <img src="https://cdn0.fahasa.com/media/magentothem/banner7/PNG-Bo2-920x400.png" alt=""/>
              <img src="https://cdn0.fahasa.com/media/magentothem/banner7/shopeepay_920.jpg" alt=""/>
          </Slider>
        </div>
      </section>
      {/* collection */}
      <section className="section" >
        <Title title="Books Collection" subtitle="Chossen Goods Book" />
        <Wrapper className="container">
          {CollectionData.map((item, index) => (
            <CollectionItem key={index}>
              <img src={item.url} alt={item.label} />
              <CollectionContent>
                <CollectionTitle>
                  <Link to='/products'>{item.label}</Link>
                </CollectionTitle>
                <CollectionLink to='/products'>SHOP NOW</CollectionLink>
              </CollectionContent>
            </CollectionItem>
          ))}
        </Wrapper>
      </section>
      {/* product */}
      <section className="container">
        <Title title="New Products" subtitle="Chossen Goods Book" />
        <WrapperProduct>
          {renderProductList()}
        </WrapperProduct>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  const { productList } = state.productReducer;
  const { allReviewList } = state.reviewReducer;
  return {
    productList: productList,
    allReviewList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    addToCart: (params) => dispatch(addToCartAction(params)),
    getAllReviewList: (params) => dispatch(getAllReviewListAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
