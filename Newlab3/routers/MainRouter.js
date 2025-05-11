// routers/MainRouter.js
import React, { useContext } from "react";
import AdminRouter from "./AdminRouter";
import CustomerRouter from "./CustomerRouter";
import AuthRouter from "./AuthRouter";
import { MyContext } from "../store/index";

export default function MainRouter() {
  const { user } = useContext(MyContext);

  if (!user) return <AuthRouter />;

  return user.role === "admin" ? <AdminRouter /> : <CustomerRouter />;
}
