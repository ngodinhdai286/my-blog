import { signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import HomeBanner from "../components/module/home/HomeBanner";
import HomeFeature from "../components/module/home/HomeFeature";
import HomeNewest from "../components/module/home/HomeNewest";
import { auth } from "../firebase/firebase-config";
const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
