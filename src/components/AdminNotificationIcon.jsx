import React, { useState, useEffect } from 'react';
import axios from '../services/httpInterceptor';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import styled from 'styled-components';
import { Bell } from 'lucide-react';

const NotificationContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1100; // Higher z-index to ensure dropdown appears above other elements
`;

const NotificationDropdown = styled.div`
  position: fixed; // Change to fixed positioning
  right: 80px; // Adjust based on your layout
  top: 70px; // Adjust based on your topbar height
  width: 300px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1100;
`;

const NotificationItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  background-color: ${props => props.isRead ? 'white' : '#f0f7ff'};
  
  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #FF0000;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000; // Lower than notification dropdown
`;



const AdminNotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    setupSocket();
  }, []);

  const setupSocket = () => {
    const socket = io('https://chirag.solminica.com');
    socket.on('adminNotification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      toast.info(notification.description);
    });
    return () => socket.disconnect();
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/admin/notifications/list');
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await axios.post('/api/admin/notifications/mark-read', {
          notificationIds: [notification._id]
        });
        setUnreadCount(prev => prev - 1);
        setNotifications(prev =>
          prev.map(n =>
            n._id === notification._id ? { ...n, isRead: true } : n
          )
        );
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
  };

  return (
    <NotificationContainer>
      <Bell 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ cursor: 'pointer' }}
      />
      {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
      
      {isOpen && (
  <NotificationDropdown>
    {notifications.length === 0 ? (
      <div style={{ padding: '10px', textAlign: 'center', color: '#666' }}>
        No notifications
      </div>
    ) : (
      notifications.map(notification => (
        <NotificationItem
          key={notification._id}
          isRead={notification.isRead}
          onClick={() => handleNotificationClick(notification)}
        >
          <div style={{ fontWeight: notification.isRead ? 'normal' : 'bold' }}>
            {notification.title}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {notification.description}
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            {new Date(notification.createdAt).toLocaleString()}
          </div>
        </NotificationItem>
      ))
    )}
  </NotificationDropdown>
)}

    </NotificationContainer>
  );
};

export default AdminNotificationIcon;