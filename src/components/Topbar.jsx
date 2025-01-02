import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import printIcon from '../assets/wallet.svg';
import profileIcon from '../assets/profile.svg';
import { getAllVendors, getFarmers, getAllRunners, getAdminWallet, getWalletStats } from '../services/commonService';
import AdminNotificationIcon from './AdminNotificationIcon';

const scroll = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
`;

const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  height: 60px;
`;

const TopbarLeft = styled.div`
  h1 {
    font-size: 24px;
    margin: 0;
  }
  width: 20%;
`;

const TopbarCenter = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 40px;
  background: #f8f9fa;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;

const RunningStrip = styled.div`
  display: flex;
  position: absolute;
  white-space: nowrap;
  will-change: transform;
  animation: ${scroll} 30s linear infinite;
`;

const StripContent = styled.div`
  display: flex;
  padding-right: 50px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
  font-family: "Public Sans";
  font-size: 14px;
  font-weight: 500;
`;

const StatValue = styled.span`
  color: ${props => props.color};
  margin-left: 5px;
  font-weight: 600;
`;

const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: flex-end;
`;

const TopbarIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 20px;
  cursor: pointer;
`;

const Topbar = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    farmers: 0,
    vendors: 0,
    runners: 0,
    balance: 0,
    totalCommission: 0,
    commissionTransactions: 0
  });

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const [farmersRes, vendorsRes, runnersRes, walletRes, statsRes] = await Promise.all([
        getFarmers(),
        getAllVendors(),
        getAllRunners(),
        getAdminWallet(),
        getWalletStats()
      ]);

      setStats({
        farmers: farmersRes.data.length,
        vendors: vendorsRes.data.length,
        runners: runnersRes.data.length,
        balance: walletRes.data.adminWallet.balance,
        totalCommission: walletRes.data.totalCommissionCollected,
        commissionTransactions: walletRes.data.adminWallet.transactions.filter(t => t.type === 'commission').length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statItems = (
    <StripContent>
      <StatItem>
        Total Farmers: <StatValue color="#07B27B">{stats.farmers}</StatValue>
      </StatItem>
      <StatItem>
        Total Vendors: <StatValue color="#FF9A01">{stats.vendors}</StatValue>
      </StatItem>
      <StatItem>
        Total Runners: <StatValue color="#529DDF">{stats.runners}</StatValue>
      </StatItem>
      <StatItem>
        Available Balance: <StatValue color="#383838">₹ {stats.balance.toFixed(2)}</StatValue>
      </StatItem>
      <StatItem>
        Total Commission: <StatValue color="#41B079">₹ {stats.totalCommission.toFixed(2)}</StatValue>
      </StatItem>
      <StatItem>
        Commission Transactions: <StatValue color="#F1614B">{stats.commissionTransactions}</StatValue>
      </StatItem>
    </StripContent>
  );

  return (
    <TopbarContainer>
      <TopbarLeft>
      </TopbarLeft>
      <TopbarCenter>
        <RunningStrip>
          {statItems}
          {statItems}
        </RunningStrip>
      </TopbarCenter>
      <TopbarRight>
      <AdminNotificationIcon />
        <TopbarIcon onClick={() => navigate('/wallet')} src={printIcon} alt="Print" />
        <TopbarIcon onClick={() => navigate('/profile')} src={profileIcon} alt="Profile" />
      </TopbarRight>
    </TopbarContainer>
  );
};

export default Topbar;