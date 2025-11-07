import React, { useState, useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setFocusedTab } from "../../../store/slices/bottomtabSlice";
import Tab from './Tab';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EXCLUDED_SCREEN = [
    "WebAuth",
    "RtClinicProgram",
    "Web",
    "WebFullScreen",
    "Search",
    "TeleProcess",
    "TeleMain",
    "Food",
    "Activity",
    "FamilyList",
    "FamilyAdd",
    "FamilyProfile",
    "HealthInsight",
    "HealthCheckUpResult",
    "HealthHospitalResult",
    "HealthData",
    "Message",
    "TeleClinicProgram",
    "Post",
    "AddHealthData",
    "AddExtraData",
    "TeleClinicResult",
    "NurseChat",
    "ImageViewer",
    "ChatWebView",
    "MedicineMain",
    "MedicineSelect",
    "MedicineCreate",
    "HealthBookPersonalInfoForm",
    "HBEmploymentHistoryForm",
    "HBMedicalHistoryForm",
    "HBWorkMedicalHistoryForm",
    "PinScreen",
    "CreateAndConfirmPinSwitch"
];

const BottomTab = ({ routename, state, navigation, descriptors }) => {
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const { focusedTab, prevFocusedTab, isHide } = useAppSelector(reduxState => reduxState.bottomTab);
    const [hideStatus, setHideStatus] = useState(false);
    const offsetY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const shouldHide = EXCLUDED_SCREEN.includes(routename?.currentRouteName);
        setHideStatus(shouldHide);
        _toggleTabAnimetion(shouldHide);
    }, [routename?.currentRouteName]);

    const _toggleTabAnimetion = (shouldHide) => {
        const initialValue = shouldHide ? 0 : 80;
        const finalValue = shouldHide ? 100 : 0;
        const duration = shouldHide ? 150 : 100;
        offsetY.setValue(initialValue);
        Animated.timing(offsetY, {
            toValue: finalValue,
            duration,
            useNativeDriver: true
        }).start();
    };

    const _setFocusedTab = (tab) => {
        if (focusedTab === tab) return;
        dispatch(setFocusedTab(tab));
    };

    return (
        <Animated.View style={[styles.barContainer, { transform: [{ translateY: offsetY }], paddingBottom: insets.bottom + 12 || 12 }]}>
            {state?.routes?.map((route, index) => (
                <Tab
                    key={route?.key || index}
                    route={route}
                    index={index}
                    state={state}
                    descriptors={descriptors}
                    navigation={navigation}
                />
            )) || null}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    barContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // paddingVertical: 10,
        paddingTop: 12,
        paddingHorizontal: 16, // Add horizontal padding for better spacing
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
});

export default BottomTab;