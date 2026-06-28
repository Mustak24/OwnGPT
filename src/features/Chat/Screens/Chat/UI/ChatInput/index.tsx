import { Button, IconButton, Input } from '@funtools/native-ui';
import { ThemeView } from '@funtools/native-ui/core';
import { useKeyboardHeight } from '@/shared/hooks';
import { useState } from 'react';
import { View } from 'react-native';
import { useModelStore } from '@/features/Models';
import { useAi } from '@/features/Models/Hooks';
import { chatHandlers, useChatStore } from '@/features/Chat/Store';

export default function ChatInput() {
  const { animatedHeight: animatedKeyboardHeight } = useKeyboardHeight({
    offset: 24,
  });

  const model = useModelStore(store => store.selectedModel);
  const {chatName, chatId} = useChatStore(store => ({
    chatName: store.chat.name,
    chatId: store.chat.id,
  }));

  const { generate, generateChatName } = useAi();

  const [message, setMessage] = useState('');
  const [isResponding, setIsResponding] = useState(false);

  async function handleSend() {
    if (!message.trim()) return;
    setIsResponding(true);
    try {
      setMessage('');
      chatHandlers.addMessage({
        message,
        role: 'USER',
      });

      
      const { id: botMessageId } = chatHandlers.addMessage({
        message: 'Thinking...',
        role: 'AI',
      });
      
      
      let aiResponse = '';

      await generate(message, partialResponse => {
        aiResponse += partialResponse.token;
        chatHandlers.updateMessage(botMessageId, aiResponse);
      }).catch(() => {
        chatHandlers.updateMessage(botMessageId, 'Failed to get response from AI.');
      });

      chatHandlers.updateChatName(botMessageId, aiResponse.trim());

      if(chatName === 'NEW_CHAT') {
        generateChatName(message).then(name => {
          chatHandlers.updateChatName(chatId, name?.trim() ?? chatId);
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsResponding(false);
    }
  }

  return (
    <ThemeView
      color="bg-secondary"
      className="w-full rounded-tl-[24] rounded-tr-[24] p-[14] gap-5"
      style={{ paddingBottom: animatedKeyboardHeight }}
    >
      <Input
        placeholder="Enter text to convert..."
        multiline
        numberOfLines={4}
        value={message}
        onChange={e => setMessage(e.nativeEvent.text)}
      />

      <View className="w-full flex-row items-center justify-between">
        <IconButton icon="Plus" />

        <View className="flex-row items-center gap-2">
          <Button
            title={model?.name ?? 'No Model'}
            startIcon="AlignLeft"
            rounded={100}
            onPress={() => {}}
          />

          <IconButton
            loading={isResponding}
            icon="WandSparkles"
            iconSize={16}
            onPress={handleSend}
          />
        </View>
      </View>
    </ThemeView>
  );
}
