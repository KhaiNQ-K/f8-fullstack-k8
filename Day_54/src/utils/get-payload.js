export const getPayload = (originArray) => {
  return originArray.flatMap((col) =>
    col.tasks.map((task) => ({
      content: task.content,
      column: task.column,
      columnName: col.columnName,
    }))
  );
};
// return cloneArray?.map((col) => {
//   const taskByCol = childrenArray.find((task) => task.column === col.column);
//   if (taskByCol) {
//     return {
//       content: taskByCol.content,
//       column: taskByCol.column,
//       columnName: col.columnName,
//     };
//   }
// });
