const $c = document.querySelector("canvas");
const ctx = $c.getContext("2d");

const product = ["한식", "중식", "일식", "양식", "디저트"];
const colors = ["#dc0936", "#e6471d", "#f7a416", "#efe61f", "#60b236"];

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

  ctx.fillStyle = "#fff";
  ctx.font = "18px Hana";
  ctx.textAlign = "center";

  for (let i = 0; i < product.length; i++) {
    const angle = arc * i + arc / 2;

    ctx.save();

    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50)
    );

    ctx.rotate(angle + Math.PI / 2);

    product[i].split(" ").forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j);
    });

    ctx.restore();
  }
};

const rotate = () => {
  $c.style.transform = "initial";
  $c.style.transition = "initial";

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length);

    const arc = 360 / product.length;
    const rotate = ran * arc + 3600 + arc * 3 - arc / 4;

    $c.style.transform = `rotate(-${rotate - 144}deg)`;
    $c.style.transition = "2s";

    setTimeout(() => {
      var ps = new kakao.maps.services.Places();
      const name=document.querySelectorAll(
        `.rullet-keyword`
      )[0]
      name.innerText = `[${product[ran]}]`;
    
        ps.keywordSearch(`성수역 ${product[ran]} 맛집`, placesSearchCB)
   
    }, 2000);
  }, 1);
};

newMake();

function randomNum(arr, lower, upper) {
    let checkSet = new Set([])
    
  for (var i = 0; i < arr.length; i++) {
    let number = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    
    while(true) {
        
        if (!checkSet.has(number)) {
            checkSet.add(number)
            break;
        }
        else{
            number = Math.floor(Math.random() * (upper - lower + 1)) + lower;
        }
       
    }
    arr[i]=number
  }
  return arr;
}

function placesSearchCB(data, status, pagination) {

  if (status === kakao.maps.services.Status.OK) {
    let random_list = randomNum(Array.from({ length: 4 }), 0, 14);
    random_list.forEach((e, idx) => {
      let rulletList = document.querySelectorAll(
        `.rullet-list-name${idx + 1}`
      )[0];
      let link = document.querySelectorAll(`.rullet-a-name${idx+1}`)[0]
      link.setAttribute("href",`${data[e].place_url}`)
      let childList = rulletList.getElementsByTagName("div");
      let rulletListName = childList[0];
      let rulletListAddress = childList[1];
      rulletListName.innerText = data[e].place_name;
      rulletListAddress.innerText = data[e].address_name;
    });

  }
}
