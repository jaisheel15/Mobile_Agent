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
  loadMessages: (conversationId: string) => void;
  clearMessages: () => void;
  persistMessages: () => void;
};

const CONVERSATIONS_DIR_PATH = Paths.document + '/conversations';

function ensureConversationsDir() {
  const dir = new Directory(CONVERSATIONS_DIR_PATH);
  if (!dir.exists) {
    dir.create({ intermediates: true, idempotent: true });
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
    setTimeout(() => get().persistMessages(), 0);
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

  loadMessages: (conversationId) => {
    ensureConversationsDir();
    const file = getConversationFile(conversationId);

    if (file.exists) {
      try {
        const content = file.textSync();
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

  persistMessages: () => {
    const { conversationId, messages } = get();
    if (!conversationId || messages.length === 0) return;

    ensureConversationsDir();
    const file = getConversationFile(conversationId);
    try {
      if (!file.exists) {
        file.create();
      }
      file.write(JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to persist conversation:', e);
    }
  },
}));
