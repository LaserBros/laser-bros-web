import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Image, Form, Link } from "react-bootstrap";
import { Icon } from "@iconify/react";
import debounce from 'lodash.debounce';
import QuantitySelector from "./Quantityselector";
import SelectDropdowns from "./Selectdropdown";
import RenamePart from "./Renamepart";
import AddBend from "./Addbend";
import AddNote from "./Addnote";
import Amount from "./Amount";
import DimensionsToggle from "./DimensionsToggle";
import { Tooltip } from "react-tooltip";
import { encodeS3Url } from "../utils/encodeS3Url";
import {
  getThickness,
  fetchSelectedFinishes,
  updateQuantity,
  getThicknessMaterialFinish,
  uploadBendingFile,
} from "../api/api";

const QuoteLineItem = React.memo(({ 
  quote, 
  index, 
  materials, 
  getDimension,
  onQuoteUpdate,
  onDeleteQuote,
  onDuplicateQuote,
  onRenameQuote,
  onAddNote,
  onDimensionChange,
  onQuantityChange,
  onOptionSelect,
  onBendingToggle,
  onFileUpload,
  onFileRemove,
  loadingFiles,
  currentMonth,
  yearLastTwoDigits,
  quoteList,
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
  handleClick
}) => {
  const [localQuote, setLocalQuote] = useState(quote);
  const [localThicknessOptions, setLocalThicknessOptions] = useState(quote.thicknessOptions || []);
  const [localFinishOptions, setLocalFinishOptions] = useState(quote.finishOptions || []);

  // Update local state when quote prop changes
  useEffect(() => {
    setLocalQuote(quote);
    setLocalThicknessOptions(quote.thicknessOptions || []);
    setLocalFinishOptions(quote.finishOptions || []);
  }, [quote]);

  // Debounced API calls
  const debouncedFetchThickness = useCallback(
    debounce(async (materialId, quoteId) => {
      try {
        const data = { id: materialId };
        const response = await getThickness(data);
        const fetchedOptions = response.data.map((item) => ({
          value: item._id,
          label: item.material_thickness,
          selectedValue: item.material_code,
        }));
        setLocalThicknessOptions(fetchedOptions);
        onQuoteUpdate(quoteId, { thicknessOptions: fetchedOptions });
      } catch (error) {
        console.error("Error fetching thickness options:", error);
      }
    }, 300),
    [onQuoteUpdate]
  );

  const debouncedFetchFinish = useCallback(
    debounce(async (materialId, quoteId) => {
      try {
        const data = {
          thickness_id: materialId,
          id: quoteId,
        };
        const response = await fetchSelectedFinishes(data);
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
          await uploadBendingFile(formData);
          onQuoteUpdate(quoteId, { bend_count: 0 });
        }
        
        setLocalFinishOptions(fetchedOptions);
        onQuoteUpdate(quoteId, {
          finishOptions: fetchedOptions,
          binding_option: response.data.bending,
          finish_check_status: response.data.check_status,
        });
      } catch (error) {
        console.error("Error fetching finish options:", error);
      }
    }, 300),
    [onQuoteUpdate]
  );

  const debouncedUpdateQuantity = useCallback(
    debounce(async (quoteId, qty) => {
      try {
        const formData = {
          id: quoteId,
          quantity: qty,
          quote_id: quoteId,
        };
        const response = await updateQuantity(formData);
        
        if (response && response.data) {
          const discount = response.data.updateQuantity.discount;
          const price = response.data.updateQuantity.amount;
          const price_status = response.data.updatedPrice.check_status;
          
          onQuoteUpdate(quoteId, {
            quantity: qty,
            discount: discount,
            amount: price,
            price_check_status: price_status,
          });
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }, 300),
    [onQuoteUpdate]
  );

  const handleLocalQuantityChange = useCallback((quoteId, newQuantity) => {
    setLocalQuote(prev => ({ ...prev, quantity: newQuantity }));
    debouncedUpdateQuantity(quoteId, newQuantity);
  }, [debouncedUpdateQuantity]);

  const handleLocalOptionSelect = useCallback(async (selectedOption, type, quoteId) => {
    try {
      const data = { id: selectedOption.value };
      let response = "";

      const params = {
        id: quoteId,
        material_id: type === "material" ? selectedOption.value : localQuote.material_id,
        thickness_id: type === "material" ? null : type === "thickness" ? selectedOption.value : localQuote.thickness_id,
        finishing_id: type === "material" || type === "thickness" ? null : type === "finish" ? selectedOption.value : localQuote.finishing_id,
      };

      response = await getThicknessMaterialFinish(data, type, params);

      if (type === "material") {
        debouncedFetchThickness(selectedOption.value, quoteId);
      }
      if (type === "thickness") {
        debouncedFetchFinish(selectedOption.value, quoteId);
      }

      const currentAmount = parseFloat(localQuote.amount) || 0;
      const newPrice = parseFloat(response.data.data.data.amount) || 0;

      let updatedFields = {};
      if (type === "material") {
        updatedFields = {
          material_id: selectedOption.value,
          thickness_id: null,
          finishing_id: null,
          binding_option: "no",
        };
      } else if (type === "finish") {
        updatedFields = { finishing_id: selectedOption.value };
      } else if (type === "thickness") {
        updatedFields = {
          type_options: selectedOption.selectedValue,
          thickness_id: selectedOption.value,
          finishing_id: null,
        };
      }

      const updatedQuote = {
        ...localQuote,
        ...updatedFields,
        discount: response.data.data.data.discount,
        estimated_lead_time: response.data.data.estimated_lead_time,
        amount: newPrice,
        check_status: response.data.data.updated_data.check_status,
      };

      setLocalQuote(updatedQuote);
      onQuoteUpdate(quoteId, updatedQuote);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  }, [localQuote, debouncedFetchThickness, debouncedFetchFinish, onQuoteUpdate]);

  const handleLocalDimensionChange = useCallback(async (selectedOption, quoteId) => {
    const data = { id: quoteId, dimension_type: selectedOption.value };
    
    const updatedQuote = {
      ...localQuote,
      dimension_type: selectedOption.value,
      material_id: "",
      thickness_id: "",
      finishing_id: "",
      thicknessOptions: [],
      finishOptions: [],
      amount: 0,
      quantity: 1,
      discount: 0,
    };

    setLocalQuote(updatedQuote);
    onQuoteUpdate(quoteId, updatedQuote);

    try {
      // Note: updateDimensionStatus is not imported, you'll need to add it
      // await updateDimensionStatus(data);
      debouncedUpdateQuantity(quoteId, 1);
    } catch (error) {
      console.error("Error updating dimension:", error);
    }
  }, [localQuote, onQuoteUpdate, debouncedUpdateQuantity]);

  const handleLocalBendingToggle = useCallback(async (checked) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setModalShow4(true);
      return;
    }

    if (checked) {
      const updatedQuote = { ...localQuote, bend_count: 1 };
      setLocalQuote(updatedQuote);
      onQuoteUpdate(localQuote._id, updatedQuote);
      
      const formData = new FormData();
      formData.append("id", localQuote._id);
      formData.append("bend_count", 1);
      try {
        await uploadBendingFile(formData);
      } catch (error) {
        console.error("Error uploading bending file:", error);
      }
    } else {
      const isConfirmed = window.confirm("Are you sure you want to remove bending?");
      if (isConfirmed) {
        const formData = new FormData();
        formData.append("id", localQuote._id);
        formData.append("bend_count", 0);
        formData.append("type", "");
        
        try {
          await uploadBendingFile(formData);
          const updatedQuote = {
            ...localQuote,
            bend_count: 0,
            bendupload_url: "",
            step_file_bend: "",
            drawing_file_bend: "",
            check_status: 0,
          };
          setLocalQuote(updatedQuote);
          onQuoteUpdate(localQuote._id, updatedQuote);
        } catch (error) {
          console.error("Error removing bending:", error);
        }
      }
    }
  }, [localQuote, onQuoteUpdate, setModalShow4]);

  const handleLocalFileChange = useCallback(async (event, type_param) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("id", localQuote._id);
      formData.append("bend_count", 1);
      formData.append("type", type_param);
      formData.append("quote_image", file);

      const res = await uploadBendingFile(formData);
      
      if (res.data) {
        const updatedQuote = {
          ...localQuote,
          step_file_bend: res.data.step_file_bend,
          drawing_file_bend: res.data.drawing_file_bend,
        };
        setLocalQuote(updatedQuote);
        onQuoteUpdate(localQuote._id, updatedQuote);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }, [localQuote, onQuoteUpdate]);

  const handleLocalFileRemove = useCallback(async (type_param) => {
    try {
      const formData = new FormData();
      formData.append("id", localQuote._id);
      formData.append("bend_count", 1);
      formData.append("type", type_param);

      const res = await uploadBendingFile(formData);
      
      if (res.data) {
        const updatedQuote = {
          ...localQuote,
          step_file_bend: res.data.step_file_bend,
          drawing_file_bend: res.data.drawing_file_bend,
        };
        setLocalQuote(updatedQuote);
        onQuoteUpdate(localQuote._id, updatedQuote);
      }
    } catch (error) {
      console.error("Error removing file:", error);
    }
  }, [localQuote, onQuoteUpdate]);

  return (
    <div className="list-quotes-main">
      <div className="list-quotes flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
        <div className="img-quote mx-auto mx-md-0 position-relative">
          <span className="bublenumber">
            {String(index + 1).padStart(3, "0")}
          </span>
          <Image
            src={encodeS3Url(localQuote.image_url)}
            className="img-fluid"
            alt=""
          />
        </div>

        <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
          <h2>{localQuote.quote_name}</h2>
          {localQuote.type_options != "" && localQuote.type_options != null ? (
            <p className="num-dim-main">
              <span className="num-dim">
                {localQuote.type_options}-{localQuote.quantity}-{localQuote.finishing_id && localQuote.binding_option != "no" && localQuote.bend_count >= 1 ? 'B-' : ''}
                {currentMonth}-{yearLastTwoDigits}-
                {quoteList.quote_number}-{" "}
                {String(index + 1).padStart(3, "0")}
              </span>
            </p> 
          ) : (
            localQuote.type_option != "" &&
            localQuote.type_option != null && (
              <p className="num-dim-main">
                <span className="num-dim">
                  {localQuote.type_option[0].material_code}-
                  {localQuote.quantity}-{localQuote.finishing_id && localQuote.binding_option != "no" && localQuote.bend_count >= 1 ? 'B-' : ''}{currentMonth}-
                  {yearLastTwoDigits}-{quoteList.quote_number}-
                  {String(index + 1).padStart(3, "0")} 
                </span>
              </p>
            )
          )}
          <div className="quotes-dropdown flex-md-row d-flex align-item-center justify-content-md-start justify-content-center">
            <SelectDropdowns
              options={getDimension}
              value={localQuote.dimension_type}
              placeholder={"Select Units"}
              type="dimensions"
              id={localQuote._id}
              onOptionSelect={(option) => handleLocalDimensionChange(option, localQuote._id)}
            />
            <SelectDropdowns
              options={materials}
              value={localQuote.material_id}
              placeholder={"Select a Material"}
              type="material"
              id={localQuote._id}
              onOptionSelect={(option, type) => handleLocalOptionSelect(option, type, localQuote._id)}
            />
            <SelectDropdowns
              options={localThicknessOptions}
              value={localQuote.thickness_id}
              type="thickness"
              id={localQuote._id}
              placeholder={"Select a Thickness"}
              onOptionSelect={(option, type) => handleLocalOptionSelect(option, type, localQuote._id)}
            />
            <SelectDropdowns
              options={localFinishOptions}
              value={localQuote.finishing_id}
              type="finish"
              id={localQuote._id}
              placeholder={"Select a Finish"}
              onOptionSelect={(option, type) => handleLocalOptionSelect(option, type, localQuote._id)}
            />
          </div>
          <div className="quotes-services quote_div_main_sect mt-3 position-relative">
            {localQuote.binding_option == "no" ? (
              <p></p>
            ) : (
              <>
                {localQuote.finishing_id && (
                  <>
                    <div className="flex-shrink-0">
                      <h4>Services </h4>

                      <Form.Check
                        type="checkbox"
                        label="Add Bending"
                        name={`options-${localQuote._id}`}
                        value={`options-${localQuote._id}`}
                        id={`options-${localQuote._id}`}
                        className="d-inline-flex align-items-center me-2"
                        onChange={(e) => handleLocalBendingToggle(e.target.checked)}
                        checked={localQuote.bend_count >= 1}
                      />
                    </div>
                    {localQuote.bend_count != 0 && (
                      <>
                        <div className="baseratecustom">
                          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                            <span className="baseratetitle">
                              Base Rate: <Amount amount={localQuote.per_bend_price} />
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
                                  If you don't have a STEP file,
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
                              {localQuote.step_file_bend == null || localQuote.step_file_bend == "" ? (
                                <>
                                 {loadingFiles[localQuote._id] ? (
                                  <span className="color_white_make">Uploading...</span>
                                ) : (
                                  <input
                                    id={localQuote._id}
                                    type="file"
                                    accept=".step,.stp"
                                    onChange={(e) => handleLocalFileChange(e, 'step')}
                                    className="block w-full mt-1"
                                  />
                                )}
                                </>
                              ) : (
                                <div className="attachment-box">
                                  <span className="attachmenttitle">
                                    Attachment
                                  </span>
                                  <Link
                                    className="remove-icon"
                                    onClick={() => handleLocalFileRemove('step_remove')}
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
                              
                              {localQuote.drawing_file_bend == null || localQuote.drawing_file_bend == "" ? (
                                <>
                                {loadingFiles[`${localQuote._id}-optional`] ? (
                                  <span>Uploading...</span>
                                ) : (
                                <input
                                  id={`${localQuote._id}-optional`}
                                  type="file"
                                  accept=".pdf, .jpg, .jpeg, .png"
                                  onChange={(e) => handleLocalFileChange(e, 'draw')}
                                  className="block w-full mt-1"
                                />
                                )}
                                </>
                              ) : (
                                <div className="attachment-box">
                                  <span className="attachmenttitle">
                                    Attachment
                                  </span>
                                  <Link
                                    className="remove-icon"
                                    onClick={() => handleLocalFileRemove("draw_remove")}
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
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
          <p className=" text-md-end">
            {" "}
            <Amount amount={(localQuote.amount + (localQuote.bend_count >= 1 && localQuote.per_bend_price * localQuote.quantity))} /> total
          </p>

          <p className=" text-md-end">
            <strong className="quotes-price">
              <Amount amount={((localQuote.amount / localQuote.quantity) + (localQuote.bend_count >= 1 && localQuote.per_bend_price))} />
            </strong>
            /each 
          </p>
          <div className="d-flex align-item-center justify-content-end gap-2">
            <div className="quanityCount_btn">
              {localQuote.finishing_id ? (
                <>
                  <QuantitySelector
                    quantity={localQuote.quantity}
                    onIncrement={() => handleLocalQuantityChange(localQuote._id, localQuote.quantity + 1)}
                    onDecrement={() => localQuote.quantity === 1 ? null : handleLocalQuantityChange(localQuote._id, localQuote.quantity - 1)}
                    onQuantityChange={(newQuantity) => handleLocalQuantityChange(localQuote._id, newQuantity)}
                  />
                </>
              ) : (
                <div></div>
              )}
            </div>
            <span className="quote-off">
              {localQuote.discount}% Saved
            </span>
          </div>
          <p className="mb-0 text-md-end">
            {localQuote.estimated_lead_time
              ? "Typical Lead Time " +
                localQuote.estimated_lead_time +
                " days"
              : "Typical Lead Time " +
                  localQuote?.type_option?.length > 0
                ? localQuote.type_option[0]?.estimated_lead_time ?? "2-4"
                : "Typical Lead Time 2-4" + " days"}
          </p>
        </div>
      </div>
      <Row>
        <Col md={6}>
          <span className="num-dim">
            <DimensionsToggle
              dimensions={localQuote.dimensions}
              id={localQuote._id}
              type={localQuote.dimension_type}
              onApiResponse={(option) => handleLocalDimensionChange(option, localQuote._id)}
            />
          </span>
        </Col>
        <Col md={6} className="align-self-end">
          <div className="d-flex align-items-center justify-content-between ps-0 mt-3 gap-2 mb-2">
            <div></div>

            <div className="rightbtns gap-2 d-inline-flex flex-wrap">
              <Link
                className="btnshare"
                onClick={() => {
                  setSelectedNote(localQuote.notes_text);
                  setSelectedPartId(localQuote._id);
                  setModalShow3(true);
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
                  setSelectedQuote(localQuote.quote_name);
                  setSelectedPartId(localQuote._id);
                  setModalShow(true);
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
                  onDuplicateQuote(localQuote, localQuote._id);
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
                  onDeleteQuote(localQuote._id);
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
  );
});

export default QuoteLineItem; 