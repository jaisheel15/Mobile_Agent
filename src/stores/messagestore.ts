import { create } from 'zustand';


type user = 'ai' | 'human';

type message = {
  id: string;
  message: string;
  user: user;
};

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type MessageStore = {
  messages: message[];
  addMessage: (message: message) => void;
  appendMessageText: (id: string, text: string) => void;
  getMessages: () => ChatMessage[];
};

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [

  ],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  appendMessageText: (id, text) => set((state) => ({
    messages: state.messages.map((msg) => 
      msg.id === id ? { ...msg, message: msg.message + text } : msg
    )
  })),
  getMessages: () => {
    return get().messages.map((msg) => ({
      role: msg.user === "human" ? "user" : "assistant",
      content: msg.message,
    }));
  },
}));
