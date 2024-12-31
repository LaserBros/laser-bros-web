import axiosAdminInstance from "../admin/axios/axiosadminInstanse";
import axiosInstance from "../axios/axiosInstance";
import axiosEmployeeInstance from "../employee/axios/axiosemployeeInstanse";

export const fetchAddress = async () => {
  return axiosInstance.get("/users/getAddress");
};

export const payment = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/payment`, data);
    return response.data;
  } catch (error) {
    console.error("Error setting address as default:", error);
    throw error;
  }
};

export const UsergetParticularOrderDetails = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/users/getParticularOrderDetails`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const updateDimensionType = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/users/updateDimensionType`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const shippingCost = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/shippingCost`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const updateBendPrice = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/updateBendPrice`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getEstimatedDimension = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/getEstimatedDimension`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const generateOrderPDF = async (data) => {
  try {
    const response = await axiosAdminInstance.get(
      `/generateOrderPDF?orderId=` + data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const deleteBendQuoteImage = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/users/deleteBendQuoteImage`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getParticularRFQDetails = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/users/getParticularRFQDetails`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getOrders = async (data, perPage = 10) => {
  try {
    const response = await axiosInstance.get(
      `/users/getOrders?page=` + data + "&perPage=" + perPage
    );
    return response.data;
  } catch (error) {
    console.error("Error setting address as default:", error);
    throw error;
  }
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

export const addNotes = async (id, text) => {
  try {
    const data = {
      id: id,
      notes_text: text,
    };
    const response = await axiosInstance.post(`/users/addNotes`, data);
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
    const response = await axiosInstance.post(
      `/users/uploaddxfFiles`,
      formData
    );
    // const response = await axiosInstance.post(`/users/uploaddxfFile`, formData);
    console.log("responseeee ------", response.data);
    // return;
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const fetchParts = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/uploaddxfFile`, data);
    console.log("responseeee", response.data);
    return;
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const updateSubQuoteDetails = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/users/updateSubQuoteDetails`,
      data
    );
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const deleteSubQuote = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/deleteSubQuote`, data);
    // console.log("delete result", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    // throw error;
  }
};

export const reOrder = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/reOrder`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    // throw error;
  }
};

export const updateQuantity = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/updateQuantity`, data);
    // console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getMaterials = async (data) => {
  try {
    const response = await axiosInstance.get(`/users/getMaterials`, data);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getThickness = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/getThickness`, data);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const fetchSelectedFinishes = async (data) => {
  try {
    // const response = await axiosInstance.post(
    //   `/users/fetchSelectedFinishes`,
    //   data
    // );
    const response = await axiosInstance.post(
      `/users/fetchFinishesAndCheck`,
      data
    );
    return response.data.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getFinish = async (data) => {
  try {
    const response = await axiosInstance.get(`/users/getFinish`, data);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getAllLoggedInRequestedQuote = async (page, perPage = 10) => {
  try {
    const response = await axiosInstance.get(
      `/users/getAllUnRequestQuotes?page=` + page + "&perPage=" + perPage
    );
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const fetchRFQ = async (data, PerPage) => {
  try {
    const response = await axiosInstance.get(
      `/users/fetchRFQ?page=` + data + "&perPage=" + PerPage
    );
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getEditQuote = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/getEditQuote`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const deleteRequestQuote = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/users/deleteRequestQuote`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getEditQuotePay = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/users/getParticularEditQuote`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getEditQuotePayment = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/getEditQuote`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getShippingRatesAll = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/users/getShippingRatesAll`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const orderTrackingDetails = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/users/orderTrackingDetails`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getThicknessMaterialFinish = async (data, type, params) => {
  try {
    var response_api = await axiosInstance.post(
      `/users/updateSubQuoteDetailsId`,
      params
    );
    // console.log("response_api", response_api);
    // return;
    return response_api;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const bendQuotes = async (data) => {
  try {
    var response_api = await axiosInstance.post(`/users/bendQuotes`, data);
    // console.log("response_api", response_api);
    // return;
    return response_api;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const copySubQuote = async (data) => {
  try {
    const response = await axiosInstance.post(`/users/copySubQuote`, data);
    console.log("responseeee----", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const trackingDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`users/trackingDetails?id=` + id);
    console.log("responseeee----", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

////// Admin API START ////////////

export const AdmingetUnAllRequestQuotes = async (page, search, sort) => {
  try {
    const response = await axiosAdminInstance.get(
      `/getAllUnRequestQuotes?page=` +
        page +
        "&query=" +
        search +
        "&ascending=" +
        sort
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdminfetchRFQ = async (page, search, sort) => {
  try {
    const response = await axiosAdminInstance.get(
      `/fetchRFQForAdmin?page=` +
        page +
        "&query=" +
        search +
        "&ascending=" +
        sort
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdminfetchProfile = async () => {
  try {
    const response = await axiosAdminInstance.get(`/fetchProfile`);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdminupdateProfile = async (formData) => {
  try {
    const response = await axiosAdminInstance.put(`/updateProfile`, formData);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdminuploadImage = async (formData) => {
  try {
    const response = await axiosAdminInstance.put(`/uploadimage`, formData);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const Adminupdatepassword = async (newPassword, oldPassword) => {
  try {
    const data = {
      new_password: newPassword,
      old_password: oldPassword,
    };
    const response = await axiosAdminInstance.post(`/updatePassword`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const updateQuoteState = async (id, status) => {
  try {
    const data = {
      id: id,
      status: status,
    };
    const response = await axiosAdminInstance.post(`/updateQuoteState`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const updateRequestQuote = async (id, status) => {
  try {
    const data = {
      id: id,
      status: status,
    };
    const response = await axiosAdminInstance.post(`/updateRequestQuote`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getOrdersAdmin = async (
  query,
  page,
  type,
  material_code,
  move_status,
  postOps,
  ascending
) => {
  try {
    const response = await axiosAdminInstance.get(
      `/getOrdersAdmin?query=` +
        query +
        "&page=" +
        page +
        "&type=" +
        type +
        "&material_code=" +
        material_code +
        "&move_status=" +
        move_status +
        "&postOps=" +
        postOps +
        "&ascending=" +
        ascending
    );
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const fetchOrdersInComplete = async (page, search, sort) => {
  try {
    const response = await axiosAdminInstance.get(
      `/fetchOrdersInComplete?page=` +
        page +
        "&query=" +
        search +
        "&ascending=" +
        sort
    );
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getSpecificFilters = async (type, move_status) => {
  try {
    const response = await axiosAdminInstance.get(
      `/getSpecificFilters?type=` + type + "&move_status=" + move_status
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const fetchOrdersInPackaging = async (page, search, sort) => {
  try {
    const response = await axiosAdminInstance.get(
      `/fetchOrdersInPackaging?page=` +
        page +
        "&query=" +
        search +
        "&ascending=" +
        sort
    );
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getAllEmployees = async (page, search, sort) => {
  try {
    const response = await axiosAdminInstance.get(
      `/getAllEmployees?page=` +
        page +
        "&query=" +
        search +
        "&ascending=" +
        sort
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getAllCustomers = async (page, search = "", sort) => {
  try {
    const response = await axiosAdminInstance.get(
      `/getCustomerDetails?page=` + page + "&query=" + search
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getParticularProfile = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/getParticularProfile`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getParticularUserQuotes = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/getParticularUserQuotes`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getEmployeeDetails = async () => {
  try {
    const response = await axiosAdminInstance.get(`/getEmployeeDetails`);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const updateEmpDetails = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/updateEmployeeDetails`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const empSignup = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/empSignup`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const moveOrderToQueue = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/moveOrderToQueue`, data);
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const assignTaskToEmployees = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/assignTaskToEmployees`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const moveOrderStatus = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/moveToArchive`, data);
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdminmoveOrderStatus = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/moveOrderStatus`, data);
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getParticularOrderDetails = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/getParticularOrderDetails`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const startPackaging = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/startPackaging`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getShippingRates = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/getShippingRates`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getSubQuote = async (data) => {
  try {
    const response = await axiosAdminInstance.get(`/getSubQuote/` + data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const fetchShippingBoxDetails = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/fetchShippingBoxDetails`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const moveOrderToComplete = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/moveOrderToComplete`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const fetchOrdersInQueue = async (selectedValue) => {
  try {
    const response = await axiosAdminInstance.get(
      `/fetchOrdersInQueue?query=` + selectedValue
    );
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getAllTransactions = async (page) => {
  try {
    const response = await axiosAdminInstance.get(
      `/getAllTransactions?page=` + page
    );
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getParticularTransaction = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/getParticularTransaction`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const fetchOrdersInArchive = async (data, page) => {
  try {
    const response = await axiosAdminInstance.get(
      `/fetchOrdersInArchive?query=` + data + `&page=` + page
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const downloadAllFiles = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/downloadAllFiles`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const orderAdminTrackingDetails = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/orderTrackingDetails`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const downloadParticularFile = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/downloadParticularFile`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const updateWorkStatus = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/updateWorkStatus`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdmingetEditQuote = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/getEditQuote`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const updateShippingCost = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/updateShippingCost
    `,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdminaddNotes = async (id, text) => {
  try {
    const data = {
      id: id,
      notes_text: text,
    };
    const response = await axiosAdminInstance.post(`/addNotes`, data);
    return response.data;
  } catch (error) {
    console.error("Error setting address as default:", error);
    throw error;
  }
};

export const AdminfetchSelectedFinishes = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/fetchSelectedFinishes`,
      data
    );
    return response.data.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdminbendQuotes = async (data) => {
  try {
    var response_api = await axiosAdminInstance.post(`/bendQuotes`, data);
    // console.log("response_api", response_api);
    // return;
    return response_api;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdmingetMaterials = async (data) => {
  try {
    const response = await axiosAdminInstance.get(`/getMaterials`, data);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdmingetThickness = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/getThickness`, data);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getAllMaterialCodes = async () => {
  try {
    const response = await axiosAdminInstance.get(`/getAllMaterialCodes`);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getAllMaterialCodesFilter = async () => {
  try {
    const response = await axiosAdminInstance.get(`/getAllMaterialCodesFilter`);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getFinishingFilter = async () => {
  try {
    const response = await axiosAdminInstance.get(`/getFinishingFilter`);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getFinishAdmin = async () => {
  try {
    const response = await axiosAdminInstance.get(`/getFinish`);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdmingetThicknessMaterialFinish = async (data, type, params) => {
  try {
    var response_api = await axiosAdminInstance.post(
      `/editSubQuoteDetailsAdmin`,
      params
    );
    // console.log("response_api", response_api);
    // return;
    return response_api;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdminupdateQuantity = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/updateQuantity`, data);
    // console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getBendingFilter = async (data) => {
  try {
    const response = await axiosAdminInstance.get(`/getBendingFilter`);
    // console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const AdminupdateSubQuoteDetails = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/updateSubQuoteDetails`,
      data
    );
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const editSubQuote = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/editSubQuote`, data);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const markCompleteQuote = async (data) => {
  try {
    const response = await axiosAdminInstance.post(`/markCompleteQuote`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getEmpDetails = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/getParticularEmployee`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const deleteEmployeeDetails = async (id) => {
  const data = {
    id: id,
  };
  try {
    const response = await axiosAdminInstance.post(
      `/deleteEmployeeDetails`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error setting employee as default:");
    throw error;
  }
};

export const getParticularEditQuoteAdmin = async (data) => {
  try {
    const response = await axiosAdminInstance.post(
      `/getParticularEditQuote`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const getDashboardDetails = async (fromDate, toDate) => {
  try {
    const response = await axiosAdminInstance.get(
      `/getDashboardDetails?fromDate=` + fromDate + `&toDate=` + toDate
    );
    return response.data;
  } catch (error) {
    console.error("Error setting employee as default:");
    throw error;
  }
};

/////////// Employee API Start Here ///////

export const EmpfetchProfile = async () => {
  try {
    const response = await axiosEmployeeInstance.get(`/fetchProfile`);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpupdateProfile = async (formData) => {
  try {
    const response = await axiosEmployeeInstance.put(
      `/updateProfile`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpuploadImage = async (formData) => {
  try {
    const response = await axiosEmployeeInstance.put(`/uploadimage`, formData);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const Empupdatepassword = async (newPassword, oldPassword) => {
  try {
    const data = {
      new_password: newPassword,
      old_password: oldPassword,
    };
    const response = await axiosEmployeeInstance.post(`/updatePassword`, data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpupdateQuoteState = async (id, status) => {
  try {
    const data = {
      id: id,
      status: status,
    };
    const response = await axiosEmployeeInstance.post(
      `/updateQuoteStateEmployee`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpgetOrders = async (page, search, sort) => {
  try {
    const response = await axiosEmployeeInstance.get(
      `/getOrdersEmployee?page=` +
        page +
        "&query=" +
        search +
        "&ascending=" +
        sort
    );
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpfetchOrdersInComplete = async (page, search, sort) => {
  try {
    const response = await axiosEmployeeInstance.get(
      `/fetchOrdersInCompleteEmployee?page=` +
        page +
        "&query=" +
        search +
        "&ascending=" +
        sort
    );
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpmoveOrderToQueue = async (data) => {
  try {
    const response = await axiosEmployeeInstance.post(
      `/moveOrderToQueue`,
      data
    );
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpmoveOrderStatus = async (data) => {
  try {
    const response = await axiosEmployeeInstance.post(`/moveToArchive`, data);
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpAdminmoveOrderStatus = async (data) => {
  try {
    const response = await axiosEmployeeInstance.post(`/moveOrderStatus`, data);
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpgetParticularOrderDetails = async (data) => {
  try {
    const response = await axiosEmployeeInstance.post(
      `/getParticularOrderDetails`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpfetchOrdersInQueue = async (selectedValue) => {
  try {
    const response = await axiosEmployeeInstance.get(
      `/fetchOrdersInQueueEmployee?query=` + selectedValue
    );
    return response;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpfetchOrdersInArchive = async (data, page) => {
  try {
    const response = await axiosEmployeeInstance.get(
      `/fetchOrdersInArchiveEmployee?query=` + data + `&page=` + page
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpdownloadAllFiles = async (data) => {
  try {
    const response = await axiosEmployeeInstance.post(
      `/downloadAllFiles`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpdownloadParticularFile = async (data) => {
  try {
    const response = await axiosEmployeeInstance.post(
      `/downloadParticularFile`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpupdateWorkStatus = async (data) => {
  try {
    const response = await axiosEmployeeInstance.post(
      `/updateWorkStatus`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpgetAllMaterialCodes = async () => {
  try {
    const response = await axiosEmployeeInstance.get(`/getAllMaterialCodes`);
    console.log("responseeee", response.data);
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpmarkCompleteQuote = async (data) => {
  try {
    const response = await axiosEmployeeInstance.post(
      `/markCompleteQuote`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const EmpgetDashboardDetails = async (fromDate, toDate) => {
  try {
    const response = await axiosEmployeeInstance.get(
      `/getDashboardDetailsEmployee?fromDate=` + fromDate + `&toDate=` + toDate
    );
    return response.data;
  } catch (error) {
    console.error("Error setting employee as default:");
    throw error;
  }
};
export const updateCustomerTaxExempt = async (formData) => {
  try {
    const response = await axiosAdminInstance.put(
      `/updateCustomerTaxExempt`,
      formData
    );
    // const response = await axiosInstance.post(`/users/uploaddxfFile`, formData);
    console.log("responseeee ------", response.data);
    // return;
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};

export const uploadQuoteAdmin = async (formData) => {
  try {
    const response = await axiosAdminInstance.post(`/uploaddxfFiles`, formData);
    // const response = await axiosInstance.post(`/users/uploaddxfFile`, formData);
    console.log("responseeee ------", response.data);
    // return;
    return response.data;
  } catch (error) {
    console.error("Something wents wrong.", error);
    throw error;
  }
};
