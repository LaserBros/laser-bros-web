import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Image,
  Container,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import file1 from "../../assets/img/file1.jpg";
import {
  AdminaddNotes,
  AdminfetchSelectedFinishes,
  AdminbendQuotes,
  AdmingetMaterials,
  AdmingetThickness,
  AdmingetThicknessMaterialFinish,
  AdminupdateQuantity,
  AdminupdateSubQuoteDetails,
  updateBendPrice,
  getSubQuote,
} from "../../../api/api";
import QuantitySelector from "../../components/Quantityselector";
import SelectDropdowns from "../../components/Selectdropdown";
import QuotesSidebar from "../../components/Quotessidebar";
import RenamePart from "../../components/Renamepart";

import AdminAddNote from "../../components/AddNote";
import AddPrice from "../../components/AddPrice";
import AddQty from "../../components/AddQty";
import DimensionsToggle from "../../../components/DimensionsToggle";
import FileUpload from "../../components/FileUploadAdmin";
import AddBend from "../../components/Addbend";
import Amount from "../../../components/Amount";
import AddressDetails from "../../components/AddressDetails";
// import { useDrag, useDrop } from "react-dnd";
import DropZone from "../../components/DropZone";
import DraggableItem from "../../components/DraggableListItem";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MultiSelectModal from "../../components/PostOps";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ModalOrderData from "../../components/OrderData";
const EditRFQS = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const options = [
    "F0",
    "F1",
    "F2",
    "F3",
    "F4",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "B11",
    "B12",
    "B13",
    "B15",
    "B16",
    "B17",
    "B18",
    "B19",
    "B20",
    "MB1",
    "MB2",
    "MB3",
    "MB4",
    "MB5",
    "MB6",
    "MB7",
    "MB8",
    "MB9",
    "MB10",
    "MB11",
    "MB12",
    "MB13",
    "MB14",
    "MB15",
    "MB16",
    "MB17",
    "MB18",
    "MB19",
    "MB20",
  ];
  const [idSelect, setidSelect] = useState("");
  const [quotePost, setquotePost] = useState("");
  const handleOpenModal = (id, post_ops) => {
    setidSelect(id);
    setquotePost("");
    setquotePost(post_ops);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleSaveSelection = (selected) => {
    setSelectedItems(selected);
    let existingData = localStorage.getItem("setItempartsDBdataAdmin");

    let parsedData = existingData ? JSON.parse(existingData) : [];
    // console.log(parsedData, "parsedData");
    let existingQuote = parsedData.find((item) => item._id === idSelect);
    // console.log(existingQuote, "existingQuote", id);
    if (existingQuote) {
      // If the quote already exists, append the new postOps data
      if (!existingQuote.post_ops) {
        existingQuote.post_ops = ""; // Initialize postOps array if not present
      }

      // Add the selected data to the postOps array (avoid duplicates)
      if (!existingQuote.post_ops.includes(selected)) {
        existingQuote.post_ops = selected;
      }
    }
    localStorage.setItem("setItempartsDBdataAdmin", JSON.stringify(parsedData));
    setQuoteData(parsedData);
    setquoteDataCon(true);
  };

  const [quoteData, setQuoteData] = useState(null);
  const [quoteList, setQuoteList] = useState(null);
  var currentDate = new Date();
  var currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  var currentDay = String(currentDate.getDate()).padStart(2, "0");
  var yearLastTwoDigits = String(currentDate.getFullYear()).slice(-2);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowQty, setModalShowQty] = useState(false);
  const [modalShowPrice, setModalShowPrice] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedQty, setSelectedQty] = useState(null);
  const [price, setPrice] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedAdminNote, setSelectedAdminNote] = useState(null);

  const [selectedPartId, setSelectedPartId] = useState(null);

  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const handleShow = (quote, id) => {
    setSelectedQuote(quote);
    setSelectedPartId(id);
    setModalShow(true);
  };
  const handleShowQty = (qty, id) => {
    setSelectedQty(qty);
    setSelectedPartId(id);
    setModalShowQty(true);
  };

  const handleShowPrice = (quote, id, price) => {
    setSelectedQuote(quote);
    setSelectedPartId(id);
    setPrice(price);
    setModalShowPrice(true);
  };
  // const colors = [
  //   { label: "Gloss Red P.C.", value: "#E11F26" },
  //   { label: "Gloss Yellow P.C.", value: "#facc15" },
  //   { label: "Gloss Blue P.C.", value: "#1F2E60" },
  //   { label: "Gloss Green P.C.", value: "#2A5C17" },
  //   { label: "Gloss Orange P.C.", value: "#f37520" },
  // ];
  const [colors, setcolors] = useState([]);
  useEffect(() => {
    // fetchOptions();
  }, []);
  const [addLoading, setaddLoading] = useState(false);
  const handleUpload = async (file, id, quantities, pdf_url, new_price) => {
    if (file.length == 0) {
      alert("Please upload a STEP or PDF file before saving.");
      return;
    }
    try {
      setaddLoading(true);
      const data_val_new = {
        id: id,
        bendAmount: new_price,
      };
      const res = await updateBendPrice(data_val_new);
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("quote_image", file[i]);
      }
      formData.append("id", id);
      formData.append("bend_count", quantities);
      try {
        const response = await AdminbendQuotes(formData);

        console.log(
          "response.data.data  response.data.data",
          response.data.data
        );
        localStorage.setItem(
          "setItempartsDBdataAdmin",
          JSON.stringify(response.data.data)
        );

        setQuoteData(response.data.data);
        var data_val = response.data.data;
        let total = 0; // Change 'const' to 'let' to allow reassignment
        for (const quote of data_val) {
          total += quote.bend_count * parseFloat(quote.per_bend_price); // Accumulate bend_count values
        }

        const quoteList = localStorage.getItem("setItemelementDataAdmin");

        if (quoteList) {
          // Parse the stored JSON data
          const parsedQuoteList = JSON.parse(quoteList);

          // Update the total_bend_price in the object
          parsedQuoteList.total_bend_price = total;
          localStorage.setItem(
            "setItemelementDataAdmin",
            JSON.stringify(parsedQuoteList)
          );
          setQuoteList(parsedQuoteList);
          console.log("Sdssdsdsdsd", quoteList, "quoteList");
        }
        setquoteDataCon(true);
        setaddLoading(false);
        setModalShow2(false);
      } catch (error) {
        setaddLoading(false);
        console.log("errororoor ----", error);
      }
    } catch (error) {
      setaddLoading(false);
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
  const [materials, setmaterials] = useState([]);

  useEffect(() => {
    const fetchOptions_val = async () => {
      try {
        const response = await AdmingetMaterials();
        const fetchedOptions = response.data.map((item) => ({
          value: item._id,
          label: item.material_name + " " + item.material_grade,
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
      const response = await AdmingetThickness(data);

      const fetchedOptions = response.data.map((item) => ({
        value: item._id,
        label: item.material_thickness,
        selectedValue: item.material_code,
      }));

      setQuoteData((prevQuoteData) =>
        prevQuoteData.map((quote) =>
          quote._id === quoteId
            ? { ...quote, thicknessOptions: fetchedOptions } // Store the thickness options in the quote
            : quote
        )
      );
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  const fetchFinish = async (materialId, quoteId) => {
    try {
      const data = {
        id: materialId,
      };
      const response = await AdminfetchSelectedFinishes(data); // Your API call function
      const res_status = response.data;
      const fetchedOptions = res_status.map((item) => ({
        value: item._id,
        label: item.finishing_desc,
      }));
      //   console.log("fetchedOptions ,fetchedOptions", response.bending);
      setQuoteData((prevQuoteData) =>
        prevQuoteData.map((quote) =>
          quote._id === quoteId
            ? {
                ...quote,
                finishOptions: fetchedOptions,
                binding_option: response.bending,
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

  const handleShow3 = (quote, notes_admin, id) => {
    console.log("Sdsd notes");
    setSelectedNote(quote);
    setSelectedAdminNote(notes_admin);
    setSelectedPartId(id);
    setModalShow3(true);
  };
  const updateQuoteNote = (partId, newNote) => {
    if (!newNote || newNote.trim() === "") {
      console.warn("New note is empty. No update performed.");
      return; // Exit the function if newNote is empty
    }

    const updatedQuoteData = quoteData.map((quote) => {
      if (quote._id === partId) {
        const updatedNotes = Array.isArray(quote.notes_admin)
          ? [...quote.notes_admin, newNote]
          : [newNote];

        return { ...quote, notes_admin: updatedNotes };
      }
      return quote;
    });

    // Update localStorage with the new data
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(updatedQuoteData)
    );

    // Update the state with the new data
    setQuoteData(updatedQuoteData);
  };

  const handleDeleteNote = (indexToDelete, partId) => {
    // console.log("indexToDelete, partId", indexToDelete, partId);
    setQuoteData((prevQuoteData) => {
      const updatedQuoteData = prevQuoteData.map((quote) => {
        if (quote._id === partId) {
          const updatedAdminNote = quote.notes_admin.filter(
            (note, index) => index !== indexToDelete
          );
          return { ...quote, notes_admin: updatedAdminNote };
        }
        return quote;
      });

      localStorage.setItem(
        "setItempartsDBdataAdmin",
        JSON.stringify(updatedQuoteData)
      );

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

    const updatedQuoteData = quoteData.map((quote) =>
      quote._id === Id ? { ...quote, quote_name: newName } : quote
    );
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(updatedQuoteData)
    );
    // setQuoteData(updatedQuoteData);
  };
  const updatePrice = (Id, price) => {
    setQuoteData((prevQuoteData) =>
      prevQuoteData.map((quote) =>
        quote._id === Id
          ? { ...quote, amount: price.toFixed(2) * quote.quantity }
          : quote
      )
    );

    const updatedQuoteData = quoteData.map((quote) =>
      quote._id === Id
        ? { ...quote, amount: price.toFixed(2) * quote.quantity }
        : quote
    );
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(updatedQuoteData)
    );
  };
  const handleClosePrice = () => setModalShowPrice(false);
  const handleCloseQty = () => setModalShowQty(false);
  const handleClose = () => setModalShow(false);
  const navigate = useNavigate();
  const [image_url, setimage_url] = useState(null);
  const [quote_name, setquote_name] = useState(null);
  const [bend_count, setbend_count] = useState(null);
  const [bendupload_url, setbendupload_url] = useState(null);
  const [id_quote, setid_quote] = useState(null);
  const [bend_amount, setebendAmount] = useState("");
  const [UserData, setUserData] = useState("");
  const handleShow2 = async (
    image_url,
    quote_name,
    bend_count,
    bendupload_url,
    id,
    checked,
    amount
  ) => {
    if (checked) {
      setimage_url(image_url);
      setquote_name(quote_name);
      setbend_count(bend_count);
      setbendupload_url(bendupload_url);
      setid_quote(id);
      setModalShow2(true);
      setebendAmount(amount);
    } else {
      const isConfirmed = window.confirm(
        "Are you sure you want to remove bending?"
      );

      if (isConfirmed) {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("bend_count", 0);
        formData.append("quote_image", "");
        try {
          const response = AdminbendQuotes(formData);

          const updatedQuoteData = quoteData.map((quote) => {
            if (quote._id === id) {
              const bend_count = 0;
              const bendupload_url = "";

              return {
                ...quote,
                bend_count: bend_count,
                bendupload_url: bendupload_url,
              };
            }
            return quote;
          });

          localStorage.setItem(
            "setItemelementDataAdmin",
            JSON.stringify(updatedQuoteData)
          );
          const quoteDataVal = JSON.parse(
            localStorage.getItem("setItemelementDataAdmin")
          );

          let total = 0;
          for (const quote of quoteDataVal) {
            total += quote.bend_count; // Accumulate bend_count values
          }

          const quoteList = localStorage.getItem("setItemelementDataAdmin");

          if (quoteList) {
            // Parse the stored JSON data
            const parsedQuoteList = JSON.parse(quoteList);

            console.log("parsedQuoteList", parsedQuoteList);
            parsedQuoteList.total_bend_price = isNaN(total) ? 0 : total * 5;

            console.log(
              "total * 15",
              total * 5,
              parsedQuoteList,
              "dsdsdsdsdsddsd"
            );
            localStorage.setItem(
              "setItemelementDataAdmin",
              JSON.stringify(parsedQuoteList)
            );
            setQuoteList(parsedQuoteList);
          }

          setquoteDataCon(true);
          setQuoteData(updatedQuoteData);
        } catch (error) {
          console.log("Dsdsdsdsdsdd", error);
        }
      }
    }
  };
  const handleClose2 = () => setModalShow2(false);

  const handleClose3 = () => setModalShow3(false);
  const [quantities, setQuantities] = useState({
    item1: 1,
    item2: 1,
    item3: 1,
    item4: 1,
  });
  const [modalShow4, setModalShow4] = useState(false);
  const [subquote_number, setsubquote_number] = useState("");
  const [loadingOrderQuote, setLoadingOrderQuote] = useState(false);
  const handleShow4 = async (id) => {
    try {
      setLoadingOrderQuote(id);
      const res = await getSubQuote(id);
      setsubquote_number(res.data);
      setLoadingOrderQuote("");
      setModalShow4(true);
    } catch (error) {
      setLoadingOrderQuote("");
    }
  };
  const handleClose4 = () => setModalShow4(false);
  const onDeleteAction = (id) => {
    const storedData =
      JSON.parse(localStorage.getItem("setItempartsDBdataAdmin")) || [];

    // Filter out the item with the matching _id
    const updatedData = storedData.filter((item) => item._id !== id);

    // Save the updated array back to localStorage
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(updatedData)
    );
    setQuoteData(updatedData);

    let total = 0; // Change 'const' to 'let' to allow reassignment
    for (const quote of updatedData) {
      total += quote.bend_count * parseFloat(quote.per_bend_price); // Accumulate bend_count values
    }
    console.log("SDsdssdsdsdsdsds", total, "sdsdsdd+++++++");

    const quoteList = localStorage.getItem("setItemelementDataAdmin");

    if (quoteList) {
      // Parse the stored JSON data
      const parsedQuoteList = JSON.parse(quoteList);

      // Update the total_bend_price in the object
      parsedQuoteList.total_bend_price = total;
      localStorage.setItem(
        "setItemelementDataAdmin",
        JSON.stringify(parsedQuoteList)
      );
      setQuoteList(parsedQuoteList);
    }

    setquoteDataCon(true);
  };
  useEffect(() => {
    const handleStorageChange = () => {
      setQuoteData(localStorage.getItem("setItempartsDBdataAdmin"));
    };

    // Optionally listen for `localStorage` changes (if updated by another tab)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const [divideWeight, setdivideWeight] = useState("");
  const [TaxRatesVal, setTaxRates] = useState("");
  useEffect(() => {
    const storedData = localStorage.getItem("setItempartsDBdataAdmin");
    const quote_list = localStorage.getItem("setItemelementDataAdmin");
    const userDataVal = JSON.parse(localStorage.getItem("shippingRates")); 
    const TaxRates = JSON.parse(localStorage.getItem("taxRates")); 
    const divideWeight = JSON.parse(localStorage.getItem("divideWeight"));

    if (storedData) {
      // Parse the JSON string into an object
      const parsedData = JSON.parse(storedData);
      const quote_list_val = JSON.parse(quote_list);
      setQuoteList(quote_list_val);
      setdivideWeight(divideWeight);
      setTaxRates(TaxRates);
      setUserData(userDataVal);
      setQuoteData(parsedData);
    }
  }, []);
  const [quoteDataCon, setquoteDataCon] = useState(true);
  useEffect(() => {
    setTimeout(async () => {
      if (quoteDataCon) {
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
      await AdminupdateQuantity(formData);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  const updateQuantityAPI = async (quantity, id) => {
    console.log("Dssdsdsdsd", quantity);
    let data = "";
    let type = "";
    let params = "";

    const updatedQuoteData = quoteData.map((quote) => {
      if (quote._id === id) {
        const updatedQuantity = quantity;
        params = {
          id: quote._id,
          quantity: updatedQuantity,
          material_id: quote.material_id,
          thickness_id: quote.thickness_id,
          finishing_id: quote.finishing_id,
        };

        return {
          ...quote,
          quantity: updatedQuantity,
        };
      }
      return quote;
    });
    setQuoteData(updatedQuoteData);
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(updatedQuoteData)
    );
    const response = await AdmingetThicknessMaterialFinish(data, type, params);

    if (response && response.data) {
      const discount = response.data.data.updateData.discount;
      const price = response.data.data.updateData.price;
      //   console.log("response.data.discount;", response.data.data.updateData.discount);

      const finalQuoteData = updatedQuoteData.map((quote) => {
        if (quote._id === id) {
          let part_number = quote.subquote_number
            ? quote.subquote_number.toString()
            : "";
          if (part_number != "") {
            let parts = part_number.split("-");
            parts[1] = quantity;

            var total_parts = parts.join("-");
          } else {
            var total_parts = "";
          }
          return {
            ...quote,
            quantity: quote.quantity,
            subquote_number: total_parts,
            discount: discount,
            amount: price,
          };
        } else return quote;
      });

      setQuoteData(finalQuoteData);
      localStorage.setItem(
        "setItempartsDBdataAdmin",
        JSON.stringify(finalQuoteData)
      );
    } else {
      console.error("Error updating quote:", response);
    }
  };
  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", name);

      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl); // Revoke the blob URL after the download
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  // const handleQuantityChange = async (Id, increment = true) => {
  //   let data = "";
  //   let type = "";
  //   let params = "";

  //   const updatedQuoteData = quoteData.map((quote) => {
  //     if (quote._id === Id) {
  //       const updatedQuantity = increment
  //         ? quote.quantity + 1
  //         : Math.max(0, quote.quantity - 1);
  //       params = {
  //         id: quote._id,
  //         quantity: updatedQuantity,
  //         material_id: quote.material_id,
  //         thickness_id: quote.thickness_id,
  //         finishing_id: quote.finishing_id,
  //       };

  //       return {
  //         ...quote,
  //         quantity: updatedQuantity,
  //       };
  //     }
  //     return quote;
  //   });

  //   setQuoteData(updatedQuoteData);
  //   localStorage.setItem(
  //     "setItempartsDBdataAdmin",
  //     JSON.stringify(updatedQuoteData)
  //   );
  //   const response = await AdmingetThicknessMaterialFinish(data, type, params);

  //   if (response && response.data) {
  //     const discount = response.data.data.updateData.discount;
  //     const price = response.data.data.updateData.price;
  //     //   console.log("response.data.discount;", response.data.data.updateData.discount);

  //     const finalQuoteData = updatedQuoteData.map((quote) =>
  //       quote._id === Id
  //         ? {
  //             ...quote,
  //             quantity: quote.quantity,
  //             discount: discount,
  //             amount: price,
  //           }
  //         : quote
  //     );

  //     setQuoteData(finalQuoteData);
  //     localStorage.setItem(
  //       "setItempartsDBdataAdmin",
  //       JSON.stringify(finalQuoteData)
  //     );
  //   } else {
  //     console.error("Error updating quote:", response);
  //   }
  // };

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
            quantity: quote.quantity,
          };

          response = await AdmingetThicknessMaterialFinish(data, type, params);
          break;
        }
      }
      if (type == "material") {
        fetchThickness(selectedOption.value, id);
      }
      if (type == "thickness") {
        fetchFinish(selectedOption.value, id);
      }

      const updatedQuoteData = quoteData.map((quote) => {
        if (quote._id === id) {
          let updatedFields = {};
          const currentAmount = parseFloat(quote.amount) || 0;
          const newPrice = parseFloat(response.data.data.updateData.price) || 0;

          if (type === "material") {
            updatedFields.material_id = selectedOption.value;
            updatedFields.thickness_id = null;
            updatedFields.finishing_id = null;
            updatedFields.binding_option = "no";
          } else if (type === "finish") {
            updatedFields.finishing_id = selectedOption.value;
          } else if (type === "thickness") {
            updatedFields.thickness_id = selectedOption.value;
            updatedFields.finishing_id = null;
            let part_number = quote.subquote_number
              ? quote.subquote_number.toString()
              : "";

            let parts = part_number.split("-");
            parts[0] = selectedOption.selectedValue;

            let total_parts = parts.join("-");
            updatedFields.subquote_number = total_parts;
          }
          return {
            ...quote,
            ...updatedFields,
            estimated_lead_time: response.data.data.estimated_lead_time,
            amount: newPrice,
          };
        }
        return quote;
      });

      // Sum the total amount of all quotes
      const totalAmount = updatedQuoteData.reduce(
        (sum, quote) => sum + quote.amount,
        0
      );

      // Update localStorage with the new quoteData
      localStorage.setItem(
        "setItempartsDBdataAdmin",
        JSON.stringify(updatedQuoteData)
      );

      // Update state with the new quoteData
      setQuoteData(updatedQuoteData);
      console.log("Total sum of prices:", totalAmount);
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

  const decrementQuantity = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item]: Math.max(prevQuantities[item] - 1, 0), // Prevent negative quantities
    }));
  };

  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);
  const handleFileDrop = (data) => {
    console.log("Files dropped: ---------", data);

    // Check if data is defined and has the expected structure
    if (data && data.partsDBdata && data.requestQuoteDB) {
      const storedData = data.partsDBdata;
      const quote_list = data.requestQuoteDB;

      // Since storedData and quote_list should already be objects, no need to parse again
      setQuoteList(quote_list); // Assuming quote_list is already an object/array
      setQuoteData(storedData); // Assuming storedData is already an object
      setquoteDataCon(true);
      // Add any additional logic for handling the files
    } else {
      console.error("Data structure is not as expected:", data);
      // Handle the error case as necessary
    }
  };


  const downloadFile = (url) => {
    // Extract file name and extension from URL
    const fileNameWithParams = url.split("/").pop(); // Get everything after the last "/"
    const [fileName] = fileNameWithParams.split("?"); // Remove query parameters if present
    const extension = fileName.split(".").pop(); // Get the file extension
  
    // Clean the file name (remove digits and unwanted patterns at the start of the name)
    const cleanFileName = fileName
      .replace(/^\d+-/, "") // Remove timestamp or numerical prefix (e.g., "1734240670591-")
      .replace(/(\s*\(\d+\))?\.[^.]+$/, `.${extension}`); // Clean trailing patterns like "(5)" before the extension
  
    // Fetch and download the file
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = cleanFileName; // Set the final cleaned file name
        link.click();
        window.URL.revokeObjectURL(link.href); // Clean up
      })
      .catch((error) => console.error("Error downloading the file:", error));
  };
  
  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
            {quoteData && quoteData.length > 0 ? (
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
            {/* <div className="">
              {UserData.full_name}
              {UserData.email}
              {UserData.phone_number}
              {UserData.company_name}
              <br />
              Address = :{UserData.addressDetails?.full_name}
              {UserData.addressDetails?.address_line_1}
              {UserData.addressDetails?.city}
              {UserData.addressDetails?.country}
            </div> */}
            <div className="d-inline-flex gap-2">
              <Link className="btnshare" to={"/admin/rfqs"}>
                Back RFQ's
              </Link>
              {/* <Link className="btnicon">
                <Icon icon="bytesize:upload" />
              </Link> */}
            </div>
          </div>
          <AddressDetails
            shipAddress={quoteList?.billing_details}
            billAdress={quoteList?.address_details}
            addressDetail={quoteList}
            TaxRatesVal = {TaxRatesVal}
          />
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
                quoteData.map((quote, index) => (
                  <div className="list-quotes-main">
                    <div className="list-quotes flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
                      <div className="flex-shrink-0">
                        <div className="img-quote mx-auto mx-md-0">
                          <Image
                            src={quote.image_url}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <span className="num-dim">
                          <DimensionsToggle
                            dimensions={quote.dimensions}
                            id={quote._id}
                            type={quote.dimension_type}
                            // isEdit={true}
                          />
                        </span>
                      </div>
                      <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
                        <h2>
                          {quote.quote_name}
                          <Icon
                            icon="material-symbols-light:download-sharp"
                            onClick={() =>
                              handleDownload(quote?.dxf_url, quote.quote_name)
                            }
                          />
                        </h2>
                        <p className="num-dim-main">
                          <span className="num-dim">
                            {quote.thickness_id
                              ? quote?.subquote_number?.includes(
                                  quoteList.search_quote +
                                    "-" +
                                    String(index + 1).padStart(3, "0")
                                )
                                ? quote?.subquote_number
                                : quote.subquote_number +
                                  "-" +
                                  quoteList.search_quote +
                                  "-" +
                                  String(index + 1).padStart(3, "0")
                              : ""}
                          </span>
                          {/* {quote.pierce_count && (
                            <>
                              <br></br>
                              <span
                                className="num-dim mt-2"
                                style={{ fontSize: "12px" }}
                              >
                                Pierce Count : {quote.pierce_count}
                                
                              </span>
                            </>
                          )} */}
                        </p>
                        <div className="datamain mb-2">
                          <Link
                            className="btndata"
                            onClick={() => {
                              handleShow4(quote._id);
                            }}
                            style={{ minWidth: 42 }}
                          >
                            {loadingOrderQuote == quote._id ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              "Data"
                            )}
                          </Link>
                        </div>
                        <div className="quotes-dropdown flex-md-row d-flex align-item-center justify-content-md-start justify-content-center">
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
                          <div className="DragItemPost_div">
                            <Button
                              className="DragItemPostOps_btn"
                              variant={null}
                            >
                              Post Ops
                            </Button>
                            {quote?.post_ops?.length > 0 ? (
                              <>
                                <DraggableItem
                                  id={quote._id}
                                  dragoption={quote.post_ops}
                                />
                              </>
                            ) : (
                              <p></p>
                            )}

                            <Button
                              className="DragItemPostPlus_btn"
                              variant={null}
                              onClick={() =>
                                handleOpenModal(quote._id, quote?.post_ops)
                              }
                            >
                              <Icon icon="ic:baseline-plus" />
                            </Button>
                          </div>
                        </div>
                        <div className="quotes-services quote_div_main_sect mt-3">
                          {quote.binding_option == "no" ? (
                            <p></p>
                          ) : (
                            <>
                              <div
                                className={`main_service_clr${
                                  quote.bend_count < 1 ? "s" : ""
                                }`}
                              >
                                {quote.thickness_id && (
                                  <>
                                    <div className="flex-shrink-0">
                                      {/* <h4>Services</h4> */}

                                      <Form.Check
                                        type="checkbox"
                                        label="Bending"
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
                                            e.target.checked,
                                            quote.per_bend_price
                                          )
                                        }
                                        checked={quote.bend_count >= 1}
                                      />
                                    </div>
                                  </>
                                )}
                                {quote.bend_count != 0 && (
                                  <>
                                    <div className="custom_bend_div">
                                      <p>
                                        Number of bends : {quote.bend_count}
                                      </p>
                                      <p>
                                        Price per bend :{" "}
                                        <Amount amount={quote.per_bend_price} />
                                      </p>
                                      <p>
                                        Total :{" "}
                                        <Amount amount={quote.bend_price} />
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                              {quote.bend_count != 0 && (
                                <Link
                                  className="btnicon flex-shrink-0"
                                  onClick={() => {
                                    console.log(
                                      quote.per_bend_price,
                                      "quote.per_bend_price"
                                    );
                                    setimage_url(quote.image_url);
                                    setquote_name(quote.quote_name);
                                    setbend_count(quote.bend_count);
                                    setbendupload_url(quote.bendupload_url);
                                    setid_quote(quote._id);
                                    setModalShow2(true);
                                    setebendAmount(quote.per_bend_price);
                                  }}
                                >
                                  <Icon icon="mynaui:edit" />
                                </Link>
                              )}
                            </>
                          )}
                          {/* </> */}
                          {/* )} */}
                        </div>
                        <div className="quotes-services mt-3">
                          <p style={{ fontSize: "12px" }}>
                            Bending : {quote.bend_count >= 1 ? "Yes" : "No"}
                            {"   "}
                            {quote.bendupload_url?.length > 0 &&
                              quote.bendupload_url?.map((url, index) => (
                                <Link
                                                                        // href={`${url}`}
                                                                        // target="_blank"
                                                                        onClick={() => downloadFile(url)}
                                                                        style={{ paddingRight: "5px" }}
                                                                      >
                                  Attachment {String(index + 1)}
                                </Link>
                              ))}
                          </p>
                        </div>
                      </div>
                      <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                        <p className=" text-md-end">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(quote.amount)}{" "}
                          total
                        </p>
                        <p className=" text-md-end">
                          <strong className="quotes-price">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(quote.amount / quote.quantity)}
                            {/* ${.toFixed(2)} */}
                          </strong>
                          /each{" "}
                          <Link
                            className="btnicons"
                            onClick={() =>
                              handleShowPrice(
                                quote.quote_name,
                                quote._id,
                                (quote.amount / quote.quantity).toFixed(2)
                              )
                            }
                          >
                            <Icon icon="mynaui:edit" />
                          </Link>
                        </p>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <p className="fw-bold">
                            Qty : {quote.quantity}{" "}
                            <Link
                              className="btnicons"
                              onClick={() =>
                                handleShowQty(quote.quantity, quote._id)
                              }
                            >
                              <Icon icon="mynaui:edit" />
                            </Link>
                          </p>
                          <span className="quote-off">
                            {quote.discount} % Saved
                          </span>
                        </div>
                        <p className="mb-0 text-md-end">
                          {quote.estimated_lead_time
                            ? "Typical Lead Time " +
                              quote.estimated_lead_time +
                              " days"
                            : "Typical Lead Time " +
                              quote?.type_option[0]?.estimated_lead_time +
                              " days"}
                        </p>

                        <div className="rightbtns gap-2 d-inline-flex flex-wrap mt-5">
                          <Link
                            className="btnshare"
                            onClick={() =>
                              handleShow3(
                                quote.notes_text,
                                quote.notes_admin,
                                quote._id
                              )
                            }
                          >
                            Add Note
                          </Link>
                          <Link
                            className="btnicon"
                            onClick={() =>
                              handleShow(quote.quote_name, quote._id)
                            }
                          >
                            <Icon icon="mynaui:edit" />
                          </Link>
                          <Link
                            className="btnicon"
                            // onClick={() => handleDeleteQuote(quote._id)}
                            onClick={() => {
                              onDeleteAction(quote._id);
                            }}
                          >
                            <Icon icon="uiw:delete" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* <div className="d-flex align-items-center justify-content-between ps-lg-3 ps-0 mt-3 gap-2"> */}
                    {/* <QuantitySelector
                        quantity={quote.quantity}
                        onIncrement={() =>
                          handleQuantityChange(quote._id, true)
                        }
                        onDecrement={() =>
                          quote.quantity === 1
                            ? null
                            : handleQuantityChange(quote._id, false)
                        }
                        updateQuantityAPI={(price) => {
                          updateQuantityAPI(price, quote._id);
                        }}
                      /> */}

                    {/* </div> */}
                  </div>
                ))}
            </Col>
            {quoteData && quoteData.length > 0 && (
              <Col lg={4} xl={3}>
                <QuotesSidebar
                  amount={getTotalAmount().toFixed(2)}
                  quoteData={quoteList}
                  UserData={UserData}
                  divideWeight={divideWeight}
                  TaxRatesVal={TaxRatesVal}
                  // OnSave={OnSave}
                />
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <RenamePart
        show3={modalShow}
        handleClose3={handleClose}
        quote={selectedQuote}
        onSave={(newName) => updateQuoteName(selectedPartId, newName)}
        title={
          quoteData && quoteData.length > 0
            ? "Rename Part " +
              currentMonth +
              "-" +
              yearLastTwoDigits +
              "-" +
              quoteList.quote_number
            : "Rename Part # " +
              currentMonth +
              "-" +
              yearLastTwoDigits +
              "-0001"
        }
      />

      <AddPrice
        show3={modalShowPrice}
        handleClose3={handleClosePrice}
        quote={selectedQuote}
        price={price}
        onSave={(price) => updatePrice(selectedPartId, price)}
        title={selectedQuote}
      />
      <AddQty
        show3={modalShowQty}
        handleClose3={handleCloseQty}
        quote={selectedQuote}
        price={selectedQty}
        onSave={(qty) => updateQuantityAPI(qty, selectedPartId)}
        title={"Change Quantity"}
      />
      <AdminAddNote
        show={modalShow3}
        isEditAdmin={true}
        onSave={(newNote) => updateQuoteNote(selectedPartId, newNote)}
        handleDeleteNote={(index) => handleDeleteNote(index, selectedPartId)}
        customer_note={selectedNote}
        admin_note={selectedAdminNote}
        id={selectedPartId}
        handleClose={handleClose3}
        title="Notes"
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
        amount={bend_amount}
      />
      <MultiSelectModal
        selectedArea={quotePost}
        show={showModal}
        id={idSelect}
        onClose={handleCloseModal}
        options={options}
        onSave={handleSaveSelection}
      />
      <ModalOrderData
        QuoteData={subquote_number}
        modalShow4={modalShow4}
        handleClose4={handleClose4}
      />
    </React.Fragment>
  );
};

export default EditRFQS;
