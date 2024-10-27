import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpacityIcon from '@mui/icons-material/Opacity';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import { getAllBookingsList } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';
import { FiArrowLeft } from 'react-icons/fi';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const BookingId = styled.h3`
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
  font-family: 'Public Sans';
  line-height: 37.6px;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #000;
  background-color: ${props => {
    switch(props.status) {
      case 'requested': return '#FDF0CC';
      case 'quote_received': return '#CDCCFD';
      case 'confirmed': return '#E8FFF3';
      case 'completed': return '#B1FF8C';
      case 'closed': return '#E0E0E0';
      case 'cancelled': return '#FFF0F1';
      default: return '#E0E0E0';
    }
  }};
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
  color: #333;
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
  object-fit: cover;
  border-radius: 8px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
const ConfirmBookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const response = await getAllBookingsList();
      const foundBooking = response.data.find(b => b._id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      } else {
        toast.error('Booking not found');
      }
    } catch (error) {
      toast.error('Failed to fetch booking details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!booking) {
    return <p>Booking not found</p>;
  }

  const averageRating = (booking.farmerRating && booking.vendorRating) 
    ? ((booking.farmerRating + booking.vendorRating) / 2).toFixed(1) 
    : null;

  return (
    <Container>
      <Title>Bookings</Title>
      <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
          Back
        </BackButton>
      <BookingId>#{booking._id}</BookingId>
      <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
      <FlexContainer>
        <BookingDetails>
          <DetailRow>
            <DetailLabel><LocationOnIcon /> </DetailLabel>
            <DetailValue>{booking.farmLocation}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><CalendarTodayIcon /> </DetailLabel>
            <DetailValue>{new Date(booking.date).toLocaleDateString()}</DetailValue>
            <DetailLabel><AccessTimeIcon /> </DetailLabel>
            <DetailValue>{booking.time}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Booking Name:</DetailLabel>
            <DetailValue>{booking.farmerName}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Contact number:</DetailLabel>
            <DetailValue>{booking.contactNumber}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Farm Area:</DetailLabel>
            <DetailValue>{booking.farmArea} Acres</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Crop:</DetailLabel>
            <DetailValue>{booking.cropName}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>{booking.weather}</DetailLabel>
            <DetailLabel><OpacityIcon /> {booking.weather}</DetailLabel>
          </DetailRow>
        </BookingDetails>
        {booking.status !== 'requested' && (
          <PaymentSummary>
            <h3>Payment Summary</h3>
            <DetailRow>
              <DetailLabel>Estimated Total:</DetailLabel>
              <DetailValue>₹{booking.quotePrice}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Estimated Total</DetailLabel>
              <DetailValue>₹{booking.quotePrice}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Taxes and fee</DetailLabel>
              <DetailValue>₹{Math.round(booking.quotePrice * 0.1)}</DetailValue>
            </DetailRow>
            <HorizontalLine />
            <DetailRow>
              <DetailLabel>Total</DetailLabel>
              <DetailValue>₹{Math.round(booking.quotePrice * 1.1)}</DetailValue>
            </DetailRow>
          </PaymentSummary>
        )}
      </FlexContainer>
      {booking.status !== 'requested' && booking.status !== 'quote_received' && booking.runner && (
        <RunnerCard>
          <h3>Runner Assigned</h3>
          <RunnerInfo>
            <RunnerAvatar />
            <div>
              <div>{booking.runner.name}</div>
              <div>Contact number: {booking.runner.mobileNumber}</div>
            </div>
          </RunnerInfo>
          <CallButton onClick={() => toast.info(`Calling ${booking.runner.mobileNumber}`)}>
            <PhoneIcon /> Call Now
          </CallButton>
        </RunnerCard>
      )}
      {(booking.status === 'completed' || booking.status === 'closed') && (
        <>
          {booking.startFieldImages && booking.startFieldImages.length > 0 && (
            <ServiceCard>
              <h3>Service started</h3>
              <DetailRow>
                <DetailLabel>Set of battery available:</DetailLabel>
                <DetailValue>{booking.batterySetAvailable}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Current Image of the field:</DetailLabel>
              </DetailRow>
              <ImageContainer>
                {booking.startFieldImages.map((image, index) => (
                  <FieldImage key={index} src={image} alt="Field" />
                ))}
              </ImageContainer>
            </ServiceCard>
          )}
          {booking.endFieldImages && booking.endFieldImages.length > 0 && (
            <ServiceCard>
              <h3>Service completed</h3>
              <DetailRow>
                <DetailLabel>Image of the field after the service completed:</DetailLabel>
              </DetailRow>
              <ImageContainer>
                {booking.endFieldImages.map((image, index) => (
                  <FieldImage key={index} src={image} alt="Field" />
                ))}
              </ImageContainer>
            </ServiceCard>
          )}
        </>
      )}
      {averageRating && (
        <>
          <h3>Average Rating</h3>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} color={star <= averageRating ? 'primary' : 'disabled'} />
            ))}
            <span>{averageRating}</span>
          </RatingContainer>
        </>
      )}
    </Container>
  );
};

export default ConfirmBookingDetails;