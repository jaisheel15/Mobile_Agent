import { useState } from 'react';
import { Keyboard, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMessageStore } from '../../src/stores/messagestore';
import { useModelStore } from '../../src/stores/modelstore';
import { useConversationStore } from '../../src/stores/conversationStore';
import { useTheme } from '../../src/theme';
import { Box } from '../ui/box';
import { HStack } from '../ui/hstack';
import { Input, InputField } from '../ui/input';
import { nanoid } from 'nanoid/non-secure';

const ChatInput = () => {
  const { colors, input, typography, spacing, radius } = useTheme();
  const messageStore = useMessageStore();
  const modelStore = useModelStore();
  const conversationStore = useConversationStore();

  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  const isThinking = modelStore.thinking;
  const canSend = text.trim().length > 0 && !isThinking;

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    // Ensure we have an active conversation
    let convId = conversationStore.activeConversationId;
    if (!convId) {
      convId = await conversationStore.createConversation();
    }

    // Add user message
    const userMsgId = nanoid();
    messageStore.addMessage({
      id: userMsgId,
      message: trimmed,
      user: 'human',
    });

    // Auto title conversation if it's new
    const currentConv = conversationStore.conversations.find((c) => c.id === convId);
    if (currentConv && (currentConv.title === 'New Chat' || !currentConv.preview)) {
      const title = trimmed.length > 30 ? trimmed.substring(0, 30) + '…' : trimmed;
      await conversationStore.updateConversationMeta(convId, {
        title,
        preview: trimmed,
      });
    }

    setText('');
    Keyboard.dismiss();

    // Trigger AI completion
    void modelStore.chat();
  };

  return (
    <HStack
      className="items-end w-full border"
      style={{
        backgroundColor: input.background,
        borderColor: focused ? input.focusedBorder : input.border,
        borderRadius: radius.input,
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        gap: spacing[2],
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
            placeholder={isThinking ? 'Agent is thinking…' : 'Message agent…'}
            placeholderTextColor={input.placeholder}
            multiline
            maxLength={4000}
            editable={!isThinking}
            className="h-auto py-0"
            style={{
              color: input.text,
              fontFamily: typography.body.fontFamily,
              fontSize: typography.body.fontSize,
              lineHeight: typography.body.lineHeight,
              textAlignVertical: 'center',
            }}
          />
        </Input>
      </Box>

      {/* Send button */}
      <Pressable
        onPress={handleSend}
        disabled={!canSend}
        className="w-[34px] h-[34px] rounded-[17px] items-center justify-center mb-0.5"
        style={({ pressed }) => ({
          backgroundColor: canSend ? colors.primary : colors.surfaceVariant,
          opacity: pressed || !canSend ? 0.6 : 1,
        })}
      >
        <Ionicons
          name="arrow-up"
          size={18}
          color={canSend ? colors.primaryForeground : colors.textMuted}
        />
      </Pressable>
    </HStack>
  );
};

export default ChatInput;
