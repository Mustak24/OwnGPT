import { FlatList, ScrollView, View } from 'react-native';
import { Show, ThemeText, ThemeView } from '@funtools/native-ui/core';
import { useEffect, useRef } from 'react';
import { useChatStore } from '../../../../Store/chatStore';
import { RenderMarkdown } from '@/shared/components';
import { CHAT_MESSAGE } from '@/features/Chat/Types';

export default function MainSection() {
  const chat = useChatStore(store => store.chat.messages);
  const container = useRef<FlatList>(null);

  useEffect(() => {
    if (chat.length > 0) {
      container.current?.scrollToEnd({ animated: true });
    }
  }, [chat]);

  return (
    <FlatList
      ref={container}
      data={chat}
      keyExtractor={item => item.id}
      renderItem={({ item }: { item: CHAT_MESSAGE }) => (
        <Show when={item.role !== 'system'} >
          <View
            className={`max-w-[80%] px-4 py-2 rounded-lg ${
              item.role === 'user' ? 'bg-primary self-end' : 'bg-secondary self-start'
            }`}
          >
            <Show
              when={item.role === 'user'}
              otherwise={<RenderMarkdown markdown={item.message} />}
            >
              <ThemeView
                color="bg-secondary"
                className="flex-row items-center justify-center p-2 rounded-xl px-4"
              >
                <ThemeText>{item.message}</ThemeText>
              </ThemeView>
            </Show>
          </View>
        </Show>
      )}
    />
  );
}
