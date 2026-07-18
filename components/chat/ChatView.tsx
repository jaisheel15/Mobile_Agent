import { FlashList } from '@shopify/flash-list';
import { useMessageStore } from '../../src/stores/messagestore';
import { Box } from '../ui/box';
import ChatMessages from './ChatMessages';

const ChatView = () => {
    const messages = useMessageStore((state) => state.messages);

    return (
        <FlashList
            data={messages}
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={() => <Box className="h-4" />}
            renderItem={({ item }) => <ChatMessages text={item.message} user={item.user} />}
        />
    );
};

export default ChatView;
