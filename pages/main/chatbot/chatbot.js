import {
  setOpenModal,
  ChatbotHeader,
  ChatbotCharacter,
  ChatbotList,
  ChatbotFAQButtons,
  ChatbotFooter,
} from './chatbotFunctions.js';
import { openSocketConnection } from './chatbotSlackApi.js';
export const makeChatbotUI =  () => {
  const $modalContainer = document.querySelector('.modalContainer');
  $modalContainer.classList.remove('hidden');
  ChatbotHeader();
  ChatbotCharacter();
  ChatbotList();
  openSocketConnection()
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
