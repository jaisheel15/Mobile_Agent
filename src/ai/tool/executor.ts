import { hasTool, getTool } from "./registry"

type ToolResult = {
    readonly name: string;
    readonly result: any;
    readonly error?: string;
}

export async function executeTool(name: string, args: Record<string, any>): Promise<ToolResult> {
        if (!hasTool(name)) {
            throw new Error(`Tool with name ${name} is not registered.`);
        }

        const tool = getTool(name);
        if (!tool) {
            throw new Error(`Tool with name ${name} is not found.`);
        }

        try {
            const result = await tool.execute(args);
            return { name, result };
        } catch (error: any) {
            return { name, result: null, error: error.message || "Unknown error" };
        }
    }