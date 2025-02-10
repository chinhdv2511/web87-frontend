import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-page">
      <h1>Home page</h1>
      <h2>Hello, {user.fullName}</h2>
    </div>
  );
}
