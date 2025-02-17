import React, { useCallback, useContext, useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "antd";

import AuthContext from "../contexts/AuthContext";

import Header from "../components/layout/Header";
import StoryListPage from "./home/StoryListPage";
import ReadStoryPage from "./home/ReadStoryPage";
import AboutPage from "./home/AboutPage";

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <Layout className="home-page">
      <Header />

      <Layout.Content style={{ padding: "20px 0px" }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}
