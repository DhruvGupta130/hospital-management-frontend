import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import "../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          position: 'fixed', // Keeps the sidebar fixed
          height: '100vh', // Full height of the viewport
          zIndex: 1,
          alignItems: 'center' // Keeps it below the navbar
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Appointments" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Medical History" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Prescriptions" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Feedback" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
