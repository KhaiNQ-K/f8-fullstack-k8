export const mapOrder = (originArray, orderColums, key) => {
  if (!originArray || !orderColums || !key) return [];
  const cloneArray = [...originArray];
  return cloneArray.sort((a, b) => orderColums.indexOf(a[key]) - orderColums.indexOf(b[key]));
};
export const groupTasksByColumn = (columns, tasks) => {
  return {
    columnOrderIds: columns.columnOrderIds ? columns.columnOrderIds : columns.map((col) => col._id),
    columns: columns?.map((column) => {
      const tasksByColumn = tasks?.filter((task) => task.column === column.column);
      return {
        ...column,
        tasks: tasksByColumn,
        taskOrderIds: tasksByColumn.taskOrderIds
          ? tasksByColumn.taskOrderIds
          : tasksByColumn.map((x) => x._id),
      };
    }),
  };
};
