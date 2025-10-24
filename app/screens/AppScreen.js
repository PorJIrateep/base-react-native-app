import React, { useEffect, useRef } from "react";
import { StatusBar, Keyboard, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { showKeyboard, hideKeyboard } from "../store/slices/keyboardSlice";
import AppNavigator from "../navigation/AppNavigator";

const AppScreen = () => {
  const dispatch = useDispatch();
  const routename = useSelector((state) => state.routename);
  const user = useSelector((state) => state.user);
  
  // Refs for keyboard listeners
  const keyboardDidShowListener = useRef(null);
  const keyboardDidHideListener = useRef(null);

  useEffect(() => {
    _settingStatusBar();
    _addKeyboardListener();

    // Cleanup function
    return () => {
      keyboardDidShowListener.current?.remove();
      keyboardDidHideListener.current?.remove();
    };
  }, []);

  useEffect(() => {
    _handleChangeStatusBar();
  }, [routename]);

  const _settingStatusBar = () => {
    StatusBar.setHidden(false, "slide");
    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#F9F7F7");
      StatusBar.setTranslucent(true);
    }
  };

  const _handleChangeStatusBar = () => {
    const currentRouteName = routename?.currentRouteName;
    
    switch (currentRouteName) {
      case "Home": {
        if (Platform.OS === "android") {
          StatusBar.setBackgroundColor("#F9F7F7", true);
        }
        StatusBar.setBarStyle("dark-content");
        break;
      }
      case "Profile": {
        if (Platform.OS === "android") {
          StatusBar.setBackgroundColor("#F9F7F7", true);
        }
        StatusBar.setBarStyle("dark-content");
        break;
      }
      case "Menu": {
        if (Platform.OS === "android") {
          StatusBar.setBackgroundColor("#F9F7F7", true);
        }
        StatusBar.setBarStyle("dark-content");
        break;
      }
      case "Inbox": {
        if (Platform.OS === "android") {
          StatusBar.setBackgroundColor("#F9F7F7", true);
        }
        StatusBar.setBarStyle("dark-content");
        break;
      }
      default: {
        if (Platform.OS === "android") {
          StatusBar.setBackgroundColor("#F9F7F7", true);
        }
        StatusBar.setBarStyle("dark-content");
      }
    }
  };

  const _addKeyboardListener = () => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        const { height, width } = e.endCoordinates;
        dispatch(showKeyboard({ height, width }));
        StatusBar.setBarStyle("dark-content");
      }
    );
    
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        dispatch(hideKeyboard());
        StatusBar.setBarStyle("dark-content");
      }
    );
  };

  return <AppNavigator />;
};

export default AppScreen;