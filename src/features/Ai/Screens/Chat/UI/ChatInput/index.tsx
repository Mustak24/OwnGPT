import { Button, IconButton, Input } from '@funtools/native-ui';
import { ThemeView } from '@funtools/native-ui/core';
import { useKeyboardHeight } from '@/shared/hooks';
import { useState } from 'react';
import { View } from 'react-native';
import { UUIDGenerator } from '@/shared/utils';
import { useChatHandlers } from '../../Store';
import { useModelStore } from '@/features/Models';
import { useAi } from '@/features/Ai/Hooks';

export default function ChatInput() {
  const { animatedHeight: animatedKeyboardHeight } = useKeyboardHeight({
    offset: 24,
  });

  const model = useModelStore(store => store.selectedModel);

  const { generate } = useAi();

  const generateUUID = UUIDGenerator();
  const handlers = useChatHandlers();

  const [message, setMessage] = useState('');
  const [isResponding, setIsResponding] = useState(false);

  async function handleSend() {
    if (!message.trim()) return;
    setIsResponding(true);
    try {
      setMessage('');
      handlers.chat.push({
        id: generateUUID(),
        text: message,
        isUser: true,
      });

      handlers.chat.push({
        id: generateUUID(),
        text: 'Thinking...',
        isUser: false,
      });

      let aiResponse = '';
      await generate(message, partialResponse => {
        aiResponse += partialResponse.token;
        handlers.chat.update(-1, chat => ({
          ...chat,
          text: aiResponse,
        }));
      });
    } catch (error) {
      console.error(error);
      handlers.chat.update(-1, chat => ({
        ...chat,
        text: 'Failed to get response from AI.',
      }));
    } finally {
      setIsResponding(false);
    }
  }

  return (
    <>
      <ThemeView
        color="bg-secondary"
        className="w-full rounded-tl-[24] rounded-tr-[24] p-[24] gap-5"
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
          <IconButton
            icon='Plus'
          />

          <View className="flex-row items-center gap-2">
            <Button
              title={model?.name ?? 'No Model'}
              startIcon="AlignLeft"
              rounded={100}
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
    </>
  );
}
