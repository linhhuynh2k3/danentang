import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import AuthRouter from "./routers/AuthRouter";
import AdminRouter from "./routers/AdminRouter";
import CustomerRouter from "./routers/CustomerRouter";

const AppRun = () => {
  const [userRole, setUserRole] = useState(null); // 'admin' | 'customer' | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const doc = await firestore().collection("USERS").doc(user.email).get();
        if (doc.exists) {
          setUserRole(doc.data().role);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // Có thể thay bằng spinner

  return (
    <NavigationContainer>
      {userRole === "admin" ? (
        <AdminRouter />
      ) : userRole === "customer" ? (
        <CustomerRouter />
      ) : (
        <AuthRouter />
      )}
    </NavigationContainer>
  );
};

export default AppRun;
