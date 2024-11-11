import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpacityIcon from '@mui/icons-material/Opacity';
import Opacity from "@mui/icons-material/Opacity";
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import { getAllBookingsList } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';
import { FiArrowLeft } from 'react-icons/fi';
import avatarImage from '../../assets/runner-avatar.png';
import waterIcon from '../../assets/water-icon.png';
import pesticideIcon from '../../assets/pesticide-icon.png';
import carbonFootprintIcon from '../../assets/carbon-footprint-icon.png';
import droneSprayingIcon from '../../assets/drone-spraying.png';
import batteryEfficiencyIcon from '../../assets/battery-efficiency.png';
import droneRoiIcon from '../../assets/drone-roi.png';
import locationIcon from '../../assets/location-icon.svg';
import calendarIcon from '../../assets/calendar.svg';
import timeIcon from '../../assets/clock.svg';

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

const TempHumidityCropRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const TempHumidity = styled.div`
  display: flex;
  align-items: center;
`;

const Temperature = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  &:after {
    content: '°';
  }
`;

const Humidity = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: #666;
`;

const Crop = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #666;
`;

const BookingId = styled.h3`
  font-size: 24px;
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
    if (props.status === "requested") return "#FEB89C";
    if (props.status === "quote_received") return "#FDF0CC";
    if (props.status === "confirmed") return "#BEF991";
    if (props.status === "closed") return "#DAB4FF";
    return "#E0E0E0";
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
  line-height: 1.5;
`;

const DateTimeRow = styled.div`
  display: flex;
`;

const PaymentSummary = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  flex: 3;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PaymentDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
`;

const PaymentLabel = styled.span`
  font-weight: 500;
  color: #666;
`;

const PaymentValue = styled.span`
  font-weight: 500;
  color: #333;
  text-align: right;
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

const ServicesContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const ServiceCard = styled.div`
  flex: 1;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
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

const RunnerCard = styled.div`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  padding: 20px;
  margin-top: 20px;
  width: 30%;
`;

const RunnerDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const RunnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CallButton = styled.button`
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ViewDetailsButton = styled.button`
  width: 60%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    opacity: 0.9;
  }
`;

const KPISection = styled.div`
  margin-top: 30px;
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const KPICard = styled.div`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
`;

const KPIValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.color || '#333'};
  margin: 10px 0;
`;

const KPILabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const ConfirmBookingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

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
            <img style={{ width: "16px", height: "16px", marginRight: "15px" }} src={locationIcon} alt="Location" />
            {booking.farmLocation}
            <a 
              href={`https://maps.google.com/?q=${booking?.location?.coordinates[0]},${booking?.location?.coordinates[1]}`}
              title="Open in Maps"
              style={{marginLeft:"15px",textDecoration:"none"}}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗
            </a>
          </DetailRow>
          <DateTimeRow>
            <DetailRow>
              <img style={{ width: "16px", height: "16px", marginRight: "15px" }} src={calendarIcon} alt="Calendar" />
              {new Date(booking.date).toLocaleDateString()}
            </DetailRow>
            <DetailRow>
              <img style={{ width: "16px", height: "16px", marginRight: "15px", marginLeft: "15px" }} src={timeIcon} alt="Time" />
              {booking.time}
            </DetailRow>
          </DateTimeRow>
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
          <TempHumidityCropRow>
            <TempHumidity>
              <Temperature>{booking.weather}</Temperature>
              <Humidity>
                <Opacity /> {booking.farmLocation || 'N/A'}
              </Humidity>
            </TempHumidity>
            <Crop>
              Crop: {booking.cropName}
            </Crop>
          </TempHumidityCropRow>
        </BookingDetails>
        {booking.status !== 'requested' && (
          <PaymentSummary>
            <h3 style={{ marginBottom: '20px' }}>Payment Summary</h3>
            <PaymentDetailRow>
              <PaymentLabel>Estimated Total</PaymentLabel>
              <PaymentValue>₹{booking.quotePrice}</PaymentValue>
            </PaymentDetailRow>
            <PaymentDetailRow>
              <PaymentLabel>Taxes and fee</PaymentLabel>
              <PaymentValue>₹{0}</PaymentValue>
            </PaymentDetailRow>
            <HorizontalLine />
            <PaymentDetailRow>
              <PaymentLabel>Total</PaymentLabel>
              <PaymentValue>₹{Math.round(booking.quotePrice)}</PaymentValue>
            </PaymentDetailRow>
          </PaymentSummary>
        )}
      </FlexContainer>
      {booking.status !== 'requested' && booking.status !== 'quote_received' && booking.runner && (
        <RunnerCard>
          <RunnerDetails>
            <RunnerInfo>
              <img src={booking?.runner?.profilePic || avatarImage} alt="profile pic" style={{width:"50px",height:"50px",borderRadius:"50%"}} />
              <div>
                <h3>{booking.runner.name}</h3>
                <p>{booking.runner.mobileNumber}</p>
              </div>
            </RunnerInfo>
            <CallButton onClick={() => {
              navigator.clipboard.writeText(booking.runner.mobileNumber);
              toast.success('Phone number copied to clipboard');
            }}>
              <PhoneIcon /> Call Now
            </CallButton>
          </RunnerDetails>
          <ViewDetailsButton onClick={() => navigate(`/view-vendor/${booking.vendor._id}`)}>
            View Details
          </ViewDetailsButton>
        </RunnerCard>
      )}
      {((booking.status === 'completed' || booking.status === 'closed') && booking?.startFieldImages?.length) && (
        <ServicesContainer>
          <ServiceCard>
            <h3>Service started</h3>
            <DetailRow>
              <DetailLabel>Set of battery available:</DetailLabel>
              <DetailValue>{booking.batterySetAvailable}</DetailValue>
            </DetailRow>
            <ImageContainer>
              {booking.startFieldImages?.map((image, index) => (
                <FieldImage key={index} src={image} alt="Field" />
              ))}
            </ImageContainer>
          </ServiceCard>
          <ServiceCard>
            <h3>Service completed</h3>
            <ImageContainer>
              {booking.endFieldImages?.map((image, index) => (
                <FieldImage key={index} src={image} alt="Field" />
              ))}
            </ImageContainer>
          </ServiceCard>
        </ServicesContainer>
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
      {(booking.status === 'closed' && booking.droneWaterUsage && booking.dronePesticideUsage && booking.emissionSavedPerHectare) && (
        <KPISection>
          <h3>Environmental Impact Report</h3>
          <KPIGrid>
            <KPICard>
              <img src={waterIcon} alt="Water saved" style={{ width: 40, height: 40 }} />
              <KPIValue color="#5CBEFF">{booking.droneWaterUsage || 0}</KPIValue>
              <KPILabel>Water Saved</KPILabel>
            </KPICard>
            <KPICard>
              <img src={pesticideIcon} alt="Pesticide saved" style={{ width: 40, height: 40 }} />
              <KPIValue color="#FF826E">{booking.dronePesticideUsage || 0}%</KPIValue>
              <KPILabel>Pesticide Saved</KPILabel>
            </KPICard>
            <KPICard>
              <img src={carbonFootprintIcon} alt="Carbon footprint" style={{ width: 40, height: 40 }} />
              <KPIValue color="#6AD34D">{booking.emissionSavedPerHectare || 0}%</KPIValue>
              <KPILabel>Carbon Footprint Reduced</KPILabel>
            </KPICard>
          </KPIGrid>
        </KPISection>
      )}
      {(booking.status === 'closed' && booking.cropOutputPerAcre && booking.quotePrice && booking.droneFlightHours && booking.chargeCycles) && (
        <KPISection>
          <h3>Economic Impact Report</h3>
          <KPIGrid>
            <KPICard>
              <img src={droneSprayingIcon} alt="Drone ROI" style={{ width: 40, height: 40 }} />
              <KPIValue color="#5CBEFF">
                {((booking.cropOutputPerAcre / booking.quotePrice) * 100).toFixed(1)}%
              </KPIValue>
              <KPILabel>Drone ROI</KPILabel>
            </KPICard>
            <KPICard>
              <img src={batteryEfficiencyIcon} alt="Battery efficiency" style={{ width: 40, height: 40 }} />
              <KPIValue color="#FF826E">
                {(parseInt(booking.droneFlightHours) / (booking.chargeCycles || 1)).toFixed(1)}
              </KPIValue>
              <KPILabel>Battery Efficiency</KPILabel>
            </KPICard>
            <KPICard>
              <img src={droneRoiIcon} alt="Drone life" style={{ width: 40, height: 40 }} />
              <KPIValue color="#6AD34D">
                {((booking.cropOutputPerAcre - booking.quotePrice) / parseInt(booking.droneFlightHours || 1)).toFixed(1)}%
              </KPIValue>
              <KPILabel>Drone Longevity</KPILabel>
            </KPICard>
          </KPIGrid>
        </KPISection>
      )}
    </Container>
  );
};

export default ConfirmBookingDetails;