import { store } from './Store.js';
import { renderContents } from './chatbot.js';
import { ANSWER_LIST, FAQ_LIST, messages } from './chatbotData.js';
import { sendQnaToSlack } from './chatbotSlackApi.js';

const SCROLL_ANIMATION_DURATION = 400;

const handleKeydownEscape = e => {
  if (e.key == 'Escape' || e.code == 'Escape') {
    setCloseModal();
  }
};

export const setOpenModal = () => {
  document.addEventListener('keydown', handleKeydownEscape);
  const $modalContainer = document.querySelector('.modalContainer');
  $modalContainer.classList.add('chatbotModal');
  const $modalBackground = document.querySelector('.modalBackground');
  $modalBackground.classList.remove('hidden');
  $modalBackground.addEventListener('click', e => {
    if (!e.target.classList.contains('modalBackground')) return;
    setCloseModal();
  });

  $('html, body').animate({ scrollTop: '0' }, 500);
  document.body.style.overflow = 'hidden';
};

export const setCloseModal = () => {
  document.removeEventListener('keydown', handleKeydownEscape);
  const $modalContainer = document.querySelector('.modalContainer');
  $modalContainer.classList.remove('chatbotModal');
  $modalContainer.classList.add('hidden');
  const $modalBackground = document.querySelector('.modalBackground');
  $modalBackground.classList.add('hidden');
  $modalBackground.removeEventListener('click', e => {
    if (!e.target.classList.contains('modalBackground')) return;
    setOpenModal();
  });

  document.body.style.overflow = 'unset';
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
    <p class="headerTitle">디지털 하나로 문의 채널</p>
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
              <p class="chatName">디지털 하나로 문의 채널</p>
              <p class="chatItemContainer">${message.contents}</p>
            </div>
          </li>
        `;
    } else if (message.type === 'res') {
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
    } else {
      const slackInquire = JSON.parse(localStorage.getItem('slackQ&A'));

      if (Array.isArray(slackInquire) && slackInquire.length > 0) {
        slackInquire.forEach((e, idx) => {
          if (e.content[0].includes('내용:')) {
            tempInnerHTML += `
      
            <li class="resItem">
              <button 
                key=${e.resId} 
                class="qnaButtonSelected" 
                data-resId=${e.resId}
                data-nextReqGroup=${e.nextReqGroup}
                data-contents=${e.contents}
              >
                <span class="buttonIcon">🙋‍♂️</span>
                <span class="buttonText">${e.content[0].substring(4)}</span>
              </button>
            </li>
          `;
          } else if (e.content[0].includes('답변')) {
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
                    <p class="chatName">디지털 하나로 문의 채널</p>
                    <p class="chatItemContainer">${e.content[0].substr(4)}</p>
                  </div>
                </li>
              `;
          } else {
            tempInnerHTML += `
      
            <li class="resItem">
              <button 
                key=${e.resId} 
                class="qnaButtonSelected" 
                data-resId=${e.resId}
                data-nextReqGroup=${e.nextReqGroup}
                data-contents=${e.contents}
              >
                <span class="buttonIcon">🙋‍♂️</span>
                <span class="buttonText">${e.content[0]}</span>
              </button>
            </li>
          `;
          }
        });
      } else {
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
              <p class="chatName">디지털 하나로 문의 채널</p>
              <p class="chatItemContainer">${message.contents}</p>
            </div>
          </li>`;
      }
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
    <p class="profileTitle">디지털 하나로 문의 채널</p>
    <p class="responseContainer"><span class="response">보통 수십 분 내 답변</span></p>
  `;
};

export const handleClickFAQButton = e => {
  const $modalContainer = document.querySelector('.modalContainer');
  const question = {};
  question['resId'] = e.target.dataset.resid;
  question['nextReqGroup'] = e.target.dataset.nextreqgroup;
  question['contents'] = e.target.dataset.contents;
  question['type'] = 'res';
  question['id'] = messages[messages.length - 1].id + 1;
  question['createdAt'] = getFormatTime(Date.now());
  messages.push(question);
  store.setState('nextReqGroup', question.nextReqGroup);

  // 선택한 버튼만 남기기
  const temp = ANSWER_LIST.filter(response => {
    return parseInt(response.resId) === parseInt(question.resId);
  })[0];
  if (temp) {
    temp.createdAt = getFormatTime(Date.now());
    temp.contents = temp.contents.replace(/\n/g, '<br>');
    messages.push(temp);
  }

  renderContents();

  const $chatbotList = document.querySelector('.chatbotList');
  $('.modalContainer').animate(
    { scrollTop: $chatbotList.scrollHeight, easing: 'ease-in-out' },
    SCROLL_ANIMATION_DURATION
  );
};

export const ChatbotFAQButtons = () => {
  let tempInnerHTML = '';
  FAQ_LIST.forEach(question => {
    const { resId, reqGroup, nextReqGroup, contents } = question;
    if (parseInt(reqGroup) === parseInt(store.getState('nextReqGroup'))) {
      // 첫 질문에 처음으로 돌아가기 삭제
      if (messages.length === 1 && resId === 0) return;

      // 방금 선택한 버튼 생성 방지
      if (messages[messages.length - 1].resId === resId) return;

      tempInnerHTML += `
      <button key=${resId + '-' + Date.now()} class="qnaButton" 
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

  const $chatbotButtons = document.querySelector('.chatbotButtons');
  $chatbotButtons.innerHTML = tempInnerHTML;

  const $qnaButtons = document.querySelectorAll('.qnaButton');
  setTimeout(() => {
    $qnaButtons.forEach(button =>
      button.addEventListener('click', handleClickFAQButton)
    );
  }, SCROLL_ANIMATION_DURATION);
};

export const handleSubmitMessage = e => {
  e.preventDefault();

  const messageInput = document.getElementById('sendMessage');
  const value = messageInput.value.trim();
  if (value === '') return;
  const resId = 10;
  const contents = value;
  const userName = sessionStorage.getItem('userName');
  sendQnaToSlack(userName, contents);

  e.target.setAttribute('data-resId', resId);
  e.target.setAttribute('data-contents', contents);
  const slackMessage = {
    id: messages.length,
    resId: 10,
    type: 'manualRes',
    content: [value],
    createdAt: getFormatTime(Date.now()),
  };

  let slackLocalStorage = JSON.parse(localStorage.getItem('slackQ&A'));
  if (slackLocalStorage) {
    localStorage.setItem(
      'slackQ&A',
      JSON.stringify([...slackLocalStorage, slackMessage])
    );
  } else {
    localStorage.setItem('slackQ&A', JSON.stringify([slackMessage]));
  }

  renderContents();
};

export const ChatbotFooter = () => {
  const $chatbotFooter = document.querySelector('.chatbotFooter');
  const userName = sessionStorage.getItem('userName');
  const isLoggedin = Boolean(userName);
  let inputDisabled = 'disabled';
  if (messages[messages.length - 1].resId == 10) {
    inputDisabled = isLoggedin
      ? 'placeholder="문의 사항을 입력해 주세요"'
      : 'placeholder="로그인 후 이용해 주세요" disabled';
  }
  $chatbotFooter.innerHTML = `
    <form class="messageInputForm" onsubmit="handleSubmitMessage">
      <textarea type="textarea" id="sendMessage" ${inputDisabled}> </textarea>
    </form>
    <div class="sendImage">
      <img class="sendButton" src="/public/images/send.png" width="22px" height="22px"/>
    </div>
  `;
  const textarea = document.getElementById('sendMessage');
  const placeholderText = '';

  textarea.addEventListener('focus', function () {
    if (textarea.value === placeholderText) {
      textarea.value = '';
    }
  });

  textarea.addEventListener('blur', function () {
    if (textarea.value === '') {
      textarea.value = '';
    }
  });

  textarea.value = placeholderText;
  $chatbotFooter.style.position = 'sticky';
  $chatbotFooter.style.bottom = 0;
  if (messages.length > 1) {
    $chatbotFooter.style.marginTop = '1rem';
  }

  const sendImage = document.querySelector('.sendImage');
  const messageInput = document.getElementById('sendMessage');

  sendImage.addEventListener('click', handleSubmitMessage);

  const updateStyle = () => {
    const value = messageInput.value;

    if (value === '') {
      sendImage.classList.add('disabled');
    } else {
      sendImage.classList.remove('disabled');
    }
  };

  messageInput.addEventListener('input', updateStyle);
  messageInput.addEventListener('change', updateStyle);

  messageInput.addEventListener('input', function (event) {
    const value = event.target.value;

    if (value === '') {
      sendImage.classList.add('disabled');
    } else {
      sendImage.classList.remove('disabled');
    }
  });

  const messageForm = document.querySelector('.messageInputForm');
  messageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSubmitMessage(e);
  });

  updateStyle();
};
