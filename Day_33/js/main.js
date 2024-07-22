const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const listItemEl = $$('.list-item');
let draggedItem = null;
const listEl = $('.list');
Array.from(listItemEl).forEach((el) => {
  el.addEventListener('dragstart', handleDragStart);
  el.addEventListener('dragend', handleDragEnd);
  el.addEventListener('dragover', handleDragOver);
  el.addEventListener('dragleave', handleDragLeave);
  el.addEventListener('dragenter', dragEnter);
  el.addEventListener('drop', handleDrop);
});
function handleDragStart(e) {
  draggedItem = this;
}
function handleDragEnd(e) {
  setTimeout(() => {
    draggedItem = null;
  }, 0);
}
function dragEnter(e) {
  if (this !== draggedItem) {
    this.classList.add('over');
  }
}
function handleDragLeave(e) {
  this.classList.remove('over');
}
function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  if (this !== draggedItem) {
    this.classList.remove('over');

    let temp = document.createElement('div');
    this.parentNode.insertBefore(temp, this);
    this.parentNode.insertBefore(this, draggedItem);
    this.parentNode.insertBefore(draggedItem, temp);
    this.parentNode.removeChild(temp);
  }
}
