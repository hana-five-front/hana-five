import { ChatbotList } from './chatbotFunctions.js';

const serverUrl = 'https://hon-adria-eternalclash.koyeb.app';

let socket;

export const sendQnaToSlack = (userName, content) => {
  socket.emit(`sendMessage`, {
    channel: `C05AGSSCH19`,
    text: `문의자: ${userName}\n내용: ${content}`,
  });
};

export const openSocketConnection = () => {
  socket = io.connect(serverUrl);
  socket.on('chat', data => {
    const username = sessionStorage.getItem('userName');
    if (!username) return localStorage.removeItem('slackQ&A');
    data = data.filter(e => e.title.includes(`${username}`));
    data.forEach(e => {
      e.content = [e.content.join('\n')];
    });
    // 최신 순으로 Reverse

    localStorage.setItem('slackQ&A', JSON.stringify(data));
    ChatbotList();
  });
};

export const rerenderSocketConnection = () => {};

export const closeSocketConnection = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const makeUIWithQnaToSlack = () => {
  const username = sessionStorage.getItem('userName');
  if (!username) return localStorage.removeItem('slackQ&A');
  const data = JSON.parse(localStorage.getItem('slackQ&A'));
  // UI 생성 로직
};
