import { handleLogin } from '../../../scripts/kakaoLogin.js';
import { store } from './Store.js';
import { renderContents } from './chatbot.js';
import {
  ANSWER_LIST,
  EMOJI,
  FAQ_LIST,
  RES_ID_QNA,
  messages,
} from './chatbotData.js';
import {
  sendQnaToSlack,
  closeSocketConnection,
  openSocketConnection,
} from './chatbotSlackApi.js';

const SCROLL_ANIMATION_DURATION = 400;

const handleKeydownEscape = e => {
  if (e.key == 'Escape' || e.code == 'Escape') {
    setCloseModal();
  }
};

export const setOpenModal = () => {
  openSocketConnection();

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
  sessionStorage.setItem('isOpenModal', 'true');
};

export const setCloseModal = () => {
  closeSocketConnection();

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
  sessionStorage.setItem('isOpenModal', 'false');
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
    <img class="chevronLeft" src="/public/images/Chevron Left.svg" width="18px" height="18px" alt="뒤로가기" />
    <div class="chatLogoBox">
      <img
        class="headerLogo"
        alt="headerLogo"
        src="https://haitalk.kebhana.com/aicc/soe/service/storage/49e50558-09e8-47f2-b567-93b2a41099fc"
        alt="챗봇 캐릭터"
      />
    </div>
    <p class="headerTitle">디지털 하나로 문의 채널</p>
  `;

  const $chevronLeft = document.querySelector('.chevronLeft');
  $chevronLeft.addEventListener('click', setCloseModal);
};

const AnswerItem = ({ message, prevTime }) => {
  let innerHTML = `<li key=${message.id} class="chatItem">`;
  if (prevTime === undefined || prevTime !== message.createdAt) {
    innerHTML += `<p class="chatTime">${message.createdAt}</p>`;
  }
  innerHTML += `
    <div class="chatItemWrapper">
      <div class="chatLogoBox" >
        <img
          class="headerLogo"
          alt="headerLogo"
          src="https://haitalk.kebhana.com/aicc/soe/service/storage/49e50558-09e8-47f2-b567-93b2a41099fc"
          alt="챗봇 캐릭터"
        />
      </div>
      <div>
        <p class="chatName">디지털 하나로 문의 채널</p>
        <p class="chatItemContainer">${message.contents}</p>
      </div>
    </div>
  </li>
  `;

  return innerHTML;
};

const QuestionItem = ({ message }) => {
  return `
    <li class="resItem">
      <button 
        key=${message.resId} 
        class="qnaButtonSelected" 
        data-resId=${message.resId}
        data-nextReqGroup=${message.nextReqGroup}
        data-contents=${message.contents}
      >
        <span class="buttonIcon">${EMOJI[message.emojis]}</span>
        <span class="buttonText">${message.contents}</span>
      </button>
    </li>
  `;
};

const UserMessageItem = ({
  inquire,
  prevInquire,
  userName,
  messageContents,
  isUserMessage,
}) => {
  let innerHTML = `<li class="resItem"><div>`;
  const isDiffType =
    (prevInquire.content[0].substr(0, 3) == '내용:') != isUserMessage;
  if (isDiffType || prevInquire.title !== inquire.title) {
    innerHTML += `<p class="chatName">${userName}</p>`;
  }
  innerHTML += `<p class="chatItemContainer userChatItemContainer">${messageContents}</p></div></li>`;

  return innerHTML;
};

const AdminMessageItem = ({ message, messageContents, prevTime }) => {
  let innerHTML = `<li key=${message.id} class="chatItem">`;
  if (prevTime === undefined || prevTime !== message.createdAt) {
    innerHTML += `<p class="chatTime">${message.createdAt}</p>`;
  }
  innerHTML += `
    <div class="chatItemWrapper">
      <div class="chatLogoBox" >
        <img
          class="headerLogo"
          alt="headerLogo"
          src="https://haitalk.kebhana.com/aicc/soe/service/storage/49e50558-09e8-47f2-b567-93b2a41099fc"
          alt="챗봇 캐릭터"
        />
      </div>
      <div>
        <p class="chatName">디지털 하나로 문의 채널</p>
        <p class="chatItemContainer">${messageContents}</p>
      </div>
    </div>
  </li>
  `;

  return innerHTML;
};

export const ChatbotList = () => {
  const $chatbotList = document.querySelector('.chatbotList');
  let tempInnerHTML = '';
  messages.forEach((message, idx) => {
    const prevMessage = messages[idx - 1];
    const prevTime = prevMessage?.createdAt;

    if (message.type === 'FAQ_REQ') {
      tempInnerHTML += AnswerItem({ message, prevTime });
    } else if (message.type === 'FAQ_RES') {
      tempInnerHTML += QuestionItem({ message });
    } else {
      const slackInquire = JSON.parse(localStorage.getItem('slackQ&A'));
      const hasInquires = setHasInquires(slackInquire);

      if (hasInquires) {
        slackInquire.forEach((inquire, idx, inquires) => {
          const { isUserMessage, userName, messageContents } =
            setUserMessageInfo(inquire);
          const prevInquire = inquires[idx - 1] ?? {
            content: [''],
            title: 'uniqueTitle',
          };
          if (isUserMessage) {
            tempInnerHTML += UserMessageItem({
              inquire,
              prevInquire,
              userName,
              messageContents,
              isUserMessage,
            });
          } else {
            tempInnerHTML += AdminMessageItem({
              message,
              messageContents,
              prevTime,
            });
          }
        });
      } else {
        tempInnerHTML += `<li key=${message.id} class="chatItem">`;
        if (prevTime === undefined || prevTime !== message.createdAt) {
          tempInnerHTML += `<p class="chatTime">${message.createdAt}</p>`;
        }
        tempInnerHTML += `
            <div class="chatItemWrapper">
              <div class="chatLogoBox" >
                <img
                  class="headerLogo"
                  alt="headerLogo"
                  src="https://haitalk.kebhana.com/aicc/soe/service/storage/49e50558-09e8-47f2-b567-93b2a41099fc"
                  alt="챗봇 캐릭터"
                />
              </div>
              <div>
                <p class="chatName">디지털 하나로 문의 채널</p>
                <p class="chatItemContainer">${message.contents}</p>
              </div>
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
    alt="챗봇 캐릭터"
  />
  </div>
    <p class="profileTitle">디지털 하나로 문의 채널</p>
    <p class="responseContainer"><span class="response">보통 수십 분 내 답변</span></p>
  `;
};

export const handleClickFAQButton = e => {
  const { resid, nextreqgroup, contents, emoji } = e.target.dataset;
  const question = {
    resId: resid,
    nextReqGroup: nextreqgroup,
    contents,
    emojis: emoji,
    type: 'FAQ_RES',
    id: messages[messages.length - 1].id + 1,
    createdAt: getFormatTime(Date.now()),
  };
  messages.push(question);
  store.setState('nextReqGroup', question.nextReqGroup);

  // 선택한 버튼만 남기기
  let selectedQuestion = ANSWER_LIST.filter(
    response => parseInt(response.resId) === parseInt(question.resId)
  )[0];
  if (selectedQuestion) {
    selectedQuestion = {
      ...selectedQuestion,
      createdAt: getFormatTime(Date.now()),
      contents: selectedQuestion.contents.replace(/\n/g, '<br>'),
    };
    messages.push(selectedQuestion);
  }

  renderContents();
  scrollDownChatbotContainer();
};

export const ChatbotFAQButtons = () => {
  let tempInnerHTML = '';
  let backgroundColor = '#ccc';
  FAQ_LIST.forEach(question => {
    const { resId, reqGroup, nextReqGroup, contents, emoji } = question;
    if (parseInt(reqGroup) === parseInt(store.getState('nextReqGroup'))) {
      // 첫 질문에 처음으로 돌아가기 삭제
      if (messages.length === 1 && resId === 0) return;
      // 방금 선택한 버튼 생성 방지
      if (messages[messages.length - 1].resId === resId) return;

      if (resId === 0) backgroundColor = '#888cf6';

      tempInnerHTML += `
      <button key=${resId + '-' + Date.now()} class="qnaButton" 
        data-resId=${resId}
        data-nextReqGroup=${nextReqGroup} 
        data-contents=${JSON.stringify(contents)}
        data-emoji=${emoji}
        style="border: ${backgroundColor} 1px solid;"
      >
        <span class="buttonIcon">${EMOJI[emoji]}</span>
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
  const resId = RES_ID_QNA;
  const contents = value;
  const userName = sessionStorage.getItem('userName');
  sendQnaToSlack(userName, contents);

  e.target.setAttribute('data-resId', resId);
  e.target.setAttribute('data-contents', contents);
  const slackMessage = {
    title: `문의자: ${userName}`,
    content: [`내용: ${value}`],
    createdAt: getFormatTime(Date.now()),
    id: messages.length,
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
  scrollDownChatbotContainer();
};

export const ChatbotFooter = () => {
  const $chatbotFooter = document.querySelector('.chatbotFooter');
  const userName = sessionStorage.getItem('userName');
  const isLoggedIn = Boolean(userName);
  let inputDisabled = 'disabled';
  const LOGIN_FIRST_MESSAGE = '로그인 후 이용해 주세요';
  if (messages[messages.length - 1].resId == RES_ID_QNA) {
    inputDisabled = isLoggedIn
      ? 'placeholder="문의 사항을 입력해 주세요"'
      : `placeholder="${LOGIN_FIRST_MESSAGE}" disabled`;
  }
  $chatbotFooter.innerHTML = `
    <form class="messageInputForm" onsubmit="handleSubmitMessage">
      <textarea type="textarea" id="sendMessage" ${inputDisabled}> </textarea>
      <div class="sendImage">
        <img class="sendButton" src="/public/images/send.png" alt="문의 등록" width="22px" height="22px"/>
      </div>
    </form>
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
  const messageInputForm = document.querySelector('.messageInputForm');

  // 비로그인일 경우, 클릭시 로그인
  const isInputDisabled = messageInput.disabled;
  if (isInputDisabled && messageInput.placeholder === LOGIN_FIRST_MESSAGE) {
    messageInput.style.cursor = 'pointer';
    messageInputForm.addEventListener('click', () => {
      handleLogin(document.querySelector('#login'));
    });
  } else if (isInputDisabled) {
    messageInput.style.cursor = 'not-allowed';
  }

  sendImage.addEventListener('click', handleSubmitMessage);
  messageInput.addEventListener('keydown', handleKeydownMessage);

  // 인풋 유무에 따른 disabled/enabled 토글
  messageInput.addEventListener('input', updateStyle);
  messageInput.addEventListener('change', updateStyle);

  const messageForm = document.querySelector('.messageInputForm');
  messageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSubmitMessage(e);
  });

  updateStyle();
};

const updateStyle = () => {
  const value = document.getElementById('sendMessage').value;

  if (value === '') {
    document.querySelector('.sendImage').classList.add('disabled');
  } else {
    document.querySelector('.sendImage').classList.remove('disabled');
  }
};

const setHasInquires = arr => Array.isArray(arr) && arr.length > 0;

const setUserMessageInfo = inquire => ({
  isUserMessage: inquire.content[0].substr(0, 3) == '내용:',
  isAdminMessage: inquire.content[0].substr(0, 3) == '답변:',
  userName: inquire?.title?.substr(4),
  messageContents: inquire.content[0].substr(4),
});

const handleKeydownMessage = e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    document.querySelector('.sendImage').click();
  }
};

export const scrollDownChatbotContainer = () => {
  const $chatbotList = document.querySelector('.chatbotList');
  $('.modalContainer').animate(
    { scrollTop: $chatbotList.scrollHeight, easing: 'ease-in-out' },
    SCROLL_ANIMATION_DURATION
  );
};
