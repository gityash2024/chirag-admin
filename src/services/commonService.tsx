import { baseUrl } from "../environment/environment";
import instance from "./httpInterceptor";

export const loginAdmin = (payload) => {
  const url = `${baseUrl}/auth/login`;
  return instance.post(url, payload);
};

export const getTestemonials = () => {
  const url = `${baseUrl}/testimonials`;
  return instance.get(url);
}
export const addTestemonial = (payload) => {
  const url = `${baseUrl}/testimonials`;
  return instance.post(url, payload);
}
export const deleteFarmer = (farmerId) => {
  const url = `${baseUrl}/testimonials/${farmerId}`;
  return instance.delete(url);
}

export const editFarmer = (farmerId) => {
  const url = `${baseUrl}/testimonials/${farmerId}`;
  return instance.put(url);
}

export const uploadTos3=(payload)=>{
  const url = `${baseUrl}/files/upload`;
  return instance.post(url,payload);
}

export const getFarmers = () => {
  const url = `${baseUrl}/farmers/list`;
  return instance.get(url);
}

export const addFarmer = (payload) => {
  const url = `${baseUrl}/farmers`;
  return instance.post(url, payload);
}

export const updateFarmer = (farmerId, payload) => {
  const url = `${baseUrl}/farmers/update/${farmerId}`;
  return instance.put(url, payload);
}

export const blockFarmer = (farmerId) => {
  const url = `${baseUrl}/farmers/block`;
  return instance.patch(url, { farmerId });
}
export const unblockFarmer = (farmerId) => {
  const url = `${baseUrl}/farmers/unblock`;
  return instance.patch(url, { farmerId });
}

export const getFarmerBookings = (data) => {
  console.log(data,'=================data');
  const url = `${baseUrl}/farmers/bookings`;
  return instance.post(url,data);
}

export const getNotifications = (page, limit, search) => {
  const url = `${baseUrl}/notifications/list?page=${page}&limit=${limit}&search=${search}`;
  return instance.get(url);
};

export const addNotification = (payload) => {
  const url = `${baseUrl}/notifications/manage`;
  return instance.post(url, payload);
};

export const updateNotification = (id, payload) => {
  const url = `${baseUrl}/notifications/manage`;
  return instance.post(url, {
    action: "edit",
    notificationId: id,
    notificationData: payload
  });
};

export const deleteNotification = (id) => {
  const url = `${baseUrl}/notifications/manage`;
  return instance.post(url, {
    action: "delete",
    notificationId: id
  });
};

export const getNotificationById = (id) => {
  const url = `${baseUrl}/notifications/${id}`;
  return instance.get(url);
};
export const getAllVendors = (id) => {
  const url = `${baseUrl}/vendors`;
  return instance.get(url);
};
export const getAllRunners = (id) => {
  const url = `${baseUrl}/runners/all`;
  return instance.get(url);
};

export const getAllBookingsList = () => {
  const url = `${baseUrl}/bookings`;
  return instance.get(url); 
}

export const assignVendorToBooking = (payload) => {
  const url = `${baseUrl}/bookings/${payload.id}`;
  return instance.put(url, payload);
};
export const assignRunnerToBooking = (payload) => {
  const url = `${baseUrl}/bookings/${payload.id}`;
  return instance.put(url, payload);
};
export const updateBooking = (payload) => {
  const url = `${baseUrl}/bookings/${payload.id}`;
  return instance.put(url, payload);
};
export const getBookingById = (payload) => {
  const url = `${baseUrl}/bookings/${payload.id}`;
  return instance.get(url, payload);
};
export const getVendorRunners = (payload) => {
  const url = `${baseUrl}/runners/vendors/runners/${payload.id}`;
  return instance.get(url, payload);
};

export const getVendorById = (id) => {
  const url = `${baseUrl}/vendors/${id}`;
  return instance.get(url);
};

export const updateVendor = (id, payload) => {
  const url = `${baseUrl}/vendors/${id}`;
  return instance.put(url, payload);
};

export const registerVendor = (payload) => {
  const url = `${baseUrl}/vendors/register`;
  return instance.post(url, payload);
};

export const blockVendor = (vendorId) => {
  const url = `${baseUrl}/vendors/block`;
  return instance.patch(url, { vendorId });
};

export const unblockVendor = (vendorId) => {
  const url = `${baseUrl}/vendors/unblock`;
  return instance.patch(url, { vendorId });
};

export const getVendorBookings = (vendorId) => {
  const url = `${baseUrl}/vendors/bookings/${vendorId}`;
  return instance.get(url);
};


export const listCommissions = () => {
  const url = `${baseUrl}/commissions/list`;
  return instance.get(url);
};

export const getDefaultCommissions = () => {
  const url = `${baseUrl}/commissions/default`;
  return instance.get(url);
};

export const manageCommission = (payload) => {
  const url = `${baseUrl}/commissions/manage`;
  return instance.post(url, payload);
};

export const updateVendorCommission = (payload) => {
  const url = `${baseUrl}/commissions/vendor`;
  return instance.post(url, payload);
};

export const getVendorCommissions = (vendorId) => {
  const url = `${baseUrl}/vendors/${vendorId}/commissions`;
  return instance.get(url);
};

export const getWalletBalance = () => {
  const url = `${baseUrl}/wallet/balance`;
  return instance.get(url);
};

export const getTransactionHistory = () => {
  const url = `${baseUrl}/wallet/transactions`;
  return instance.get(url);
};

export const requestWithdrawal = (payload) => {
  const url = `${baseUrl}/wallet/request-withdrawal`;
  return instance.post(url, payload);
};

export const getWithdrawalRequests = () => {
  const url = `${baseUrl}/wallet/withdrawal-requests`;
  return instance.get(url);
};

export const approveWithdrawal = (requestId, payload) => {
  const url = `${baseUrl}/wallet/approve-withdrawal/${requestId}`;
  return instance.post(url, payload);
};

export const getAdminWallet = () => {
  const url = `${baseUrl}/wallet/admin-wallet`;
  return instance.get(url);
};

export const deductCommission = (payload) => {
  const url = `${baseUrl}/wallet/deduct-commission`;
  return instance.post(url, payload);
};

export const getWalletStats = () => {
  const url = `${baseUrl}/wallet/stats`;
  return instance.get(url);
};

export const processWithdrawalRequest = (requestId, payload) => {
  const url = `${baseUrl}/wallet/withdrawal-request/${requestId}/process`;
  return instance.post(url, payload);
};

export const cancelWithdrawalRequest = (requestId) => {
  const url = `${baseUrl}/wallet/withdrawal-request/${requestId}`;
  return instance.delete(url);
};