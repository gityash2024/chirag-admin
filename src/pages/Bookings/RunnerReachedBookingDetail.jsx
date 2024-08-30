import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpacityIcon from '@mui/icons-material/Opacity';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
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
  color: #000000;
  background-color: #FDF0CC;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const BookingDetailsContainer = styled.div`
  flex: 7;
`;

const BookingDetailsCard = styled.div`
  background: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const PaymentSummary = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  height:220px;
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
  border-top: 1px dotted #E0E0E0;
  margin: 15px 0;
`;



const RunnerCard = styled.div`
  background: white;
  
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  padding: 20px;
  margin-bottom: 20px;
  width: 45%;
`;


const RunnerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
`;
const RunnerInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ViewRunnerButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
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

const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const RunnerReachedBookingDetail = () => {
  const navigate = useNavigate();
  const booking = {
    id: 'AB123456',
    status: 'Runner reached the field',
    address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066',
    name: 'Sachin Doe',
    date: '13 June, 2023',
    time: '09:00AM',
    contactNumber: '0987654321',
    farmArea: '21 Acres',
    crop: 'Crop name',
    temperature: '24° Pratapgarh, uttrakhand',
    humidity: '2% Mostyly sunny',
    runner: {
      name: 'Runner name',
      contact: '0987654321'
    }
  };

  return (
    <Container>
      <Header>
        <TitleContainer>
        <BackButton onClick={() => navigate(-1)}>
  <ArrowBackIcon />
</BackButton>

          <Title>Bookings</Title>
        </TitleContainer>
        <StatusBadge>{booking.status}</StatusBadge>
      </Header>
      <BookingId>#{booking.id}</BookingId>
      <FlexContainer>
        <BookingDetailsContainer>
          <BookingDetailsCard>
            <DetailRow>
              <DetailLabel><LocationOnIcon /></DetailLabel>
              <DetailValue>{booking.address}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><CalendarTodayIcon /></DetailLabel>
              <DetailValue>{booking.date}</DetailValue>
              <DetailLabel style={{ marginLeft: '20px' }}><AccessTimeIcon /></DetailLabel>
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
            <HorizontalLine />
            <DetailRow>
              <DetailLabel>{booking.temperature}</DetailLabel>
            </DetailRow>
            <DetailRow>
              <DetailLabel><OpacityIcon /> {booking.humidity}</DetailLabel>
            </DetailRow>
          </BookingDetailsCard>
          <RunnerCard>
        <h3>Runner Assigned</h3>
        <RunnerInfo>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <RunnerAvatar />
    <div>
      <div>{booking.runner.name}</div>
      <div>Contact number: {booking.runner.contact}</div>
    </div>
  </div>
  <div style={{ display: 'flex' }}>
    
    <CallButton><PhoneIcon /> Call Now</CallButton>

  </div>
</RunnerInfo>
<ViewRunnerButton>
      View runner details
    </ViewRunnerButton>
      </RunnerCard>
        </BookingDetailsContainer>
        <PaymentSummary>
          <h3>Payment Summary</h3>
          <DetailRow>
            <DetailLabel>Estimated Total:</DetailLabel>
            <DetailValue>₹2589</DetailValue>
          </DetailRow>
          <HorizontalLine />
          <PaymentRow>
            <DetailLabel>Estimated Total</DetailLabel>
            <DetailValue>₹1999</DetailValue>
          </PaymentRow>
          <PaymentRow>
            <DetailLabel>Taxes and fee</DetailLabel>
            <DetailValue>₹199</DetailValue>
          </PaymentRow>
          <HorizontalLine />
          <PaymentRow>
            <DetailLabel>Total</DetailLabel>
            <DetailValue>₹2198</DetailValue>
          </PaymentRow>
        </PaymentSummary>
      </FlexContainer>
    </Container>
  );
};

export default RunnerReachedBookingDetail;