import * as Brightness from "expo-brightness";
import { Tool } from "../tool/tool";

export const getBrightnessTool: Tool = {
  name: "get_brightness",
  description:
    "Get the current screen brightness level as a value between 0 (darkest) and 1 (brightest)",
  parameters: {
    type: "object",
    properties: {},
    required: [],
  },
  execute: async () => {
    const brightness = await Brightness.getBrightnessAsync();

    return {
      brightness: parseFloat(brightness.toFixed(2)),
      percentage: `${Math.round(brightness * 100)}%`,
    };
  },
};
