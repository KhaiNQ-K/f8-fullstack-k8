const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
const btnEl = document.querySelector('.btn');
const mainEl = document.querySelector('.main');
const spanEl = mainEl.querySelector('span.text-red');

var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var speechRecognitionList = new SpeechGrammarList();
var grammar = '#JSGF V1.0;';
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'vi-VN';
recognition.interimResults = false;
const messageBoxEl = document.querySelector('.message-box');
btnEl.addEventListener('click', function (e) {
  messageBoxEl.classList.remove('message-block');
  spanEl.classList.remove('text-green');
  spanEl.classList.add('text-red');
  spanEl.innerText = 'Hãy nói nội dung bạn muốn';
  recognition.start();
});
let speechContent = '';
recognition.onresult = function (event) {
  const lastResult = event.results.length - 1;
  const content = event.results[lastResult][0].transcript;
  messageBoxEl.classList.toggle('message-block', !messageBoxEl.classList.contains('message-block'));
  messageBoxEl.children.item(0).innerText = `Đang thực hiện ${content}`;
  speechContent = content;
};
recognition.onspeechend = function () {
  recognition.stop();
};
recognition.onerror = function (event) {
  messageBoxEl.children.item(0).innerText = 'Không thực hiện được yêu cầu';
};
recognition.onend = function () {
  handleSpeechContent(speechContent)
    .then((value) => {
      setTimeout(() => {
        handleRedirect(value);
      }, 1000);
    })
    .catch(() => {
      messageBoxEl.children.item(0).innerText = 'Không thực hiện được yêu cầu';
    })
    .finally(() => {
      spanEl.classList.remove('text-red');
      spanEl.classList.add('text-green');
      spanEl.innerText = 'Đã nói xong hi vọng kết quả như ý bạn';
    });
};
const MESSAGE_LIST = [
  {
    messages: ['google maps', 'google map'],
    value: 'https://www.google.com/maps',
  },
  {
    messages: ['google drive'],
    value: 'https://drive.google.com/',
  },
  {
    messages: ['google'],
    value: 'https://www.google.com.vn/',
  },
  {
    messages: ['facebook'],
    value: 'https://www.facebook.com/',
  },
  {
    messages: ['youtube'],
    value: 'https://www.youtube.com/',
  },
  {
    messages: ['chỉ đường tới', 'chỉ đường', 'đường tới', 'tới'],
    value: 'https://www.google.com/maps/search/',
    hasQuery: true,
    searchChars: {
      ' ': '%20',
    },
  },
  {
    messages: ['bài hát', 'mở bài hát', ' nghe bài hát'],
    value: 'https://zingmp3.vn/tim-kiem/tat-ca?q=',
    hasQuery: true,
    searchChars: {
      ' ': '+',
    },
  },
  {
    messages: ['xem video', 'mở video', 'video'],
    value: 'https://www.youtube.com/results?search_query=',
    hasQuery: true,
    searchChars: {
      ' ': '+',
    },
  },
];
function handleRedirect(value) {
  window.open(value, '_blank');
}
function getMessage(content) {
  content = content.toLocaleLowerCase();
  let data = { value: null, message: null, hasQuery: false, searchChars: null };
  for (const messageData of MESSAGE_LIST) {
    for (const message of messageData.messages) {
      if (message.indexOf(content) !== -1) {
        data = {
          value: messageData.value,
          message,
          hasQuery: messageData.hasQuery,
          searchChars: messageData.searchChars,
        };
      }
    }
  }
  return data;
}
function handleSpeechContent(content) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const messageMatch = getMessage(content);
      if (messageMatch.value == null) {
        reject('Error');
        return;
      }
      const { value, message } = messageMatch;
      let url = value;
      if (messageMatch.hasQuery) {
        let params = getQueryParams(message, content);
        Object.entries(messageMatch.searchChars || {}).forEach(
          ([key, value]) => (params = params.replace(key, value))
        );
        url += params;
      }
      resolve(url);
    }, 2000);
  });
}

function getQueryParams(message, speechContent) {
  const index = speechContent.toLocaleLowerCase().indexOf(message);
  if (index == -1) return '';
  if (index + message.length < speechContent.length) {
    return speechContent.substring(index + message.length).trim();
  }
  return speechContent.substring(0, index).trim();
}
