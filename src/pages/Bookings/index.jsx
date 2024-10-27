import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LocationOn from "@mui/icons-material/LocationOn";
import CalendarToday from "@mui/icons-material/CalendarToday";
import AccessTime from "@mui/icons-material/AccessTime";
import Opacity from "@mui/icons-material/Opacity";
import CloseIcon from "@mui/icons-material/Close";
import Phone from '@mui/icons-material/Phone';
import noBookingsImage from "../../assets/no-booking.png";
import { getAllBookingsList, getAllVendors, assignVendorToBooking } from "../../services/commonService";
import { toast } from "react-toastify";
import clock from '../../assets/clock.png';
import calendar from '../../assets/calendar-event.png';
import map from '../../assets/map-pin.png';
import { Avatar } from "@mui/material";
import { CopyAll } from "@mui/icons-material";

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const BookingsContainer = styled.div`
  padding: 20px;
  font-family: 'Public Sans' ;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 20px;
`;

const SuccessIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #E0E0E0;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background: none;
  border: none;
  font-size: 16px;
  color: ${props => props.active ? '#000000' : '#8D98A4'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border-bottom: ${props => props.active ? '2px solid #000000' : 'none'};
  cursor: pointer;
`;



const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BookingId = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #121212;
  margin: 0;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  background-color: ${props => {
    if (props.status === 'In Progress') return '#FDF0CC';
    if (props.status === 'Confirmed') return '#C6EEFF';
    if (props.status === 'Confirmed') return '#B1FF8C';
    if (props.status === 'Closed') return '#DAB4FF';
    return '#E0E0E0';
  }};
`;

const BookingDetails = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #121212;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

const DateTimeRow = styled.div`
  display: flex;
  justify-content: space-between;
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
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`;

const Humidity = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #121212;
`;

const Crop = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #121212;
`;

const PriceSummary = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #121212;
  margin-top: 15px;
`;

const ServiceProvider = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-top: 10px;
`;

const AssignedRunnerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;
const RunnnerDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F8F9FA;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 15px;
`;

const RunnerName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RunnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  span {
    font-weight: 500;
    color: #121212;
  }
`;

const RunnerContactButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  color: #000000;
  border: 1px solid #000000;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #F8F9FA;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;
const RunnerContact = styled.span`
  font-size: 12px;
  color: #121212;
`;

const CallButton = styled.button`
  padding: 5px 10px;
  background-color: #000000;
  color: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-left: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const RunnerDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const PageButton = styled.button`
  background: ${props => props.active ? '#000' : 'white'};
  color: ${props => props.active ? 'white' : '#000'};
  border: 1px solid #000;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;



const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalTitle = styled.h3`
  margin-bottom: 15px;
`;

const PriceInput = styled.input`
  width: 90%;
  padding: 8px;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SuccessModal = styled(ModalContent)`
  text-align: center;
`;

const AvatarIcon = styled(Avatar)`
  margin-right: 10px;
`;



const Card = styled.div`
  background: white;
  cursor: pointer;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 300px;
  padding-bottom: 70px;
`;

const ActionButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000000;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;



const VendorList = styled.div`
  margin-top: 20px;
`;

const VendorItem = styled.div`
  padding: 15px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  &:empty {
    display: block;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 100%;
  grid-column: 1 / -1;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const EmptyStateImage = styled.img`
  width: 200px;
  height: 400px;
  margin-bottom: 20px;
`;

const EmptyStateText = styled.p`
  font-size: 18px;
  color: #121212;
  text-align: center;
`;

const VendorTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #E0E0E0;
  color: #121212;
  font-weight: 600;
  font-size: 14px;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #E0E0E0;
  color: #121212;
  font-size: 14px;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  color: #000000;
  
  &:hover {
    opacity: 0.7;
  }
`;

const MobileNumberContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuoteModal = styled(ModalContent)`
  width: 400px;
  padding: 24px;
`;

const QuotePriceInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  margin-top: 12px;
  margin-bottom: 20px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #000000;
  }

  &::placeholder {
    color: #8D98A4;
  }
`;

const ModalSubtitle = styled.p`
  color: #8D98A4;
  font-size: 14px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const CancelButton = styled(ActionButton)`
  background-color: white;
  color: black;
  border: 1px solid black;
`;

const Bookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Pending Bookings");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState({});
  const [loading, setLoading] = useState(true);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const bookingsPerPage = 9;
// Add these new state variables to your component
const [showQuoteModal, setShowQuoteModal] = useState(false);
const [selectedVendor, setSelectedVendor] = useState(null);
const [quotePrice, setQuotePrice] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getAllBookingsList();
      const categorizedBookings = {
        "Pending Bookings": response.data.filter(b => !b.runner && b.status !== "confirmed"),
        "In Progress": response.data.filter(
          b => (b.status === "confirmed"||b.status==="quote_received")&& !b.runner && !["completed", "closed"].includes(b.status)
        ),
        "Confirmed": response.data.filter(b => b.status === "confirmed" && b.runner ),
        "Closed": response.data.filter(b => (b.status === "closed" ||b.status === "cancelled")),
      };
      setBookings(categorizedBookings);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await getAllVendors();
      setVendors(response.data);
    } catch (error) {
      toast.error("Failed to fetch vendors");
    }
  };

  const handleAssignButtonClick = async (booking, e) => {
    e.stopPropagation();
    if (!booking.vendor) {
      setSelectedBooking(booking);
      await fetchVendors();
      setShowVendorModal(true);
    } else {
      navigate(`/assign-runner/${booking._id}`);
    }
  };

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    setShowQuoteModal(true);
    setShowVendorModal(false);
  };
  
  const handleQuoteSubmit = async () => {
    if (!quotePrice) {
      toast.error('Please enter quote price');
      return;
    }
    console.log({
      id: selectedBooking._id,
      vendor: selectedVendor._id,
      status:'quote_received',
      quotePrice: parseFloat(quotePrice)
    })
    try {
      await assignVendorToBooking({
        id: selectedBooking._id,
        vendor: selectedVendor._id,
        status:'quote_received',
        quotePrice: parseFloat(quotePrice)
      });
      
      toast.success("Vendor assigned successfully");
      setShowQuoteModal(false);
      setQuotePrice('');
      setSelectedVendor(null);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to assign vendor");
    }
  };


  const handleBookingClick = (booking) => {
    navigate(`/booking-details/${booking._id}`);
  };

  const handleCallRunner = (e, mobileNumber) => {
    e.stopPropagation();
    navigator.clipboard.writeText(mobileNumber);
    toast.info(`Copied number: ${mobileNumber}`);
  };

  const renderBookings = () => {
    const currentBookings = bookings[activeTab] || [];
    const indexOfLastItem = currentPage * bookingsPerPage;
    const indexOfFirstItem = indexOfLastItem - bookingsPerPage;
    const currentItems = currentBookings.slice(indexOfFirstItem, indexOfLastItem);

    if (currentItems.length === 0) {
      return (
        <EmptyStateContainer>
          <EmptyStateImage src={noBookingsImage} alt="No bookings" />
          <EmptyStateText>Currently, no bookings available for {activeTab}.</EmptyStateText>
        </EmptyStateContainer>
      );
    }

    return currentItems.map((booking) => (
      <Card key={booking._id} onClick={() => handleBookingClick(booking)}>
        <CardHeader>
          <BookingId>#{booking._id}</BookingId>
          <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
        </CardHeader>
        <BookingDetails>
          <img src={map} alt="Location" style={{ marginRight: '5px' }}/>
          {booking.farmLocation}
        </BookingDetails>
        <DateTimeRow>
          <BookingDetails>
            <img src={calendar} alt="Calendar" style={{ marginRight: '5px' }}/>
            {new Date(booking.date).toLocaleDateString()}
          </BookingDetails>
          <BookingDetails>
            <img src={clock} alt="Clock" style={{ marginRight: '5px' }}/>
            {booking.time}
          </BookingDetails>
        </DateTimeRow>
        <BookingDetails>Booking Name: {booking.farmerName}</BookingDetails>
        <BookingDetails>Farm Area: {booking.farmArea} Acres</BookingDetails>
        <TempHumidityCropRow>
          <TempHumidity>
            <Temperature>{booking.weather}</Temperature>
            <Humidity>
              <Opacity /> {booking.weather}
            </Humidity>
          </TempHumidity>
          <Crop>Crop: {booking.cropName}</Crop>
        </TempHumidityCropRow>
        {booking.quotePrice && (
          <PriceSummary>Price: ₹{booking.quotePrice}</PriceSummary>
        )}
        {booking.vendor && (
          <BookingDetails>Vendor: {booking.vendor.name}</BookingDetails>
        )}
       {booking.runner && (
  <RunnnerDetails>
    <RunnerName>
      <RunnerInfo>
        <Avatar sx={{ width: 40, height: 40 }} />
        <span>{booking?.runner?.name}</span>
      </RunnerInfo>
    </RunnerName>
    <RunnerContactButton onClick={(e) => handleCallRunner(e, booking?.runner?.mobileNumber)}>
      <Phone /> Call Now
    </RunnerContactButton>
  </RunnnerDetails>
)}
        {(activeTab === "Pending Bookings" || 
          (activeTab === "In Progress" && (!booking.vendor || !booking.runner))) && (
          <ActionButtonContainer>
            <ActionButton onClick={(e) => handleAssignButtonClick(booking, e)}>
              {!booking.vendor ? 'Assign Vendor' : !booking.runner ? 'Assign Runner' : 'Assign Runner'}
            </ActionButton>
          </ActionButtonContainer>
        )}
      </Card>
    ));
  };
const ToCapitaiseText = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
  return (
    <BookingsContainer>
      <Title>Bookings</Title>
      <TabContainer>
        {Object.keys(bookings).map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardContainer>{renderBookings()}</CardContainer>
          <Pagination>
            {Array.from(
              {
                length: Math.ceil(
                  (bookings[activeTab] || []).length / bookingsPerPage
                ),
              },
              (_, i) => (
                <PageButton
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  active={i + 1 === currentPage}
                >
                  {i + 1}
                </PageButton>
              )
            )}
          </Pagination>
        </>
      )}
      {showVendorModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowVendorModal(false)}>
              <CloseIcon />
            </CloseButton>
            <Title>Select Vendor</Title>
<VendorList>
  <VendorTable>
    <thead>
      <tr>
        <TableHeader>Vendor Name</TableHeader>
        <TableHeader>Mobile Number</TableHeader>
        <TableHeader>Action</TableHeader>
      </tr>
    </thead>
    <tbody>
      {vendors.map(vendor => (
        <tr key={vendor._id}>
          <TableCell>{vendor.name}</TableCell>
          <TableCell>
            <MobileNumberContainer>
              {vendor.mobileNumber}
              <CopyButton 
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(vendor.mobileNumber);
                  toast.info('Mobile number copied!');
                }}
              >
                <CopyAll />
              </CopyButton>
            </MobileNumberContainer>
          </TableCell>
          <TableCell>
            <ActionButton onClick={() => handleVendorSelect(vendor)}>
              Select
            </ActionButton>
          </TableCell>
        </tr>
      ))}
    </tbody>
  </VendorTable>
</VendorList>
          </ModalContent>
        </Modal>
      )}

{showQuoteModal && (
  <Modal>
    <QuoteModal>
      <CloseButton onClick={() => {
        setShowQuoteModal(false);
        setQuotePrice('');
      }}>
        <CloseIcon />
      </CloseButton>
      <Title>Set Quote Price</Title>
      <ModalSubtitle>
        Set quote price for booking #{selectedBooking?._id} with vendor {selectedVendor?.name}
      </ModalSubtitle>
      <QuotePriceInput
        type="number"
        placeholder="Enter quote price"
        value={quotePrice}
        onChange={(e) => setQuotePrice(e.target.value)}
      />
      <ButtonGroup>
        <CancelButton onClick={() => {
          setShowQuoteModal(false);
          setQuotePrice('');
        }}>
          Cancel
        </CancelButton>
        <ActionButton onClick={handleQuoteSubmit}>
          Submit & Assign
        </ActionButton>
      </ButtonGroup>
    </QuoteModal>
  </Modal>
)}
    </BookingsContainer>
  );
};

export default Bookings;