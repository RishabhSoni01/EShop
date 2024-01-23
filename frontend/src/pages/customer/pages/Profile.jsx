import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Paper, Typography, Avatar, Container, Button } from '@mui/material';
import ShippingPage from '../components/ShippingPage';

// ... (previous imports)

// ... (previous imports)
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isHovered, setHovered] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const handleHover = () => {
    setHovered(!isHovered);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleRemove = () => {
    // Add logic to remove the uploaded photo
    // For example: dispatch(removeProfilePhoto(currentUser.id));
  };

  const handleFileChange = (event) => {
    // Add logic to handle file upload
    // For example: dispatch(uploadProfilePhoto(currentUser.id, event.target.files[0]));
  };

  return (
    <React.Fragment>
      <ProfileContainer>
        <ProfileHeader
          elevation={3}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          isHovered={isHovered}
        >
          <ProfileAvatar>
            {isEditing ? (
              <>
                <EditIconWrapper>
                  <EditIcon fontSize="small" onClick={handleEdit} />
                </EditIconWrapper>
                <input
                  type="file"
                  id="upload-photo"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <label htmlFor="upload-photo">
                  <ProfileImage
                    src={currentUser?.profilePhoto || 'default-profile.jpg'}
                    alt="Profile"
                  />
                </label>
              </>
            ) : (
              <>
                <ProfileImage
                  src={currentUser?.profilePhoto || 'default-profile.jpg'}
                  alt="Profile"
                />
              </>
            )}
          </ProfileAvatar>
          <ProfileDetails>
            <ProfileName variant="h4">{currentUser ? currentUser.name : ''}</ProfileName>
            <ProfileText>
              <span>Email:</span> {currentUser ? currentUser.email : ''}
            </ProfileText>
            <ProfileText>
              <span>Role:</span> {currentUser ? currentUser.role : ''}
            </ProfileText>
          </ProfileDetails>
        </ProfileHeader>
      </ProfileContainer>
      <ContainerWrapper>
          <StyledContainer component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <ShippingPage profile="Profile" />
          </StyledContainer>    
      </ContainerWrapper>
    </React.Fragment>
  );
};

// ... (remaining styled components)

// ... (remaining styled components)


export default Profile;



const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  border: 2px solid #0066cc;
  border-radius: 15px;
  background-color: #f0f8ff; /* Light Sky Blue */
`;

const ProfileHeader = styled(Paper)`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: ${({ isHovered }) => (isHovered ? 'rgba(240, 240, 240, 0.8)' : '#f0f0f0')};
  backdrop-filter: ${({ isHovered }) => (isHovered ? 'blur(10px)' : 'none')};
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
    
  margin-top: 20px;

`;

const ProfileAvatar = styled.div`
  position: relative;
  margin-right: 20px;
`;

const ProfileImage = styled(Avatar)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #fff; /* White border around the avatar */
`;

const UploadButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #4caf50; /* Green */
  color: #fff;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #45a049; /* Darker green on hover */
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled(Typography)`
  margin-bottom: 10px;
  font-size: 1.5em;
  color: #333; /* Dark Gray */
`;

const ProfileText = styled(Typography)`
  margin-bottom: 5px;
  font-size: 1em;
  color: #555; /* Medium Gray */

  span {
    display: inline-block;
    width: 53px; /* Set a fixed width for the labels */
    color: #007bff; /* Royal Blue */
    font-weight: bold;
  }
`;

const ContainerWrapper = styled.div`
  margin-top: 20px;
  align-items: baseline;
  background-color: #f0f8ff; /* Light Sky Blue */
`;

const StyledContainer = styled(Container)`
  padding: 20px;
  background-color: #ffffff; /* White */
  align-items: baseline;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  overflow: hidden;

  & > div {
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      
      & > span {
        display: inline-block;
        width: 50px; /* Set a fixed width for the labels */
        color: #555; /* Medium Gray */
        font-weight: bold;
      }
    }
  }
`;
const EditIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const RemoveIconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;