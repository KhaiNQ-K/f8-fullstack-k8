import { updateTaskAsync } from '@/app/slice/boardSlice';
import { getPayload } from '@/utils/get-payload';
import { groupTasksByColumn, mapOrder } from '@/utils/util';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListColumn from './component/ListColumn';
import Column from './component/Column';
import Card from './component/Card';
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_COLUMN',
  CARD: 'ACTIVE_CARD',
};
function BoardContent() {
  const dispatch = useDispatch();
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const sensors = useSensors(pointerSensor);
  const { tasks, columns } = useSelector((state) => state.board);

  const [board, setBoard] = useState({});
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [prevColumnDragging, setPrevColumnDragging] = useState(null);
  useEffect(() => {
    setBoard(groupTasksByColumn(columns, tasks));
  }, [tasks, columns]);
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
  }, [board]);
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((col) => col?.tasks?.map((task) => task._id)?.includes(cardId));
  };
  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.content ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(e?.active?.data?.current);
    if (e?.active?.data?.current?.content) {
      setPrevColumnDragging(findColumnByCardId(e?.active?.id));
    }
  };
  const handleDragOver = (e) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return;
    }
    const { active, over } = e;
    if (!active || !over) return;
    const {
      id: activeCardId,
      data: { current: activeCardData },
    } = active;
    const { id: overCardId } = over;
    // Find column by CardID
    const activeColumn = findColumnByCardId(activeCardId);
    const overColumn = findColumnByCardId(overCardId);
    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prevCols) => {
        const overCardIndex = overColumn?.tasks?.findIndex((task) => task._id === overCardId);
        let newCardIdx;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIdx = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.tasks?.length + 1;
        const newColumns = JSON.parse(JSON.stringify(prevCols));
        const newActiveColumn = newColumns.find((col) => col._id === activeColumn._id);
        const newOverColumn = newColumns.find((col) => col._id === overColumn._id);

        if (newActiveColumn) {
          newActiveColumn.tasks = newActiveColumn.tasks.filter((task) => task._id !== activeCardId);
          newActiveColumn.taskOrderIds = newActiveColumn.tasks.map((task) => task._id);
        }

        if (newOverColumn) {
          newOverColumn.tasks = newOverColumn.tasks.filter((task) => task._id !== activeCardId);

          newOverColumn.tasks = newOverColumn.tasks.toSpliced(newCardIdx, 0, activeCardData);
          newOverColumn.taskOrderIds = newOverColumn.tasks.map((task) => task._id);
        }

        return newColumns;
      });
    }
  };
  const handleDragEnd = async (e) => {
    const { active, over } = e;
    if (!over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeCardId,
        data: { current: activeCardData },
      } = active;
      const {
        id: overCardId,
        data: { current: overCardData },
      } = over;
      // Find column by CardID
      const activeColumn = findColumnByCardId(activeCardId);
      const overColumn = findColumnByCardId(overCardId);
      if (!activeColumn || !overColumn) return;
      console.log(overColumn._id);
      console.log(prevColumnDragging._id);
      if (prevColumnDragging._id !== overColumn._id) {
        console.log('over');
      } else {
        // Lấy vị trí cũ
        const oldCardIndex = prevColumnDragging?.tasks?.findIndex(
          (col) => col._id === activeDragItemId
        );
        // Lấy vị trí mới
        const newCardIndex = overColumn?.tasks.findIndex((col) => col._id === overCardId);
        const newOrderedCard = arrayMove(prevColumnDragging?.tasks, oldCardIndex, newCardIndex);
        // setOrderedColumns(newOrderedColumns);
        let payload;
        setOrderedColumns((prevColumns) => {
          const nextColumns = JSON.parse(JSON.stringify(prevColumns));
          const targetColumn = nextColumns.find((col) => col._id === overColumn._id);
          targetColumn.tasks = newOrderedCard;
          targetColumn.taskOrderIds = newOrderedCard.map((task) => task._id);
          payload = nextColumns;
          return nextColumns;
        });
        // await dispatch(updateTaskAsync(payload));
      }
    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
      // Lấy vị trí cũ
      const oldIndex = orderedColumns.findIndex((col) => col._id === active.id);
      // Lấy vị trí mới
      const newIndex = orderedColumns.findIndex((col) => col._id === over.id);
      const newOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      setOrderedColumns(newOrderedColumns);
      const payload = getPayload(newOrderedColumns);
      await dispatch(updateTaskAsync(payload));
    }

    // if (active.id !== over.id) {
    //   // Lấy vị trí cũ
    //   const oldIndex = orderedColumns.findIndex((col) => col._id === active.id);
    //   // Lấy vị trí mới
    //   const newIndex = orderedColumns.findIndex((col) => col._id === over.id);
    //   const newOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
    //   setOrderedColumns(newOrderedColumns);
    //   const payload = getPayload(newOrderedColumns);
    //   await dispatch(updateTaskAsync(payload));
    // }
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setPrevColumnDragging(null);
  };
  const dropAnimation = {
    sideEffect: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          width: '100%',
          height: ({ trello }) => trello.boardContentHeight,
          display: 'flex',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          p: 2,
        }}
      >
        {/* List Column */}
        <ListColumn columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
