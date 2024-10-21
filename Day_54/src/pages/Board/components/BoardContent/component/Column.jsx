import PropTypes from 'prop-types';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import ListCard from './ListCard';
import { mapOrder } from '@/utils/util';
function Column({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column },
  });

  const dndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined,
  };
  const orderedCard = mapOrder(column?.tasks, column.taskOrderIds, '_id');
  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        sx={{
          maxWidth: '300px',
          minWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}
        {...listeners}
      >
        {/* Header */}
        <Box
          sx={{
            height: ({ trello }) => trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {column.columnName}
          </Typography>
        </Box>
        {/* ListCard */}
        <ListCard cards={orderedCard} />
        {/* Footer */}
        <Box
          sx={{
            height: ({ trello }) => trello.columnFooterHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button startIcon={<AddCardIcon />}>Add new card</Button>

          <Tooltip title="Drag to move">
            <DragHandleIcon sx={{ cursor: 'pointer' }} />
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
}

Column.propTypes = {
  column: PropTypes.object,
};

export default Column;
