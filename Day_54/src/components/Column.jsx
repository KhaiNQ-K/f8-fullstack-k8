import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography } from '@mui/material';
const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTERR_HEIGHT = '56px';
const COLUMN_BORDER = '3px';
function Column() {
  return (
    <Box
      sx={{
        minWidth: '350px',
        maxWidth: '350px',
        bgcolor: '#ebecf0',
        ml: 8,
        borderRadius: '6px',
        maxHeight: '600px',
      }}
    >
      <Box
        sx={{
          height: COLUMN_HEADER_HEIGHT,
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: (theme) => theme.trello.bgColumn,
        }}
      >
        <Typography>Header</Typography>
        <Box>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          height: `calc(100% - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTERR_HEIGHT})`,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          m: 1,
        }}
      >
        <Box
          sx={{
            width: '100%',
            borderRadius: '4px',
            bgcolor: (theme) => theme.trello.bgColumn,
            boxSizing: 'border-box',
            border: `3px solid transparent`,
            py: 3,
            px: 2,
            '&:hover': {
              borderColor: (theme) => `${theme.trello.bgColor}`,
            },
          }}
        >
          Test
        </Box>
      </Box>
      <Box
        sx={{
          height: COLUMN_FOOTERR_HEIGHT,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Footer
      </Box>
    </Box>
  );
}

export default Column;
