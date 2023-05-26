export const sendQnaToSlack = (userName, content) => {
  fetch('http://localhost:3000/qna', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: `${userName}\n\n${content}` }),
  })
    .then(response => response.json())
    .then(data => console.log('Message sent:', data))
    .catch(error => console.error('Error sending message:', error));
};
