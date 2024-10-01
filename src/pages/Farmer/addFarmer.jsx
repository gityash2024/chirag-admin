import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFarmerBookings } from '../../services/commonService';
import avatarImage from '../../assets/runner-avatar.png';
import clock from '../../assets/clock.png';
import calendar from '../../assets/calendar-event.png';
import map from '../../assets/map-pin.png';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans';
  background-color: #FFFFFF;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  color: #121212;
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
  color: #121212;
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
const ErrorBadge = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: rgba(255, 0, 0, 0.16);
  color: #FF0000;
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
  cursor: pointer;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.06);
  border: 1px solid #E8E8E8;
  padding: 20px;
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

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  background-color: ${props => {
    switch (props.status) {
      case 'requested': return '#FFF3CD';
      case 'quote_received': return '#CCE5FF';
      case 'confirmed': return '#D1ECF1';
      case 'completed': return '#D4EDDA';
      case 'closed': return '#F8D7DA';
      default: return '#E0E0E0';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'requested': return '#856404';
      case 'quote_received': return '#004085';
      case 'confirmed': return '#0C5460';
      case 'completed': return '#155724';
      case 'closed': return '#721C24';
      default: return '#333333';
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

const RunnerName = styled.span`
  font-weight: 500;
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

const AddFarmer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { farmer, mode } = location.state || {};
  const [formData, setFormData] = useState(farmer || {});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      fetchFarmerBookings();
    }
  }, [mode, farmer?._id]);

  const fetchFarmerBookings = async () => {
    let dts={
      farmerId:farmer._id
    }
    try {
      const response = await getFarmerBookings(dts);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching farmer bookings:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically call an API to save the farmer data
      console.log('Saving farmer data:', formData);
      navigate('/manage-farmer');
    } catch (error) {
      console.error('Error saving farmer data:', error);
    }
  };

  const handleBookingClick = (booking) => {
    if (booking.status === 'completed') {
      navigate(`/completed-booking/${booking._id}`);
    } else if (booking.status === 'confirmed') {
      navigate(`/confirm-booking-details/${booking._id}`);
    } else {
      navigate(`/cancelled-booking-details/${booking._id}`);
    }
  };

  return (
    <Container>
      <Header>Farmer Management / {mode === 'edit' ? 'Edit' : mode === 'view' ? 'View' : 'Add'}</Header>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <InputGroup>
            <InputLabel>Name</InputLabel>
            <InputField
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              placeholder="Enter Name"
              disabled={mode === 'view'}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Mobile Number</InputLabel>
            <InputField
              name="mobileNumber"
              value={formData.mobileNumber || ''}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
              disabled={mode === 'view'}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Email ID</InputLabel>
            <InputField
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              placeholder="Enter Email ID"
              disabled={mode === 'view'}
            />
          </InputGroup>
        </FormRow>
        <FormRow>
          <InputGroup>
            <InputLabel>State</InputLabel>
            <InputField
              name="state"
              value={formData.state || ''}
              onChange={handleInputChange}
              placeholder="Enter State"
              disabled={mode === 'view'}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Village</InputLabel>
            <InputField
              name="village"
              value={formData.village || ''}
              onChange={handleInputChange}
              placeholder="Enter Village"
              disabled={mode === 'view'}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Region</InputLabel>
            <InputField
              name="region"
              value={formData.region || ''}
              onChange={handleInputChange}
              placeholder="Enter Region"
              disabled={mode === 'view'}
            />
          </InputGroup>
        </FormRow>
        <FormRow>
          <InputGroup>
            {mode === 'view' && (
              <>
                <InputLabel>Aadhar Authentication</InputLabel>
               {formData?.aadhaarVerified? <SuccessBadge>Authenticated</SuccessBadge>:
                <ErrorBadge>Un-Authenticated</ErrorBadge>}
              </>
            )}
          </InputGroup>
        </FormRow>
        {mode !== 'view' && <SubmitButton type="submit">{mode === 'edit' ? 'Save' : 'Add'}</SubmitButton>}
      </Form>

      {(mode === 'view' || mode === 'edit') && (
        <>
          <Header>
            <Header>Booking History</Header>
          </Header>
          <BookingHistoryContainer>
            {bookings.map(booking => (
              <BookingCard key={booking._id} onClick={() => handleBookingClick(booking)}>
                <BookingHeader>
                  <BookingId>#{booking._id}</BookingId>
                  <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
                </BookingHeader>
                <BookingDetails><img src={map} alt="Location" />{booking.farmLocation}</BookingDetails>
                <BookingDetails><img src={calendar} alt="Calendar" />{new Date(booking.date).toLocaleDateString()}</BookingDetails>
                <BookingDetails><img src={clock} alt="Clock" />{booking.time}</BookingDetails>
                <BookingDetails>Farm Area: {booking.farmArea} acres</BookingDetails>
                <BookingDetails>Crop: {booking.cropName}</BookingDetails>
                <PriceSummary>Weather: {booking.weather}</PriceSummary>
                <RunnerInfo>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <RunnerAvatar src={avatarImage} alt="Runner" />
                    <RunnerName>{booking.farmerName}</RunnerName>
                  </div>
                </RunnerInfo>
              </BookingCard>
            ))}
          </BookingHistoryContainer>
            {!bookings.length && <AddressText style={{ textAlign: 'center' }}>No bookings found</AddressText>}

          <AddressContainer>
            <Header>Addresses</Header>
            {formData.addresses && formData.addresses.map((address, index) => (
              <AddressCard key={index}>
                <AddressText>{`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}</AddressText>
              </AddressCard>
            ))}
            {!formData.addresses?.length && <AddressText style={{ textAlign: 'center' }}>No addresses found</AddressText>}
          </AddressContainer>
        </>
      )}
    </Container>
  );
};

export default AddFarmer;