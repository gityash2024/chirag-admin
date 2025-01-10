// AdminNotificationIcon.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from '../services/httpInterceptor';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Bell } from 'lucide-react';

const NotificationContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1100;
`;

const NotificationDropdown = styled.div`
  position: fixed;
  right: 80px;
  top: 70px;
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
  transition: background-color 0.2s ease;
  
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

const NotificationTitle = styled.div`
  font-weight: ${props => props.isRead ? 'normal' : 'bold'};
  margin-bottom: 4px;
`;

const NotificationDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const NotificationTime = styled.div`
  font-size: 12px;
  color: #999;
`;

const EmptyNotification = styled.div`
  padding: 10px;
  text-align: center;
  color: #666;
`;

const AdminNotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get('/admin/notifications/list');
      setNotifications(response.data.notifications || []);
      setUnreadCount(response.data.unreadCount || 0);
      // Update localStorage for badge persistence
      localStorage.setItem('adminNotificationCount', response.data.unreadCount || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // Set up polling interval
    const pollInterval = setInterval(() => {
      fetchNotifications();
    }, 10000); // 10 seconds

    // Cleanup on unmount
    return () => {
      clearInterval(pollInterval);
    };
  }, [fetchNotifications]);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await axios.post('/admin/notifications/mark-read', {
          notificationIds: [notification._id]
        });
        setUnreadCount(prev => Math.max(0, prev - 1));
        setNotifications(prev =>
          prev.map(n =>
            n._id === notification._id ? { ...n, isRead: true } : n
          )
        );
        // Update localStorage
        localStorage.setItem('adminNotificationCount', Math.max(0, unreadCount - 1));
      } catch (error) {
        console.error('Error marking notification as read:', error);
        toast.error('Failed to mark notification as read');
      }
    }
  };

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Fetch latest notifications when opening dropdown
      fetchNotifications();
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.notification-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <NotificationContainer className="notification-container">
      <Bell 
        onClick={handleBellClick} 
        style={{ cursor: 'pointer' }}
        size={24}
      />
      {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
      
      {isOpen && (
        <NotificationDropdown>
          {notifications.length === 0 ? (
            <EmptyNotification>
              No notifications
            </EmptyNotification>
          ) : (
            notifications.map(notification => (
              <NotificationItem
                key={notification._id}
                isRead={notification.isRead}
                onClick={() => handleNotificationClick(notification)}
              >
                <NotificationTitle isRead={notification.isRead}>
                  {notification.title}
                </NotificationTitle>
                <NotificationDescription>
                  {notification.description}
                </NotificationDescription>
                <NotificationTime>
                  {new Date(notification.createdAt).toLocaleString()}
                </NotificationTime>
              </NotificationItem>
            ))
          )}
        </NotificationDropdown>
      )}
    </NotificationContainer>
  );
};

export default AdminNotificationIcon;