import { ChatbotList } from './chatbotFunctions.js';

const serverUrl = `https://hon-adria-eternalclash.koyeb.app`;

let socket;
export const sendQnaToSlack = (userName, content) => {
  fetch('https://server-eternalclash.koyeb.app/qna', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: `문의자: ${userName}\n내용: ${content}` }),
  })
    .then(response => {
      socket.emit('start');
      response.ok;
    })
    .catch(error => console.error('Error sending message:', error));
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
  // UI 생성 로직
};
