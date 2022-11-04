import React from "react";
import styled from "styled-components";
import { Button } from "../../button";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  margin-bottom: 60px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 600px;
      color: #eeeeee;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">My Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              eaque accusantium similique voluptatem fugiat quisquam. Laboriosam
              distinctio qui nostrum, doloribus, dolorum, optio consequuntur
              repellendus expedita delectus id totam ducimus quasi.
            </p>
            <Button to="/sign-up" kind="secondary">
              Get started
            </Button>
          </div>
          <div className="banner-image">
            <img src="/my-blog-banner.png" alt="" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
