import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
  background-color: #FFFFFF;
  height: 100%;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #4B465C;
  margin-bottom: 20px;
`;

const ProfileSection = styled.div`
  background-color: #F9FAFC;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #E3E6E8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const ProfilePicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #E3E6E8;
  margin-bottom: 15px;
`;

const UploadButton = styled.button`
  padding: 8px 16px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333333;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #4B465C;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  color: #4B465C;
  background-color: #FFFFFF;
  transition: border-color 0.3s;

  &:focus {
    border-color: #000000;
    outline: none;
  }
`;

const SaveButton = styled.button`
  padding: 12px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  align-self: flex-end;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333333;
  }
`;

const Profile = () => {
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/100'); // Placeholder image

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container>
      <Header>Admin Profile</Header>
      <ProfileSection>
        {/* Profile Picture Section */}
        <ProfileHeader>
          <ProfilePicWrapper>
            <ProfilePic src={profilePic} alt="Profile" />
            <UploadButton>
              <label htmlFor="profile-pic-upload" style={{ cursor: 'pointer' }}>
                Upload New Picture
              </label>
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleProfilePicChange}
              />
            </UploadButton>
          </ProfilePicWrapper>
        </ProfileHeader>

        {/* Profile Information Section */}
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" placeholder="Enter your name" />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" placeholder="Enter your email" />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input type="text" placeholder="Enter your phone number" />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input type="password" placeholder="Enter new password" />
            </FormGroup>
          </FormRow>
          <SaveButton type="submit">Save Changes</SaveButton>
        </Form>
      </ProfileSection>
    </Container>
  );
};

export default Profile;
