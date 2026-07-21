import { useTheme } from '../../src/theme';
import { Box } from '../ui/box';
import { Card } from '../ui/card';
import { Text } from '../ui/text';

const ChatMessages = ({ text, user }: { text: string; user: 'ai' | 'human' | 'tool' }) => {
    const { colors, typography } = useTheme();
    const isAi = user === 'ai';

    return (
        <Box className={`w-full flex-row ${isAi ? 'justify-start' : 'justify-end'} px-4`}>
            <Card
                className="rounded-2xl border max-w-[85%] px-4 py-3"
                style={{
                    backgroundColor: isAi ? colors.surfaceVariant : colors.primary,
                    borderColor: isAi ? colors.border : colors.primary,
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
