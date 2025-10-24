import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import { useAppDispatch } from "../store/hooks";
import { setRouteName } from "../store/slices/routenameSlice";
import TabBottomStack from "./stacks/TabBottomStack";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const dispatch = useAppDispatch();
    const routeNameRef = useRef();
    
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                if (navigationRef.current) {
                    const route = navigationRef.current.getCurrentRoute();
                    routeNameRef.current = route?.name;
                }
            }}
            onStateChange={() => {
                if (navigationRef.current) {
                    const previousRouteName = routeNameRef.current;
                    const currentRoute = navigationRef.current.getCurrentRoute();
                    const currentRouteName = currentRoute?.name;
                    
                    if (currentRouteName) {
                        dispatch(setRouteName({ previousRouteName, currentRouteName }));
                        routeNameRef.current = currentRouteName;
                    }
                }
            }}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            >
                <Stack.Screen name="MainStack" component={TabBottomStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
