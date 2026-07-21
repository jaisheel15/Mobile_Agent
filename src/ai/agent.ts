import type { LlamaContext } from 'llama.rn';
import { useMessageStore } from '../stores/messagestore';
import { executeTool } from './tool/executor';
import { initializeTools } from './tool/initialize';
import { getAllTools } from './tool/registry';
import { nanoid } from 'nanoid/non-secure';

initializeTools();

export async function agentLoop(context: LlamaContext, aiMessageId: string, onToken: (token: string) => void) {
  let hasToolCalls: boolean;
  do {
    hasToolCalls = false;
    const messages = useMessageStore.getState().getMessages();
    const tools = getAllTools().map((t) => ({ type: 'function' as const, function: { name: t.name, description: t.description, parameters: t.parameters } }));
    const response = await context.completion(
        { messages,
             tools,
              n_predict: 512 },
         (data) => {
      if (data.token) {
        onToken(data.token);
      }
    });
    console.log('AI response:', response.text);

    if (response.tool_calls && response.tool_calls.length > 0) {
      for (const tool_call of response.tool_calls) {
        const { name, arguments: rawArgs } = tool_call.function;
        try {
          const args = typeof rawArgs === 'string' ? JSON.parse(rawArgs) : rawArgs;
          const result = await executeTool(name, args);
          console.log(`Tool ${name} executed successfully. Result:`, result);

          useMessageStore.getState().addMessage({
            id: nanoid(),
            message: JSON.stringify(result),
            user: 'tool',
          });
        } catch (error) {
          console.error(`Error executing tool ${name}:`, error);
        }
      }
      hasToolCalls = true;
    }
  } while (hasToolCalls);
}
