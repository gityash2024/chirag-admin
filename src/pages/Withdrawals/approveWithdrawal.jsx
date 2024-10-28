import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { 
  getWithdrawalRequests, 
  approveWithdrawal,
  getTransactionHistory 
} from '../../services/commonService';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

import CloseIcon from '@mui/icons-material/Close';
import successWithdrawalCheck from '../../assets/check-wallet.png';
import { useNavigate, useParams } from 'react-router-dom';
const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans' ;
  background-color: #FFFFFF;
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
  max-width: 400px;
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

const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
`;

const ConfirmButton = styled(ModalButton)`
  background-color: #000000;
  color: white;
`;

const CancelButton = styled(ModalButton)`
  background-color: #E0E0E0;
  color: #000000;
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

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: 30%;
`;

const Label = styled.label`
  font-size: 14px;
  color: #121212;
  font-weight: 400;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
  font-size: 14px;
  color: #121212;
`;

const ApproveButton = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto; /* Centering the button */
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #121212;
  margin-bottom: 15px;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #E3E6E8;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: 600;
  color: ${props => (props.active ? '#000000' : '#8D98A4')};
  border-bottom: ${props => (props.active ? '3px solid #000000' : 'none')};
  cursor: pointer;
`;

const SortControls = styled.div`
  display: flex;
  align-items: center;
`;

const SortLabel = styled.span`
  font-size: 14px;
  color: #121212;
  margin-right: 10px;
`;

const SortDropdown = styled.select`
  padding: 8px;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
  font-size: 14px;
`;



const HorizontalRule = styled.hr`
  border: 0;
  border-top: 1px solid #E3E6E8;
  margin: 20px 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: #8D98A4;
`;

const PageButtons = styled.div`
  display: flex;
  margin-left: 60px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #E3E6E8;
  background-color: ${props => props.active ? '#000' : 'white'};
  color: ${props => props.active ? 'white' : '#121212'};
  cursor: pointer;
  border-radius: 4px;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const HistoryItem = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #E3E6E8;
  width: 50%; /* Full width for single card per row */
`;

const HistoryDetails = styled.div`
  font-size: 14px;
  color: #121212;
`;

const HistoryAmount = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #41B079;
`;

const SuccessBadge = styled.div`
  display: inline-block;
  padding: 5px 10px;
    border-radius: 4px;

  background-color: rgba(40, 199, 111, 0.16); /* Light green background */
  color: #28C76F; /* Success green color */
  font-size: 12px;
  font-weight: 600;
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
`;

const BackIcon = styled(FiArrowLeft)`
  margin-right: 8px;
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const ApproveWithdrawal = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [withdrawalData, setWithdrawalData] = useState(null);
  const [activeTab, setActiveTab] = useState('History');
  const [transactions, setTransactions] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    fetchWithdrawalData();
  }, [requestId]);

  const fetchWithdrawalData = async () => {
    try {
      setLoading(true);
      const [requestsResponse, historyResponse] = await Promise.all([
        getWithdrawalRequests(),
        getTransactionHistory()
      ]);

      console.log(requestsResponse.data,'withdrawalRequest')
      console.log(requestId,'requestId')

      const withdrawalRequest = requestsResponse.data.find(
        request => request.requestId === requestId
      );

      if (!withdrawalRequest) {
        toast.error('Withdrawal request not found');
        navigate(-1);
        return;
      }

      setWithdrawalData(withdrawalRequest);
      setTransactions(historyResponse.data);
    } catch (error) {
      toast.error('Failed to fetch withdrawal details');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
      await approveWithdrawal(requestId);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/withdrawals');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve withdrawal');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !withdrawalData) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
        <Header>Withdrawal Request Details</Header>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
          Back
        </BackButton>
      </div>

      <FormGroup>
        <InputWrapper>
          <Label>Bank Account Number</Label>
          <Input type="text" value={withdrawalData?.bankDetails?.accountNumber} readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>IFSC code</Label>
          <Input type="text" value={withdrawalData?.bankDetails?.ifscCode} readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Account Holder Name</Label>
          <Input type="text" value={withdrawalData?.bankDetails?.accountHolderName} readOnly />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <InputWrapper>
          <Label>Withdrawal Amount</Label>
          <Input type="text" value={`₹ ${withdrawalData?.amount.toFixed(2)}`} readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Request Date</Label>
          <Input 
            type="text" 
            value={new Date(withdrawalData?.requestDate).toLocaleString()} 
            readOnly 
          />
        </InputWrapper>
      </FormGroup>

      <ApproveButton 
        onClick={() => setShowConfirmModal(true)}
        disabled={loading}
      >
        Approve
      </ApproveButton>

      <SectionTitle>Vendor details</SectionTitle>

      <FormGroup>
        <InputWrapper>
          <Label>Name</Label>
          <Input type="text" value={withdrawalData?.vendor?.name} readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Mobile</Label>
          <Input type="text" value={withdrawalData?.vendor?.mobileNumber} readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Email id</Label>
          <Input type="text" value={withdrawalData?.vendor?.email} readOnly />
        </InputWrapper>
      </FormGroup>

      <TabContainer>
        <div>
          <Tab 
            active={activeTab === 'History'} 
            onClick={() => setActiveTab('History')}
          >
            History
          </Tab>
          <Tab 
            active={activeTab === 'Commissions'} 
            onClick={() => setActiveTab('Commissions')}
          >
            Commissions
          </Tab>
        </div>
        <SortControls>
          <SortLabel>Sort by</SortLabel>
          <SortDropdown>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </SortDropdown>
        </SortControls>
      </TabContainer>

      <HistoryList>
        {transactions
          .filter(transaction => 
            activeTab === 'History' 
              ? transaction.type !== 'commission'
              : transaction.type === 'commission'
          )
          .map((transaction, index) => (
            <HistoryItem key={index}>
              <HistoryDetails>
                <div style={{marginBottom:"5px"}}>{transaction.description}</div>
                <div style={{marginBottom:"5px"}}>
                  {new Date(transaction.date).toLocaleString()}
                </div>
                <div style={{marginBottom:"5px",fontSize:"12px"}}>
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </div>
              </HistoryDetails>
              <HistoryAmount>
                {transaction.amount > 0 ? '+' : ''} ₹ {transaction.amount.toFixed(2)}
              </HistoryAmount>
            </HistoryItem>
          ))}
      </HistoryList>

      {showConfirmModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowConfirmModal(false)}>
              <CloseIcon />
            </CloseButton>
            <ModalTitle>Confirm Approval</ModalTitle>
            <p>Are you sure you want to approve this withdrawal?</p>
            <ModalButtons>
              <CancelButton onClick={() => setShowConfirmModal(false)}>
                No
              </CancelButton>
              <ConfirmButton onClick={handleApprove} disabled={loading}>
                Yes
              </ConfirmButton>
            </ModalButtons>
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
            <ModalTitle>Withdrawal Approved</ModalTitle>
            <p>The withdrawal has been successfully approved.</p>
          </SuccessModal>
        </Modal>
      )}
    </Container>
  );
};

export default ApproveWithdrawal;