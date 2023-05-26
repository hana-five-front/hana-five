export const sendQnaToSlack = (userName, content) => {
  fetch('http://43.200.63.91:3000/qna', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: `문의자: ${userName}\n\n내용: ${content}` }),
  })
    .then(response => response.json())
    .catch(error => console.error('Error sending message:', error));
};
