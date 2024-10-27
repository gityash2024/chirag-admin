import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LocationOn from '@mui/icons-material/LocationOn';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AccessTime from '@mui/icons-material/AccessTime';
import Opacity from '@mui/icons-material/Opacity';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import successWithdrawalCheck from '../../assets/check-wallet.svg';
import { getBookingById, getVendorRunners, assignRunnerToBooking } from '../../services/commonService';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans';
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
  height: 220px;
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
  color: #121212;
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

const ActionButton = styled.button`
  width: 200px;
  padding: 10px;
  background-color: #000000;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin: 15px auto;
  display: block;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
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

const RunnerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #F9FAFC;
  border-bottom: 1px solid #E0E0E0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #F9F9F9;
  }
  &:hover {
    background-color: #F5F5F5;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #E0E0E0;
`;

const SuccessModal = styled(ModalContent)`
  text-align: center;
  width: 300px;
`;

const SuccessIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
`;

const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AssignRunnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRunnerModal, setShowRunnerModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [booking, setBooking] = useState(null);
  const [runners, setRunners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigningRunner, setAssigningRunner] = useState(false);

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      const response = await getBookingById({id:id});
      setBooking(response.data);
      if (response.data.vendor) {
        fetchVendorRunners(response.data.vendor._id);
      }
    } catch (error) {
      toast.error('Failed to fetch booking details');
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorRunners = async (vendorId) => {
    try {
      const response = await getVendorRunners({id:vendorId});
      setRunners(response.data);
    } catch (error) {
      toast.error('Failed to fetch runners');
    }
  };

  const handleAssignRunner = () => {
    if (!booking.vendor) {
      toast.error('Please assign a vendor first');
      return;
    }
    setShowRunnerModal(true);
  };

  const handleRunnerSelect = async (runner) => {
    try {
      setAssigningRunner(true);
      await assignRunnerToBooking({
        id: booking._id,
        runner: runner._id,
        status:'confirmed'
      });
      setShowRunnerModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/bookings');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to assign runner');
    } finally {
      setAssigningRunner(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!booking) {
    return <p>Booking not found</p>;
  }

  return (
    <Container>
      <Header>
        <TitleContainer>
          <BackButton onClick={() => navigate('/bookings')}>
            <ArrowBackIcon />
          </BackButton>
          <Title>Assign Runner</Title>
        </TitleContainer>
      </Header>
      <BookingId>#{booking._id}</BookingId>
      <FlexContainer>
        <BookingDetailsContainer>
          <BookingDetailsCard>
            <DetailRow>
              <DetailLabel><LocationOn /></DetailLabel>
              <DetailValue>{booking.farmLocation}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><CalendarToday /></DetailLabel>
              <DetailValue>{new Date(booking.date).toLocaleDateString()}</DetailValue>
              <DetailLabel style={{ marginLeft: '20px' }}><AccessTime /></DetailLabel>
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
            {booking.vendor && (
              <DetailRow>
                <DetailLabel>Assigned Vendor:</DetailLabel>
                <DetailValue>{booking.vendor.name}</DetailValue>
              </DetailRow>
            )}
            <HorizontalLine />
            <DetailRow>
              <DetailLabel>{booking.weather}</DetailLabel>
            </DetailRow>
            <DetailRow>
              <DetailLabel><Opacity /> {booking.weather}</DetailLabel>
            </DetailRow>
          </BookingDetailsCard>
          <ActionButton onClick={handleAssignRunner} disabled={!booking.vendor}>
            Assign Runner
          </ActionButton>
        </BookingDetailsContainer>
        <PaymentSummary>
          <h3>Payment Summary</h3>
          <DetailRow>
            <DetailLabel>Quoted Price:</DetailLabel>
            <DetailValue>₹{booking.quotePrice || 0}</DetailValue>
          </DetailRow>
          <HorizontalLine />
          <PaymentRow>
            <DetailLabel>Service Charge</DetailLabel>
            <DetailValue>₹{Math.round(booking.quotePrice * 0.1) || 0}</DetailValue>
          </PaymentRow>
          <PaymentRow>
            <DetailLabel>Taxes</DetailLabel>
            <DetailValue>₹{Math.round(booking.quotePrice * 0.18) || 0}</DetailValue>
          </PaymentRow>
          <HorizontalLine />
          <PaymentRow>
            <DetailLabel>Total Amount</DetailLabel>
            <DetailValue>₹{Math.round(booking.quotePrice * 1.28) || 0}</DetailValue>
          </PaymentRow>
        </PaymentSummary>
      </FlexContainer>

      {showRunnerModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowRunnerModal(false)}>
              <CloseIcon />
            </CloseButton>
            <Title>Select Runner</Title>
            <RunnerTable>
              <thead>
                <tr>
                  <TableHeader>Runner Name</TableHeader>
                  <TableHeader>Contact</TableHeader>
                  <TableHeader>Action</TableHeader>
                </tr>
              </thead>
              <tbody>
                {runners.map(runner => (
                  <TableRow key={runner._id}>
                    <TableCell>{runner.name}</TableCell>
                    <TableCell>{runner.mobileNumber}</TableCell>
                    <TableCell>
                      <ActionButton 
                        onClick={() => handleRunnerSelect(runner)}
                        disabled={assigningRunner}
                      >
                        Select
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
                {!runners.length && (
                  <TableRow>
                    <TableCell></TableCell>  
                    <TableCell >No runners found for {booking.vendor.name||'--'}</TableCell>
                    <TableCell></TableCell>  
                  </TableRow>
                )}
              </tbody>
            </RunnerTable>
          </ModalContent>
        </Modal>
      )}

      {showSuccessModal && (
        <Modal>
          <SuccessModal>
            <CloseButton onClick={() => setShowSuccessModal(false)}>
              <CloseIcon />
            </CloseButton>
            <SuccessIcon src={successWithdrawalCheck} alt="Success" />
            <Title>Runner Assigned Successfully</Title>
            <p>Booking has been assigned to the runner</p>
          </SuccessModal>
        </Modal>
      )}
    </Container>
  );
};

export default AssignRunnerDetails;