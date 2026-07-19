import { useState } from 'react';
import { Keyboard, Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useMessageStore } from '../../src/stores/messagestore';
import { useModelStore } from '../../src/stores/modelstore';
import { useTheme } from '../../src/theme';
import { Box } from '../ui/box';
import { HStack } from '../ui/hstack';
import { Input, InputField } from '../ui/input';

const ChatInput = () => {
  const { colors, input, typography, spacing, radius } = useTheme();
  const messageStore = useMessageStore();
  const modelStore = useModelStore();

  const [ text, setText ] = useState('');
  const [ focused, setFocused ] = useState(false);

  const canSend = text.trim().length > 0;
  const handleSend = () => {
    if (!text.trim()) return;
    const message = {
      id: (messageStore.messages.length + 1).toString(),
      message: text.trim(),
      user: 'human' as const,
    };
    messageStore.addMessage(message);
    console.log('Sent message:', message);
    // Call the chat function to get AI response
    modelStore.chat();

    setText('');
    Keyboard.dismiss();
  };

  return (
    <HStack
      className="items-end w-full border"
      style={{
        backgroundColor: input.background,
        borderColor: focused ? input.focusedBorder : input.border,
        borderRadius: radius.input,
        paddingHorizontal: spacing[ 3 ],
        paddingVertical: spacing[ 2 ],
        gap: spacing[ 2 ],
      }}
    >
      {/* Text field */}
      <Box className="flex-1 justify-center">
        <Input className="border-0 bg-transparent px-0 h-auto">
          <InputField
            value={text}
            onChangeText={setText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Message agent…"
            placeholderTextColor={input.placeholder}
            multiline
            maxLength={4000}
            className="h-auto py-0"
            style={{
              color: input.text,
              fontFamily: typography.body.fontFamily,
              fontSize: typography.body.fontSize,
              lineHeight: typography.body.lineHeight,
              textAlignVertical: 'center', // Helps Android centering
            }}
          />
        </Input>
      </Box>

      {/* Send button */}
      <Pressable
        onPress={handleSend}
        disabled={!canSend}
        className="w-8.5 h-8.5 rounded-[17px] items-center justify-center mb-0.5"
        style={({ pressed }) => ({
          backgroundColor: canSend ? colors.primary : colors.surfaceVariant,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Ionicons name="arrow-up" size={18} color={canSend ? colors.primaryForeground : colors.textMuted} />
      </Pressable>
    </HStack>
  );
};

export default ChatInput;
