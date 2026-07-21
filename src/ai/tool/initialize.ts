import {getAllTools, registerTool} from "./registry"

import {getBatteryLevelTool} from "../tools/getBatteryLevel.tool"


export function initializeTools() {
    console.log("Initializing tools...");
    registerTool(getBatteryLevelTool);

    console.log("Tools initialized:", getAllTools().map(tool => tool.name));
}
