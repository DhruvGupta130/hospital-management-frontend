import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="welcome">Welcome, Dr. John Doe</div>
      <div className="icons">
        <NotificationsIcon />
        <AccountCircleIcon />
      </div>
    </div>
  );
};

export default Topbar;
