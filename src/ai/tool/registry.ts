import {Tool} from "./tool";


type ToolRegistry = {
  [key: string]: Tool;
};

const  toolRegistry: ToolRegistry = {};

export const registerTool = (tool: Tool) => {
  if (toolRegistry[tool.name]) {
    throw new Error(`Tool with name ${tool.name} is already registered.`);
  }
  toolRegistry[tool.name] = tool;
}

export const hasTool = (name: string): boolean => {
  return !!toolRegistry[name];
}

export const getTool = (name: string): Tool | undefined => {
  return toolRegistry[name];
}

export const getAllTools = (): Tool[] => {
  return Object.values(toolRegistry);
}

