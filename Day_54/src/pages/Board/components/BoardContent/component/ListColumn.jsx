import { Box, Button } from '@mui/material';
import Column from './Column';
import AddIcon from '@mui/icons-material/Add';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import PropTypes from 'prop-types';
function ListColumn({ columns }) {
  return (
    <SortableContext
      items={columns?.map((col) => col._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {columns.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        {/* Box 1 */}
        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
          }}
        >
          <Button
            startIcon={<AddIcon />}
            sx={{
              color: '#fff',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1.5,
            }}
          >
            Add new Column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  );
}
ListColumn.propTypes = {
  columns: PropTypes.array,
};
export default ListColumn;
