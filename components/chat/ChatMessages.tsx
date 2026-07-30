import { useTheme } from '../../src/theme';
import { Box } from '../ui/box';
import { Card } from '../ui/card';
import { Text } from '../ui/text';
import { HStack } from '../ui/hstack';

const ChatMessages = ({ text, user }: { text: string; user: 'ai' | 'human' | 'tool' }) => {
  const { colors, typography, radius } = useTheme();

  if (user === 'tool') {
    let parsed: any = null;
    let isError = false;
    try {
      parsed = JSON.parse(text);
      if (parsed?.error) isError = true;
    } catch {
      // raw text
    }

    const toolName = parsed?.name || 'tool_call';

    return (
      <Box className="w-full flex-row justify-start px-4">
        <Card
          className="rounded-xl border max-w-[90%] px-3.5 py-2.5"
          style={{
            backgroundColor: colors.card,
            borderColor: isError ? colors.error : colors.border,
            borderRadius: radius.card,
          }}
        >
          <HStack className="items-center mb-1" style={{ gap: 6 }}>
            <Box
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isError ? colors.error : colors.secondary }}
            />
            <Text
              style={{
                color: isError ? colors.error : colors.secondary,
                fontFamily: typography.monoSm?.fontFamily || 'JetBrains Mono',
                fontSize: 11,
                fontWeight: '600',
              }}
            >
              TOOL RESULT: {toolName.toUpperCase()}
            </Text>
          </HStack>
          <Text
            style={{
              color: colors.textMuted,
              fontFamily: typography.monoSm?.fontFamily || 'JetBrains Mono',
              fontSize: 12,
              lineHeight: 16,
            }}
          >
            {typeof parsed === 'object' && parsed !== null
              ? JSON.stringify(parsed.result ?? parsed, null, 2)
              : text}
          </Text>
        </Card>
      </Box>
    );
  }

  const isAi = user === 'ai';

  return (
    <Box className={`w-full flex-row ${isAi ? 'justify-start' : 'justify-end'} px-4`}>
      <Card
        className="rounded-2xl border max-w-[85%] px-4 py-3"
        style={{
          backgroundColor: isAi ? colors.surfaceVariant : colors.primary,
          borderColor: isAi ? colors.border : colors.primary,
          borderRadius: radius.card,
        }}
      >
        <Text
          style={{
            color: isAi ? colors.text : colors.primaryForeground,
            fontFamily: typography.body.fontFamily,
            fontSize: typography.body.fontSize,
            lineHeight: typography.body.lineHeight,
          }}
        >
          {text}
        </Text>
      </Card>
    </Box>
  );
};

export default ChatMessages;
