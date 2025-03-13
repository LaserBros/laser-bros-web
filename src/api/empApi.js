import axiosInstance from "../axios/axiosInstance";
import axiosEmployeeInstance from "../employee/axios/axiosemployeeInstanse"; 

export const updateBendPrice = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/updateBendPrice`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  export const updateBendingPrice = async (data) => {
    try {
      var response_api = await axiosEmployeeInstance.post(`/updateBendingPrice`, data);
      // // console.log("response_api", response_api);
      // return;
      return response_api.data;
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
  
  export const getEstimatedDimension = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
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
      const response = await axiosEmployeeInstance.get(
        `/generateOrderPDF?orderId=` + data
      );
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const generateOrderPDFAdmin = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/generateOrderPDF`, data
      );
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };


  ////// Admin API START ////////////

export const AdmingetUnAllRequestQuotes = async (page, search, sort) => {
    try {
      const response = await axiosEmployeeInstance.get(
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
      const response = await axiosEmployeeInstance.get(
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
      const response = await axiosEmployeeInstance.get(`/fetchProfile`);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AdminupdateProfile = async (formData) => {
    try {
      const response = await axiosEmployeeInstance.put(`/updateProfile`, formData);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AdminuploadImage = async (formData) => {
    try {
      const response = await axiosEmployeeInstance.put(`/uploadimage`, formData);
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
      const response = await axiosEmployeeInstance.post(`/updatePassword`, data);
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
      const response = await axiosEmployeeInstance.post(`/updateQuoteState`, data);
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
      const response = await axiosEmployeeInstance.post(`/updateRequestQuote`, data);
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
      const response = await axiosEmployeeInstance.get(
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
      const response = await axiosEmployeeInstance.get(
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
      let url = `/getSpecificFilters?type=${type}`;
  
      if (move_status) {
        url += `&move_status=${move_status}`;
      }
  
      const response = await axiosEmployeeInstance.get(url);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const deleteSubQuote = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/deleteSubQuote`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };


  export const fetchOrdersInPackaging = async (page, search, sort) => {
    try {
      const response = await axiosEmployeeInstance.get(
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
      const response = await axiosEmployeeInstance.get(
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
      const response = await axiosEmployeeInstance.get(
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
      const response = await axiosEmployeeInstance.post(
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
      const response = await axiosEmployeeInstance.post(
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
      const response = await axiosEmployeeInstance.get(`/getEmployeeDetails`);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const updateEmpDetails = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
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
      const response = await axiosEmployeeInstance.post(`/empSignup`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const moveOrderToQueue = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/moveOrderToQueue`, data);
      return response;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const assignTaskToEmployees = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
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
      const response = await axiosEmployeeInstance.post(`/moveToArchive`, data);
      return response;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AdminmoveOrderStatus = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/moveOrderStatus`, data);
      return response;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const getParticularOrderDetails = async (data) => {
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
  
  export const startPackaging = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/startPackaging`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const getShippingRates = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/getShippingRates`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const getSubQuote = async (data) => {
    try {
      const response = await axiosEmployeeInstance.get(`/getSubQuote/` + data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const fetchShippingBoxDetails = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
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
      const response = await axiosEmployeeInstance.post(
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
      const response = await axiosEmployeeInstance.get(
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
      const response = await axiosEmployeeInstance.get(
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
      const response = await axiosEmployeeInstance.post(
        `/getParticularTransaction`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  
  export const CancleRefund = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/refundPayment`,
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
      const response = await axiosEmployeeInstance.get(
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
      const response = await axiosEmployeeInstance.post(`/downloadAllFiles`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const orderAdminTrackingDetails = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
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
  
  export const updateWorkStatus = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/updateWorkStatus`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AdmingetEditQuote = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/getEditQuote`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const updateShippingCost = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
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
  
  export const  getShippingEstimatedCost = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/getShippingEstimatedCost
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
      const response = await axiosEmployeeInstance.post(`/addNotes`, data);
      return response.data;
    } catch (error) {
      console.error("Error setting address as default:", error);
      throw error;
    }
  };
  
  export const AdminfetchSelectedFinishes = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
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
      var response_api = await axiosEmployeeInstance.post(`/bendQuotes`, data);
      // // console.log("response_api", response_api);
      // return;
      return response_api;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AdmingetMaterials = async (data) => {
    try {
      const response = await axiosEmployeeInstance.get(`/getMaterials`, data);
      // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AdmingetThickness = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/getThickness`, data);
      // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const updateThicknessDetails = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/updateThicknessDetails`,
        data
      );
      // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  
  export const addThickness = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/addThickness`,
        data
      );
      // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AddMaterialAdmin = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/addMaterials`,
        data
      );
      // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  
  export const getAllMaterialCodes = async () => {
    try {
      const response = await axiosEmployeeInstance.get(`/getAllMaterialCodes`);
      // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const getAllMaterialCodesFilter = async () => {
    try {
      const response = await axiosEmployeeInstance.get(`/getAllMaterialCodesFilter`);
      // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const getFinishingFilter = async () => {
    try {
      const response = await axiosEmployeeInstance.get(`/getFinishingFilter`);
      // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const getFinishAdmin = async () => {
    try {
      const response = await axiosEmployeeInstance.get(`/getFinish`);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const getParticularThickness = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/getParticularThickness`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const discount = async () => {
    try {
      const response = await axiosEmployeeInstance.get(`/discount`);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const getParticularDiscount = async (id) => {
    try {
      const response = await axiosEmployeeInstance.get(`/discount/` + id);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const getMaterialsAndThickness = async (id) => {
    try {
      const response = await axiosEmployeeInstance.get(`/getMaterialsAndThickness`);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AddDiscount = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/discount/`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const addFinish = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/addFinish/`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  
  
  export const PutDiscount = async (data) => {
    try {
      const response = await axiosEmployeeInstance.put(`/discount/`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const fetchSelectedFinishesAdmin = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/getParticularFinish`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const updateFinishDetails = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/updateFinishDetails`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AdmingetThicknessMaterialFinish = async (data, type, params) => {
    try {
      var response_api = await axiosEmployeeInstance.post(
        `/editSubQuoteDetailsAdmin`,
        params
      );
      // // console.log("response_api", response_api);
      // return;
      return response_api;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AdminupdateQuantity = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/updateQuantity`, data);
      // // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  
  export const deleteThicknessDetails = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/deleteThicknessDetails`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const deleteMaterialDetails = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/deleteMaterialDetails`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  
  export const deleteFinishDetails = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/deleteFinishDetails`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  
  export const getBendingFilter = async (data) => {
    try {
      const response = await axiosEmployeeInstance.get(`/getBendingFilter`);
      // // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const AdminupdateSubQuoteDetails = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/updateSubQuoteDetails`,
        data
      );
      // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const editSubQuote = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/editSubQuote`, data);
      // console.log("responseeee", response.data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const markCompleteQuote = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(`/markCompleteQuote`, data);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const getEmpDetails = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
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
      const response = await axiosEmployeeInstance.post(
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
      const response = await axiosEmployeeInstance.post(
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
      const response = await axiosEmployeeInstance.get(
        `/getDashboardDetails?fromDate=` + fromDate + `&toDate=` + toDate
      );
      return response.data;
    } catch (error) {
      console.error("Error setting employee as default:");
      throw error;
    }
  };

  export const updateCustomerTaxExempt = async (formData) => {
    try {
      const response = await axiosEmployeeInstance.put(
        `/updateCustomerTaxExempt`,
        formData
      );
      // const response = await axiosInstance.post(`/users/uploaddxfFile`, formData);
      // console.log("responseeee ------", response.data);
      // return;
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  export const uploadQuoteAdmin = async (formData) => {
    try {
      const response = await axiosEmployeeInstance.post(`/uploaddxfAdmin`, formData);
      // const response = await axiosInstance.post(`/users/uploaddxfFile`, formData);
      // console.log("responseeee ------", response.data);
      // return;
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };

  export const updateDimensionStatusAdmin = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/updateDimensionStatus`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };

  export const fileUpload = async (data) => {
    try {
      const response = await axiosEmployeeInstance.post(
        `/fileUpload`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };

  export const getSpecificSubQuote = async (data,thickness) => {
    try {
      const response = await axiosEmployeeInstance.get(`/getSpecificSubQuote/`+data+`?thickness_id=` + thickness);
      return response.data;
    } catch (error) {
      console.error("Something wents wrong.", error);
      throw error;
    }
  };
  
  