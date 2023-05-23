import { getFormatTime } from './chatbotFunctions.js';

class Store {
  constructor() {
    this.state = {
      nextReqGroup: 0,
      prevTime: '',
    };
  }
  getState(key) {
    return this.state[key];
  }
  setState(key, newState) {
    this.state[key] = newState;
  }
}

export const store = new Store();

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
