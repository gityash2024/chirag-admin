import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFarmerBookings,updateFarmer } from '../../services/commonService';
import avatarImage from '../../assets/runner-avatar.png';
import clock from '../../assets/clock.png';
import calendar from '../../assets/calendar-event.png';
import map from '../../assets/map-pin.png';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import noBookingsImage from "../../assets/no-booking.png";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

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

// Update the InputField component to show required indicator
const InputField = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
  font-size: 14px;
  color: #121212;
  &::after {
    content: '*';
    color: red;
    margin-left: 4px;
  }
`;

// Update InputLabel to show required indicator
const InputLabel = styled.label`
  font-size: 14px;
  color: #121212;
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
  &::after {
    content: ' *';
    color: red;
  }
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


const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px; // Set a fixed minimum height
  width: 100%;
  grid-column: 1 / -1;
  margin: 20px 0; // Add margin top and bottom
  position: relative; // Changed from absolute
`;

const EmptyStateImage = styled.img`
  width: 200px;
  height: 200px; // Reduced height to make it more compact
  object-fit: contain;
  margin-bottom: 20px;
`;

const EmptyStateText = styled.p`
 color: #666;
  font-size: 16px;
  margin-top: 16px;
`;

const AddressText = styled.p`
  font-size: 14px;
  color: #121212;
`;
const BackButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
  cursor: pointer;
  color: #121212;
  font-size: 16px;
  float: right;
`;

const BackIcon = styled(FiArrowLeft)`
  margin-right: 8px;
`;

const NoAddressContainer = styled(EmptyStateContainer)`
  min-height: 300px; // Slightly smaller than the booking empty state
  background-color: #FFFFFF;
  margin: 10px 0;
`;

const NoAddressImage = styled(EmptyStateImage)`
  width: 150px;
  height: 150px;
`;

const NoAddressText = styled(EmptyStateText)`
  color: #666;
  font-size: 16px;
  margin-top: 16px;
`;
const AddFarmer = () => {
  const [errors, setErrors] = useState({});

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    // Update errors as the user types
    const newErrors = { ...errors };
  
    if (!value.trim()) {
      newErrors[name] = `${name} is required`;
    } else {
      delete newErrors[name];
      if (name === 'email' && !validateEmail(value)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (name === 'mobileNumber' && !validatePhone(value)) {
        newErrors.mobileNumber = 'Please enter a valid 10-digit phone number';
      }
    }
  
    setErrors(newErrors);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
  
    // Check for required fields
    const requiredFields = ['name', 'mobileNumber', 'email', 'state', 'village', 'region'];
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${field} is required`;
      }
    });
  
    // Validate email and phone
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
  
    if (formData.mobileNumber && !validatePhone(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit phone number';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }
  
    try {
      if (mode === 'edit') {
        const response = await updateFarmer(farmer._id, {
          name: formData.name,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          state: formData.state,
          village: formData.village,
          region: formData.region
        });
  
        if (response.data) {
          toast.success('Farmer updated successfully');
          navigate('/manage-farmer');
        }
      }
    } catch (error) {
      setErrors({});
      toast.error(error.response?.data?.message || 'Error updating farmer');
    }
  };
  
  const handleBookingClick = (booking) => {
    // if (booking.status === 'completed') {
    //   navigate(`/completed-booking/${booking._id}`);
    // } else if (booking.status === 'confirmed') {
    //   navigate(`/confirm-booking-details/${booking._id}`);
    // } else {
    //   navigate(`/cancelled-booking-details/${booking._id}`);
    // }
      navigate(`/booking-details/${booking._id}`);

  };

  return (
    <Container>
      <Header>Farmer Management / {mode === 'edit' ? 'Edit' : mode === 'view' ? 'View' : 'Add'}
      <BackButton onClick={() => navigate('/manage-farmer')}>
          <BackIcon />
          Back
        </BackButton>
      </Header>
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
              style={{ borderColor: errors.name ? 'red' : '#F1F1F1' }}
            />
            {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name?.toUpperCase()}</span>}

          </InputGroup>
          <InputGroup>
            <InputLabel>Mobile Number</InputLabel>
            <InputField
              type="number"
              name="mobileNumber"
              value={formData.mobileNumber || ''}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
              disabled={mode === 'view'}
              style={{ borderColor: errors.mobileNumber ? 'red' : '#F1F1F1' }}
            />
            {errors.mobileNumber && <span style={{ color: 'red', fontSize: '12px' }}>{errors.mobileNumber?.toUpperCase()}</span>}
          </InputGroup>
          <InputGroup>
            <InputLabel>Email ID</InputLabel>
            <InputField
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              placeholder="Enter Email ID"
              disabled={mode === 'view'}
              style={{ borderColor: errors.email ? 'red' : '#F1F1F1' }}
            />
            {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email?.toUpperCase()}</span>}
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
              style={{ borderColor: errors.state ? 'red' : '#F1F1F1' }}
            />
            {errors.state && <span style={{ color: 'red', fontSize: '12px' }}>{errors.state?.toUpperCase()}</span>}
          </InputGroup>
          <InputGroup>
            <InputLabel>Village</InputLabel>
            <InputField
              name="village"
              value={formData.village || ''}
              onChange={handleInputChange}
              placeholder="Enter Village"
              disabled={mode === 'view'}
              style={{ borderColor: errors.village ? 'red' : '#F1F1F1' }}
            />
            {errors.village && <span style={{ color: 'red', fontSize: '12px' }}>{errors.village?.toUpperCase()}</span>}
          </InputGroup>
          <InputGroup>
            <InputLabel>Region</InputLabel>
            <InputField
              name="region"
              value={formData.region || ''}
              onChange={handleInputChange}
              placeholder="Enter Region"
              disabled={mode === 'view'}
              style={{ borderColor: errors.region ? 'red' : '#F1F1F1' }}
            />
            {errors.region && <span style={{ color: 'red', fontSize: '12px' }}>{errors.region?.toUpperCase()}</span>}
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
        {mode !== 'view' && <SubmitButton type="submit">{mode === 'edit' ? 'Update Farmer' : 'Add Farmer'}</SubmitButton>}
      </Form>

      {(mode === 'view') && (
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
            {/* {!bookings.length && <AddressText style={{ textAlign: 'center' }}>No bookings found</AddressText>} */}
      { !bookings.length ?   
        <EmptyStateContainer>
          <EmptyStateImage src={noBookingsImage} alt="No bookings" />
          <EmptyStateText>No bookings found for this farmer.</EmptyStateText>
        </EmptyStateContainer>:null}
      
  
            <Header>Addresses</Header>
         {formData.addresses?.length ? <AddressContainer>
            {formData.addresses && formData.addresses.map((address, index) => (
              <AddressCard key={index}>
                <AddressText>{`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}</AddressText>
              </AddressCard>
            ))}
            {!formData.addresses?.length && <AddressText style={{ textAlign: 'center' }}>No addresses found for this farmer.</AddressText>}
          </AddressContainer>:
           <NoAddressContainer>
           <NoAddressImage as="svg" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
             {/* Copy the SVG content from above here */}
             <circle cx="120" cy="120" r="100" fill="#F5F5F5"/>
             <path d="M80 140h80v50H80z" fill="#E0E0E0"/>
             <path d="M70 140L120 90l50 50H70z" fill="#BDBDBD"/>
             <path d="M110 160h20v30h-20z" fill="#9E9E9E"/>
             <rect x="90" y="155" width="15" height="15" fill="#9E9E9E"/>
             <rect x="135" y="155" width="15" height="15" fill="#9E9E9E"/>
             <circle cx="120" cy="120" r="8" fill="#FF5252" opacity="0.8"/>
             <path d="M120 90c-16.6 0-30 13.4-30 30 0 20 30 50 30 50s30-30 30-50c0-16.6-13.4-30-30-30zm0 40c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" fill="#FF5252"/>
             <line x1="60" y1="60" x2="180" y2="180" stroke="#FF5252" stroke-width="4" stroke-linecap="round"/>
           </NoAddressImage>
           <NoAddressText>No addresses found for this farmer.</NoAddressText>
         </NoAddressContainer>}
        </>
      )}
    </Container>
  );
};

export default AddFarmer;