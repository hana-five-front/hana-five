const today = new Date(Date.now())
  .toLocaleDateString()
  .split('.')
  .map(e => Number(e));
const todayTable = document.querySelector('.todayTableContent');
const planData = async () => {
  const planResponse = await fetch('../curriculum/calendar/data/data.json');
  const data = await planResponse.json();
  let todayData = data[`${today[1]}월`][today[2]];
  if (todayData) {
    todayData.forEach(timeSchedule => {
      let timeText = timeSchedule.split(' ')[0][1];
      let classText = timeSchedule.split(' ').slice(1).join('');
      const timeDiv = document.createElement('div');
      const classDiv = document.createElement('div');
      timeDiv.style = 'color: #008485; ';
      timeDiv.innerText = `[${timeText}H]`;
      classDiv.innerText = classText;

      todayTable.appendChild(classDiv);
      todayTable.appendChild(timeDiv);
    });
  }
};

planData();
