import { ANSWER_LIST, FAQ_LIST, messages, store } from './chatbotData.js';

export const makeModal = () => {
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

export const getFormatTime = () => {
  const now = new Date();
  const localeTimeString = now.toLocaleTimeString();
  const formatTime = localeTimeString.slice(0, 5) + localeTimeString.slice(8);
  return formatTime;
};

export const ChatbotHeader = () => {
  const $chatbotHeader = document.querySelector('.chatbotHeader');
  $chatbotHeader.innerHTML = `
    <img
      class="headerLogo"
      alt="headerLogo"
      src="https://cf.channel.io/avatar/emoji/mouse.91a2dc.png"
      width="30px"
      height="30px"
    />
    <p class="headerTitle">하나은행 문의채널</p>

    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      foundation="[object Object]"
      class="headerGear InnerIconstyled__Icon-ch-front__sc-197h5bb-0 dGTZIk"
      defaultopacity="1"
      hoveredopacity="1"
      margintop="0"
      marginright="0"
      marginbottom="0"
      marginleft="0"
      withtheme="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.83354 10.0001C5.83354 7.69939 7.69881 5.83342 10.0002 5.83342C12.3009 5.83342 14.1669 7.69939 14.1669 10.0001C14.1669 12.3008 12.3009 14.1667 10.0002 14.1667C7.69881 14.1667 5.83354 12.3008 5.83354 10.0001ZM18.3335 11.2501V8.75008L16.4752 8.44008C16.3094 7.75508 16.0394 7.11175 15.6794 6.52675L16.776 4.99091L15.0085 3.22341L13.4727 4.32091C12.8877 3.96091 12.2452 3.69091 11.5602 3.52508L11.2502 1.66675H8.7502L8.4402 3.52508C7.7552 3.69091 7.11187 3.96091 6.52687 4.32091L4.99104 3.22341L3.22354 4.99091L4.3202 6.52675C3.96104 7.11175 3.6902 7.75508 3.5252 8.44008L1.66687 8.75008V11.2501L3.5252 11.5601C3.6902 12.2451 3.96104 12.8884 4.3202 13.4734L3.22354 15.0092L4.99104 16.7767L6.52687 15.6792C7.11187 16.0384 7.7552 16.3092 8.4402 16.4751L8.7502 18.3334H11.2502L11.5602 16.4751C12.2452 16.3092 12.8877 16.0384 13.4727 15.6792L15.0085 16.7767L16.776 15.0092L15.6794 13.4734C16.0394 12.8884 16.3094 12.2451 16.4752 11.5601L18.3335 11.2501Z"
      ></path>
    </svg>
  `;
};

export const ChatbotList = () => {
  const $chatbotList = document.querySelector('.chatbotList');
  let tempInnerHTML = '';

  messages.forEach((message, i) => {
    const prevMessage = messages[i - 1];
    const prevTime = prevMessage?.createdAt;
    if (message.type == 'req') {
      tempInnerHTML += `<li key=${message.id} class="chatItem">`;
      if (prevTime == undefined || prevTime != message.createdAt) {
        tempInnerHTML += `<p class="chatTime">${message.createdAt}</p>`;
      }
      tempInnerHTML += `<div class="chatItemWrapper">
          <img
            class="headerLogo"
            alt="headerLogo"
            src="https://cf.channel.io/avatar/emoji/mouse.91a2dc.png"
            width="30px"
            height="30px"
          />
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
    <img
      class="profileImage"
      alt="profileImage"
      src="https://cf.channel.io/avatar/emoji/mouse.91a2dc.png"
      width="96px"
      height="96px"
    />
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

  const temp = ANSWER_LIST.filter(x => x.resId == question.resId)[0];
  temp.createdAt = getFormatTime(Date.now());
  messages.push(temp);
  ChatbotList();
  ChatbotFAQButtons();
  ChatbotFooter();
};

export const ChatbotFAQButtons = () => {
  const $chatbotButtons = document.querySelector('.chatbotButtons');
  let tempInnerHTML = '';
  FAQ_LIST.forEach(question => {
    if (question.reqGroup == store.getState('nextReqGroup')) {
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
  // 리렌더
  ChatbotList();
  ChatbotFAQButtons();
  ChatbotFooter();
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
