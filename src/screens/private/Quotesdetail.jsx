import React, { useEffect, useState, useMemo, useRef } from "react";
import { Row, Col, Container, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, json, useNavigate } from "react-router-dom";
import file1 from "../../assets/img/file1.jpg";
import QuantitySelector from "../../components/Quantityselector";
import SelectDropdowns from "../../components/Selectdropdown";
import QuotesSidebar from "../../components/Quotessidebar";
import RenamePart from "../../components/Renamepart";
import AddBend from "../../components/Addbend";
import AddNote from "../../components/Addnote";
import step_file_img from "../../assets/img/step_file.png";
import FileUpload from "../../components/FileUpload";
import {
  addNotes,
  copySubQuote,
  deleteSubQuote,
  fetchSelectedFinishes,
  getFinish,
  bendQuotes,
  getMaterials,
  getThickness,
  getThicknessMaterialFinish,
  updateQuantity,
  updateSubQuoteDetails,
  updateDimensionType,
  updateDimensionStatus,
  deleteBendQuoteImage,
  uploadBendingFile,
} from "../../api/api";
import Amount from "../../components/Amount";
import DimensionsToggle from "../../components/DimensionsToggle";
import AddAddressModal from "./AddaddressModal";
import AddServiceNote from "../../components/AddServiceNote";
import { Tooltip } from "react-tooltip";
import { encodeS3Url } from "../../utils/encodeS3Url";
import { FixedSizeList as List } from 'react-window';
import QuoteLineItem from '../../components/QuoteLineItem';

export default function QuotesDetail() {
  const currentDate = new Date();
  const navigate = useNavigate();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");
  const yearLastTwoDigits = String(currentDate.getFullYear()).slice(-2);
  const [modalShow, setModalShow] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [addLoading, setaddLoading] = useState(false);
  const [btnText, setbtnText] = useState(0);
  const [btnTextChange, setbtnTextChange] = useState(false);
  const [btnTextVal, setbtnTextVal] = useState(false);
  const [focusedQuoteId, setFocusedQuoteId] = useState(null);

  const [selectedPartId, setSelectedPartId] = useState(null);
  const [indexPart, setindexPart] = useState();

  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);

  // Only clear focus if the blurred input is the currently focused one
  const handleBlurQuantity = (quoteId = null) => {
    if (quoteId && focusedQuoteId === quoteId) {
      setFocusedQuoteId(null);
    }
  };

  // Only set focus for direct input editing
  const onSetFocus = (quoteId) => {
    setFocusedQuoteId(quoteId);
  };

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
    // fetchOptions();
  }, []);

  // const colors = [
  //   { label: "Gloss Red P.C.", value: "#E11F26" },
  //   { label: "Gloss Yellow P.C.", value: "#facc15" },
  //   { label: "Gloss Blue P.C.", value: "#1F2E60" },
  //   { label: "Gloss Green P.C.", value: "#2A5C17" },
  //   { label: "Gloss Orange P.C.", value: "#f37520" },
  // ];
  const [colors, setcolors] = useState([]);
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
    console.log(file, id, quantities, "pdf_urlpdf_urlpdf_urlpdf_url");
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
      const response = await bendQuotes(formData);
      setquoteDataCon(true);
      localStorage.setItem(
        "setItempartsDBdata",
        JSON.stringify(response.data.data)
      );
      setQuoteData(response.data.data);
      var data_val = response.data.data;
      let total = 0; // Change 'const' to 'let' to allow reassignment
      for (const quote of data_val) {
        total += quote.bend_count; // Accumulate bend_count values
      }

      const quoteList = localStorage.getItem("setItemelementData");

      if (quoteList) {
        // Parse the stored JSON data
        const parsedQuoteList = JSON.parse(quoteList);

        // Update the total_bend_price in the object
        parsedQuoteList.total_bend_price = total * 5;
        localStorage.setItem(
          "setItemelementData",
          JSON.stringify(parsedQuoteList)
        );
        setQuoteList(parsedQuoteList);
      }

      setaddLoading(false);
      setModalShow2(false);
    } catch (error) {
      setaddLoading(false);
      console.log("errororoor ----", error);
    }
  };

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState("");

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
        const response = await getMaterials();
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
    setLoadingSelect((prev) => ({ ...prev, [`${quoteId}_thickness`]: true }));
    try {
      const data = {
        id: materialId,
      };
      const response = await getThickness(data);

      const fetchedOptions = response.data.map((item) => ({
        value: item._id,
        label: item.material_thickness,
        selectedValue: item.material_code,
      }));

      setQuoteData((prevQuoteData) =>
        prevQuoteData.map((quote) =>
          quote._id === quoteId
            ? { ...quote, thicknessOptions: fetchedOptions }
            : quote
        )
      );
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoadingSelect((prev) => ({ ...prev, [`${quoteId}_thickness`]: false }));
    }
  };
  const fetchFinish = async (materialId, quoteId) => {
    setLoadingSelect((prev) => ({ ...prev, [`${quoteId}_finish`]: true }));
    try {
      const data = {
        thickness_id: materialId,
        id: quoteId,
      };
      const response = await fetchSelectedFinishes(data);
      console.log("fetchSelectedFinishes", response.data);
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
        const res = await uploadBendingFile(formData);
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
    } finally {
      setLoadingSelect((prev) => ({ ...prev, [`${quoteId}_finish`]: false }));
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
      await addNotes(partId, newNote);
    } catch (error) {}
    localStorage.setItem(
      "setItempartsDBdata",
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
        deleteSubQuote(data);
        // Update localStorage with the new data
        localStorage.setItem(
          "setItempartsDBdata",
          JSON.stringify(updatedQuoteData)
        );
        const quoteDataVal = JSON.parse(
          localStorage.getItem("setItempartsDBdata")
        );
        // console.log("quoteDataVal =-=-=- quoteList -=-", quoteDataVal);
        let total = 0;
        for (const quote of quoteDataVal) {
          total += quote.bend_count; // Accumulate bend_count values
        }

        const quoteList = localStorage.getItem("setItemelementData");
        // console.log("quoteDataVal =-=-=- quoteList", quoteList);
        if (quoteList) {
          // Parse the stored JSON data
          const parsedQuoteList = JSON.parse(quoteList);

          parsedQuoteList.total_bend_price = isNaN(total) ? 0 : total * 5;
          if (total == 0) {
            parsedQuoteList.check_status = 0;
          }
          // console.log("parsedQuoteList", parsedQuoteList);

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
    updateSubQuoteDetails(data);
    const updatedQuoteData = quoteData.map((quote) =>
      quote._id === Id ? { ...quote, quote_name: newName } : quote
    );
    localStorage.setItem(
      "setItempartsDBdata",
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
    const token = localStorage.getItem("authToken");
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
      localStorage.setItem("parsedQuoteList", JSON.stringify(updatedQuoteData));
      setQuoteData(updatedQuoteData);
      
      const formData = new FormData();
      formData.append("id", id);
      formData.append("bend_count", 1);
      const storedData = localStorage.getItem("setItempartsDBdata");
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
      localStorage.setItem("setItempartsDBdata", JSON.stringify(updatedLocalStorageData));
      
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
        "setItempartsDBdata",
        JSON.stringify(updatedLocalStorageData)
      );
      try { 
        // const response = bendQuotes(formData);
        const response = uploadBendingFile(formData);
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
          const response = uploadBendingFile(formData);

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
            "setItempartsDBdata",
            JSON.stringify(updatedSetItemElementData)
          );
          // Save the updated data back to localStorage
          localStorage.setItem(
            "parsedQuoteList",
            JSON.stringify(updatedSetItemElementData)
          );
          const quoteDataVal = JSON.parse(
            localStorage.getItem("parsedQuoteList")
          );

          let total = 0;
          for (const quote of quoteDataVal) {
            total += quote.bend_count;
          }
          const quoteListValues = localStorage.getItem("setItemelementData");
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
              "setItemelementData",
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
  const [quantities, setQuantities] = useState({
    item1: 1,
    item2: 1,
    item3: 1,
    item4: 1,
  });
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
          console.log(":quote-=-=-=-=",quote);
          if (quote._id) {
            console.log(
              "calling function here -0-0-0-",
              quote.price_check_status,
              quote.finish_check_status,
              quote.check_status,
              quote.bend_count 
            );
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
      setQuoteData(localStorage.getItem("setItempartsDBdata"));
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
      await deleteBendQuoteImage(data);

      // Retrieve stored quotes and ensure it's parsed correctly
      const storedData = localStorage.getItem("setItempartsDBdata");
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
        "setItempartsDBdata",
        JSON.stringify(updatedLocalStorageData)
      );
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("setItempartsDBdata");
    const quote_list = localStorage.getItem("setItemelementData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const quote_list_val = JSON.parse(quote_list);
      setQuoteList(quote_list_val);

      setQuoteData(parsedData);
    }
  }, []);

  const [apiResponse, setApiResponse] = useState(null);
  const handleApiResponse = async (selectedOption, type, id) => {
    setLoadingSelect((prev) => ({ ...prev, [`${id}_${type}`]: true }));
    try {
    const data = {
      id: id,
      dimension_type: selectedOption.value,
    };
    let quoteData = JSON.parse(localStorage.getItem("setItempartsDBdata"));
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

    localStorage.setItem(
      "setItempartsDBdata",
      JSON.stringify(updatedQuoteData)
    );
    const res = await updateDimensionStatus(data);
    const response = res.data;
    const storedData = localStorage.getItem("setItempartsDBdata");
    const parsedData = storedData ? JSON.parse(storedData) : [];

    // Check if data exists and update based on _id match
    const updatedLocalStorageData = parsedData.map((quote) => {
      if (quote._id === response._id) {
        // // console.log(
        //   "response.updateSubQuote.amount",
        //   response.updateSubQuote.amount
        // );
        const update_amount = 0;
        return {
          ...quote,
          amount: update_amount,
        };
      }
      return quote; // Return unchanged if no match
    });
    setQuoteData(updatedLocalStorageData);
    localStorage.setItem(
      "setItempartsDBdata",
      JSON.stringify(updatedLocalStorageData)
    );
    let formData = "";

    formData = {
      id: id,
      quantity: 1,
    };

    await uploadQuote(formData);
    } finally {
      setLoadingSelect((prev) => ({ ...prev, [`${id}_${type}`]: false }));
    }
  };

  const [quoteDataCon, setquoteDataCon] = useState(true);
  useEffect(() => {
    setTimeout(async () => {
      if (quoteDataCon) {
        console.log("quoteDataCon =-=-=-=- quoteDataCon",quoteDataCon)
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
      return await updateQuantity(formData);
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
        "setItempartsDBdata",
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
      "setItempartsDBdata",
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
        "setItempartsDBdata",
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

      const response = await copySubQuote(data);

      const duplicatedQuote = {
        ...quote,
        _id: response.data._id, // Assuming the API returns the new ID
      };

      // Update the quoteData state to include the duplicated quote
      setQuoteData((prevQuoteData) => {
        const updatedQuoteData = [...prevQuoteData, duplicatedQuote];

        // Update localStorage
        localStorage.setItem(
          "setItempartsDBdata",
          JSON.stringify(updatedQuoteData)
        );

        const quoteDataVal = JSON.parse(
          localStorage.getItem("setItempartsDBdata")
        );
        let total = 0;
        for (const quote of quoteDataVal) {
          total += quote.bend_count;
        }

        const quoteList = localStorage.getItem("setItemelementData");
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
    setLoadingSelect((prev) => ({ ...prev, [`${id}_${type}`]: true }));
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

          response = await getThicknessMaterialFinish(data, type, params);
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

      const setItempartsDBdata =
        JSON.parse(localStorage.getItem("setItempartsDBdata")) || [];
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
        "setItempartsDBdata",
        JSON.stringify(updatedQuoteDataVal)
      );

      // Update state with the new quoteData
      setQuoteData(updatedQuoteDataVal);

      // console.log("Updated totalAmount:", totalAmount);
    } catch (error) {
      console.error("Error fetching price:", error);
    } finally {
      setLoadingSelect((prev) => ({ ...prev, [`${id}_${type}`]: false }));
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

  const decrementQuantity = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item]: Math.max(prevQuantities[item] - 1, 0), // Prevent negative quantities
    }));
  };

  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);
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

      const res = await uploadBendingFile(formData);
      console.log("Upload response:", res.data);

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

          // Update localStorage setItempartsDBdata similarly
          const storedData = localStorage.getItem("setItempartsDBdata");
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
            "setItempartsDBdata",
            JSON.stringify(updatedData)
          );
        } else {
          // If specific quote not found, fall back to full update
          localStorage.setItem("setItempartsDBdata", JSON.stringify(res.data));
          setQuoteData(res.data);
        }
      } else {
        // Unexpected response, fallback to full update
        localStorage.setItem("setItempartsDBdata", JSON.stringify(res.data));
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

      const res = await uploadBendingFile(formData);

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

          // Update localStorage setItempartsDBdata similarly
          const storedData = localStorage.getItem("setItempartsDBdata");
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
            "setItempartsDBdata",
            JSON.stringify(updatedData)
          );
        } else {
          // If specific quote not found, fall back to full update
          localStorage.setItem("setItempartsDBdata", JSON.stringify(res.data));
          setQuoteData(res.data);
        }
      } else {
        // Unexpected response, fallback to full update
        localStorage.setItem("setItempartsDBdata", JSON.stringify(res.data));
        setQuoteData(res.data);
      }
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };
  const BackQuote = () => {
    localStorage.removeItem("setItemelementData");

    localStorage.removeItem("setItempartsDBdata");
    // console.log("SDdsd");
    navigate("/quotes");
  };

  // Add loading state for select dropdowns
  const [loadingSelect, setLoadingSelect] = useState({});

  // Add this function to update a quote in quoteData immutably
  const onQuoteUpdate = (quoteId, updatedFields) => {
    setQuoteData((prevQuoteData) => {
      if (!Array.isArray(prevQuoteData)) return prevQuoteData;
      const updatedQuoteData = prevQuoteData.map((quote) =>
        quote._id === quoteId ? { ...quote, ...updatedFields } : quote
      );
      localStorage.setItem("setItempartsDBdata", JSON.stringify(updatedQuoteData));
      return updatedQuoteData;
    });
  };

  // Add useMemo for itemData to prevent unnecessary re-renders
  const listItemData = useMemo(() => ({
    quoteData,
    materials,
    getDimension,
    handleApiResponse,
    handleOptionSelect,
    handleQuantityChange,
    handleQuantityChangeAPI,
    handleShow,
    handleShow2,
    handleShow3,
    handleDuplicateQuote,
    handleDeleteQuote,
    handleClick,
    loadingSelect,
    loadingFiles: loadingFiles || {},
    quoteList,
    currentMonth,
    yearLastTwoDigits,
    focusedQuoteId,
    onSetFocus,
    setModalShow,
    setModalShow2,
    setModalShow3,
    setModalShow4,
    setSelectedQuote,
    setSelectedNote,
    setSelectedPartId,
    setimage_url,
    setquote_name,
    setbend_count,
    setbendupload_url,
    setid_quote,
    handleBlurQuantity,
  }), [
    quoteData,
    materials,
    getDimension,
    handleApiResponse,
    handleOptionSelect,
    handleQuantityChange,
    handleQuantityChangeAPI,
    handleShow,
    handleShow2,
    handleShow3,
    handleDuplicateQuote,
    handleDeleteQuote,
    handleClick,
    loadingSelect,
    loadingFiles,
    quoteList,
    currentMonth,
    yearLastTwoDigits,
    focusedQuoteId,
    setModalShow,
    setModalShow2,
    setModalShow3,
    setModalShow4,
    setSelectedQuote,
    setSelectedNote,
    setSelectedPartId,
    setimage_url,
    setquote_name,
    setbend_count,
    setbendupload_url,
    setid_quote,
    handleBlurQuantity,
  ]);

  // Track and restore scroll position using outerRef
  const listOuterRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const handleOuterScroll = () => {
    if (listOuterRef.current) {
      setScrollTop(listOuterRef.current.scrollTop);
    }
  };
  useEffect(() => {
    if (listOuterRef.current) {
      listOuterRef.current.scrollTop = scrollTop;
    }
  }, [quoteData && quoteData.length]);

  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
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
              <Link
                className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-250"
                onClick={BackQuote}
                to={"/quotes"}
              >
                Back To Quotes
              </Link>
              {/* <Link className="btnicon">
                <Icon icon="bytesize:upload" />
              </Link> */}
            </div>
          </div>
          <Row>
            <Col lg={8} xl={9}>
              <FileUpload
                acceptedFiles={[".dxf"]}
                onFileDrop={handleFileDrop}
                error={error}
                className={"mb-4"}
              />

              {quoteData &&
                quoteData.length > 0 &&
                Array.isArray(quoteData) &&
                (
                  <List
                    outerRef={listOuterRef}
                    height={Math.min(quoteData.length * 340)}
                    itemCount={quoteData.length}
                    itemSize={350}
                    width={"100%"}
                    itemData={listItemData}
                    itemKey={index => quoteData[index]._id}
                    className="quote_scroll_cls"
                    outerElementType={React.forwardRef((props, ref) => (
                      <div {...props} ref={ref} onScroll={handleOuterScroll} />
                    ))}
                  >
                    {({ index, style, data }) => {
                      const quote = data.quoteData[index];
                      return (
                        <div style={style} key={quote._id} className="quotelist">
                          <QuoteLineItem
                            quote={quote}
                            index={index}
                            materials={data.materials}
                            getDimension={data.getDimension}
                            onQuoteUpdate={onQuoteUpdate}
                            onOptionSelect={data.handleOptionSelect}
                            onDimensionChange={data.handleApiResponse}
                            onQuantityChange={data.handleQuantityChange}
                            onQuantityChangeAPI={data.handleQuantityChangeAPI}
                            onDuplicateQuote={data.handleDuplicateQuote}
                            onDeleteQuote={data.handleDeleteQuote}
                            onRenameQuote={data.handleShow}
                            onAddNote={data.handleShow3}
                            onSetFocus={data.onSetFocus}
                            focusedQuoteId={data.focusedQuoteId}
                            onBlurQuantity={data.handleBlurQuantity}
                            loadingSelect={data.loadingSelect}
                            loadingFiles={data.loadingFiles}
                            quoteList={data.quoteList}
                            currentMonth={data.currentMonth}
                            yearLastTwoDigits={data.yearLastTwoDigits}
                            setModalShow={data.setModalShow}
                            setModalShow2={data.setModalShow2}
                            setModalShow3={data.setModalShow3}
                            setModalShow4={data.setModalShow4}
                            setSelectedQuote={data.setSelectedQuote}
                            setSelectedNote={data.setSelectedNote}
                            setSelectedPartId={data.setSelectedPartId}
                            setimage_url={data.setimage_url}
                            setquote_name={data.setquote_name}
                            setbend_count={data.setbend_count}
                            setbendupload_url={data.setbendupload_url}
                            setid_quote={data.setid_quote}
                            handleClick={data.handleClick}
                          />
                        </div>
                      );
                    }}
                  </List>
                )}
            </Col>

            {quoteData && quoteData.length > 0 && (
              <Col lg={4} xl={3}>
                {/* --{orderDe} */}
                <QuotesSidebar
                  amount={getTotalAmount().toFixed(2)}
                  bendAmount={getBendAmount().toFixed(2)}
                  buttonText={btnText}
                  quoteData={quoteList}
                  // loadId={}
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
