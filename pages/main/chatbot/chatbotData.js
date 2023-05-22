/*
  0: 디폴트 질문 그룹
  1: 커리큘럼 관련 그룹
  2: 교육 생활 문의
*/

export const FAQ_LIST = [
  { id: 0, reqGroup: 0, nextReqGroup: 0, contents: '디지털 하나로 소개' },
  { id: 1, reqGroup: 0, nextReqGroup: 1, contents: '지원 자격 문의' },
  { id: 2, reqGroup: 0, nextReqGroup: 1, contents: '커리큘럼 문의' },
  { id: 3, reqGroup: 0, nextReqGroup: 2, contents: '교육 생활 문의' },
  { id: 4, reqGroup: 1, nextReqGroup: 0, contents: '배우는 기술 스택' },
  { id: 6, reqGroup: 1, nextReqGroup: 0, contents: '교육 기간 문의' },
  { id: 7, reqGroup: 2, nextReqGroup: 0, contents: '교육 특전 문의' },
  { id: 8, reqGroup: 2, nextReqGroup: 0, contents: '강사님 정보' },
  { id: 9, reqGroup: 2, nextReqGroup: 0, contents: '시간표 문의' },
];
