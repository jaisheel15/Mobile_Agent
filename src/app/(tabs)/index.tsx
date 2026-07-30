import React, { useEffect } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { useTheme } from '@/src/theme';
import { useConversationStore } from '@/src/stores/conversationStore';
import { useMessageStore } from '@/src/stores/messagestore';
import { useModelStore } from '@/src/stores/modelstore';
import { nanoid } from 'nanoid/non-secure';

export default function Home() {
  const { colors, typography, spacing, radius } = useTheme();
  const router = useRouter();
  const { conversations, loadConversations, createConversation, switchConversation, deleteConversation } =
    useConversationStore();
  const { loaded } = useModelStore();

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  function handleStartNewChat() {
    createConversation();
    router.push('/(tabs)/chat');
  }

  function handleOpenConversation(id: string) {
    switchConversation(id);
    router.push('/(tabs)/chat');
  }

  function handleQuickPrompt(promptText: string) {
    const convId = createConversation();
    useMessageStore.getState().addMessage({
      id: nanoid(),
      message: promptText,
      user: 'human',
    });
    useConversationStore.getState().updateConversationMeta(convId, {
      title: promptText,
      preview: promptText,
    });
    useModelStore.getState().chat();
    router.push('/(tabs)/chat');
  }

  const quickPrompts = [
    { icon: 'battery-charging-outline', label: 'Check Battery', prompt: 'What is my current battery level?' },
    { icon: 'hardware-chip-outline', label: 'Device Info', prompt: 'Tell me about this device and system specs.' },
    { icon: 'disc-outline', label: 'Storage Info', prompt: 'How much free storage do I have left?' },
    { icon: 'wifi-outline', label: 'Network Status', prompt: 'Check my current network connection status.' },
    { icon: 'time-outline', label: 'Current Time', prompt: 'What is the exact current time and timezone?' },
    { icon: 'location-outline', label: 'Get Location', prompt: 'What is my current GPS location?' },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <VStack style={{ gap: spacing[5] }} className="px-6">
          {/* ── Header ── */}
          <HStack className="items-center justify-between">
            <VStack style={{ gap: 2 }}>
              <Text
                style={{
                  color: colors.text,
                  fontFamily: typography.displayMobile.fontFamily,
                  fontSize: typography.displayMobile.fontSize,
                  fontWeight: typography.displayMobile.fontWeight,
                  letterSpacing: typography.displayMobile.letterSpacing,
                }}
              >
                Mobile Agent
              </Text>
              <Text
                style={{
                  color: colors.textMuted,
                  fontFamily: typography.body.fontFamily,
                  fontSize: typography.body.fontSize,
                }}
              >
                On-Device Privacy-First AI Co-Pilot
              </Text>
            </VStack>

            <Box
              className="px-3 py-1 rounded-full border items-center justify-center"
              style={{
                backgroundColor: loaded ? colors.glowPrimary : colors.surfaceVariant,
                borderColor: loaded ? colors.primary : colors.border,
              }}
            >
              <Text
                style={{
                  color: loaded ? colors.primary : colors.textMuted,
                  fontFamily: typography.label.fontFamily,
                  fontSize: 10,
                  fontWeight: '600',
                }}
              >
                {loaded ? 'v1.0 ONLINE' : 'v1.0 OFFLINE'}
              </Text>
            </Box>
          </HStack>

          {/* ── Hero Banner ── */}
          <Box
            className="p-5 overflow-hidden"
            style={{
              backgroundColor: 'rgba(45, 52, 73, 0.5)',
              borderWidth: 1,
              borderColor: 'rgba(132, 148, 149, 0.25)',
              borderRadius: radius.card,
            }}
          >
            <VStack style={{ gap: spacing[3] }}>
              <HStack className="items-center" style={{ gap: spacing[3] }}>
                <Box
                  className="w-10 h-10 rounded-xl items-center justify-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Ionicons name="sparkles" size={20} color={colors.primaryForeground} />
                </Box>
                <VStack className="flex-1">
                  <Text
                    style={{
                      color: colors.text,
                      fontFamily: typography.title.fontFamily,
                      fontSize: typography.title.fontSize,
                      fontWeight: '600',
                    }}
                  >
                    Start a New Agent Session
                  </Text>
                  <Text
                    style={{
                      color: colors.textMuted,
                      fontFamily: typography.caption.fontFamily,
                      fontSize: typography.caption.fontSize,
                    }}
                  >
                    Ask anything or issue device awareness commands.
                  </Text>
                </VStack>
              </HStack>

              <Button
                onPress={handleStartNewChat}
                size="lg"
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: radius.button,
                }}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.primaryForeground} />
                <ButtonText
                  style={{
                    color: colors.primaryForeground,
                    fontFamily: typography.title.fontFamily,
                    fontSize: typography.title.fontSize,
                    fontWeight: '600',
                    marginLeft: 6,
                  }}
                >
                  New Conversation
                </ButtonText>
              </Button>
            </VStack>
          </Box>

          {/* ── Quick Actions / Devices Tools Section ── */}
          <VStack style={{ gap: spacing[2] }}>
            <Text
              style={{
                color: colors.textMuted,
                fontFamily: typography.label.fontFamily,
                fontSize: typography.label.fontSize,
                letterSpacing: typography.label.letterSpacing,
                textTransform: 'uppercase',
              }}
            >
              Quick Device Actions
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {quickPrompts.map((item, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleQuickPrompt(item.prompt)}
                  className="px-4 py-3 border rounded-xl"
                  style={({ pressed }) => ({
                    backgroundColor: colors.surfaceVariant,
                    borderColor: colors.border,
                    borderRadius: radius.card,
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <HStack className="items-center" style={{ gap: 8 }}>
                    <Ionicons name={item.icon as any} size={16} color={colors.primary} />
                    <Text
                      style={{
                        color: colors.text,
                        fontFamily: typography.bodySm.fontFamily,
                        fontSize: typography.bodySm.fontSize,
                        fontWeight: '500',
                      }}
                    >
                      {item.label}
                    </Text>
                  </HStack>
                </Pressable>
              ))}
            </ScrollView>
          </VStack>

          {/* ── Recent Conversations List ── */}
          <VStack style={{ gap: spacing[3] }}>
            <HStack className="items-center justify-between">
              <Text
                style={{
                  color: colors.textMuted,
                  fontFamily: typography.label.fontFamily,
                  fontSize: typography.label.fontSize,
                  letterSpacing: typography.label.letterSpacing,
                  textTransform: 'uppercase',
                }}
              >
                Recent Conversations
              </Text>
              {conversations.length > 0 && (
                <Text style={{ color: colors.textMuted, fontSize: 12 }}>{conversations.length} total</Text>
              )}
            </HStack>

            {conversations.length === 0 ? (
              <Box
                className="p-6 border rounded-2xl items-center justify-center"
                style={{
                  backgroundColor: colors.surfaceVariant,
                  borderColor: colors.border,
                  borderRadius: radius.card,
                }}
              >
                <Ionicons name="chatbubbles-outline" size={32} color={colors.textMuted} />
                <Text
                  className="mt-2 text-center"
                  style={{ color: colors.textMuted, fontFamily: typography.body.fontFamily }}
                >
                  No conversations yet. Tap "New Conversation" or select a quick action above.
                </Text>
              </Box>
            ) : (
              conversations.map((conv) => (
                <Pressable
                  key={conv.id}
                  onPress={() => handleOpenConversation(conv.id)}
                  className="p-4 border rounded-xl"
                  style={({ pressed }) => ({
                    backgroundColor: colors.surfaceVariant,
                    borderColor: colors.border,
                    borderRadius: radius.card,
                    opacity: pressed ? 0.75 : 1,
                  })}
                >
                  <HStack className="items-center justify-between">
                    <VStack className="flex-1 mr-3" style={{ gap: 2 }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: colors.text,
                          fontFamily: typography.title.fontFamily,
                          fontSize: typography.title.fontSize,
                          fontWeight: '600',
                        }}
                      >
                        {conv.title}
                      </Text>
                      {conv.preview ? (
                        <Text
                          numberOfLines={1}
                          style={{
                            color: colors.textMuted,
                            fontFamily: typography.bodySm.fontFamily,
                            fontSize: typography.bodySm.fontSize,
                          }}
                        >
                          {conv.preview}
                        </Text>
                      ) : null}
                    </VStack>

                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                      className="p-2 rounded-full"
                    >
                      <Ionicons name="trash-outline" size={16} color={colors.error} />
                    </Pressable>
                  </HStack>
                </Pressable>
              ))
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
