import DeviceInfo from "react-native-device-info";
import { Tool } from "../tool/tool";

export const getDeviceInfoTool: Tool = {
  name: "get_device_info",
  description:
    "Get information about the device including model, brand, OS version, and total memory",
  parameters: {
    type: "object",
    properties: {},
    required: [],
  },
  execute: async () => {
    const [model, brand, systemName, systemVersion, totalMemory, isEmulator] =
      await Promise.all([
        DeviceInfo.getModel(),
        DeviceInfo.getBrand(),
        DeviceInfo.getSystemName(),
        DeviceInfo.getSystemVersion(),
        DeviceInfo.getTotalMemory(),
        DeviceInfo.isEmulator(),
      ]);

    return {
      model,
      brand,
      operatingSystem: systemName,
      osVersion: systemVersion,
      totalMemoryGB: (totalMemory / (1024 * 1024 * 1024)).toFixed(2),
      isPhysicalDevice: !isEmulator,
    };
  },
};
