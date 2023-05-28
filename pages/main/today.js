const today = new Date(Date.now())
  .toLocaleDateString()
  .split('.')
  .map(e => Number(e));
const todayTable = document.querySelector('.todayTableContent');
const todayTableTitle = document.querySelector('.todayTableTitle')
const planData = async () => {
  const planResponse = await fetch('../curriculum/calendar/data/data.json');
  const data = await planResponse.json();
  const todayText = document.createElement('div')
  todayText.innerText = `${today[0]}년 ${today[1]}월 ${today[2]}일`
  todayTableTitle.appendChild(todayText)
  let todayData = data[`${today[1]}월`][today[2]];
  if (todayData) {
    todayData.forEach(timeSchedule => {
      let timeText = timeSchedule.split(' ')[0][1];
      let classText = "- " + timeSchedule.split(' ').slice(1).join('');
      const classDiv = document.createElement('div');;
      classDiv.innerText = classText+" "+`(${timeText}H)`;

      todayTable.appendChild(classDiv);
    });
  }
  else {
    const classDiv = document.createElement('div');;
    classDiv.innerText = '오늘은 수업이 없습니다.';

    todayTable.appendChild(classDiv);
  }
};

planData();
