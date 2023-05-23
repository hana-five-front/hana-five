import {
  ChatbotCharacter,
  ChatbotFAQButtons,
  ChatbotHeader,
  ChatbotList,
  makeChatbotUI,
  makeModal,
} from './chatbotFunctions.js';

export const makeChatbotUI = () => {
  const $modalContainer = document.querySelector('.modalContainer');
  $modalContainer.classList.remove('hidden');

  ChatbotHeader();
  ChatbotCharacter();
  ChatbotList();
  ChatbotFAQButtons();
};

const handleClickChatbot = () => {
  makeModal();
  makeChatbotUI();
};

const main = () => {
  const $chatBotButton = document.querySelector('.chatbotButton');
  $chatBotButton.addEventListener('click', handleClickChatbot);
};

main();
