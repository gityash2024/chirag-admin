import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import successWithdrawalCheck from '../../assets/check-wallet.png';
import CloseIcon from '@material-ui/icons/Close';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { 
  getAdminWallet, 
  deductCommission, 
  getWalletStats
} from '../../services/commonService';
const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans' ;
  background-color: #F4F4F4;
  width:90%;
  margin: 0 auto;
  border-radius: 8px;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #383838;
  margin-bottom: 20px;
`;

const EarningsOverview = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const EarningItem = styled.div`
  background-color: #FFFFFF;
  padding: 42px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  margin-right: 15px;
  position: relative; /* Allows positioning of the dropdown inside */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:last-child {
    margin-right: 0;
  }
`;

const EarningValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #383838;
`;

const EarningLabel = styled.div`
  font-size: 14px;
  color: #8D98A4;
  margin-top: 10px;
`;

const Dropdown = styled.select`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #DBDADE;
  color: #383838;
`;

const WithdrawButton = styled.button`
  width: 20%;
  padding: 10px;
  background-color: #383838;
  border-radius: 4px;
  color: #FFFFFF;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#383838' : 'transparent'};
  color: ${props => props.active ? '#383838' : '#8D98A4'};
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;
`;

const TransactionItem = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 10px;
`;

const TransactionId = styled.div`
  font-weight: 600;
  color: #383838;
`;

const TransactionDetails = styled.div`
  font-size: 14px;
  color: #8D98A4;
  margin: 5px 0;
`;

const TransactionAmount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const TransactionStatus = styled.span`
  color: #41B079;
  font-size: 12px;
  font-weight: bold;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
`;

const PageInfo = styled.span`
  margin-right: 10px;
  color: #8D98A4;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid #DBDADE;
  background-color: ${props => props.active ? '#383838' : '#FFFFFF'};
  color: ${props => props.active ? '#FFFFFF' : '#383838'};
  cursor: pointer;
  margin: 0 2px;
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
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 4px;
  width: 300px;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
  color: #383838;
`;

const ModalInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #383838;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SuccessModal = styled(ModalContent)`
  text-align: center;
`;

const SuccessIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;


const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  grid-column: span 2;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
`;



const TransactionDate = styled.div`
  font-size: 14px;
  color: #8d98a4;
`;

const SubmitButton = styled.button`
  width: 200px;
  grid-column: span 2;
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
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
const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: #383838;
`;

const HistoryItem = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HistoryDetails = styled.div``;

const HistoryAmount = styled.div`
  color: #41B079;
  font-weight: bold;
`;
const LoadingSpinner = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    color: #383838;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState({
    balance: 0,
    transactions: [],
    totalCommission: 0
  });
  const [activeTab, setActiveTab] = useState('commission');
  const [showDeductModal, setShowDeductModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [deductionAmount, setDeductionAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const [walletResponse, statsResponse] = await Promise.all([
        getAdminWallet(),
        getWalletStats()
      ]);
      
      setWalletData({
        balance: walletResponse.data.adminWallet.balance,
        transactions: walletResponse.data.adminWallet.transactions,
        totalCommission: walletResponse.data.totalCommissionCollected,
        vendorBalances: walletResponse.data.vendorBalances
      });
    } catch (error) {
      toast.error('Failed to fetch wallet data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeductCommission = async () => {
    try {
      if (!selectedVendor || !deductionAmount || !description) {
        setError('Please fill all fields');
        return;
      }

      setLoading(true);
      await deductCommission({
        vendorId: selectedVendor.vendorId,
        amount: Number(deductionAmount),
        description
      });

      toast.success('Commission deducted successfully');
      setShowDeductModal(false);
      fetchWalletData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to deduct commission');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !walletData.transactions.length) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <Header>Admin Wallet</Header>

      <EarningsOverview>
        <EarningItem>
          <EarningValue>₹ {walletData.balance.toFixed(2)}</EarningValue>
          <EarningLabel>Available Balance</EarningLabel>
        </EarningItem>
        <EarningItem>
          <EarningValue>₹ {walletData.totalCommission.toFixed(2)}</EarningValue>
          <EarningLabel>Total Commission Collected</EarningLabel>
        </EarningItem>
        <EarningItem>
          <EarningValue>
            {walletData.transactions.filter(t => t.type === 'commission').length}
          </EarningValue>
          <EarningLabel>Total Commission Transactions</EarningLabel>
        </EarningItem>
      </EarningsOverview>

      <Tabs>
        <Tab 
          active={activeTab === 'commission'} 
          onClick={() => setActiveTab('commission')}
        >
          Commission History
        </Tab>
        <Tab 
          active={activeTab === 'vendors'} 
          onClick={() => setActiveTab('vendors')}
        >
          Vendor Balances
        </Tab>
      </Tabs>

      {activeTab === 'commission' ? (
        <TransactionList>
          {walletData.transactions
            .filter(t => t.type === 'commission')
            .map((transaction, index) => (
              <TransactionItem key={index}>
                <TransactionHeader>
                  <TransactionTitle>Commission Transaction</TransactionTitle>
                  <TransactionDate>
                    {new Date(transaction.date).toLocaleString()}
                  </TransactionDate>
                </TransactionHeader>
                <TransactionDetails>
                  <div>{transaction.description}</div>
                  <TransactionAmount>₹ {transaction.amount.toFixed(2)}</TransactionAmount>
                </TransactionDetails>
              </TransactionItem>
            ))}
        </TransactionList>
      ) : (
        <TransactionList>
        {walletData.vendorBalances?.map((vendor, index) => (
  <TransactionItem key={index}>
    <TransactionHeader>
      <TransactionTitle>{vendor.name}</TransactionTitle>
      <ActionButton 
        onClick={() => {
          setSelectedVendor(vendor);
          setShowDeductModal(true);
        }}
        disabled={!vendor.balance || vendor.balance <= 0}
        style={{ opacity: (!vendor.balance || vendor.balance <= 0) ? 0.5 : 1 }}
      >
        Deduct Commission
      </ActionButton>
    </TransactionHeader>
    <TransactionDetails>
      <div>Available Balance: ₹ {vendor.balance?.toFixed(2) || "0.00"}</div>
      <div>Total Commission Paid: ₹ {vendor.totalCommissionPaid?.toFixed(2) || "0.00"}</div>
      {(!vendor.balance || vendor.balance <= 0) && (
        <div style={{ color: '#666', fontSize: '12px', marginTop: '5px' }}>
          Insufficient balance for commission deduction
        </div>
      )}
    </TransactionDetails>
  </TransactionItem>
))}
        </TransactionList>
      )}

      {showDeductModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowDeductModal(false)}>
              <CloseIcon />
            </CloseButton>
            <ModalTitle>Deduct Commission</ModalTitle>
            <InputGroup>
              <Label>Vendor Name</Label>
              <Input
                type="text"
                value={selectedVendor?.name}
                disabled
              />
            </InputGroup>
            <InputGroup>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={deductionAmount}
                onChange={(e) => setDeductionAmount(e.target.value)}
                max={selectedVendor?.balance}
              />
            </InputGroup>
            <InputGroup>
              <Label>Description</Label>
              <Input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ModalButton 
              onClick={handleDeductCommission}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Deduct Commission'}
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Wallet;