import { createStore, createStoreProvider } from '@funtools/store';
import localStorage from '../localStorage';
import { CHAT_ITEM, CHAT_MESSAGE } from '@/features/Chat/Types';
import { UUIDGenerator } from '@/shared/utils';

const uuid = UUIDGenerator();

const { useStore, handlers } = createStore({
  states: {
    chat: {
      id: uuid(),
      createAt: Date.now(),
      name: 'NEW_CHAT',
      messages: [],
    } as CHAT_ITEM,

    chats: localStorage.getChats(),
  },

  syncHandlers: {
    openChat({ handlers }, chatId: string) {
      const chat = localStorage.getChat(chatId);
      if (!chat) throw Error('No chat found');

      handlers.chat.set(chat);
    },

    updateMessage({ states, handlers }, id: string, message: string) {
      handlers.chat.update('messages', pre => {
        return pre.map(msg => {
          if (msg.id !== id) return msg;
          return {
            ...msg,
            message,
            updateAt: Date.now(),
          };
        });
      });

      localStorage.saveChat(states.chat.id, states.chat);
    },

    updateChatName({ handlers }, chatId: string, name: string) {
      handlers.chat.update('name', name);

      handlers.chats.findAndUpdate(chat => chat.id === chatId, {
        id: chatId,
        name,
      });

      localStorage.updateChatName(chatId, name);
    },

    newChat({ states, handlers }) {
      if (states.chat.name === 'NEW_CHAT') return;
      handlers.chat.set({
        id: uuid(),
        createAt: Date.now(),
        name: 'NEW_CHAT',
        messages: [],
      });
    },

    addMessage(
      { states, handlers },
      msg: Pick<CHAT_MESSAGE, 'message' | 'role'>,
    ) {
      
      const message = {
        ...msg,
        id: uuid(),
        createAt: Date.now(),
        updateAt: Date.now(),
      };
      
      handlers.chat.update('messages', pre => [...pre, message]);
      localStorage.saveChat(states.chat.id, states.chat);
      
      if(states.chats.length === 0) {
        handlers.chats.set(localStorage.getChats());
      }

      return message;
    },

    deleteMessage({ states, handlers }, id: string) {
      handlers.chat.update('messages', pre => pre.filter(msg => msg.id !== id));
      localStorage.saveChat(states.chat.id, states.chat);
    },

    deleteChat({ states, handlers }, chatId: string) {
      if (states.chat.id === chatId) {
        handlers.chat.set({
          id: uuid(),
          createAt: Date.now(),
          name: 'NEW_CHAT',
          messages: [],
        });
      }

      handlers.chats.findAndRemove(chat => chat.id === chatId);
      localStorage.deleteChat(chatId);
    },
  },
});

export {
  useStore as useChatStore,
  handlers as chatHandlers
};
