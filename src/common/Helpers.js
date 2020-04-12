import { Platform } from "react-native";

const Helpers = {
    /**
     * Check is iOS device.
     *
     * @returns {boolean} TRUE if device is iOS, otherwise return FALSE
     */
    isIOS: () => {
        return Platform.OS === "ios";
    },

    /**
     * Check is Android device.
     *
     * @returns {boolean} TRUE if device is Android, otherwise return FALSE
     */
    isAndroid: () => {
        return Platform.OS === "android";
    },
}
export default Helpers;