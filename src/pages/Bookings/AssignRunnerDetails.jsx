import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpacityIcon from '@mui/icons-material/Opacity';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import successWithdrawalCheck from '../../assets/check-wallet.png';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans' ;
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
  color: #333;
`;

const BookingId = styled.h3`
  font-size: 18px;
  color: #333;
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
  color: #333;
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
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #E0E0E0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #F9F9F9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
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
  const [selectedRunner, setSelectedRunner] = useState(null);

  const booking = {
    id: id,
    address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066',
    name: 'Sachin Doe',
    date: '13 June, 2023',
    time: '02:00 PM - 04:00 PM',
    contactNumber: '0987654321',
    farmArea: '21 Acres',
    crop: 'Crop name',
    temperature: '24° Pratapgarh, uttrakhand',
    humidity: '2% Mostly sunny',
  };

  const runners = [
    { id: 1, name: 'John Doe', contact: '+91 1234567890', status: 'Active' },
    { id: 2, name: 'Jane Smith', contact: '+91 9876543210', status: 'Active' },
    { id: 3, name: 'Mike Johnson', contact: '+91 5555555555', status: 'Inactive' },
  ];

  const handleAssignRunner = () => {
    setShowRunnerModal(true);
  };

  const handleRunnerSelect = (runner) => {
    setSelectedRunner(runner);
    setShowRunnerModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
  };

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
      <ActionButton onClick={handleAssignRunner}>Assign Runner</ActionButton>
      {showRunnerModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowRunnerModal(false)}><CloseIcon /></CloseButton>
            <Title>Select a Runner</Title>
            <RunnerTable>
              <thead>
                <tr>
                  <TableHeader>Runner Name</TableHeader>
                  <TableHeader>Runner Contact</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Action</TableHeader>
                </tr>
              </thead>
              <tbody>
                {runners.map(runner => (
                  <TableRow key={runner.id}>
                    <TableCell>{runner.name}</TableCell>
                    <TableCell>{runner.contact}</TableCell>
                    <TableCell>{runner.status}</TableCell>
                    <TableCell>
                      <ActionButton onClick={() => handleRunnerSelect(runner)}>Select</ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </RunnerTable>
          </ModalContent>
        </Modal>
      )}
      {showSuccessModal && (
        <Modal>
          <SuccessModal>
            <CloseButton onClick={() => setShowSuccessModal(false)}><CloseIcon /></CloseButton>
            <SuccessIcon src={successWithdrawalCheck} alt="Success" />
            <Title>Request sent to runner</Title>
            <p>You will get an update soon</p>
          </SuccessModal>
        </Modal>
      )}
    </Container>
  );
};

export default AssignRunnerDetails;