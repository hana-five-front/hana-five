import {
  setOpenModal,
  ChatbotHeader,
  ChatbotCharacter,
  ChatbotList,
  ChatbotFAQButtons,
  ChatbotFooter,
} from './chatbotFunctions.js';
import { openSocketConnection } from './chatbotSlackApi.js';

const setModalVisible = () => {
  document.querySelector('.modalContainer').classList.remove('hidden');
};

export const makeChatbotUI = () => {
  setModalVisible();

  ChatbotHeader();
  ChatbotCharacter();
  ChatbotList();
  openSocketConnection();
  ChatbotFAQButtons();
  ChatbotFooter();
};

export const renderContents = () => {
  ChatbotList();
  ChatbotFAQButtons();
  ChatbotFooter();
};

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
  const isOpenModal = sessionStorage.getItem('isOpenModal');
  if (isOpenModal === 'true') {
    handleClickChatbot();
  }
};

document.addEventListener('DOMContentLoaded', main);
