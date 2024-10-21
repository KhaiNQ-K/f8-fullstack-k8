import { useSortable } from '@dnd-kit/sortable';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card as MuiCard, CardContent, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { CSS } from '@dnd-kit/utilities';
function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card },
  });

  const dndKitCardStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined,
  };
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset',
      }}
      style={dndKitCardStyle}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': { p: 1.5 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography gutterBottom variant="body1" component="div">
          {card.content}
        </Typography>
        <IconButton size="small">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </MuiCard>
  );
}

Card.propTypes = {
  card: PropTypes.object,
};
export default Card;
