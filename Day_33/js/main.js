const list = document.querySelector('.list');
const items = list.querySelectorAll('.list-item');
let draggedItem = null;

// Handle drag start
items.forEach((item) => {
  item.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    e.target.classList.add('dragging', 'over');
  });

  item.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging', 'over');
    draggedItem = null;
  });
});

// Handle drag over
list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(list, e.clientY);
  if (afterElement == null) {
    list.appendChild(draggingItem);
  } else {
    list.insertBefore(draggingItem, afterElement);
  }
});

// Handle drop
list.addEventListener('drop', (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(list, e.clientY);
  if (afterElement == null) {
    list.appendChild(draggingItem);
  } else {
    list.insertBefore(draggingItem, afterElement);
  }
  updateOrder(); // Update order after drop
});

// Get element to place the dragged item before
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.list-item:not(.dragging)')];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// Update order function
function updateOrder() {
  [...list.querySelectorAll('.list-item')].map((item) => item.textContent);
}
