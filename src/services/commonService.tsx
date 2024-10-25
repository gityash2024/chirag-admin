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


