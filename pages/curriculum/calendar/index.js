function buildCalendar(calendarData, holidayData, timeData, specialData) {
  let calendarTable = document.getElementById('calendar');

  var monthKey = today.getMonth() + 1 + '월';

  if (!calendarTable) {
    console.error('Error: Cannot find calendar table or month element.');
    return;
  }

  renderCalendarTitle();
  renderCalendarTemplate();
  renderCalendarContents(calendarData);

  renderSpecialSchedules(specialData, monthKey, 'special-lecture');
  renderSpecialSchedules(specialData, monthKey, 'monthly-schedule');
  renderSpecialSchedules(specialData, monthKey, 'special-time');
}

let timetableData;
let holidayData;
let timeData;
let specialData;
let dataFetched = false;

const fetchData = async () => {
  try {
    const timetableResponse = await fetch('./data/data.json');
    const holidayResponse = await fetch('./data/holiday.json');
    const timeResponse = await fetch('./data/time.json');
    const specialResponse = await fetch('./data/info.json');

    timetableData = await timetableResponse.json();
    holidayData = await holidayResponse.json();
    timeData = await timeResponse.json();
    specialData = await specialResponse.json();

    dataFetched = true;

    buildCalendar(timetableData, holidayData, timeData, specialData);
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
};

const fetchOrBuildCalendar = () => {
  if (dataFetched) {
    buildCalendar(timetableData, holidayData, timeData, specialData);
  } else {
    fetchData();
  }
};

fetchOrBuildCalendar();

var today = new Date();

let currentDate = new Date();

const prevCalendar = () => {
  const targetYear = 2023;
  const targetMonth = 3;

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  if (currentYear === targetYear && currentMonth > targetMonth) {
    today = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    fetchOrBuildCalendar();
  }
};

const nextCalendar = () => {
  const targetYear = 2023;
  const targetMonth = 9;

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  if (currentYear == targetYear && currentMonth < targetMonth) {
    today = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    fetchOrBuildCalendar();
  }
};

const renderCalendarTemplate = () => {
  const calendarTable = document.querySelector('#calendar');
  calendarTable.innerHTML = `
    <tr class="day-week">
      <th class="day-week">일</th>
      <th class="day-week">월</th>
      <th class="day-week">화</th>
      <th class="day-week">수</th>
      <th class="day-week">목</th>
      <th class="day-week">금</th>
      <th class="day-week">토</th>
    </tr> 
  `;

  let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
  let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  let cell;

  while (calendarTable.rows.length > 1) {
    calendarTable.deleteRow(calendarTable.rows.length - 1);
  }

  let row = null;
  let cnt = 0;

  // 처음부터 1일의 첫 요일까지 셀 만들기
  row = calendarTable.insertRow();
  for (let i = 0; i < firstDate.getDay(); i++) {
    cell = row.insertCell();
    cell.setAttribute('class', 'day');
    cnt += 1;
  }

  // 1일 부터 마지막 날까지 셀 만들기
  for (let i = 1; i <= lastDate.getDate(); i++) {
    cell = row.insertCell();
    cnt += 1;

    cell.setAttribute('id', i);
    cell.setAttribute('class', 'day');
    cell.innerHTML = `
      <div class="cal-div">
        <span class="d-day">${i}</span>
        <span class="holiday"></span>
        <span class="time"></span>
      </div>`;

    if (cnt % 7 == 1) {
      cell.querySelector('div span').style.color = '#ff0000';
    }

    if (cnt % 7 == 0) {
      cell.classList.add('sat');
      row = calendar.insertRow();
    }

    if (
      i === currentDate.getDate() &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    ) {
      let todayCell = document.getElementById(i);
      let dDayElement = todayCell.querySelector('.d-day');
      dDayElement.style.borderRadius = '50%';
      dDayElement.style.backgroundColor = '#faa';
    }
  }

  // 나머지 요일 그리기
  if (cnt % 7 != 0) {
    for (let i = 0; i < 7 - (cnt % 7); i++) {
      cell = row.insertCell();
    }
  }
};

const renderCalendarTitle = () => {
  const calendarMonth = document.querySelector('.calendar-month');
  calendarMonth.innerHTML = `
    <button class="previous"><</button>
      <div id="month"></div>
    <button class="next">></button>
  `;
  let $title = document.getElementById('month');

  $title.innerHTML = `
  ${(today.getMonth() + 1).toString().padStart(2, ' ')}월`;

  document.querySelector('.previous').addEventListener('click', prevCalendar);
  document.querySelector('.next').addEventListener('click', nextCalendar);
};

const renderCalendarContents = calendarData => {
  let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
  let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  let monthKey = today.getMonth() + 1 + '월';
  for (let i = 1; i < lastDate.getDate() + 1; i++) {
    let dayKey = document.getElementById(`${i}`);
    let divElement = dayKey.querySelector('div');
    let spanElement = dayKey.querySelector('.holiday');
    let timeSpanElement = dayKey.querySelector('.time');
    let ulElement = document.createElement('ul');

    divElement.appendChild(ulElement);

    const timetableData = calendarData?.[monthKey][`${i}`];
    const holiday = holidayData?.[monthKey][`${i}`];
    const time = timeData?.[monthKey][`${i}`];

    if (Array.isArray(timetableData) && timetableData.length > 0) {
      timetableData.forEach(item => {
        const liElement = document.createElement('li');
        liElement.textContent = item;
        ulElement.appendChild(liElement);

        if (item.includes('Javascript') || item.includes('React')) {
          liElement.parentNode.parentNode.parentNode.style.backgroundColor =
            '#E4F0DB';
        } else if (item.includes('JAVA')) {
          liElement.parentNode.parentNode.parentNode.style.backgroundColor =
            '#DCE3F2';
        } else if (
          item.includes('SQL') ||
          item.includes('시큐어') ||
          item.includes('디자인') ||
          item.includes('웹페이지') ||
          item.includes('데이터')
        ) {
          liElement.parentNode.parentNode.parentNode.style.backgroundColor =
            '#F7E6D8';
        } else if (
          item.includes('하나은행') ||
          item.includes('DevRel') ||
          item.includes('입학식') ||
          item.includes('OT')
        ) {
          liElement.parentNode.parentNode.parentNode.style.backgroundColor =
            '#FBE7A3';
        } else if (item.includes('풀스택')) {
          liElement.parentNode.parentNode.parentNode.style.backgroundColor =
            '#E4F0DB';
        } else if (item.includes('Ⅰ')) {
          liElement.parentNode.parentNode.parentNode.style.backgroundColor =
            '#F7E6D8';
        } else if (item.includes('Ⅱ')) {
          liElement.parentNode.parentNode.parentNode.style.backgroundColor =
            '#DCE3F2';
        }
      });
    }

    if (typeof holiday !== 'undefined') {
      spanElement.textContent = holiday;
      spanElement.style.color = '#ff0000';
      dayKey.style.color = '#ff0000';
    } else {
      spanElement.textContent = '';
    }

    if (typeof time !== 'undefined') {
      timeSpanElement.textContent = time.split(' ').join('');
    } else {
      timeSpanElement.textContent = '';
    }
  }
};

const renderSpecialSchedules = (specialData, monthKey, specialScheduleName) => {
  let lectureInfo = specialData?.[monthKey][specialScheduleName];
  let $specialLecture = document.getElementById(specialScheduleName);
  const $ulElements = $specialLecture.querySelector('ul');
  $specialLecture.removeChild($ulElements);
  let $ulElement = document.createElement('ul');
  $specialLecture.appendChild($ulElement);

  if (specialScheduleName === 'monthly-schedule') {
    $specialLecture.children[0].innerHTML = `${monthKey} 주요 활동`;
  }

  if (Array.isArray(lectureInfo) && lectureInfo.length > 0) {
    lectureInfo.forEach(item => {
      const liElement = document.createElement('li');
      liElement.textContent = item;
      $ulElement.appendChild(liElement);
    });
  }
};
