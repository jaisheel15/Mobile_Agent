import * as Brightness from "expo-brightness";
import { Tool } from "../tool/tool";

export const setBrightnessTool: Tool = {
  name: "set_brightness",
  description:
    "Set the screen brightness to a specific level. The level must be a number between 0 (darkest) and 1 (brightest). For example, 0.5 is 50% brightness.",
  parameters: {
    type: "object",
    properties: {
      level: {
        type: "number",
        description:
          "The brightness level to set, between 0 (darkest) and 1 (brightest)",
      },
    },
    required: ["level"],
  },
  execute: async (args) => {
    const level = Math.max(0, Math.min(1, Number(args.level)));
    await Brightness.setBrightnessAsync(level);

    return {
      success: true,
      brightnessSet: parseFloat(level.toFixed(2)),
      percentage: `${Math.round(level * 100)}%`,
    };
  },
};
