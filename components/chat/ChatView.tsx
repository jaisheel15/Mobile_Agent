import { useRef, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { FlatList } from 'react-native';
import { useMessageStore } from '../../src/stores/messagestore';
import { useModelStore } from '../../src/stores/modelstore';
import { useTheme } from '../../src/theme';
import { Box } from '../ui/box';
import { Card } from '../ui/card';
import { Text } from '../ui/text';
import { HStack } from '../ui/hstack';
import ChatMessages from './ChatMessages';
import type { Message } from '../../src/stores/messagestore';

const ChatView = () => {
  const messages = useMessageStore((state) => state.messages);
  const thinking = useModelStore((state) => state.thinking);
  const { colors, typography, radius } = useTheme();
  const listRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (messages.length > 0 || thinking) {
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 150);
    }
  }, [messages.length, thinking]);

  return (
    <Box className="flex-1 w-full">
      <FlashList
        ref={listRef as any}
        data={messages}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => <Box className="h-3" />}
        renderItem={({ item }) => (
          <ChatMessages text={item.message} user={item.user} />
        )}
        ListFooterComponent={() =>
          thinking ? (
            <Box className="w-full flex-row justify-start px-4 pt-3">
              <Card
                className="rounded-2xl border px-4 py-2.5"
                style={{
                  backgroundColor: colors.surfaceVariant,
                  borderColor: colors.border,
                  borderRadius: radius.card,
                }}
              >
                <HStack className="items-center" style={{ gap: 8 }}>
                  <Box
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: typography.caption.fontFamily,
                      fontSize: typography.caption.fontSize,
                    }}
                  >
                    Agent is processing…
                  </Text>
                </HStack>
              </Card>
            </Box>
          ) : (
            <Box className="h-4" />
          )
        }
      />
    </Box>
  );
};

export default ChatView;
