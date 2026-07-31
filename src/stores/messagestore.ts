import { create } from 'zustand';
import { Directory, File, Paths } from 'expo-file-system';

type UserRole = 'ai' | 'human' | 'tool';

export type Message = {
  id: string;
  message: string;
  user: UserRole;
  timestamp: number;
};

type ChatMessage = {
  role: 'user' | 'assistant' | 'tool' | 'system';
  content: string;
};

type MessageStore = {
  messages: Message[];
  conversationId: string | null;

  setConversationId: (id: string | null) => void;
  addMessage: (message: Omit<Message, 'timestamp'>) => void;
  appendMessageText: (id: string, text: string) => void;
  getMessages: () => ChatMessage[];
  loadMessages: (conversationId: string) => Promise<void>;
  clearMessages: () => void;
  persistMessages: () => Promise<void>;
};

const CONVERSATIONS_DIR_PATH = Paths.document + '/conversations';

async function ensureConversationsDir() {
  const dir = new Directory(CONVERSATIONS_DIR_PATH);
  if (!dir.exists) {
    await dir.create({ intermediates: true, idempotent: true });
  }
}

function getConversationFile(conversationId: string): File {
  return new File(CONVERSATIONS_DIR_PATH + `/${conversationId}.json`);
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  conversationId: null,

  setConversationId: (id) => set({ conversationId: id }),

  addMessage: (message) => {
    const fullMessage: Message = { ...message, timestamp: Date.now() };
    set((state) => ({ messages: [...state.messages, fullMessage] }));
    // Persist after adding, in background
    setTimeout(() => void get().persistMessages(), 0);
  },

  appendMessageText: (id, text) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, message: msg.message + text } : msg
      ),
    }));
  },

  getMessages: () => {
    return get().messages.map((msg) => ({
      role:
        msg.user === 'human'
          ? ('user' as const)
          : msg.user === 'tool'
          ? ('tool' as const)
          : ('assistant' as const),
      content: msg.message,
    }));
  },

  loadMessages: async (conversationId) => {
    await ensureConversationsDir();
    const file = getConversationFile(conversationId);

    if (file.exists) {
      try {
        const content = await file.text();
        const messages = JSON.parse(content) as Message[];
        set({ messages, conversationId });
      } catch (e) {
        console.error('Failed to load conversation:', e);
        set({ messages: [], conversationId });
      }
    } else {
      set({ messages: [], conversationId });
    }
  },

  clearMessages: () => set({ messages: [], conversationId: null }),

  persistMessages: async () => {
    const { conversationId, messages } = get();
    if (!conversationId || messages.length === 0) return;

    await ensureConversationsDir();
    const file = getConversationFile(conversationId);
    try {
      if (!file.exists) {
        await file.create();
      }
      await file.write(JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to persist conversation:', e);
    }
  },
}));
