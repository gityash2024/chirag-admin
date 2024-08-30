import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import LocationOn from '@mui/icons-material/LocationOn';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AccessTime from '@mui/icons-material/AccessTime';
import avatarImage from '../../assets/runner-avatar.png';
import clock from '../../assets/clock.png';
import calendar from '../../assets/calendar-event.png';
import map from '../../assets/map-pin.png';
import Phone from '@mui/icons-material/Phone';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans' ;
  background-color: #FFFFFF;
`;

const PriceSummary = styled.p`
  font-weight: 500;
  margin-top: 10px;
`;

const RunnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const RunnerAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #4B465C;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RunnerName = styled.span`
  font-weight: 500;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
`;

const InputGroup = styled.div`
  flex: 1;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #4B465C;
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
`;

const InputField = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
  font-size: 14px;
  color: #4B465C;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #4B465C;
  margin-top: 20px;
`;

const SuccessBadge = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: rgba(40, 199, 111, 0.16); 
  color: #28C76F; 
  font-size: 12px;
  font-weight: 600;
`;

const SubmitButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
  font-weight: 600;
  font-size: 14px;
`;

const BookingHistoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const BookingCard = styled.div`
  border-radius: 8px;
 box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.06);
  border: 1px solid #E8E8E8;
  padding: 20px; /* Adjust padding as needed */
   display: flex;
  flex-direction: column;
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BookingId = styled.span`
  font-weight: 600;
`;
const ContactNumber = styled.span`
  font-size: 12px;
  color: #666;
`;
const BookingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  background-color: ${props => {
    switch (props.status) {
      case 'Confirmed': return '#C6EEFF';
      case 'Completed': return '#B1FF8C';
      case 'Closed': return '#DAB4FF';
      default: return '#E0E0E0';
    }
  }};
`;

const BookingDetails = styled.p`
  font-size: 14px;
  color: #121212;
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const AddressContainer = styled.div`
  margin-top: 20px;
`;

const AddressTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 15px;
`;

const AddressCard = styled.div`
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.06);
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

const AddressText = styled.p`
  font-size: 14px;
  color: #121212;
`;

const AddFarmer = ({ mode }) => {
  const { id } = useParams();

  const bookings = [
    { id: 'AB123456',cropName: 'Cotton',contactNumber: '1234567890', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet', date: '13 June, 2023', time: '02:00 PM - 04:00 PM', area: '21 Acres', price: '₹ 20,000', runner: 'Runner name' },
    { id: 'AB123457',cropName: 'Wheat',contactNumber: '1234567890', status: 'Completed', address: 'Lorem ipsum dolor sit amet', date: '14 June, 2023', time: '03:00 PM - 05:00 PM', area: '22 Acres', price: '₹ 22,000', runner: 'Runner name' },
    { id: 'AB123458',cropName: 'Rice',contactNumber: '1234567890', status: 'Closed', address: 'Lorem ipsum dolor sit amet', date: '15 June, 2023', time: '04:00 PM - 06:00 PM', area: '23 Acres', price: '₹ 24,000', runner: 'Runner name' },
    { id: 'AB123459',cropName: 'Maize',contactNumber: '1234567890', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet', date: '16 June, 2023', time: '05:00 PM - 07:00 PM', area: '24 Acres', price: '₹ 26,000', runner: 'Runner name' },
    { id: 'AB123460',cropName: 'Sugarcane',contactNumber: '1234567890', status: 'Completed', address: 'Lorem ipsum dolor sit amet', date: '17 June, 2023', time: '06:00 PM - 08:00 PM', area: '25 Acres', price: '₹ 28,000', runner: 'Runner name' },
    { id: 'AB123461',cropName: 'Jute',contactNumber: '1234567890', status: 'Closed', address: 'Lorem ipsum dolor sit amet', date: '18 June, 2023', time: '07:00 PM - 09:00 PM', area: '26 Acres', price: '₹ 30,000', runner: 'Runner name' },
  ];

  const addresses = [
    { id: 1, text: 'Lorem ipsum dolor sit amet, Lorem Ipsum sit Bengaluru, Karnataka, 560043, India. Phone number: 8434323495' },
    { id: 2, text: 'Lorem ipsum dolor sit amet, Lorem Ipsum sit Bengaluru, Karnataka, 560043, India. Phone number: 8434323495' },
  ];

  return (
    <Container>
      <Header>Farmer Management / {mode === 'edit' ? 'Edit' : mode === 'view' ? 'View' : 'Add'}</Header>
      <Form>
        <FormRow>
          <InputGroup>
            <InputLabel>Name</InputLabel>
            <InputField placeholder="Enter Name" disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            <InputLabel>Mobile Number</InputLabel>
            <InputField placeholder="Enter Mobile Number" disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            <InputLabel>Email ID</InputLabel>
            <InputField placeholder="Enter Email ID" disabled={mode === 'view'} />
          </InputGroup>
        </FormRow>
        <FormRow>
          <InputGroup>
            <InputLabel>State</InputLabel>
            <InputField placeholder="Enter State" disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            <InputLabel>City</InputLabel>
            <InputField placeholder="Enter City" disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            <InputLabel>Region</InputLabel>
            <InputField placeholder="Enter Region" disabled={mode === 'view'} />
          </InputGroup>
        </FormRow>
        <FormRow>
          <InputGroup>
            {mode === 'view' && (
              <>
                <InputLabel>Aadhar Authentication</InputLabel>
                <SuccessBadge>Successful</SuccessBadge>
              </>
            )}
          </InputGroup>
        </FormRow>
        {mode !== 'view' && <SubmitButton>{mode === 'edit' ? 'Save' : 'Add'}</SubmitButton>}
      </Form>

      {(mode === 'view' || mode === 'edit') && (
        <>
          <Header>
            <Title>Booking History</Title>
          </Header>
          <BookingHistoryContainer>
          {bookings.map(booking => (
  <BookingCard key={booking.id}>
    <BookingHeader>
      <BookingId>#{booking.id}</BookingId>
      <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
    </BookingHeader>
    <BookingDetails><img src={map} alt="Location" />{booking.address}</BookingDetails>
    <BookingDetails><img src={calendar} alt="Calendar" />{booking.date}</BookingDetails>
    <BookingDetails><img src={clock} alt="Clock" />{booking.time}</BookingDetails>
    <BookingRow>
      <BookingDetails>Farm Area: {booking.area}</BookingDetails>
      <BookingDetails>Crop: {booking.cropName}</BookingDetails>
    </BookingRow>
    <PriceSummary>Price Summary: {booking.price}</PriceSummary>
    <RunnerInfo>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <RunnerAvatar src={avatarImage} alt="Runner" />
        <RunnerName>{booking.runner}</RunnerName>
      </div>
    </RunnerInfo>
  </BookingCard>
))}
          </BookingHistoryContainer>

          <AddressContainer>
            <AddressTitle>Addresses</AddressTitle>
            {addresses.map(address => (
              <AddressCard key={address.id}>
                <AddressText>{address.text}</AddressText>
              </AddressCard>
            ))}
          </AddressContainer>
        </>
      )}
    </Container>
  );
};

export default AddFarmer;
