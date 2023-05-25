import { store } from './Store.js';
import { renderContents } from './chatbot.js';
import {
  ANSWER_LIST,
  FAQ_LIST,
  GEAR_ICON_SVG_TAG,
  messages,
} from './chatbotData.js';

export const setOpenModal = () => {
  const $modalContainer = document.querySelector('.modalContainer');
  $modalContainer.classList.add('chatbotModal');
  const $modalBackground = document.querySelector('.modalBackground');
  $modalBackground.classList.remove('hidden');
  $modalBackground.addEventListener('click', e => {
    if (!e.target.classList.contains('modalBackground')) {
      return;
    }
    $modalBackground.classList.add('hidden');
    $modalContainer.classList.remove('chatbotModal');
    $modalContainer.classList.add('hidden');
  });
};

export const setCloseModal = () => {
  const $modalContainer = document.querySelector('.modalContainer');
  $modalContainer.classList.remove('chatbotModal');
  $modalContainer.classList.add('hidden');
  const $modalBackground = document.querySelector('.modalBackground');
  $modalBackground.classList.add('hidden');
  $modalBackground.removeEventListener('click', e => {
    if (!e.target.classList.contains('modalBackground')) {
      return;
    }
    $modalBackground.classList.add('hidden');
    $modalContainer.classList.remove('chatbotModal');
    $modalContainer.classList.add('hidden');
  });
};

export const getFormatTime = () => {
  const now = new Date();
  const localeTimeString = now.toLocaleTimeString();
  const formatTime = localeTimeString.slice(0, 5) + localeTimeString.slice(8);
  return formatTime;
};

export const ChatbotHeader = () => {
  const $chatbotHeader = document.querySelector('.chatbotHeader');
  $chatbotHeader.innerHTML = `
    <img class="chevronLeft" src="/public/images/Chevron Left.svg" width="18px" height="18px"/>
    <div class="chatLogoBox">
    <img
      class="headerLogo"
      alt="headerLogo"
      src="https://haitalk.kebhana.com/aicc/soe/service/storage/49e50558-09e8-47f2-b567-93b2a41099fc"
    />
    </div>
    <p class="headerTitle">하나은행 문의채널</p>
    ${GEAR_ICON_SVG_TAG}
  `;

  const $chevronLeft = document.querySelector('.chevronLeft');
  $chevronLeft.addEventListener('click', setCloseModal);
};

export const ChatbotList = () => {
  const $chatbotList = document.querySelector('.chatbotList');
  let tempInnerHTML = '';

  messages.forEach((message, i) => {
    const prevMessage = messages[i - 1];
    const prevTime = prevMessage?.createdAt;
    if (message.type === 'req') {
      tempInnerHTML += `<li key=${message.id} class="chatItem">`;
      if (prevTime === undefined || prevTime !== message.createdAt) {
        tempInnerHTML += `<p class="chatTime">${message.createdAt}</p>`;
      }
      tempInnerHTML += `<div class="chatItemWrapper">
      <div class="chatLogoBox" >
          <img
            class="headerLogo"
            alt="headerLogo"
            src="https://haitalk.kebhana.com/aicc/soe/service/storage/49e50558-09e8-47f2-b567-93b2a41099fc"
          /></div>
            <div class="">
              <p class="chatName">하나은행 문의채널</p>
              <p class="chatItemContainer">${message.contents}</p>
            </div>
          </li>
        `;
    } else {
      tempInnerHTML += `
        <li class="resItem">
          <button 
            key=${message.resId} 
            class="qnaButtonSelected" 
            data-resId=${message.resId}
            data-nextReqGroup=${message.nextReqGroup}
            data-contents=${message.contents}
          >
            <span class="buttonIcon">🏷️</span>
            <span class="buttonText">${message.contents}</span>
          </button>
        </li>
      `;
    }
  });

  $chatbotList.innerHTML = tempInnerHTML;
};

export const ChatbotCharacter = () => {
  const $chatbotCharacter = document.querySelector('.chatbotCharacter');
  $chatbotCharacter.innerHTML = `
  <div class="profileImageBox">
  <img
    class="profileImage"
    alt="profileImage"
    src="https://haitalk.kebhana.com/aicc/soe/service/storage/49e50558-09e8-47f2-b567-93b2a41099fc"
  />
  </div>
    <p class="profileTitle">하나은행 문의채널에 문의하기</p>
    <p><span class="response">보통 수십 분 내 답변</span></p>
  `;
};

export const handleClickFAQButton = e => {
  const question = {};
  question['resId'] = e.target.dataset.resid;
  question['nextReqGroup'] = e.target.dataset.nextreqgroup;
  question['contents'] = e.target.dataset.contents;
  question['type'] = 'res';
  question['id'] = messages.length;
  question['createdAt'] = getFormatTime(Date.now());
  messages.push(question);
  store.setState('nextReqGroup', question.nextReqGroup);

  const temp = ANSWER_LIST.filter(
    x => parseInt(x.resId) === parseInt(question.resId)
  )[0];
  temp.createdAt = getFormatTime(Date.now());
  temp.contents = temp.contents.replace(/\n/g, '<br>');
  messages.push(temp);

  renderContents();
};

export const ChatbotFAQButtons = () => {
  const $chatbotButtons = document.querySelector('.chatbotButtons');
  let tempInnerHTML = '';
  FAQ_LIST.forEach(question => {
    if (
      parseInt(question.reqGroup) === parseInt(store.getState('nextReqGroup'))
    ) {
      const { resId, nextReqGroup, contents } = question;
      tempInnerHTML += `
      <button 
        key=${resId} 
        class="qnaButton" 
        data-resId=${resId}
        data-nextReqGroup=${nextReqGroup}
        data-contents=${JSON.stringify(contents)}
      >
        <span class="buttonIcon">🏷️</span>
        <span class="buttonText">${contents}</span>
      </button>
    `;
    }
  });

  $chatbotButtons.innerHTML = tempInnerHTML;
  const $qnaButtons = document.querySelectorAll('.qnaButton');

  $qnaButtons.forEach(x => x.addEventListener('click', handleClickFAQButton));
};

const handleSubmitMessage = e => {
  e.preventDefault();
  const { value } = e.target;

  messages.push({
    id: messages.length,
    type: 'res',
    contents: value,
    createdAt: getFormatTime(Date.now()),
  });

  renderContents();
};

export const ChatbotFooter = () => {
  const $chatbotFooter = document.querySelector('.chatbotFooter');
  $chatbotFooter.innerHTML = `
    <form class="messageInputForm" onsubmit="handleSubmitMessage">
      <input type="text" disabled id="sendMessage" placeholder="버튼으로 문의 해주세요..!"/>
    </form>
    <div class="sendImage">
      <img src="/public/images/send.png" width="22px" height="22px"/>
    </div>
  `;

  $chatbotFooter.style.position = 'sticky';
  $chatbotFooter.style.bottom = 0;

  document
    .querySelector('.messageInputForm')
    .addEventListener('submit', handleSubmitMessage);
};
