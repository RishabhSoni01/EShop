import React, { useEffect, useState } from 'react';
import { Box, Container, styled } from '@mui/material';
import Slide from './Slide';
import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/userHandle';
import ProductsMenu from './customer/components/ProductsMenu';
import { NewtonsCradle } from '@uiball/loaders';
import { Link } from 'react-router-dom';

const Home = () => {
  const adURL =
    'https://rukminim1.flixcart.com/flap/464/708/image/1f03e99f6dc9f7a6.jpg?q=70';

  const dispatch = useDispatch();

  const { productData, responseProducts, error } = useSelector((state) => state.user);

  const [showNetworkError, setShowNetworkError] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setShowNetworkError(true);
      }, 40000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <div id="top">
      <MobileMenuContainer>
        <ProductsMenu dropName="Categories" />
        <ProductsMenu dropName="Products" />
      </MobileMenuContainer>
      <StyledBannerBox>
        <Banner />
      </StyledBannerBox>

      {showNetworkError ? (
        <StyledContainer>
          <h1>Sorry, network error.</h1>
        </StyledContainer>
      ) : error ? (
        <StyledContainer>
          <h1>Please Wait A Second</h1>
          <NewtonsCradle size={70} speed={1.4} color="black" />
        </StyledContainer>
      ) : (
        <>
          {responseProducts ? (
            <>
              <StyledContainer>No products found right now</StyledContainer>
              <StyledContainer>
                Become a seller to add products
                <Link to="/Sellerregister">Join</Link>
              </StyledContainer>
            </>
          ) : (
            <>
              <StyledComponent>
                <LeftComponent>
                  <Slide products={productData} title="Top Selection" />
                </LeftComponent>

                <RightComponent>
                  <StyledImage src={adURL} alt="" />
                </RightComponent>
              </StyledComponent>

              <Slide products={productData} title="Deals of the Day" />
              <Slide products={productData} title="Suggested Items" />
              <Slide products={productData} title="Discounts for You" />
              <Slide products={productData} title="Recommended Items" />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  background-color: #737372;
  padding: 20px;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    margin: 10px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
const StyledBannerBox = styled(Box)`
  padding: 20px 10px;
  background: #737272;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background: linear-gradient(90deg, rgba(255, 0, 255, 0), #ffffff);
    pointer-events: none;
  }
`;

const MobileMenuContainer = styled(Container)`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;
const StyledComponent = styled(Box)`
  display: flex;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledImage = styled('img')`
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;


const BannerBox = styled(Box)`
  padding: 20px 10px;
  background: #F2F2F2;
`;

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
  width: '83%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    
  },
}));

const RightComponent = styled(Box)(({ theme }) => ({
  marginTop: 10,
  background: '#FFFFFF',
  width: '17%',
  marginLeft: 10,
  padding: 5,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));
