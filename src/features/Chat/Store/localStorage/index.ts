import { CHAT_ITEM } from '@/features/Chat/Types';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({ id: 'chat-storage' });

type KEY_VALUES = Record<`chat-${string}`, CHAT_ITEM | null>;

export default {
  ...storage,
  set<K extends keyof KEY_VALUES>(key: K, value: KEY_VALUES[K]) {
    return storage.set(key, JSON.stringify(value));
  },

  has(key: keyof KEY_VALUES) {
    return storage.contains(key);
  },

  get<K extends keyof KEY_VALUES>(key: K): KEY_VALUES[K] {
    return JSON.parse(storage.getString(key) ?? 'null');
  },

  remove<K extends keyof KEY_VALUES>(key: K) {
    return storage.remove(key);
  },

  saveChat(chatId: string, chatInfo: CHAT_ITEM) {
    this.set(`chat-${chatId}`, chatInfo);
  },

  getChat(chatId: string) {
    return this.get(`chat-${chatId}`);
  },

  getChats() {
    const keys = storage.getAllKeys();
    const chats = [];

    for (let key of keys) {
      if (!key.startsWith('chat-')) continue;
      const chat = this.get(key as `chat-${string}`);
      if (!chat) continue;
      chats.push({
        id: chat.id,
        name: chat.name,
      });
    }

    return chats;
  },

  deleteChat(chatId: string) {
    this.remove(`chat-${chatId}`);
  },

  updateChatName(chatId: string, name: string) {
    const chat = this.getChat(chatId);
    if(!chat) return;

    chat.name = name;
    this.saveChat(chatId, chat);
  },
};
