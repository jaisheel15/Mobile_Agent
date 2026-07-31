import { create } from 'zustand';
import { Directory, File, Paths } from 'expo-file-system';
import { nanoid } from 'nanoid/non-secure';
import { useMessageStore } from './messagestore';

export type Conversation = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  preview: string;
};

type ConversationStore = {
  conversations: Conversation[];
  activeConversationId: string | null;

  loadConversations: () => Promise<void>;
  createConversation: () => Promise<string>;
  switchConversation: (id: string) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  updateConversationMeta: (id: string, updates: Partial<Pick<Conversation, 'title' | 'preview'>>) => Promise<void>;
  persistConversationList: () => Promise<void>;
};

const CONVERSATIONS_DIR_PATH = Paths.document + '/conversations';
const CONVERSATIONS_INDEX_PATH = Paths.document + '/conversations_index.json';

async function ensureDir() {
  const dir = new Directory(CONVERSATIONS_DIR_PATH);
  if (!dir.exists) {
    await dir.create({ intermediates: true, idempotent: true });
  }
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],
  activeConversationId: null,

  loadConversations: async () => {
    const indexFile = new File(CONVERSATIONS_INDEX_PATH);
    if (indexFile.exists) {
      try {
        const content = await indexFile.text();
        const conversations = JSON.parse(content) as Conversation[];
        conversations.sort((a, b) => b.updatedAt - a.updatedAt);
        set({ conversations });
      } catch (e) {
        console.error('Failed to load conversation index:', e);
        set({ conversations: [] });
      }
    }
  },

  createConversation: async () => {
    const id = nanoid();
    const now = Date.now();
    const newConversation: Conversation = {
      id,
      title: 'New Chat',
      createdAt: now,
      updatedAt: now,
      preview: '',
    };

    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      activeConversationId: id,
    }));

    useMessageStore.getState().clearMessages();
    useMessageStore.getState().setConversationId(id);
    await get().persistConversationList();

    return id;
  },

  switchConversation: async (id) => {
    await useMessageStore.getState().persistMessages();
    set({ activeConversationId: id });
    await useMessageStore.getState().loadMessages(id);
  },

  deleteConversation: async (id) => {
    await ensureDir();
    const file = new File(`${CONVERSATIONS_DIR_PATH}/${id}.json`);
    if (file.exists) {
      await file.delete();
    }

    set((state) => {
      const conversations = state.conversations.filter((c) => c.id !== id);
      const activeConversationId =
        state.activeConversationId === id ? null : state.activeConversationId;

      if (state.activeConversationId === id) {
        useMessageStore.getState().clearMessages();
      }

      return { conversations, activeConversationId };
    });

    await get().persistConversationList();
  },

  updateConversationMeta: async (id, updates) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
      ),
    }));
    await get().persistConversationList();
  },

  persistConversationList: async () => {
    const { conversations } = get();
    const indexFile = new File(CONVERSATIONS_INDEX_PATH);
    try {
      if (!indexFile.exists) {
        await indexFile.create();
      }
      await indexFile.write(JSON.stringify(conversations));
    } catch (e) {
      console.error('Failed to persist conversation index:', e);
    }
  },
}));
