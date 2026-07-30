import { getAllTools, registerTool } from "./registry";

import { getBatteryLevelTool } from "../tools/getBatteryLevel.tool";
import { getDeviceInfoTool } from "../tools/getDeviceInfo.tool";
import { getStorageInfoTool } from "../tools/getStorageInfo.tool";
import { getNetworkStatusTool } from "../tools/getNetworkStatus.tool";
import { getBrightnessTool } from "../tools/getBrightness.tool";
import { setBrightnessTool } from "../tools/setBrightness.tool";
import { getLocationTool } from "../tools/getLocation.tool";
import { getTimeTool } from "../tools/getTime.tool";

export function initializeTools() {
  console.log("Initializing tools...");

  registerTool(getBatteryLevelTool);
  registerTool(getDeviceInfoTool);
  registerTool(getStorageInfoTool);
  registerTool(getNetworkStatusTool);
  registerTool(getBrightnessTool);
  registerTool(setBrightnessTool);
  registerTool(getLocationTool);
  registerTool(getTimeTool);

  console.log(
    "Tools initialized:",
    getAllTools().map((tool) => tool.name)
  );
}
