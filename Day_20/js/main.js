let initialContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit";
let startIndex = 0;
let newContent = "";
let content = initialContent;
var position = 0;
function display() {
  content = initialContent;

  position = content.slice(startIndex).indexOf(" ");
  if (position === -1 && startIndex < content.length) {
    position = content.length;
  } else if (startIndex > content.length) {
    startIndex = 0;
    position = content.slice(startIndex).indexOf(" ");
  }

  position += startIndex;
  newContent =
    content.slice(0, startIndex) +
    `<span class="highlight">${content.slice(startIndex, position)}</span>` +
    content.slice(position);
  startIndex = position + 1;
  return newContent;
}

var contentEl = document.querySelector(".content");

var id = setInterval(function () {
  contentEl.innerHTML = "";
  contentEl.innerHTML = display();
}, 1000);

// // function display(str) {
// //   var startIndex = 0;
// //   var endIndex = 0;
// //   setInterval(function () {
// //     // startIndex = getStartIndex(str,startIndex);
// //     startIndex += endIndex;
// //     endIndex = getEndIndex(str, startIndex);
// //     if (endIndex === -1) {
// //       startIndex = 0;
// //     }
// //   }, 1000);
// //   function highlightText(str, startIndex, endIndex) {
// //     return (
// //       str.slice(0, startIndex) +
// //       `<span class="highlight">${str.slice(startIndex, endIndex)}</span>` +
// //       str.slice(endIndex)
// //     );
// //   }
// // }
// function getEndIndex(str, startIndex) {
//   return str.slice(startIndex).indexOf(" ") + 1;
// }
