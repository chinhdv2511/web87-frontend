import { Layout, Menu } from "antd";
import React from "react";

const HEADER_STYLE = {
  display: "flex",
  alignItems: "center",
  padding: "20px 30px",
  position: "sticky",
  top: "0px",
  zIndex: 10000,
  gap: "40px",
};

const LOGO_STYLE = {
  width: "100px",
  height: "35px",
  background: "#ccc",
};

const MENU_ITEMS = [
  { label: "Home", key: "home" },
  { label: "Favorites", key: "favorites" },
  { label: "About us", key: "about-us" },
];

export default function Header() {
  return (
    <Layout.Header className="header" style={HEADER_STYLE}>
      <div className="logo" style={LOGO_STYLE}></div>

      <Menu
        theme="dark"
        mode="horizontal"
        items={MENU_ITEMS}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Layout.Header>
  );
}
