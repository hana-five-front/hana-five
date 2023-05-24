import { getFormatTime } from './chatbotFunctions.js';

export const FAQ_LIST = [
  { resId: 0, reqGroup: 0, nextReqGroup: 0, contents: '디지털 하나로 소개' },
  { resId: 1, reqGroup: 0, nextReqGroup: 1, contents: '지원 자격 문의' },
  { resId: 2, reqGroup: 0, nextReqGroup: 1, contents: '커리큘럼 문의' },
  { resId: 3, reqGroup: 0, nextReqGroup: 2, contents: '교육 생활 문의' },
  { resId: 4, reqGroup: 1, nextReqGroup: 0, contents: '배우는 기술 스택' },
  { resId: 5, reqGroup: 1, nextReqGroup: 0, contents: '교육 기간 문의' },
  { resId: 6, reqGroup: 2, nextReqGroup: 0, contents: '교육 특전 문의' },
  { resId: 7, reqGroup: 2, nextReqGroup: 0, contents: '강사님 정보' },
  { resId: 8, reqGroup: 2, nextReqGroup: 0, contents: '시간표 문의' },
];

export const ANSWER_LIST = [
  {
    id: 0,
    resId: 0,
    type: 'req',
    contents:
      '안녕하세요, 디지털 하나로 문의하기 화면입니다. 궁금한 사항을 클릭해주세요..! ',
  },
  {
    id: 1,
    resId: 1,
    type: 'req',
    contents: `디지털 하나로는 금융권 최초의 KDT 교육으로, 
      데이터 분석 및 기획, 금융서비스 개발 파트로 나뉘어 금융권 디지털/ICT 인재를 키우는데 특화된 교육입니다.`,
  },
  {
    id: 2,
    resId: 2,
    type: 'req',
    contents: `디지털 하나로는 은행권 디지털/ICT 직무에 관심있는 모든 분들을 대상으로 합니다. 
        다만 교육 수료 후 입사가 가능한 경우로 입교를 제한하고 있습니다.`,
  },
  {
    id: 3,
    resId: 3,
    type: 'req',
    contents: '커리큘럼은 커리큘럼 페이지로 가시죠..!',
  },
  {
    id: 4,
    resId: 4,
    type: 'req',
    contents: '교육 생활은 아주 좋아요..!',
  },
  {
    id: 5,
    resId: 5,
    type: 'req',
    contents: 'HTML/CSS/JS, JAVA/SPRING, ORACLE DB',
  },
  {
    id: 6,
    resId: 6,
    type: 'req',
    contents:
      '교육기간은 5월 부터 10월입니다. 길지만 알찬 시간이 되길 꼭 바랍니다...!!!',
  },
  {
    id: 7,
    resId: 7,
    type: 'req',
    contents: `수료생의 70%를 우수 및 최우수 수료생으로 선발하여 하나금융그룹 서류전형을 면제해드립니다. 
        최우수 수료생의 경우 필기 전형 및 코테 전형을 제외하고, 바로 면접을 볼수있습니다.
      `,
  },
  {
    id: 8,
    resId: 8,
    type: 'req',
    contents: `강사님은 정현희 강사님입니다..!
      `,
  },
  {
    id: 9,
    resId: 9,
    type: 'req',
    contents: `시간표는 시간표 페이지로 가시죠..! 
      `,
  },
];

export const messages = [
  {
    id: 0,
    resId: 0,
    type: 'req',
    contents:
      '안녕하세요, 디지털 하나로 문의하기 화면입니다. 궁금한 사항을 클릭해주세요..! ',
    createdAt: getFormatTime(Date.now()),
  },
];

export const GEAR_ICON_SVG_TAG = `
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
  </svg>`;