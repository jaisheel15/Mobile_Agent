// app/(tabs)/chat.tsx

import ChatInput from '@/components/chat/ChatInput';
import ChatView from '@/components/chat/ChatView';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useTheme } from '@/src/theme';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function Chat() {
    const { colors, typography, spacing } = useTheme();
    // const insets = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
        >
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
                        className="items-center justify-between px-5 pm-[14px] border-b"
                        style={{ borderBottomColor: colors.border }}
                    >
                        {/* Left: avatar + title */}
                        <HStack className="items-center" style={{ gap: spacing[3] }}>
                            <Box
                                className="w-9.5 h-9.5 rounded-full"
                                style={{
                                    backgroundColor: colors.primary,
                                    shadowColor: colors.primary,
                                    shadowOpacity: 0.4,
                                    shadowRadius: 8,
                                    shadowOffset: { width: 0, height: 0 },
                                    elevation: 6,
                                }}
                            />
                            <VStack style={{ gap: 2 }}>
                                <Text
                                    className="font-semibold"
                                    style={{
                                        color: colors.text,
                                        fontFamily: typography.title.fontFamily,
                                        fontSize: typography.title.fontSize,
                                    }}
                                >
                                    Agent
                                </Text>
                                <Text
                                    style={{
                                        color: colors.textMuted,
                                        fontFamily: typography.caption.fontFamily,
                                        fontSize: typography.caption.fontSize,
                                    }}
                                >
                                    Ready
                                </Text>
                            </VStack>
                        </HStack>

                        {/* Right: online badge */}
                        <HStack
                            className="items-center px-2.5 pm-[5px] rounded-[20px] border"
                            style={{
                                backgroundColor: colors.glowPrimary,
                                borderColor: colors.border,
                                gap: spacing[1],
                            }}
                        >
                            <Box className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
                            <Text
                                className="font-semibold tracking-[0.8px]"
                                style={{
                                    color: colors.primary,
                                    fontFamily: typography.label.fontFamily,
                                    fontSize: 10,
                                }}
                            >
                                ONLINE
                            </Text>
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
