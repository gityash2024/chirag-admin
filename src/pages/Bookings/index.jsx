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
import { getAllBookingsList, getAllVendors, assignVendorToBooking, updateBooking } from "../../services/commonService";
import { toast } from "react-toastify";
import clock from '../../assets/clock.svg';
import calendar from '../../assets/calendar.svg';
import map from '../../assets/location-icon.svg';
import { Avatar } from "@mui/material";
import { CopyAll } from "@mui/icons-material";
import Loader from "../../components/loader";
import avatarImage from '../../assets/runner-avatar.png';

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
  transition: all 0.2s ease;

  &:hover {
    background: #333333;
  }
`;
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




const BookingDetails2 = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #121212;
  margin-bottom: 5px;
  display: flex;
  text-decoration: underline;
  align-items: center;
  svg {
    margin-right: 5px;
  }
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


const PriceInput = styled.input`
  width: 90%;
  padding: 8px;
  margin-bottom: 15px;
`;


const SuccessModal = styled(ModalContent)`
  text-align: center;
`;

const AvatarIcon = styled(Avatar)`
  margin-right: 10px;
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
  width: 50%;
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



const ModalSubtitle = styled.p`
  color: #000000;
  font-size: 14px;
  margin-bottom: 20px;
  font-family: 'Public Sans';
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

const StatusDropdown = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  background-color: white;
  font-size: 14px;
  width: 100%;
  margin-top: 10px;
`;

const RejectionReason = styled.p`
  color: #FF0000;
  font-size: 14px;
  margin-top: 10px;
  font-weight: 500;
`;



const Card = styled.div`
  background: white;
  cursor: pointer;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  height: 300px;
  display: flex;
  flex-direction: column;

  ${props => props.hasActionButtons && `
    height: 300px;
    padding-bottom: 70px;
  `}
`;

const BookingDetails = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #121212CC;
  margin-bottom: 5px;
  line-height: 20px;
  display: flex;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
    margin-right: 15px;
  }
`;

const DateTimeRow = styled.div`
  display: flex;
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

const RunnnerDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 10px;
`;

const RunnerContactButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #000000;
  color: #ffffff;
  border: 1px solid #000000;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #F8F9FA;
    color: #000000;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
   background-color: ${props => {
    if (props.status === "requested") return "#FEB89C";
    if (props.status === "quote_received") return "#FDF0CC";
    if (props.status === "confirmed") return "#BEF991";
    if (props.status === "closed") return "#DAB4FF";
    return "#E0E0E0";
  }};
`;

const ActionButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
`;



// Update the Modal styles
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

const QuoteModal = styled.div`
  background-color: white;
  padding: 38px;
  border-radius: 16px;
  width: 478px;
  position: relative;
  font-family: Public Sans;
`;

const ModalTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 28px;
  line-height: 38px;
  font-weight: 600;
  font-family: Public Sans;
`;

const QuotePriceInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #EEF0F3;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const SubmitButton = styled.button`
  width: 40%;
  padding: 15px;
  background-color: rgba(56, 56, 56, 1);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  line-height: 16.24px;
  font-weight: 600;
  font-family: Public Sans;
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
const [showConfirmationModal, setShowConfirmationModal] = useState(false);
const [selectedStatus, setSelectedStatus] = useState('');

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
          b => (b.status === "confirmed"||b.status==="quote_received")&& !b.runner && !["completed", "closed", "cancelled"].includes(b.status)
        ),
        "Confirmed": response.data.filter(b => b.status === "confirmed" && b.runner ),
        "Cancelled": response.data.filter(b => b.status === "cancelled"),
        "Closed": response.data.filter(b => b.status === "closed"),
      };
      setBookings(categorizedBookings);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };


// Add new function to handle status change
const handleStatusChange = async (booking, newStatus) => {
  setSelectedBooking(booking);
  setSelectedStatus(newStatus);
  setShowConfirmationModal(true);
};

// Add function to handle confirmation
const handleConfirmStatusChange = async () => {
  try {
    const updateData = {
      id: selectedBooking._id,
      status: selectedStatus,
      vendor: null,
      runner: null
    };
    
    if (selectedStatus === 'requested') {
      updateData.quotePrice = null;
    }
    
    await updateBooking(updateData);
    toast.success(`Booking status updated to ${selectedStatus}`);
    setShowConfirmationModal(false);
    fetchBookings();
  } catch (error) {
    toast.error("Failed to update booking status");
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
      requestViaAdmin:true,
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

    const redirectToLocation = (e, coordinatesArray) => {
      e.stopPropagation();
      e.preventDefault();
      if (coordinatesArray?.length) {
        window.open(`https://www.google.com/maps/search/?api=1&query=${coordinatesArray[0]},${coordinatesArray[1]}`, '_blank');
      }
    };

   
  return currentItems.map((booking) => (
    <Card 
      key={booking._id} 
      onClick={() => handleBookingClick(booking)}
      hasActionButtons={activeTab === "Pending Bookings" || 
        (activeTab === "In Progress" && (!booking.vendor || !booking.runner))}
    >
      <CardHeader>
        <BookingId>#{booking._id}</BookingId>
        <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
      </CardHeader>
      <BookingDetails>
        <img src={map} alt="Location" />
        {booking.farmLocation}
        <a 
          href={`https://maps.google.com/?q=${booking?.location?.coordinates[0]},${booking?.location?.coordinates[1]}`}
          title="Open in Google Maps"
          style={{marginLeft: "15px", textDecoration: "none"}}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          🔗
        </a>
      </BookingDetails>
      <DateTimeRow>
        <BookingDetails>
          <img src={calendar} alt="Calendar" />
          {new Date(booking.date).toLocaleDateString()}
        </BookingDetails>
        <BookingDetails>
          <img 
            src={clock} 
            alt="Time"
            style={{marginLeft: "15px"}}
          />
          {booking.time}
        </BookingDetails>
      </DateTimeRow>
      <BookingDetails>
        Booking Name: {booking.farmerName}
      </BookingDetails>
      <BookingDetails>
        Farm Area: {booking.farmArea} Acres
      </BookingDetails>
      <TempHumidityCropRow>
        <TempHumidity>
          <Temperature>{booking.weather}</Temperature>
          <Humidity>{booking.farmLocation || 'N/A'}</Humidity>
        </TempHumidity>
        <Crop>
          Crop: {booking.cropName}
        </Crop>
      </TempHumidityCropRow>
      {booking.quotePrice && (
        <PriceSummary>
          Price: ₹{booking.quotePrice}
        </PriceSummary>
      )}
      {booking.runner && (
        <RunnnerDetails>
          <RunnerName>
            <img src={booking?.runner?.profilePic||avatarImage} alt="profile pic" style={{width:"50px",height:"50px",borderRadius:"50%"}} />
            <span>{booking.runner.name}</span>
          </RunnerName>
          <RunnerContactButton
            onClick={(e) => handleCallRunner(e, booking.runner.mobileNumber)}
          >
            <Phone /> Call Now
          </RunnerContactButton>
        </RunnnerDetails>
      )}
      {(activeTab === "Pending Bookings" || 
        (activeTab === "In Progress" && (!booking.vendor || !booking.runner))) && (
        <ActionButtonContainer>
          <ActionButton onClick={(e) => handleAssignButtonClick(booking, e)}>
            {!booking.vendor ? 'Assign Vendor' : 'Assign Runner'}
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
        <Loader/>      ) : (
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



{showConfirmationModal && (
  <Modal>
    <QuoteModal>
      <CloseButton onClick={() => setShowConfirmationModal(false)}>
        <CloseIcon />
      </CloseButton>
      <Title>Confirm Status Change</Title>
      <ModalSubtitle>
        {selectedStatus === 'requested' ? 
          'The assigned vendor and runner will be removed, but the quote price will remain the same.' :
          'The assigned vendor, runner, and quote price will be removed from this booking.'}
      </ModalSubtitle>
      <ButtonGroup>
        <CancelButton onClick={() => setShowConfirmationModal(false)}>
          Cancel
        </CancelButton>
        <ActionButton onClick={handleConfirmStatusChange}>
          Confirm
        </ActionButton>
      </ButtonGroup>
    </QuoteModal>
  </Modal>
)}
    </BookingsContainer>
  );
};

export default Bookings;