export const sendQnaToSlack = (userName, content) => {
  fetch('http://localhost:3000/qna', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: `문의자: ${userName}\n내용: ${content}` }),
  })
    .then(response => {
      response.ok;
    })
    .catch(error => console.error('Error sending message:', error));
};
export const getQnaToSlack = () => {
  const username = sessionStorage.getItem('userName');
  if (!username) return localStorage.removeItem('slackQ&A');
  fetch('http://localhost:3000/qna')
    .then(response => {
      return response.json();
    })
    .then(data => {
      const username = sessionStorage.getItem('userName');
      if (username) {
      }
      data = data.filter(e => e.title.includes(`${username}`)).reverse();
      data.forEach(e => {
        e.content = [e.content.join('\n')];
      });
      //최신 순으로 Reverse
      localStorage.setItem('slackQ&A', JSON.stringify(data));
    })
    .catch(error => console.error('Error sending message:', error));
};
