import NetInfo from "@react-native-community/netinfo";
import { Tool } from "../tool/tool";

export const getNetworkStatusTool: Tool = {
  name: "get_network_status",
  description:
    "Get the current network status including connection type (wifi, cellular, none) and whether the device is connected to the internet",
  parameters: {
    type: "object",
    properties: {},
    required: [],
  },
  execute: async () => {
    const state = await NetInfo.fetch();

    return {
      type: state.type,
      isConnected: state.isConnected,
      isInternetReachable: state.isInternetReachable,
      details: state.details,
    };
  },
};
