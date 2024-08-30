import React from 'react';
import styled from 'styled-components';

const BookingDetailContainer = styled.div`
  font-family: 'Public Sans', sans-serif;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-right: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 10px;
  background-color: #FFEBEE;
  color: #F44336;
`;

const DetailCard = styled.div`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DetailLabel = styled.span`
  font-weight: 600;
`;

const DetailValue = styled.span``;

const PaymentSummary = styled.div`
  background: #F5F5F5;
  border-radius: 8px;
  padding: 20px;
`;

const TotalAmount = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
`;

const CancellationReason = styled.div`
  background: #FFEBEE;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const RunnerCanceledBookingDetail = () => {
  return (
    <BookingDetailContainer>
      <Header>
        <BackButton onClick={() => window.history.back()}>&larr;</BackButton>
        <Title>Booking</Title>
        <StatusBadge>Service Declined</StatusBadge>
      </Header>
      <DetailCard>
        <DetailRow>
          <DetailLabel>Booking ID:</DetailLabel>
          <DetailValue>#AB123456</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Address:</DetailLabel>
          <DetailValue>Lorem ipsum dolor sit amet, street, Area, City, 560066</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Booking Name:</DetailLabel>
          <DetailValue>Sachin Doe</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Contact number:</DetailLabel>
          <DetailValue>0987654321</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Farm Area:</DetailLabel>
          <DetailValue>21 Acres</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Crop:</DetailLabel>
          <DetailValue>Crop name</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Date & Time:</DetailLabel>
          <DetailValue>13 June, 2023 | 09:00AM</DetailValue>
        </DetailRow>
      </DetailCard>
      <DetailCard>
        <DetailRow>
          <DetailLabel>Runner Assigned:</DetailLabel>
          <DetailValue>Runner name</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Contact number:</DetailLabel>
          <DetailValue>0987654321</DetailValue>
        </DetailRow>
      </DetailCard>
      <PaymentSummary>
        <h3>Payment Summary</h3>
        <DetailRow>
          <DetailLabel>Estimated Total</DetailLabel>
          <DetailValue>₹1999</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Taxes and fee</DetailLabel>
          <DetailValue>₹199</DetailValue>
        </DetailRow>
        <TotalAmount>
          <DetailLabel>Total</DetailLabel>
          <DetailValue>₹2198</DetailValue>
        </TotalAmount>
      </PaymentSummary>
      <CancellationReason>
        <h3>Runner has declined the Service</h3>
        <p>Reason: The field area has not matched</p>
      </CancellationReason>
    </BookingDetailContainer>
  );
};

export default RunnerCanceledBookingDetail;