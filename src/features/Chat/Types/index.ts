export type CHAT_ITEM = {
    id: string;
    name: string;
    createAt: number;
    messages: CHAT_MESSAGE[];
}

export type CHAT_MESSAGE = {
    id: string;
    message: string;
    role: 'USER' | 'SYSTEM' | 'AI';
    createAt: number;
    updateAt: number;
}