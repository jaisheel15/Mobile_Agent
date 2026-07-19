import type { LlamaContext } from 'llama.rn';
import { nanoid } from 'nanoid/non-secure';
import { create } from 'zustand';
import { useMessageStore } from './messagestore';

interface ModelStore {
  progress: number;

  downloading: boolean;

  downloaded: boolean;

  loading: boolean;

  loaded: boolean;

  modelPath: string | null;

  context: LlamaContext | null;

  error: string | null;

  setProgress: (value: number) => void;

  setDownloading: (value: boolean) => void;

  setDownloaded: (value: boolean) => void;

  setLoading: (value: boolean) => void;

  setLoaded: (value: boolean) => void;

  setModelPath: (path: string) => void;

  setContext: (ctx: LlamaContext) => void;

  setError: (err: string | null) => void;

  chat: () => Promise<void>;
}

export const useModelStore = create<ModelStore>((set) => ({
  progress: 0,

  downloading: false,

  downloaded: false,

  loading: false,

  loaded: false,

  modelPath: null,

  context: null,

  error: null,

  setProgress: (progress) => set({ progress }),

  setDownloading: (downloading) => set({ downloading }),

  setDownloaded: (downloaded) => set({ downloaded }),

  setLoading: (loading) => set({ loading }),

  setLoaded: (loaded) => set({ loaded }),

  setModelPath: (modelPath) => set({ modelPath }),

  setContext: (context) => set({ context }),

  setError: (error) => set({ error }),

  chat: async () => {
    try {
      console.log('Starting chat...');
      const { context } = useModelStore.getState();
      if (!context) {
        throw new Error('Model context is not initialized.');
      }

      // Read the latest history
      const messages = useMessageStore.getState().getMessages();
      console.log('Current messages:', messages);

      // Create a placeholder message for the AI
      const aiMessageId = nanoid();
      useMessageStore.getState().addMessage({
        id: aiMessageId,
        message: '',
        user: 'ai',
      });

      // Generate response with streaming callback
      const response = await context.completion(
        {
          messages,
          n_predict: 256, // limit output length to prevent infinite generation
        },
        (data) => {
          // Stream tokens to the UI in real-time
          if (data.token) {
            useMessageStore.getState().appendMessageText(aiMessageId, data.token);
          }
        },
      );

      console.log('AI response finished:', response.text);
    } catch (error) {
      console.error('Error in chat:', error);
      set({ error: (error as Error).message });
    }
  },
}));
