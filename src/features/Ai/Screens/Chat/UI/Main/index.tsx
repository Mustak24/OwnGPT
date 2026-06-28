import { FlatList, ScrollView, View } from 'react-native';
import { Show, ThemeText, ThemeView } from '@funtools/native-ui/core';
import { useEffect, useRef } from 'react';
import { useChatStore } from '../../Store';
import { RenderMarkdown } from '@/shared/components';

export default function MainSection() {
  const chat = useChatStore(store => store.chat);
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
      renderItem={({ item }) => (
        <View
          className={`max-w-[80%] px-4 py-2 rounded-lg ${
            item.isUser ? 'bg-primary self-end' : 'bg-secondary self-start'
          }`}
        >
          <Show
            when={item.isUser}
            otherwise={<RenderMarkdown markdown={item.text} />}
          >
            <ThemeView
              color="bg-secondary"
              className="flex-row items-center justify-center p-2 rounded-xl px-4"
            >
              <ThemeText>{item.text}</ThemeText>
            </ThemeView>
          </Show>
        </View>
      )}
    />
  );
}
