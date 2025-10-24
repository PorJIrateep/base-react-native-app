import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../../screens/HomeScreen";
import DetailsScreen from "../../../screens/DetailsScreen";

const Stack = createNativeStackNavigator();

const ShareComponents = ({ screenOptions, initialRouteName }) => {
    return (
        <Stack.Navigator screenOptions={screenOptions} initialRouteName={initialRouteName}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="InboxScreen" component={DetailsScreen} />
            <Stack.Screen name="ProfileScreen" component={HomeScreen} />
            <Stack.Screen name="MenuScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default ShareComponents;
