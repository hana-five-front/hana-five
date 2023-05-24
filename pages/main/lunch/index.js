const $c = document.querySelector('canvas');
const ctx = $c.getContext('2d');

const product = ['한식', '중식', '일식', '양식', '디저트'];
const colors = [
  'rgba(0, 131, 117, 1)',
  'rgba(0, 131, 117, 0.8)',
  'rgba(0, 131, 117, 0.6)',
  'rgba(0, 131, 117, 0.4)',
  'rgba(0, 131, 117, 0.2)',
];
const roulletContainer = document.createElement('div');

roulletContainer.classList.add('rullet-list');
roulletContainer.style.display = 'none';

document.querySelector('main').appendChild(roulletContainer);

const newMake = () => {
  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const arc = (2 * Math.PI) / product.length;

  for (let i = 0; i < product.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, arc * i, arc * (i + 1));
    ctx.fill();
    ctx.closePath();
  }

  ctx.fillStyle = '#fff';
  ctx.font = '18px Hana';
  ctx.textAlign = 'center';

  for (let i = 0; i < product.length; i++) {
    const angle = arc * i + arc / 2;

    ctx.save();

    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50)
    );

    ctx.rotate(angle + Math.PI / 2);

    product[i].split(' ').forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j);
    });

    ctx.restore();
  }
};

const rotate = async () => {
  roulletContainer.style.display = 'none';
  $c.style.transform = 'initial';
  $c.style.transition = 'initial';

  if (roulletContainer.children) {
    roulletContainer.innerHTML = '';
  }

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length);

    const arc = 360 / product.length;
    const rotate = ran * arc + 3600 + arc * 3 - arc / 4;

    $c.style.transform = `rotate(-${rotate - 144}deg)`;
    $c.style.transition = '2s';

    setTimeout(() => {
      var ps = new kakao.maps.services.Places();

      const mainTitle = document.createElement('div');
      mainTitle.classList.add('pick-list-title');
      mainTitle.innerHTML = `성수동 <span class="rullet-keyword"></span> 맛집 리스트`;
      roulletContainer.appendChild(mainTitle);

      ps.keywordSearch(`성수역 ${product[ran]} 맛집`, placesSearchCB);
      const name = document.querySelectorAll(`.rullet-keyword`)[0];
      name.innerText = `[${product[ran]}]`;
    }, 2000);
  }, 1);
};

newMake();

function randomNum(arr, lower, upper) {
  let checkSet = new Set([]);

  for (var i = 0; i < arr.length; i++) {
    let number = Math.floor(Math.random() * (upper - lower + 1)) + lower;

    while (true) {
      if (!checkSet.has(number)) {
        checkSet.add(number);
        break;
      } else {
        number = Math.floor(Math.random() * (upper - lower + 1)) + lower;
      }
    }
    arr[i] = number;
  }
  return arr;
}

function placesSearchCB(data, status, pagination) {
  roulletContainer.style.display = '';
  if (status === kakao.maps.services.Status.OK) {
    let random_list = randomNum(Array.from({ length: 7 }), 0, 14);
    random_list.forEach((e, idx) => {
      let outerAnchor = document.createElement('a');
      outerAnchor.classList.add('rullet-a-name');
      outerAnchor.href = `${data[e].place_url}`;
      outerAnchor.target = '_blank';
      let innerDiv = document.createElement('div');
      innerDiv.classList.add('rullet-list-name');
      let childNameDiv = document.createElement('div');
      childNameDiv.classList.add('rulletlist-list-name');
      childNameDiv.innerText = data[e].place_name.split(' ')[0];
      let childAddressDiv = document.createElement('div');
      childAddressDiv.classList.add('rulletlist-list-address');
      childAddressDiv.innerText = data[e].address_name;
      innerDiv.appendChild(childNameDiv);
      innerDiv.appendChild(childAddressDiv);
      outerAnchor.appendChild(innerDiv);
      roulletContainer.appendChild(outerAnchor);
    });
  }
}
