import {getBatteryLevel} from "react-native-device-info"
import {Tool} from "../tool/tool"

export const getBatteryLevelTool :Tool = {
    name: "get_battery_level",
    description: "Get the current battery level of the device",
    parameters: {
        type: "object",
        properties: {},
        required: []
    },
    execute: async () => {
        const batteryLevel = await getBatteryLevel();
        return batteryLevel;
    }
}