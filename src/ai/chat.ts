import { useModelStore } from "../stores/modelstore";
import { useMessageStore } from "../stores/messagestore";
import { nanoid } from "nanoid/non-secure";

export async function ChatAi() {
  const { context } = useModelStore.getState();
  console.log("Current context:", context);

  if (!context) {
    throw new Error("Model context is not initialized.");
  }

//   const userMessage = {
//     id: nanoid(),
//     message,
//     user: "human" as const,
//   };

//   // Add user message
//   useMessageStore.getState().addMessage(userMessage);

  // Read the latest history
  const messages = useMessageStore.getState().getMessages();

  console.log("Current messages:", messages);

  // Generate response
  const response = await context.completion({
    messages,
  });
  

  console.log("AI response:", response.text);

  // Store AI response
  useMessageStore.getState().addMessage({
    id: nanoid(),
    message: response.text,
    user: "ai",
  });
}