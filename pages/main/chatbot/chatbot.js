import {
  setOpenModal,
  ChatbotHeader,
  ChatbotCharacter,
  ChatbotList,
  ChatbotFAQButtons,
  ChatbotFooter,
} from './chatbotFunctions.js';
import { getQnaToSlack } from './chatbotSlackApi.js';
export const makeChatbotUI = () => {
  const $modalContainer = document.querySelector('.modalContainer');
  $modalContainer.classList.remove('hidden');

  ChatbotHeader();
  ChatbotCharacter();
  ChatbotList();
  ChatbotFAQButtons();
  ChatbotFooter();
  getQnaToSlack();
};

export const renderContents = () => {
  ChatbotList();
  ChatbotFAQButtons();
  ChatbotFooter();
  getQnaToSlack();
};

const handleClickChatbot = () => {
  setOpenModal();
  makeChatbotUI();
};

const main = () => {
  const $chatBotButton = document.querySelector('.chatbotButton');
  $chatBotButton.addEventListener('click', handleClickChatbot);
};

main();
