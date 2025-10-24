import React, { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import { useSelector } from "react-redux";
import AppScreen from "./AppScreen";

const AppScreenContainer = () => {
  const routename = useSelector((state) => state.routename);
  const backhandler = useRef(null);

  useEffect(() => {
    backhandler.current = BackHandler.addEventListener(
      "hardwareBackPress",
      _handleBackButton
    );

    return () => {
      if (backhandler.current) {
        backhandler.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    const current = routename?.currentRouteName;
    const previous = routename?.previousRouteName;
    
    if (current === "SplashScreen") {
      BackHandler.exitApp();
    }
    if (current === "Login" && previous === "Home") {
      BackHandler.exitApp();
    }
  }, [routename]);

  const _handleBackButton = () => {
    const current = routename?.currentRouteName;
    
    if (
      current === "Home" ||
      current === "Inbox" ||
      current === "Profile" ||
      current === "Menu"
    ) {
      BackHandler.exitApp();
      return true;
    }

    return false;
  };

  return <AppScreen />;
};

export default AppScreenContainer;