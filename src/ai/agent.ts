import type { LlamaContext } from 'llama.rn';
import { useMessageStore } from '../stores/messagestore';
import { executeTool } from './tool/executor';
import { initializeTools } from './tool/initialize';
import { getAllTools } from './tool/registry';
import { getSystemPrompt } from './systemPrompt';
import { nanoid } from 'nanoid/non-secure';

const MAX_TOOL_ITERATIONS = 10;

export async function agentLoop(context: LlamaContext, aiMessageId: string, onToken: (token: string) => void) {
  // Lazy-initialize tools on first agent run instead of at module import time.
  initializeTools();

  const systemMessage = { role: 'system' as const, content: getSystemPrompt() };
  const tools = getAllTools().map((t) => ({
    type: 'function' as const,
    function: { name: t.name, description: t.description, parameters: t.parameters },
  }));

  let iteration = 0;
  let hasToolCalls: boolean;

  do {
    hasToolCalls = false;
    iteration += 1;

    if (iteration > MAX_TOOL_ITERATIONS) {
      console.warn(`Agent reached max tool iterations (${MAX_TOOL_ITERATIONS}). Stopping loop.`);
      onToken('\n\n[Reached the maximum number of tool calls for this request.]');
      break;
    }

    const rawMessages = useMessageStore.getState().getMessages();
    const messages = [systemMessage, ...rawMessages];

    const response = await context.completion(
      {
        messages,
        tools,
        n_predict: 2048,
      },
      (data) => {
        if (data.token) {
          onToken(data.token);
        }
      }
    );
    console.log('AI response:', response.text);

    if (response.tool_calls && response.tool_calls.length > 0) {
      for (const tool_call of response.tool_calls) {
        const toolCallId = tool_call.id ?? nanoid();
        const { name, arguments: rawArgs } = tool_call.function;
        try {
          const args = typeof rawArgs === 'string' ? JSON.parse(rawArgs) : rawArgs;
          const result = await executeTool(name, args);
          console.log(`Tool ${name} executed successfully. Result:`, result);

          useMessageStore.getState().addMessage({
            id: nanoid(),
            message: JSON.stringify({
              name,
              toolCallId,
              result,
            }),
            user: 'tool',
          });
        } catch (error) {
          console.error(`Error executing tool ${name}:`, error);
          // Feed the error back to the LLM so it can respond gracefully
          useMessageStore.getState().addMessage({
            id: nanoid(),
            message: JSON.stringify({
              name,
              toolCallId,
              result: null,
              error: error instanceof Error ? error.message : 'Unknown error',
            }),
            user: 'tool',
          });
        }
      }
      hasToolCalls = true;
    }
  } while (hasToolCalls);
}
