import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';

function Profile() {
  const fullName = "John Doe";
  
  const getAvatarText = (fullName) => {
    const names = fullName.split(" ");
    const firstLetter = names[0]?.charAt(0).toUpperCase();
    const lastLetter = names[names.length - 1]?.charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  };

  return (
    <div>
      {/* Avatar with initials */}
      <Avatar sx={{ bgcolor: red[700], width: 50, height: 50 }}>
        {getAvatarText(fullName)}
      </Avatar>
    </div>
  );
}

export default Profile;
