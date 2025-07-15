import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import file1 from "../../../assets/img/file1.jpg";
import QuantitySelector from "../../../components/Quantityselector";
import SelectDropdowns from "../../../components/Selectdropdown";
import QuotesSidebar from "../../../components/Quotessidebar";
import RenamePart from "../../../components/Renamepart";
import AddBend from "../../../components/Addbend";
import AddNote from "../../../components/Addnote";
import FileUpload from "../../../components/FileUpload";
import {
  CustomeraddNotes,
  CustomercopySubQuote,
  CustomerdeleteSubQuote,
  CustomerfetchSelectedFinishes,

  CustomerbendQuotes,
  CustomergetMaterials,
  CustomergetThickness,
  CustomergetThicknessMaterialFinish,
  CustomerupdateQuantity,
  CustomerupdateSubQuoteDetails,
  CustomerupdateDimensionStatus,
  CustomerdeleteBendQuoteImage,
  CustomeruploadBendingFile,
} from "../../../api/api";
import Amount from "../../../components/Amount";
import DimensionsToggle from "../../../components/DimensionsToggle";
import AddServiceNote from "../../../components/AddServiceNote";
import { Tooltip } from "react-tooltip";
import { encodeS3Url } from "../../../utils/encodeS3Url";
import AdminFileUpload from "../../components/FileUpload";
import AdminQuotesSidebar from "../../components/AdminQuoteSidebar";
export default function AdminCustomerRFQ() {
  const currentDate = new Date();
  const location = useLocation();
  const [userData, setUserData] = useState({
    user_id: '',
    name: '',
    email: '',
    passData: null
  });

  useEffect(() => {
    if (location.state) {
      setUserData(location.state);
    }
  }, [location.state]);

  const { user_id, name, email, passData } = userData;
 
  const navigate = useNavigate();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");
  const yearLastTwoDigits = String(currentDate.getFullYear()).slice(-2);
  const [modalShow, setModalShow] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [addLoading, setaddLoading] = useState(false);
  const [btnText, setbtnText] = useState(0);

  const [selectedPartId, setSelectedPartId] = useState(null);

  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);
  const handleShow = (quote, id) => {
    setSelectedQuote(quote);
    setSelectedPartId(id);
    setModalShow(true);
  };
  const getDimension = [
    { value: 0, label: "Millimeters" }, 
    { value: 1, label: "Inches" },
  ];
  useEffect(() => {
    if(passData) { 
      setQuoteList();
      setQuoteData();
      localStorage.removeItem("CustomersetItemelementData");
      localStorage.removeItem("CustomersetItempartsDBdata");
      localStorage.removeItem("CustomersetItempartsDBdataPay");
      localStorage.removeItem("CustomersetItemelementDataPay"); 
    } 
  }, [passData]);

  // const colors = [
  //   { label: "Gloss Red P.C.", value: "#E11F26" },
  //   { label: "Gloss Yellow P.C.", value: "#facc15" },
  //   { label: "Gloss Blue P.C.", value: "#1F2E60" },
  //   { label: "Gloss Green P.C.", value: "#2A5C17" },
  //   { label: "Gloss Orange P.C.", value: "#f37520" },
  // ];

  const handleClick = (tooltipId) => {
    // Hide the tooltip using react-tooltip's hide method
    const tooltipElement = document.querySelector(
      `[data-tooltip-id="${tooltipId}"]`
    );
    if (tooltipElement && tooltipElement._tippy) {
      tooltipElement._tippy.hide(); // Hide the tooltip
    }
  };
  const handleUpload = async (file, id, quantities, pdf_url) => {
    // console.log(file, id, quantities, "pdf_urlpdf_urlpdf_urlpdf_url");
    if (file.length == 0) {
      alert("Please upload a STEP or PDF file before saving.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("quote_image", file[i]);
    }
    formData.append("id", id);
    formData.append("bend_count", quantities);
    try {
      setaddLoading(true);
      const response = await CustomerbendQuotes(formData);
      setquoteDataCon(true);
      localStorage.setItem(
        "CustomersetItempartsDBdata",
        JSON.stringify(response.data.data)
      );
      setQuoteData(response.data.data);
      var data_val = response.data.data;
      let total = 0; // Change 'const' to 'let' to allow reassignment
      for (const quote of data_val) {
        total += quote.bend_count; // Accumulate bend_count values
      }

      const quoteList = localStorage.getItem("CustomersetItempartsDBdata");

      if (quoteList) {
        // Parse the stored JSON data
        const parsedQuoteList = JSON.parse(quoteList);
 
        // Update the total_bend_price in the object
        parsedQuoteList.total_bend_price = total * 5;
        localStorage.setItem(
          "CustomersetItempartsDBdata",
          JSON.stringify(parsedQuoteList)
        );
        setQuoteList(parsedQuoteList);
      }

      setaddLoading(false);
      setModalShow2(false);
    } catch (error) {
      setaddLoading(false);
      // console.log("errororoor ----", error);
    }
  };
 

  const getTotalAmount = () => {
    if (!Array.isArray(quoteData)) return 0;
    return quoteData.reduce((sum, quote) => {
      // Ensure quote.amount is a valid number
      const amount = parseFloat(quote.amount);

      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };
  const getBendAmount = () => {
    if (!Array.isArray(quoteData)) return 0;
    return quoteData.reduce((sum, quote) => {
      const amount =
        parseFloat(quote.per_bend_price) * quote.bend_count * quote.quantity;
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };
  const [materials, setmaterials] = useState([]);

  useEffect(() => {
    const fetchOptions_val = async () => {
      try {
        const response = await CustomergetMaterials();
        const fetchedOptions = response.data.map((item) => ({
          value: item._id,
          label: item.material_name + " " + item.material_grade,
          // selectedValue : item.
        }));
        setmaterials(fetchedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions_val();
  }, []);

  const [thickness, setthickness] = useState([]);

  // useEffect(() => {
  // Fetch options from the API when the parent component mounts
  const fetchThickness = async (materialId, quoteId) => {
    try {
      const data = {
        id: materialId,
      };
      const response = await CustomergetThickness(data);

      const fetchedOptions = response.data.map((item) => ({
        value: item._id,
        label: item.material_thickness,
        selectedValue: item.material_code,
      }));

      setQuoteData((prevQuoteData) =>
        Array.isArray(prevQuoteData)
          ? prevQuoteData.map((quote) =>
              quote._id === quoteId
                ? { ...quote, thicknessOptions: fetchedOptions }
                : quote
            )
          : []
      );
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  const fetchFinish = async (materialId, quoteId) => {
    try {
      const data = {
        thickness_id: materialId,
        id: quoteId,
      };
      const response = await CustomerfetchSelectedFinishes(data);
      // console.log("fetchSelectedFinishes", response.data);
      const res_status = response.data.data;
      const fetchedOptions = res_status.map((item) => ({ 
        value: item._id,
        label: item.finishing_desc,
      }));
      if(response.data.bending == "no") {
        const formData = new FormData();
        formData.append("id", quoteId);
        formData.append("bend_count", 0);
        formData.append("type", ""); 
        const res = await CustomeruploadBendingFile(formData);
        setQuoteData((prevQuoteData) =>
          prevQuoteData.map((quote) =>
            quote._id === quoteId
              ? {
                  ...quote,
                  bend_count: 0,
                }
              : quote
          )
        );
      }
      setQuoteData((prevQuoteData) =>
        prevQuoteData.map((quote) =>
          quote._id === quoteId
            ? {
                ...quote,
                finishOptions: fetchedOptions,
                binding_option: response.data.bending,
                finish_check_status: response.data.check_status,
              }
            : quote
        )
      );
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  // fetchThickness();
  // }, []);

  // const thickness = [
  //   { label: '.040" / 1.02mm', value: "thickness1" },
  //   { label: '.040" / 1.02mm', value: "thickness2" },
  //   { label: '.040" / 1.02mm', value: "thickness3" },
  //   { label: '.040" / 1.02mm', value: "thickness4" },
  // ];

  const handleShow3 = (quote, id) => {
    setSelectedNote(quote);
    setSelectedPartId(id);
    setModalShow3(true);
  };
  const updateQuoteNote = async (partId, newNote) => {
    setQuoteData((prevQuoteData) =>
      prevQuoteData.map((quote) =>
        quote._id === partId ? { ...quote, notes_text: newNote } : quote
      )
    );

    // Update localStorage
    const updatedQuoteData = quoteData.map((quote) => 
      quote._id === partId ? { ...quote, notes_text: newNote } : quote
    );
    try {
      await CustomeraddNotes(partId, newNote);
    } catch (error) {}
    localStorage.setItem(
      "CustomersetItempartsDBdata",
      JSON.stringify(updatedQuoteData)
    );
  };
  const handleDeleteQuote = (quoteId) => { 
    setQuoteData((prevQuoteData) => {
      const updatedQuoteData = prevQuoteData.filter(
        (quote) => quote._id !== quoteId
      );
      const data = {
        id: quoteId,
      };
      try {
        CustomerdeleteSubQuote(data);
        // Update localStorage with the new data
        localStorage.setItem(
          "CustomersetItempartsDBdata",
          JSON.stringify(updatedQuoteData)
        );
        const quoteDataVal = JSON.parse(
          localStorage.getItem("CustomersetItempartsDBdata")
        );
        // console.log("quoteDataVal =-=-=- quoteList -=-", quoteDataVal);
        let total = 0;
        for (const quote of quoteDataVal) {
          total += quote.bend_count; // Accumulate bend_count values
        }

        const quoteList = localStorage.getItem("CustomersetItemelementData");
        // console.log("quoteDataVal =-=-=- quoteList", quoteList);
        if (quoteList) {
          // Parse the stored JSON data
          const parsedQuoteList = JSON.parse(quoteList);

          parsedQuoteList.total_bend_price = isNaN(total) ? 0 : total * 5;
          if (total == 0) {
            parsedQuoteList.check_status = 0;
          }
          // console.log("CustomerparsedQuoteList", parsedQuoteList);

          setQuoteList(parsedQuoteList);
        }
        setQuoteData(updatedQuoteData);
      } catch (error) {
        // console.log(error);
      }

      return updatedQuoteData;
    });
  };
  const updateQuoteName = (Id, newName) => {
    setQuoteData((prevQuoteData) =>
      prevQuoteData.map((quote) =>
        quote._id === Id ? { ...quote, quote_name: newName } : quote
      )
    );
    const data = {
      id: Id,
      quote_name: newName,
    };
    CustomerupdateSubQuoteDetails(data);
    const updatedQuoteData = quoteData.map((quote) =>
      quote._id === Id ? { ...quote, quote_name: newName } : quote
    );
    localStorage.setItem(
      "CustomersetItempartsDBdata",
      JSON.stringify(updatedQuoteData)
    );
    // setQuoteData(updatedQuoteData);
  };
  const handleClose = () => setModalShow(false);
  const [image_url, setimage_url] = useState(null);
  const [quote_name, setquote_name] = useState(null);
  const [bend_count, setbend_count] = useState(null);
  const [bendupload_url, setbendupload_url] = useState(null);
  const [id_quote, setid_quote] = useState(null);
  const [bendApply, setbendApply] = useState(false);

   const handleShow2 = async (
     image_url,
     quote_name,
     bend_count,
     bendupload_url,
     id,
     checked
   ) => {
     const token = localStorage.getItem("adminToken");
     if (token == "" || token == undefined || token == null) {
       setModalShow4(true);
       return;
     }
     if (checked) {
       setbendApply(true);
       setimage_url(image_url);
       setquote_name(quote_name);
       setbend_count(bend_count);
       setbendupload_url(bendupload_url);
       setid_quote(id);
       const updatedQuoteData = quoteData.map((quote) =>
         quote._id === id ? { ...quote, bend_count: 1 } : quote
       );
       localStorage.setItem("CustomerparsedQuoteList", JSON.stringify(updatedQuoteData));
       setQuoteData(updatedQuoteData);
       
       const formData = new FormData();
       formData.append("id", id);
       formData.append("bend_count", 1);
       const storedData = localStorage.getItem("CustomersetItempartsDBdata");
       const parsedData = storedData ? JSON.parse(storedData) : [];
       const updatedLocalStorageData = parsedData.map((quote) => {
         if (quote._id === id) {
           return {
             ...quote,
             bend_count: 1,
           };
         }
         return quote;
       });
       
       // Save back to localStorage
       localStorage.setItem("CustomersetItempartsDBdata", JSON.stringify(updatedLocalStorageData));
       
       // Update only the matching item in state
       setQuoteData((prevData) =>
         Array.isArray(prevData)
           ? prevData.map((quote) =>
               quote._id === id ? { ...quote, bend_count: 1 } : quote
             )
           : []
       );
       // setquoteDataCon(true);
       localStorage.setItem(
         "CustomersetItempartsDBdata",
         JSON.stringify(updatedLocalStorageData)
       );
       try { 
         // const response = bendQuotes(formData);
         const response = CustomeruploadBendingFile(formData);
       } catch {}
       // setModalShow2(true);
     } else {
       const isConfirmed = window.confirm(
         "Are you sure you want to remove bending?"
       );
       // console.log(isConfirmed, "isConfirmed");
       if (isConfirmed) {
         const formData = new FormData();
         formData.append("id", id);
         formData.append("bend_count", 0);
         formData.append("type", "");
         try {
           const response = CustomeruploadBendingFile(formData);
 
           const setItemelementData = quoteList;
           const parsedQuoteList = quoteData;
 
           const updatedSetItemElementData = parsedQuoteList.map((item) => {
             if (item && item._id === id) {
               // console.log("Dsdssdsdssdsdsdsdsdsddssdsd");
               return {
                 ...item,
                 bend_count: 0,
                 bendupload_url: "",
                 step_file_bend:"",
                 drawing_file_bend:"",
                 check_status: 0,
               };
             }
             return item;
           });
           localStorage.setItem(
             "CustomersetItempartsDBdata",
             JSON.stringify(updatedSetItemElementData)
           );
           // Save the updated data back to localStorage
           localStorage.setItem(
             "CustomerparsedQuoteList",
             JSON.stringify(updatedSetItemElementData)
           );
           const quoteDataVal = JSON.parse(
             localStorage.getItem("CustomerparsedQuoteList")
           );
 
           let total = 0;
           for (const quote of quoteDataVal) {
             total += quote.bend_count;
           }
           const quoteListValues = localStorage.getItem("CustomersetItemelementData");
           // console.log("quoteList ---==--=", quoteListValues);
           if (quoteListValues) {
             // Parse the stored JSON data
             const parsedQuoteList = JSON.parse(quoteListValues);
 
             // console.log("parsedQuoteList", parsedQuoteList);
             parsedQuoteList.total_bend_price = isNaN(total) ? 0 : total * 5;
             if (total == 0) {
               parsedQuoteList.check_status = 0;
             }
             // console.log(
             //   "quoteList ---==--=",
             //   JSON.stringify(parsedQuoteList),
             //   "0-0-0-0"
             // );
             localStorage.setItem(
               "CustomersetItemelementData",
               JSON.stringify(parsedQuoteList)
             );
             setQuoteList(parsedQuoteList);
           }
           setbendApply(false);
           setQuoteData(updatedSetItemElementData);
           setquoteDataCon(true);
         } catch (err) {
           // console.log("eroroorororor", err);
         }
       }
     }
   };
  const handleClose2 = () => setModalShow2(false);

  const handleClose3 = () => setModalShow3(false);
  const handleClose4 = () => setModalShow4(false);
 
  const [quoteData, setQuoteData] = useState(null);
  const [quoteList, setQuoteList] = useState(null);
  useEffect(() => {
    // console.log(":fddfdffdfdfdfdfdffdff");
    if (Array.isArray(quoteData) && quoteData.length > 0) {
      const fetchAllThicknessOptionsData = async () => {
        setbtnText(0);
        if (quoteList.check_status == 1) {
          setbtnText(1);
          return;
        }
        for (const quote of quoteData) {
          // console.log(":quote-=-=-=-=",quote);
          if (quote._id) {
            // console.log(
            //   "calling function here -0-0-0-",
            //   quote.price_check_status,
            //   quote.finish_check_status,
            //   quote.check_status,
            //   quote.bend_count 
            // );
            setbtnText(quote.check_status);
            if (quote.bend_count >= 1) {
              // console.log("bend_count", quote.bend_count);
              setbtnText(1);
              return; // Exit the entire function
            }
            if (quote.price_check_status == 1) {
              // console.log("price_check_status", quote.price_check_status);
              setbtnText(1);
              return; // Exit the entire function
            }
            if (quote.finish_check_status) {
              // console.log("finish_check_status", quote.finish_check_status);
              setbtnText(1);
              return; // Exit the entire function
            }
            if (quote.check_status === 1) {
              // console.log("check_status is 1, exiting function.");
              return; // Exit the entire function
            }
          }
        }
      };

      fetchAllThicknessOptionsData();
    }
  }, [quoteData]);
  useEffect(() => {
    const handleStorageChange = () => {
      setQuoteData(localStorage.getItem("CustomersetItempartsDBdata"));
    };

    // Optionally listen for `localStorage` changes (if updated by another tab)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const removeExistingFile = async (index, url, id) => {
    const data = {
      id: id,
      bendimageurl: url,
    };

    try {
      // Await the deletion request
      await CustomerdeleteBendQuoteImage(data);

      // Retrieve stored quotes and ensure it's parsed correctly
      const storedData = localStorage.getItem("CustomersetItempartsDBdata");
      const parsedData = storedData ? JSON.parse(storedData) : [];

      // Update quotes by removing the specified file URL
      const updatedLocalStorageData = parsedData.map((quote) => {
        if (quote._id === id) {
          return {
            ...quote,
            bendupload_url: Array.isArray(quote.bendupload_url)
              ? quote.bendupload_url.filter((fileUrl) => fileUrl !== url)
              : [],
          };
        }
        return quote; // Return unchanged if no match
      });

      // Update state and localStorage
      setQuoteData(updatedLocalStorageData);
      localStorage.setItem(
        "CustomersetItempartsDBdata",
        JSON.stringify(updatedLocalStorageData)
      );
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("CustomersetItempartsDBdata");
    const quote_list = localStorage.getItem("CustomersetItemelementData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const quote_list_val = JSON.parse(quote_list);
      setQuoteList(quote_list_val);

      setQuoteData(parsedData);
    }
  }, []);

  const [apiResponse, setApiResponse] = useState(null);
  // const handleApiResponse = async (selectedOption, type, id) => {
  //   // console.log(selectedOption, type, id);
  //   const data = {
  //     id: id,
  //     dimension_type: selectedOption.value,
  //   };
  //   let quoteData = JSON.parse(localStorage.getItem("CustomersetItempartsDBdata"));
  //   const updatedQuoteData = quoteData.map((quote) =>
  //     quote._id === id
  //       ? {
  //           ...quote,
  //           dimension_type: selectedOption.value,
  //           material_id: "",
  //           thickness_id: "",
  //           finishing_id: "",
  //           thicknessOptions: [],
  //           finishOptions: [],
  //           amount: 0,
  //           quantity: 1,
  //           discount: 0,
  //         }
  //       : quote
  //   );

  //   localStorage.setItem(
  //     "CustomersetItempartsDBdata",
  //     JSON.stringify(updatedQuoteData)
  //   );
  //   const res = await CustomerupdateDimensionStatus(data);
  //   const response = res.data;
  //   const storedData = localStorage.getItem("CustomersetItempartsDBdata");
  //   const parsedData = storedData ? JSON.parse(storedData) : [];

  //   // Check if data exists and update based on _id match
  //   const updatedLocalStorageData = parsedData.map((quote) => {
  //     if (quote._id === response._id) {
  //       // // console.log(
  //       //   "response.updateSubQuote.amount",
  //       //   response.updateSubQuote.amount
  //       // );
  //       const update_amount = 0;
  //       return {
  //         ...quote,
  //         amount: update_amount,
  //       };
  //     }
  //     return quote; // Return unchanged if no match
  //   });
  //   setQuoteData(updatedLocalStorageData);
  //   localStorage.setItem(
  //     "CustomersetItempartsDBdata",
  //     JSON.stringify(updatedLocalStorageData)
  //   );
  //   setquoteDataCon(true);
  //   let formData = "";

  //   formData = {
  //     id: id,
  //     quantity: 1,
  //   };

  //   await uploadQuote(formData);
  // };
  const handleApiResponse = async (selectedOption, type, id) => {
    const data = {
      id,
      dimension_type: selectedOption.value,
    };
  
    const quoteData = JSON.parse(localStorage.getItem("CustomersetItempartsDBdata")) || [];
  
    // Prepare updated localStorage data
    const updatedQuoteData = quoteData.map((quote) =>
      quote._id === id
        ? {
            ...quote,
            dimension_type: selectedOption.value,
            material_id: "",
            thickness_id: "",
            finishing_id: "",
            thicknessOptions: [],
            finishOptions: [],
            amount: 0,
            quantity: 1,
            discount: 0,
          }
        : quote
    );
  
    const res = await CustomerupdateDimensionStatus(data);
    const response = res.data;
  
    const updatedLocalStorageData = updatedQuoteData.map((quote) =>
      quote._id === response._id
        ? {
            ...quote,
            amount: 0,
          }
        : quote
    );
  
    // Save to localStorage
    localStorage.setItem(
      "CustomersetItempartsDBdata",
      JSON.stringify(updatedLocalStorageData)
    );
  
    // ✅ Update only the specific quote in React state
    setQuoteData(prev =>
      prev.map(quote =>
        quote._id === response._id
          ? {
              ...quote,
              dimension_type: selectedOption.value,
              material_id: "",
              thickness_id: "",
              finishing_id: "",
              thicknessOptions: [],
              finishOptions: [],
              amount: 0,
              quantity: 1,
              discount: 0,
            }
          : quote
      )
    );
  
    const formData = {
      id,
      quantity: 1,
    };
  
    await uploadQuote(formData);
  };
  
  
  const [quoteDataCon, setquoteDataCon] = useState(true);
  useEffect(() => {
    setTimeout(async () => {
      if (quoteDataCon) {
        // console.log("quoteDataCon =-=-=-=- quoteDataCon",quoteDataCon)
        if (Array.isArray(quoteData) && quoteData.length > 0) {
          const fetchAllThicknessOptions = async () => {
            for (const quote of quoteData) {
              if (quote.material_id) {
                await fetchThickness(quote.material_id, quote._id);
              }
              if (quote.thickness_id) {
                await fetchFinish(quote.thickness_id, quote._id);
              }
            }
          };
          fetchAllThicknessOptions();
        }
        setquoteDataCon(false);
      }
    }, 1000);
  }, [quoteData]);
  const uploadQuote = async (formData) => {
    try {
      return await CustomerupdateQuantity(formData);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  const handleQuantityChangeAPI = async (Id, qty) => {
    let formData = "";

    formData = {
      id: Id,
      quantity: qty,
      quote_id: Id,
    };

    const response = await uploadQuote(formData);

    if (response && response.data) {
      const discount = response.data.updateQuantity.discount;
      const price = response.data.updateQuantity.amount;
      const price_status = response.data.updatedPrice.check_status;
      // console.log("price_status updates", price_status);
      const finalQuoteData = quoteData.map((quote) =>
        quote._id === Id
          ? {
              ...quote,
              quantity: qty,
              discount: discount,
              amount: price,
              price_check_status: price_status,
            }
          : quote
      );

      setQuoteData(finalQuoteData);
      localStorage.setItem(
        "CustomersetItempartsDBdata",
        JSON.stringify(finalQuoteData)
      );
    } else {
      console.error("Error updating quote:", response);
    }
  };

  const handleQuantityChange = async (Id, increment = true) => {
    let formData = "";

    const updatedQuoteData = quoteData.map((quote) => {
      if (quote._id === Id) {
        const updatedQuantity = increment
          ? parseInt(quote.quantity) + 1
          : Math.max(0, parseInt(quote.quantity) - 1); // Prevent negative quantities

        formData = {
          id: quote._id,
          quantity: updatedQuantity,
          quote_id: quote.quote_id,
        };

        return {
          ...quote,
          amount: quote.amount,
          quantity: updatedQuantity,
        };
      }
      return quote;
    });
    setQuoteData(updatedQuoteData);
    localStorage.setItem(
      "CustomersetItempartsDBdata",
      JSON.stringify(updatedQuoteData)
    );

    const response = await uploadQuote(formData); 

    if (response && response.data) {
      // console.log(response, "Sdsdsdsdds= response,", response.data);
      const discount = response.data.updateQuantity.discount;
      const price = response.data.updateQuantity.amount;
      const price_status = response.data.updatedPrice.check_status;
      // console.log("price_status updates", price_status);
      //   // console.log("response.data.discount;", response.data.data.updateData.discount);

      const finalQuoteData = updatedQuoteData.map((quote) =>
        quote._id === Id
          ? {
              ...quote,
              discount: discount,
              price_check_status: price_status,
              amount: price,
            }
          : quote
      );

      setQuoteData(finalQuoteData);
      localStorage.setItem(
        "CustomersetItempartsDBdata",
        JSON.stringify(finalQuoteData)
      );
    } else {
      console.error("Error updating quote:", response);
    }
    // });
  };

  const handleDuplicateQuote = async (quote, id) => {
     try {
       const data = {
         id: id,
       };
 
       const response = await CustomercopySubQuote(data);
 
       const duplicatedQuote = {
         ...quote,
         _id: response.data._id, // Assuming the API returns the new ID
       };
 
       // Update the quoteData state to include the duplicated quote
       setQuoteData((prevQuoteData) => {
         const updatedQuoteData = [...prevQuoteData, duplicatedQuote];
 
         // Update localStorage
         localStorage.setItem(
           "CustomersetItempartsDBdata",
           JSON.stringify(updatedQuoteData)
         );
 
         const quoteDataVal = JSON.parse(
           localStorage.getItem("CustomersetItempartsDBdata")
         );
         let total = 0;
         for (const quote of quoteDataVal) {
           total += quote.bend_count;
         }
 
         const quoteList = localStorage.getItem("CustomersetItemelementData");
         // // console.log("quoteDataVal =-=-=- quoteList", quoteList);
         if (quoteList) {
           // Parse the stored JSON data
           const parsedQuoteList = JSON.parse(quoteList);
 
           parsedQuoteList.total_bend_price = isNaN(total) ? 0 : total * 5;
           if (total == 0) {
             parsedQuoteList.check_status = 0;
           }
           // console.log("parsedQuoteList", parsedQuoteList);
 
           setQuoteList(parsedQuoteList);
           return updatedQuoteData;
         }
       });
     } catch (error) {
       // console.log("Error duplicating quote:", error);
     }
   };

  const handleOptionSelect = async (selectedOption, type, id) => {
    try {
      const data = {
        id: selectedOption.value,
      };
      let response = "";

      for (const quote of quoteData) {
        if (quote._id === id) {
          const params = {
            id: id,
            material_id:
              type === "material" ? selectedOption.value : quote.material_id,
            thickness_id:
              type === "material"
                ? null
                : type === "thickness"
                ? selectedOption.value
                : quote.thickness_id,

            finishing_id:
              type === "material" || type === "thickness"
                ? null
                : type === "finish"
                ? selectedOption.value
                : quote.finishing_id,
          };

          response = await CustomergetThicknessMaterialFinish(data, type, params);
          break;
        }
      }

      if (type == "material") {
        fetchThickness(selectedOption.value, id);
      }
      if (type == "thickness") {
        console.log("underrrrr-r=-r=-r=-=-=-")
        fetchFinish(selectedOption.value, id);
      }

      const updatedQuoteData = quoteData.map((quote) => {
        if (quote._id === id) {
          let updatedFields = {};
          const currentAmount = parseFloat(quote.amount) || 0;
          const newPrice = parseFloat(response.data.data.data.amount) || 0;

          if (type === "material") {
            updatedFields.material_id = selectedOption.value;
            updatedFields.thickness_id = null;
            updatedFields.finishing_id = null;
            updatedFields.binding_option = "no";
          } else if (type === "finish") {
            updatedFields.finishing_id = selectedOption.value;
          } else if (type === "thickness") {
            updatedFields.type_options = selectedOption.selectedValue;
            updatedFields.thickness_id = selectedOption.value;
            updatedFields.finishing_id = null;
          }

          return {
            ...quote,
            ...updatedFields,
            discount: response.data.data.data.discount,
            estimated_lead_time: response.data.data.estimated_lead_time,
            amount: newPrice,
          };
        }
        return quote;
      });

      const CustomersetItempartsDBdata =
        JSON.parse(localStorage.getItem("CustomersetItempartsDBdata")) || [];
      // console.log(
      //   "select drop down check status",
      //   response.data.data.updated_data.check_status
      // );
      const updatedQuoteDataVal = updatedQuoteData.map((quote) =>
        quote._id === id
          ? {
              ...quote,
              check_status: response.data.data.updated_data.check_status,
            }
          : quote
      );

      // Recalculate totalAmount
      const totalAmount = updatedQuoteDataVal.reduce(
        (sum, quote) => sum + (quote.amount || 0),
        0
      );

      // Save the updated array back to localStorage
      localStorage.setItem(
        "CustomersetItempartsDBdata",
        JSON.stringify(updatedQuoteDataVal)
      );

      // Update state with the new quoteData
      setQuoteData(updatedQuoteDataVal);

      // console.log("Updated totalAmount:", totalAmount);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  const formattedNumber = (num) => {
    return parseFloat(
      num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };



  const [error, setError] = useState(null);
  const handleFileDrop = (data) => {
    // console.log("Files dropped: ---------", data);

    // Check if data is defined and has the expected structure
    if (data && data.partsDBdata && data.requestQuoteDB) {
      const storedData = data.partsDBdata;
      const quote_list = data.requestQuoteDB;

      // Since storedData and quote_list should already be objects, no need to parse again
      setQuoteList(quote_list); // Assuming quote_list is already an object/array
      setQuoteData(prevData => {
        const existing = Array.isArray(prevData) ? prevData : [];
        const newData = Array.isArray(storedData) ? storedData : [];
        return [...existing, ...newData];
      });
      
      // setquoteDataCon(true);
      // Add any additional logic for handling the files
    } else {
      console.error("Data structure is not as expected:", data);
      // Handle the error case as necessary
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState({}); // Store files for each quote
  const [loadingFiles, setLoadingFiles] = useState({}); // Track loading state for each file

  const handleFileChange = async (event, id, quote_id, type_param) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      setLoadingFiles((prev) => ({ ...prev, [id]: true }));

      const formData = new FormData();
      formData.append("id", quote_id);
      formData.append("bend_count", 1);
      formData.append("type", type_param);
      formData.append("quote_image", file);

      const res = await CustomeruploadBendingFile(formData);
      // console.log("Upload response:", res.data);

      if (res.data) {
        const updatedQuote = res.data;

        if (updatedQuote) {
          // Update quoteData state: only update fields step_file_bend and drawing_file_bend
          setQuoteData((prevData) =>
            prevData.map((quote) =>
              quote._id === quote_id
                ? {
                    ...quote,
                    step_file_bend: updatedQuote.step_file_bend,
                    drawing_file_bend: updatedQuote.drawing_file_bend,
                  }
                : quote
            )
          );

          // Update localStorage CustomersetItempartsDBdata similarly
          const storedData = localStorage.getItem("CustomersetItempartsDBdata");
          const parsedData = storedData ? JSON.parse(storedData) : [];

          const updatedData = parsedData.map((quote) =>
            quote._id === quote_id
              ? {
                  ...quote,
                  step_file_bend: updatedQuote.step_file_bend,
                  drawing_file_bend: updatedQuote.drawing_file_bend,
                }
              : quote
          );

          localStorage.setItem(
            "CustomersetItempartsDBdata",
            JSON.stringify(updatedData)
          );
        } else {
          // If specific quote not found, fall back to full update
          localStorage.setItem("CustomersetItempartsDBdata", JSON.stringify(res.data));
          setQuoteData(res.data);
        }
      } else {
        // Unexpected response, fallback to full update
        localStorage.setItem("CustomersetItempartsDBdata", JSON.stringify(res.data));
        setQuoteData(res.data);
      }

      setLoadingFiles((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoadingFiles((prev) => ({ ...prev, [id]: false }));
    }
  };

  const removeFile = async (id, type_param) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("bend_count", 1);
      formData.append("type", type_param);

      const res = await CustomeruploadBendingFile(formData);

      // Update only the specific quote that changed instead of triggering a full refresh
      if (res.data) {
        const updatedQuote = res.data;

        if (updatedQuote) {
          // Update quoteData state: only update fields step_file_bend and drawing_file_bend
          setQuoteData((prevData) =>
            prevData.map((quote) =>
              quote._id === id
                ? {
                    ...quote,
                    step_file_bend: updatedQuote.step_file_bend,
                    drawing_file_bend: updatedQuote.drawing_file_bend,
                  }
                : quote
            )
          );

          // Update localStorage CustomersetItempartsDBdata similarly
          const storedData = localStorage.getItem("CustomersetItempartsDBdata");
          const parsedData = storedData ? JSON.parse(storedData) : [];

          const updatedData = parsedData.map((quote) =>
            quote._id === id
              ? {
                  ...quote,
                  step_file_bend: updatedQuote.step_file_bend,
                  drawing_file_bend: updatedQuote.drawing_file_bend,
                }
              : quote
          );

          localStorage.setItem(
            "CustomersetItempartsDBdata",
            JSON.stringify(updatedData)
          );
        } else {
          // If specific quote not found, fall back to full update
          localStorage.setItem("CustomersetItempartsDBdata", JSON.stringify(res.data));
          setQuoteData(res.data);
        }
      } else {
        // Unexpected response, fallback to full update
        localStorage.setItem("CustomersetItempartsDBdata", JSON.stringify(res.data));
        setQuoteData(res.data);
      }
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };
  const BackQuote = () => {
    localStorage.removeItem("CustomersetItempartsDBdata");

    localStorage.removeItem("CustomersetItempartsDBdata");
    // console.log("SDdsd");
    navigate(-1);
  };
  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <div className="QuoteBillMain_div">
                      <Row>
                        <Col lg={6} md={6}>
                          <div className="QuoteBill_box">
                            <h4>Customer Details:</h4>
                            <p>
                              <b>Name :</b> {name}
                            </p>
                            <p>
                              <b>Email :</b> {email}
                            </p>
                           
                          </div>
                        </Col>
                    
                      </Row>
                    </div>
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
            {Array.isArray(quoteData) && quoteData && quoteData.length > 0 ? (
              <>
                <h2 className="quotes-head">Quote #{quoteList.search_quote}</h2>
              </>
            ) : (
              <>
                <h2 className="quotes-head">
                  Quote # {currentMonth}-{yearLastTwoDigits}-0001
                </h2>
              </>
            )}
            <div className="d-inline-flex gap-2">
              {/* <Link className="btnshare">Share Quote</Link> */}
              <button
  className="btn btn-primary d-inline-flex align-items-center justify-content-center min-width-250"
  onClick={BackQuote}
>
                Back To Customer
              </button>
              {/* <Link className="btnicon">
                <Icon icon="bytesize:upload" />
              </Link> */}
            </div>
          </div>
          <Row>
            <Col lg={8} xl={9}>
              <AdminFileUpload
                acceptedFiles={[".dxf"]}
                onFileDrop={handleFileDrop}
                error={error}
                className={"mb-4"}
                user_id={user_id}
              />

              {quoteData &&
                quoteData.length > 0 &&
                Array.isArray(quoteData) &&
                quoteData.map((quote, index) => (
                  <div className="list-quotes-main">
                    <div className="list-quotes flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
                      <div className="img-quote mx-auto mx-md-0 position-relative">
                        <span className="bublenumber">
                          {String(index + 1).padStart(3, "0")}
                        </span>
                        <Image
                          src={encodeS3Url(quote.image_url)} 
                          className="img-fluid"
                          alt=""
                        />
                      </div>

                      <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
                        <h2>{quote.quote_name}</h2>
                        {quote.type_options != "" &&
                        quote.type_options != null ? (
                          <p className="num-dim-main">
                            <span className="num-dim">
                              {quote.type_options}-{quote.quantity}-{quote.finishing_id && quote.binding_option != "no" && quote.bend_count >= 1 ? 'B-' : ''}
                              {currentMonth}-{yearLastTwoDigits}-
                              {quoteList.quote_number}-{" "}
                              {String(index + 1).padStart(3, "0")}
                            </span>
                          </p> 
                        ) : (
                          quote.type_option != "" &&
                          quote.type_option != null && (
                            <p className="num-dim-main">
                              <span className="num-dim">
                                {quote.type_option[0].material_code}-
                                {quote.quantity}-{quote.finishing_id && quote.binding_option != "no" && quote.bend_count >= 1 ? 'B-' : ''}{currentMonth}-
                                {yearLastTwoDigits}-{quoteList.quote_number}-
                                {String(index + 1).padStart(3, "0")} 
                              </span>
                            </p>
                          )
                        )}
                        <div className="quotes-dropdown flex-md-row d-flex align-item-center justify-content-md-start justify-content-center">
                          <SelectDropdowns
                            options={getDimension}
                            value={quote.dimension_type}
                            placeholder={"Select Units"}
                            type="dimensions"
                            id={quote._id}
                            onOptionSelect={handleApiResponse}
                          />
                          <SelectDropdowns
                            options={materials}
                            value={quote.material_id}
                            placeholder={"Select a Material"}
                            type="material"
                            id={quote._id}
                            onOptionSelect={handleOptionSelect}
                          />
                          <SelectDropdowns
                            options={quote.thicknessOptions || []}
                            value={quote.thickness_id}
                            type="thickness"
                            id={quote._id}
                            placeholder={"Select a Thickness"}
                            onOptionSelect={handleOptionSelect}
                          />
                          <SelectDropdowns
                            options={quote.finishOptions || []}
                            value={quote.finishing_id}
                            type="finish"
                            id={quote._id}
                            placeholder={"Select a Finish"}
                            onOptionSelect={handleOptionSelect}
                          />
                        </div>
                        <div className="quotes-services quote_div_main_sect mt-3 position-relative">
                          {quote.binding_option == "no" ? (
                            <p></p>
                          ) : (
                            <>
                              {quote.finishing_id && (
                                <>
                                  <div className="flex-shrink-0">
                                    <h4>Services </h4>

                                    <Form.Check
                                      type="checkbox"
                                      label="Add Bending"
                                      name={`options-${quote._id}`}
                                      value={`options-${quote._id}`}
                                      id={`options-${quote._id}`}
                                      className="d-inline-flex align-items-center me-2"
                                      onChange={(e) =>
                                        handleShow2(
                                          quote.image_url,
                                          quote.quote_name,
                                          quote.bend_count,
                                          quote.bendupload_url,
                                          quote._id,
                                          e.target.checked
                                        )
                                      }
                                      checked={quote.bend_count >= 1}
                                    />
                                  </div>
                                  {quote.bend_count != 0 && (
                                    <>
                                      <div className="baseratecustom">
                                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                          <span className="baseratetitle">
                                            Base Rate: <Amount amount={quote.per_bend_price} />
                                          </span>
                                          <span
                                            className="cursor-pointer"
                                            data-tooltip-id="custom-bending"
                                          >
                                            <Icon
                                              icon="material-symbols-light:info-outline"
                                              width={22}
                                              height={22}
                                              color="#000"
                                            />
                                          </span>
                                          <Tooltip
                                            id="custom-bending"
                                            place="right"
                                            content={
                                              <>
                                                Bending requires review and
                                                approval. <br />
                                                The base rate is just an
                                                estimate and <br />
                                                will be adjusted during the
                                                review process. <br />
                                                If you don’t have a STEP file,
                                                please reach out <br />
                                                directly to us via email.
                                              </>
                                            }
                                          />
                                        </div>
                                         
                                            <div>
                                              {/* First Upload Field */}
                                              <div className="mt-2 d-flex justify-content-start gap-2">
                                                <label className="labeltitle flex-shrink-0">
                                                  Upload STEP file{" "}
                                                  <small>(Required)</small>
                                                </label>
                                                {quote.step_file_bend == null || quote.step_file_bend == "" ? (
                                                  <>
                                                   {loadingFiles[quote._id] ? (
                                                    <span className="color_white_make">Uploading...</span> // Show loader while uploading
                                                  ) : (
                                                       
                                                  <input
                                                    id={quote._id}
                                                    type="file"
                                                    accept=".step,.stp"
                                                    onChange={(e) =>
                                                      handleFileChange(
                                                        e,
                                                        `${quote._id}`, 
                                                        quote._id,
                                                        'step'
                                                      )
                                                    }
                                                    className="block w-full mt-1"
                                                  />
                                                  
                                                  )}
                                                  </>
                                                
                                                ) : (
                                                  <div className="attachment-box">
                                                    <span className="attachmenttitle">
                                                      Attachment
                                                      {/* {
                                                        uploadedFiles[quote._id]
                                                          .name
                                                      } */}
                                                    </span>
                                                    <Link
                                                      className="remove-icon"
                                                      onClick={() =>
                                                        removeFile(quote._id,'step_remove')
                                                      }
                                                    >
                                                      <Icon
                                                        icon="carbon:close-outline"
                                                        color="#ff0000"
                                                        width={18}
                                                        height={18}
                                                        className="ms-2"
                                                      />
                                                    </Link>
                                                  </div>
                                                )}
                                              </div>

                                              {/* Second Upload Field */}
                                              <div className="mt-2 d-flex justify-content-start gap-2">
                                                <label className="labeltitle flex-shrink-0">
                                                  Upload Drawing{" "}
                                                  <small>(Optional)</small>
                                                </label>
                                                
                                                {quote.drawing_file_bend == null || quote.drawing_file_bend == "" ? (
                                                  <>
                                                  {loadingFiles[`${quote._id}-optional`] ? (
                                                    <span>Uploading...</span> // Loader for optional upload
                                                  ) : (
                                                  <input
                                                    id={`${quote._id}-optional`}
                                                    type="file"
                                                    accept=".pdf, .jpg, .jpeg, .png"
                                                    onChange={(e) =>
                                                      handleFileChange(
                                                        e,
                                                        `${quote._id}-optional`,
                                                        quote._id,
                                                        'draw'
                                                      )
                                                    }
                                                    className="block w-full mt-1"
                                                  />
                                                  )}
                                                  </>
                                                ) : (
                                                  <div className="attachment-box">
                                                    <span className="attachmenttitle">
                                                      {/* {
                                                        uploadedFiles[
                                                          `${quote._id}-optional`
                                                        ].name
                                                      } */}
                                                      Attachment
                                                    </span>
                                                    <Link
                                                      className="remove-icon"
                                                      onClick={() =>
                                                        removeFile(
                                                          quote._id,"draw_remove"
                                                        )
                                                      }
                                                    >
                                                      <Icon
                                                        icon="carbon:close-outline"
                                                        color="#ff0000"
                                                        width={18}
                                                        height={18}
                                                        className="ms-2"
                                                      />
                                                    </Link>
                                                  </div>
                                                )}
                                              </div>

                                              {/* Error Message */}
                                              {/* {Object.keys(uploadedFiles).length === 0 && <p className="text-red-500 text-xs mt-1">File is required.</p>} */}
                                            </div>
                                         
                                      </div>
                                      {/* <div className="custom_bend_div">
                                        <p>
                                          Number of bends : {quote.bend_count}
                                        </p>
                                        <p>Price per bend : $5.00</p>
                                        <p>
                                          Total :{" "}
                                          <Amount amount={quote.bend_price} />
                                        </p>
                                      </div>
                                      <Link
                                        className="btnicon flex-shrink-0"
                                        onClick={() => {
                                          setimage_url(quote.image_url);
                                          setquote_name(quote.quote_name);
                                          setbend_count(quote.bend_count);
                                          setbendupload_url(
                                            quote.bendupload_url
                                          );
                                          setid_quote(quote._id);
                                          setModalShow2(true);
                                        }}
                                      >
                                        <Icon icon="mynaui:edit" />
                                      </Link> */}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                          {/* </> */}
                          {/* )} */}
                        </div>
                      </div>

                      <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                        {/* <p className="quotes-date">May 21, 2024 3:05 pm</p> */}
                        <p className=" text-md-end">
                          {" "}
                          <Amount amount={(quote.amount +  (quote.bend_count >= 1 && quote.per_bend_price * quote.quantity))} /> total
                        </p>

                        <p className=" text-md-end">
                          <strong className="quotes-price">
                            <Amount amount={((quote.amount / quote.quantity) + (quote.bend_count >= 1 && quote.per_bend_price))} />
                          </strong>
                          /each 
                        </p>
                        <div className="d-flex align-item-center justify-content-end gap-2">
                          <div className="quanityCount_btn">
                            {quote.finishing_id ? (
                              <>
                                <QuantitySelector
                                  quantity={quote.quantity}
                                  onIncrement={() =>
                                    handleQuantityChange(quote._id, true)
                                  }
                                  onDecrement={() =>
                                    quote.quantity === 1
                                      ? null
                                      : handleQuantityChange(quote._id, false)
                                  }
                                  onQuantityChange={(newQuantity) =>
                                    handleQuantityChangeAPI(
                                      quote._id,
                                      newQuantity
                                    )
                                  }
                                />
                              </>
                            ) : (
                              <div></div>
                            )}
                          </div>
                          <span className="quote-off">
                            {quote.discount}% Saved
                          </span>
                        </div>
                        <p className="mb-0 text-md-end">
                          {quote.estimated_lead_time
                            ? "Typical Lead Time " +
                              quote.estimated_lead_time +
                              " days"
                            : "Typical Lead Time " +
                                quote?.type_option?.length >
                              0
                            ? quote.type_option[0]?.estimated_lead_time ?? "2-4"
                            : "Typical Lead Time 2-4" + " days"}
                        </p>
                      </div>
                    </div>
                    <Row>
                      <Col md={6}>
                        <span className="num-dim">
                          <DimensionsToggle
                            dimensions={quote.dimensions}
                            id={quote._id}
                            type={quote.dimension_type}
                            // isEdit={true}
                            onApiResponse={handleApiResponse}
                          />
                        </span>
                      </Col>
                      <Col md={6} className="align-self-end">
                        <div className="d-flex align-items-center justify-content-between  ps-0 mt-3 gap-2 mb-2">
                          <div></div>

                          <div className="rightbtns gap-2 d-inline-flex flex-wrap">
                            <Link
                              className="btnshare"
                              onClick={() => {
                                handleShow3(quote.notes_text, quote._id);
                                handleClick("add-note-tooltip");
                              }}
                              data-tooltip-id="add-note-tooltip"
                            >
                              Add Note
                            </Link>
                            <Tooltip
                              id="add-note-tooltip"
                              place="bottom"
                              content="Add a Note to This Part"
                            />

                            <Link
                              className="btnicon"
                              onClick={() => {
                                handleShow(quote.quote_name, quote._id);
                                handleClick("edit-tooltip");
                              }}
                              data-tooltip-id="edit-tooltip"
                            >
                              <Icon icon="mynaui:edit" />
                            </Link>
                            <Tooltip
                              id="edit-tooltip"
                              place="bottom"
                              content="Rename This Part"
                            />

                            <Link
                              className="btnicon"
                              onClick={() => {
                                handleDuplicateQuote(quote, quote._id);
                                handleClick("duplicate-tooltip");
                              }}
                              data-tooltip-id="duplicate-tooltip"
                            >
                              <Icon icon="heroicons:document-duplicate" />
                            </Link>
                            <Tooltip
                              id="duplicate-tooltip"
                              place="bottom"
                              content="Duplicate This Part"
                            />

                            <Link
                              className="btnicon"
                              onClick={() => {
                                handleDeleteQuote(quote._id);
                                handleClick("delete-tooltip");
                              }}
                              data-tooltip-id="delete-tooltip"
                            >
                              <Icon icon="uiw:delete" />
                            </Link>
                            <Tooltip
                              id="delete-tooltip"
                              place="bottom"
                              content="Delete This Part"
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
            </Col>

            {quoteData && quoteData.length > 0 && (
              <Col lg={4} xl={3}>
                {/* --{orderDe} */}
                <AdminQuotesSidebar
                  amount={getTotalAmount().toFixed(2)}
                  bendAmount={getBendAmount().toFixed(2)}
                  buttonText={btnText}
                  quoteData={quoteList}
                  // loadId={}
                  userId={user_id}  
                />
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <RenamePart
        show={modalShow}
        handleClose={handleClose}
        quote={selectedQuote}
        onSave={(newName) => updateQuoteName(selectedPartId, newName)}
        title={"Rename Part"}
      />
      <AddBend
        show2={modalShow2}
        handleClose2={handleClose2}
        image={image_url}
        name={quote_name}
        count={bend_count}
        pdf_url={bendupload_url}
        title="Specify Bend Details"
        id={id_quote}
        onUpload={handleUpload}
        loading={addLoading}
      />
      <AddNote
        show3={modalShow3}
        name={selectedNote}
        handleClose3={handleClose3}
        onSave={(newNote) => updateQuoteNote(selectedPartId, newNote)}
        title="Notes"
      />
      <AddServiceNote show3={modalShow4} handleClose3={handleClose4} />
    </React.Fragment>
  );
}