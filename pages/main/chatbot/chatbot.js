import { makeChatbotUI, makeModal } from './chatbotFunctions.js';

export const messages = [
  {
    id: 0,
    type: 'req',
    contents:
      '안녕하세요, 디지털 하나로 문의하기 화면입니다. 궁금한 사항을 클릭해주세요..! ',
  },
];

const main = () => {
  const $chatBotButton = document.querySelector('.chatbotButton');
  $chatBotButton.addEventListener('click', handleClickChatbot);
};

const handleClickChatbot = () => {
  /*
  1. 챗봇을 클릭하면 모달이 되야한다. 
  1.1. 모달을 위해 마스킹 스크린 만들어야함
  1.2. 모달을 만들어야함
  2. 모달만들고 나서 js만으로 chatbot dom생성해야함
  2.1. 
  */
  makeModal();
  makeChatbotUI();
};

main();
