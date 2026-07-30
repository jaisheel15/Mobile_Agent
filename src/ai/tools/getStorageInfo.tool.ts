import DeviceInfo from "react-native-device-info";
import { Tool } from "../tool/tool";

export const getStorageInfoTool: Tool = {
  name: "get_storage_info",
  description: "Get the device storage information including free and total disk space",
  parameters: {
    type: "object",
    properties: {},
    required: [],
  },
  execute: async () => {
    const [freeDisk, totalDisk] = await Promise.all([
      DeviceInfo.getFreeDiskStorage(),
      DeviceInfo.getTotalDiskCapacity(),
    ]);

    const freeGB = (freeDisk / (1024 * 1024 * 1024)).toFixed(2);
    const totalGB = (totalDisk / (1024 * 1024 * 1024)).toFixed(2);
    const usedGB = ((totalDisk - freeDisk) / (1024 * 1024 * 1024)).toFixed(2);
    const usagePercent = ((1 - freeDisk / totalDisk) * 100).toFixed(1);

    return {
      freeGB,
      usedGB,
      totalGB,
      usagePercent: `${usagePercent}%`,
    };
  },
};
