import ChatInput from '@/components/chat/ChatInput';
import ChatView from '@/components/chat/ChatView';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useTheme } from '@/src/theme';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useModelStore } from '@/src/stores/modelstore';
import { useConversationStore } from '@/src/stores/conversationStore';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Chat() {
  const { colors, typography, spacing } = useTheme();
  const { loaded, thinking } = useModelStore();
  const { activeConversationId, conversations, createConversation } = useConversationStore();

  const activeConv = conversations.find((c) => c.id === activeConversationId);
  const title = activeConv ? activeConv.title : 'Agent Chat';

  function handleNewChat() {
    createConversation();
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <Box style={{ flex: 1 }}>
        <VStack
          className="flex-1"
          style={{
            backgroundColor: colors.background,
            paddingTop: spacing[2],
          }}
        >
          {/* ── Header ── */}
          <HStack
            className="items-center justify-between px-5 py-3 border-b"
            style={{ borderBottomColor: colors.border }}
          >
            {/* Left: avatar + title */}
            <HStack className="items-center" style={{ gap: spacing[3] }}>
              <Box
                className="w-9.5 h-9.5 rounded-full items-center justify-center"
                style={{
                  backgroundColor: colors.primary,
                  shadowColor: colors.primary,
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 0 },
                  elevation: 6,
                }}
              >
                <Ionicons name="hardware-chip-outline" size={20} color={colors.primaryForeground} />
              </Box>
              <VStack style={{ gap: 2 }}>
                <Text
                  className="font-semibold"
                  style={{
                    color: colors.text,
                    fontFamily: typography.title.fontFamily,
                    fontSize: typography.title.fontSize,
                  }}
                  numberOfLines={1}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    color: thinking ? colors.primary : colors.textMuted,
                    fontFamily: typography.caption.fontFamily,
                    fontSize: typography.caption.fontSize,
                  }}
                >
                  {thinking ? 'Thinking…' : loaded ? 'Model Ready' : 'Model Not Loaded'}
                </Text>
              </VStack>
            </HStack>

            {/* Right: New Chat button & status badge */}
            <HStack className="items-center" style={{ gap: spacing[2] }}>
              <Pressable
                onPress={handleNewChat}
                className="p-2 rounded-full"
                style={({ pressed }) => ({
                  backgroundColor: colors.surfaceVariant,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Ionicons name="add" size={20} color={colors.text} />
              </Pressable>

              <HStack
                className="items-center px-2.5 py-1 rounded-[20px] border"
                style={{
                  backgroundColor: loaded ? colors.glowPrimary : colors.surfaceVariant,
                  borderColor: colors.border,
                  gap: spacing[1],
                }}
              >
                <Box
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: loaded ? colors.primary : colors.textMuted }}
                />
                <Text
                  className="font-semibold tracking-[0.8px]"
                  style={{
                    color: loaded ? colors.primary : colors.textMuted,
                    fontFamily: typography.label.fontFamily,
                    fontSize: 10,
                  }}
                >
                  {loaded ? 'ONLINE' : 'OFFLINE'}
                </Text>
              </HStack>
            </HStack>
          </HStack>

          {/* ── Messages (scrollable fill) ── */}
          <Box className="flex-1 py-2">
            <ChatView />
          </Box>

          {/* ── Bottom bar ── */}
          <Divider style={{ marginHorizontal: spacing[4] }} />
          <Box
            style={{
              backgroundColor: colors.surface,
              paddingHorizontal: spacing[4],
              paddingTop: spacing[3],
              paddingBottom: spacing[3],
            }}
          >
            <ChatInput />
          </Box>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
}
