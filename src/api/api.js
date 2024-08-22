import axiosInstance from "../axios/axiosInstance";

export const fetchAddress = async () => {
  return axiosInstance.get("/users/getAddress");
};

export const setAddressAsDefault = async (addressId) => {
  try {
    const data = {
      address_id: addressId,
    };
    const response = await axiosInstance.post(`/users/setdefaultAddress`, data);
    return response.data;
  } catch (error) {
    console.error("Error setting address as default:", error);
    throw error;
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const data = {
      address_id: addressId,
    };
    const response = await axiosInstance.post(`/users/deleteAddress`, data);
    return response.data;
  } catch (error) {
    console.error("Error setting address as default:", error);
    throw error;
  }
};

export const fetchSingleAddress = async (addressId) => {
  try {
    const response = await axiosInstance.get(
      `/users/getUserAddress?address_id=${addressId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error setting address as default:", error);
    throw error;
  }
};

export const updateAddress = async (formData) => {
  try {
    const response = await axiosInstance.put(`/users/updateAddress`, formData);
    return response.data;
  } catch (error) {
    console.error("Error update address", error);
    throw error;
  }
};

export const addCard = async (formData) => {
  try {
    const response = await axiosInstance.post(`/users/addCard`, formData);
    return response.data;
  } catch (error) {
    console.error("Error update address", error);
    throw error;
  }
};

export const getCard = async () => {
  try {
    const response = await axiosInstance.get(`/users/getCard`);
    return response.data;
  } catch (error) {
    console.error("Error setting address as default:");
    throw error;
  }
};

export const deleteCard = async (cardId) => {
  const data = {
    card_detail_id: cardId,
  };
  try {
    const response = await axiosInstance.put(`/users/deleteCard`, data);
    return response.data;
  } catch (error) {
    console.error("Error setting address as default:");
    throw error;
  }
};

export const setCardAsDefault = async (cardId) => {
  try {
    const data = {
      card_detail_id: cardId,
    };
    const response = await axiosInstance.post(`/users/setdefaultCard`, data);
    return response.data;
  } catch (error) {
    console.error("Error setting card as default:", error);
    throw error;
  }
};

export const updatepassword = async (newPassword, oldPassword) => {
  try {
    const data = {
      new_password: newPassword,
      old_password: oldPassword,
    };
    const response = await axiosInstance.post(`/updatepassword`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get(`/users/fetchProfile`);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const uploadImage = async (formData) => {
  try {
    const response = await axiosInstance.put(`/users/uploadimage`, formData);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const updateProfile = async (formData) => {
  try {
    const response = await axiosInstance.put(`/users/updateProfile`, formData);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const uploadQuote = async (formData) => {
  try {
    const response = await axiosInstance.post(`/users/uploadQuote`, formData);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const fetchParts = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/fetchParts`, data);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const updateQuantity = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/updateQuantity`, data);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};
