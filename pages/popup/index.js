const typingtext = '모두가 하나로'; // 타이핑할 텍스트
const typingtext2 = '디지털 하나路';
const typingDelay = 200; // 한 글자씩 타이핑되는 딜레이(ms)
const typingTextElement = document.getElementById('typing-text');
const typingTextElement2 = document.getElementById('typing-text2');
function type(text, text2) {
  let charIndex = 0; // 현재 타이핑 중인 글자의 인덱스
  let charIndex2 = 0;
  function typeNextChar() {
    if (charIndex < text.length) {
      typingTextElement.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeNextChar, typingDelay);
    } else {
      setTimeout(() => {
        typingTextElement.textContent = text;
        setTimeout(typeNextChar2, typingDelay);
      }, );
    }
  }
  function typeNextChar2() {
    if (charIndex2 < text2.length) {
      typingTextElement2.textContent += text2.charAt(charIndex2);
      charIndex2++;
      setTimeout(typeNextChar2, typingDelay);
    } else {
      setTimeout(() => {
        typingTextElement2.textContent = text2;
        window.location.replace(`/pages/main/index.html`)
      },1000);
    }
  }
  setTimeout(typeNextChar, 2000);
}

document.addEventListener('DOMContentLoaded', function () {
  type(typingtext, typingtext2);
});
