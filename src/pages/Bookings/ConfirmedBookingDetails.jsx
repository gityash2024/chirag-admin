import React from 'react';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpacityIcon from '@mui/icons-material/Opacity';
import PhoneIcon from '@mui/icons-material/Phone';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import fieldImage from '../../assets/field-image.png';
const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 10px;
`;

const BookingId = styled.h3`
  font-size: 18px;
  color: #121212;
  margin-bottom: 10px;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #000;
  background-color: #BEF991;
  margin-bottom: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const BookingDetails = styled.div`
  background: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);

  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  flex: 7;
`;

const PaymentSummary = styled.div`
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);

  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  flex: 3;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: #666;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const DetailValue = styled.span`
  color: #121212;
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #E0E0E0;
  margin: 15px 0;
`;

const RunnerCard = styled.div`
  background: white;
  
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  padding: 20px;
  margin-bottom: 20px;
  width: 30%;
`;

const RunnerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RunnerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
`;

const CallButton = styled.button`
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ServiceCard = styled.div`
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);

  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  width: 31%;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const FieldImage = styled.img`
  width: 100px;
  height: 100px;
  object75-fit: cover;
  border-radius: 8px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseServiceButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 70%;
  display: block;
//   margin: 0 auto;
`;

const ConfirmedBookingDetails = () => {
  const booking = {
    id: 'AB123456',
    status: 'Service completed',
    address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066',
    name: 'Sachin Doe',
    date: '13 June, 2023',
    time: '09:00AM',
    contactNumber: '0987654321',
    farmArea: '21 Acres',
    crop: 'Crop name',
    temperature: '24°',
    humidity: '2%',
    runner: {
      name: 'Runner name',
      contact: '0987654321'
    }
  };

  return (
    <Container>
      <Title>Bookings</Title>
      <BookingId>#{booking.id}</BookingId>
      <StatusBadge>{booking.status}</StatusBadge>
      <FlexContainer>
        <BookingDetails>
          <DetailRow>
            <DetailLabel><LocationOnIcon /> </DetailLabel>
            <DetailValue>{booking.address}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><CalendarTodayIcon /> </DetailLabel>
            <DetailValue>{booking.date}</DetailValue>
            <DetailLabel><AccessTimeIcon /> </DetailLabel>
            <DetailValue>{booking.time}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Booking Name:</DetailLabel>
            <DetailValue>{booking.name}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Contact number:</DetailLabel>
            <DetailValue>{booking.contactNumber}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Farm Area:</DetailLabel>
            <DetailValue>{booking.farmArea}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Crop:</DetailLabel>
            <DetailValue>{booking.crop}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>{booking.temperature}</DetailLabel>
            <DetailLabel><OpacityIcon /> {booking.humidity}</DetailLabel>
          </DetailRow>
        </BookingDetails>
        <PaymentSummary>
          <h3>Payment Summary</h3>
          <DetailRow>
            <DetailLabel>Estimated Total:</DetailLabel>
            <DetailValue>₹2589</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Estimated Total</DetailLabel>
            <DetailValue>₹1999</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Taxes and fee</DetailLabel>
            <DetailValue>₹199</DetailValue>
          </DetailRow>
          <HorizontalLine />
          <DetailRow>
            <DetailLabel>Total</DetailLabel>
            <DetailValue>₹2198</DetailValue>
          </DetailRow>
        </PaymentSummary>
      </FlexContainer>
      <RunnerCard>
        <h3>Runner Assigned</h3>
        <RunnerInfo>
          <RunnerAvatar />
          <div>
            <div>{booking.runner.name}</div>
            <div>Contact number: {booking.runner.contact}</div>
          </div>
        </RunnerInfo>
        <CallButton><PhoneIcon /> Call Now</CallButton>
      </RunnerCard>
      <FlexContainer>
        <ServiceCard>
          <h3>Service started</h3>
          <DetailRow>
            <DetailLabel>Set of battery available:</DetailLabel>
            <DetailValue>3</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Current Image of the field:</DetailLabel>
          </DetailRow>
          <ImageContainer>
            <FieldImage src={fieldImage} alt="Field" />
            <FieldImage src={fieldImage} alt="Field" />
          </ImageContainer>
        </ServiceCard>
        <ServiceCard>
          <h3>Service started</h3>
          <DetailRow>
            <DetailLabel>Image of the field after the service completed:</DetailLabel>
          </DetailRow>
          <ImageContainer>
            <FieldImage src={fieldImage} alt="Field" />
            <FieldImage src={fieldImage} alt="Field" />
          </ImageContainer>
        </ServiceCard>
      </FlexContainer>
      <h3>Please Rate the Runner</h3>
      <RatingContainer>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarBorderIcon key={star} />
        ))}
      </RatingContainer>
      <CloseServiceButton>Mark service closed</CloseServiceButton>
    </Container>
  );
};

export default ConfirmedBookingDetails;