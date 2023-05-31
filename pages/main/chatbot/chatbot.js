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
};

export const renderContents = () => {
  ChatbotList();
  ChatbotFAQButtons();
  ChatbotFooter();
};

export let slackInterval = null;

export const renderContentsWithSlack = () => {
  ChatbotList();
  ChatbotFAQButtons();
  ChatbotFooter();

  if (slackInterval == null) {
    slackInterval = setInterval(() => {
      getQnaToSlack();
      ChatbotList();
      ChatbotFAQButtons();
    }, 5000);
  }
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
const obj = {
  name: '',
};
