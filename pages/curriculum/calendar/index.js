function buildCalendar(calendarData, holidayData, timeData, specialData) {
  let calendarTable = document.getElementById('calendar');
  let calendarTableTitle = document.getElementById('month');
  let cell;
  calendarTableTitle.innerHTML = today.getMonth() + 1 + '월';

  if (!calendarTable || !calendarTableTitle) {
    console.error('Error: Cannot find calendar table or month element.');
    return;
  }

  let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
  let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  while (calendarTable.rows.length > 1) {
    calendarTable.deleteRow(calendarTable.rows.length - 1);
  }

  let row = null;
  let cnt = 0;

  row = calendarTable.insertRow();
  for (let i = 0; i < firstDate.getDay(); i++) {
    cell = row.insertCell();
    cell.setAttribute('class', 'day');
    cnt += 1;
  }

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

  if (cnt % 7 != 0) {
    for (i = 0; i < 7 - (cnt % 7); i++) {
      cell = row.insertCell();
    }
  }

  let monthKey = today.getMonth() + 1 + '월';
  calendarTableTitle.innerHTML = monthKey;

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
      timeSpanElement.textContent = time.split(" ").join("");
    } else {
      timeSpanElement.textContent = '';
    }
  }

  let scheduleInfo = specialData?.[monthKey]['monthly-schedule'];
  let lectureInfo = specialData?.[monthKey]['special-lecture'];
  let timeInfo = specialData?.[monthKey]['special-time'];

  let monthlySchedule = document.getElementById('monthly-schedule');
  let specialLecture = document.getElementById('special-lecture');
  let specialTime = document.getElementById('special-time');

  const ulElements1 = monthlySchedule.querySelector('ul');
  const ulElements2 = specialLecture.querySelector('ul');
  const ulElements3 = specialTime.querySelector('ul');

  monthlySchedule.removeChild(ulElements1);
  specialLecture.removeChild(ulElements2);
  specialTime.removeChild(ulElements3);

  let ulElement1 = document.createElement('ul');
  let ulElement2 = document.createElement('ul');
  let ulElement3 = document.createElement('ul');

  monthlySchedule.appendChild(ulElement1);
  specialLecture.appendChild(ulElement2);
  specialTime.appendChild(ulElement3);

  let summaryMonth = document.getElementById('summaryMonth');
  summaryMonth.innerHTML = `${monthKey} 주요 활동`;

  if (Array.isArray(scheduleInfo) && scheduleInfo.length > 0) {
    scheduleInfo.forEach(item => {
      const liElement = document.createElement('li');
      liElement.textContent = item;
      ulElement1.appendChild(liElement);
    });
  }

  if (Array.isArray(lectureInfo) && lectureInfo.length > 0) {
    lectureInfo.forEach(item => {
      const liElement = document.createElement('li');
      liElement.textContent = item;
      ulElement2.appendChild(liElement);
    });
  }

  if (Array.isArray(timeInfo) && timeInfo.length > 0) {
    timeInfo.forEach(item => {
      const liElement = document.createElement('li');
      liElement.textContent = item;
      ulElement3.appendChild(liElement);
    });
  }
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
var monthKey = today.getMonth() + 1 + '월';

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
