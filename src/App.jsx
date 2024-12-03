import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import GlobalStyle from './GlobalStyle';

import LanguageSelection from './pages/auth/LanguageSelection';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import ManageFarmer from './pages/Farmer';
import ManageVendor from './pages/Vendor';
import Testimonials from './pages/Testemonials';
import Notifications from './pages/Notifications';
import Withdrawals from './pages/Withdrawals';
import AssignRunnerDetails from './pages/Bookings/AssignRunnerDetails';
import Vendor from './pages/Vendor/addVendor';
import VendorList from './pages/Commissions/VendorList';
import VendorDetails from './pages/Commissions/VendorDetails';
import CommissionManagement from './pages/Commissions';
import AddTestimonial from './pages/Testemonials/addTestemonials';
import AddNotification from './pages/Notifications/addNotifications';
import ApproveWithdrawal from './pages/Withdrawals/approveWithdrawal';
import AddFarmer from './pages/Farmer/addFarmer';
import ConfirmedBookingDetails from './pages/Bookings/ConfirmedBookingDetails';
import RunnerReachedBookingDetail from './pages/Bookings/RunnerReachedBookingDetail';
import RunnerCanceledBookingDetail from './pages/Bookings/RunnerCanceledBookingDetail';
import Recommedations from './pages/Recomendations';
import NotFound from './components/404';
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const PageContent = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
`;

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: #383838;
    color: white;
  }
  .Toastify__close-button {
    color: white;
  }
  .Toastify__progress-bar {
    background-color: #f0f0f0;
  }
`;

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('userData') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Sidebar />
                <MainContent>
                  <Topbar />
                  <PageContent>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/assign-runner/:id" element={<AssignRunnerDetails />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/manage-vendor" element={<ManageVendor />} />
                      <Route path="/testemonials" element={<Testimonials />} />
                      <Route path="/recommendation" element={<Recommedations />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/add-notification" element={<AddNotification />} />
                      <Route path="/edit-notification" element={<AddNotification />} />
                      <Route path="/withdrawals" element={<Withdrawals />} />
                      <Route path="/commission-management" element={<CommissionManagement />} />
                      <Route path="/commission-vendors" element={<VendorList />} />
                      <Route path="/commission-vendors/:id" element={<VendorDetails />} />
                      <Route path="/approve-withdrawal/:requestId" element={<ApproveWithdrawal />} />
                      <Route path="/add-vendor" element={<Vendor mode="add" />} />
                      <Route path="/add-testimonial" element={<AddTestimonial />} />
                      <Route path="/add-testimonial/:id" element={<AddTestimonial />} />
                      <Route path="/edit-testimonial" element={<AddTestimonial />} />
                      <Route path="/view-vendor/:id" element={<Vendor mode="view" />} />
                      <Route path="/edit-vendor/:id" element={<Vendor mode="edit" />} />
                      <Route path="/manage-farmer" element={<ManageFarmer />} />
                      <Route path="/add-farmer" element={<AddFarmer />} />
                      <Route path="/edit-farmer" element={<AddFarmer />} />
                      <Route path="/view-farmer" element={<AddFarmer />} />
                      <Route path="/completed-booking/:id" element={<ConfirmedBookingDetails />} />
                      <Route path="/confirm-booking-details/:id" element={<RunnerReachedBookingDetail />} />
                      <Route path="/cancelled-booking-details/:id" element={<RunnerCanceledBookingDetail />} />
                      <Route path="/booking-details/:id" element={<ConfirmedBookingDetails />} />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </PageContent>
                </MainContent>
              </ProtectedRoute>
            }
          />
        </Routes>
        <StyledToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AppContainer>
    </Router>
  );
}

export default App;