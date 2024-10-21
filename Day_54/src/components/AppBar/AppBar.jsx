import { ReactComponent as TrelloIcon } from '@/assets/trello.svg';
import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import { Badge, Box, Button, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { useState } from 'react';
import ToggleColorMode from '../ToggleColorMode';
import Profiles from './Menus/Profiles';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Workspace from './Menus/Workspace';
function AppBar() {
  const [search, setSearch] = useState('');
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => `${theme.trello.headerHeight}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <AppsIcon sx={{ color: '#fff' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: '#fff' }} />
          <Typography
            variant="span"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            Trello
          </Typography>
        </Box>
        <Workspace />
        <Recent />
        <Starred />
        <Templates />
        <Button
          variant="outlined"
          sx={{
            color: '#fff',
            border: 'none',
            '&:hover': {
              border: 'none',
            },
          }}
          startIcon={<LibraryAddIcon />}
        >
          Create
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <TextField
          id="outlined-search"
          label="Search..."
          size="small"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            '& label': {
              color: '#fff',
            },
            '& input': {
              color: '#fff',
            },
            '& label.Mui-focused': {
              color: '#fff',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#fff',
              },
              '&:hover fieldset': {
                borderColor: '#fff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff',
              },
            },
            minWidth: '120px',
            maxWidth: '170px',
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSearch('')}
                />
              ),
            },
          }}
        />
        <ToggleColorMode />
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer', color: '#fff' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer', color: '#fff' }}>
            <HelpOutlineIcon />
          </Badge>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  );
}

export default AppBar;
