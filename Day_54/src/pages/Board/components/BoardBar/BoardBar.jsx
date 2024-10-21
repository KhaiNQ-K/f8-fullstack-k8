import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import FilterIcon from '@mui/icons-material/Filter';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  px: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: '#fff',
  },
  '&:hover': {
    bgcolor: 'primary.50',
  },
};

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => `${theme.trello.boardBarHeight}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: 2,
        overflowX: 'auto',
        borderBottom: '1px solid white',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Chip sx={MENU_STYLE} icon={<DashboardIcon />} label="Trello" clickable />
        <Chip sx={MENU_STYLE} icon={<VpnLockIcon />} label="Public/Private Workspace" clickable />
        <Chip sx={MENU_STYLE} icon={<AddToDriveIcon />} label="Add To Google Dỉve" clickable />
        <Chip sx={MENU_STYLE} icon={<FilterIcon />} label="Filters" clickable />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: '#fff',
            border: 'none',
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: '32px',
              height: '32px',
            },
          }}
        >
          <Tooltip title="F8">
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsNWPhXbh68-pBV7iNSR76TAgOVQRSqkuogA&s"
            />
          </Tooltip>
          <Tooltip title="F8">
            <Avatar alt="Heq Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="F8">
            <Avatar
              alt="Mas Sharp"
              src="https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=JSBpwVFm8vz23PZ44Rjn728NwmMtBa_DYL7qxrEWr38="
            />
          </Tooltip>
          <Tooltip title="F8">
            <Avatar alt="Rose Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="F8">
            <Avatar alt="Lisa Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
