import React, { useEffect, useState } from "react";
import Header from "./Header";

export default function AdminDashboard(props) {
  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />
      <h1>Working</h1>
    </>
  );
}
