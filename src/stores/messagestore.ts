import { create } from 'zustand';

type user = 'ai' | 'human';

type message = {
  id: string;
  message: string;
  user: user;
};

type MessageStore = {
  messages: message[];
  addMessage: (message: message) => void;
  getMessages: () => message[];
};

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [
    {
      id: '1',
      message:
        'Hello! How can I assist you today? THre is nothing ',
      user: 'ai',
    },
    {
      id: '2',
      message: 'I need help with my account.',
      user: 'human',
    },
    {
      id: '3',
      message: 'Sure! What seems to be the issue?',
      user: 'ai',
    },
    {
      id: '4',
      message: 'I forgot my password and cannot log in.',
      user: 'human',
    },
    {
      id: '5',
      message: 'No worries! I can help you reset your password. Please follow the instructions I will provide.',
      user: 'ai',
    },
    {
      id: '6',
      message: 'Thank you! I appreciate your assistance.',
      user: 'human',
    },
    {
      id: '7',
      message:
        "You're welcome! I'm here to help. If you have any other questions or need further assistance, feel free to ask.",
      user: 'ai',
    },
    {
      id: '8',
      message: 'I will. Thanks again!',
      user: 'human',
    },
    {
      id: '9',
      message: 'No problem! Have a great day!',
      user: 'ai',
    },
    {
      id: '10',
      message: 'You too! Goodbye!',
      user: 'human',
    },
    {
      id: '11',
      message: 'Goodbye! Take care!',
      user: 'ai',
    },
  ],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  getMessages: () => {
    return get().messages;
  },
}));
