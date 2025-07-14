import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Row, Col, Image, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { FaRegEdit } from "react-icons/fa";
// import { HiOutlineDocumentDuplicate } from "react-icons/hi";
// import { MdDeleteOutline, MdClose, MdOutlineInfo } from "react-icons/md";
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
  updateDimensionStatus,
} from "../api/api";
import { Icon } from "@iconify/react";

// Define memoized icons at the top level of QuoteLineItem
const editIcon = <Icon icon="mynaui:edit" width={18} height={18} />;
const duplicateIcon = <Icon icon="heroicons:document-duplicate" width={18} height={18} />;
const deleteIcon = <Icon icon="uiw:delete" width={18} height={18} />;
const closeIcon = <Icon icon="carbon:close-outline" color="#ff0000" width={18} height={18} className="ms-2" />;
const infoIcon = <Icon icon="material-symbols-light:info-outline" width={22} height={22} color="#000" />;

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
  loadingSelect,
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
    console.log(quote,"quote=-098767890----")
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
      await updateDimensionStatus(data);
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

  // Memoize the right action buttons and quantity selector to prevent blinking
  const ActionButtons = React.memo(
    ({ localQuote, handleLocalQuantityChange, setSelectedNote, setSelectedPartId, setModalShow3, handleClick, setSelectedQuote, setModalShow, onDuplicateQuote, onDeleteQuote, index, quoteList, currentMonth, yearLastTwoDigits }) => {
      return (
        <>
          <div className="quanityCount_btn">
            {localQuote.finishing_id ? (
              <QuantitySelector
                quantity={localQuote.quantity}
                onIncrement={() => handleLocalQuantityChange(localQuote._id, localQuote.quantity + 1)}
                onDecrement={() => localQuote.quantity === 1 ? null : handleLocalQuantityChange(localQuote._id, localQuote.quantity - 1)}
                onQuantityChange={(newQuantity) => handleLocalQuantityChange(localQuote._id, newQuantity)}
              />
            ) : (
              <div></div>
            )}
          </div>
          <span className="quote-off">
            {localQuote.discount}% Saved
          </span>
          
        </>
      );
    },
    (prevProps, nextProps) =>
      prevProps.localQuote.quantity === nextProps.localQuote.quantity &&
      prevProps.localQuote.discount === nextProps.localQuote.discount &&
      prevProps.localQuote._id === nextProps.localQuote._id &&
      prevProps.localQuote.finishing_id === nextProps.localQuote.finishing_id &&
      prevProps.localQuote.notes_text === nextProps.localQuote.notes_text &&
      prevProps.localQuote.quote_name === nextProps.localQuote.quote_name
  );

  // Memoized right-quote section to prevent blinking
  const RightQuote = React.memo(({ localQuote, handleLocalQuantityChange, setSelectedNote, setSelectedPartId, setModalShow3, handleClick, setSelectedQuote, setModalShow, onDuplicateQuote, onDeleteQuote, index, quoteList, currentMonth, yearLastTwoDigits }) => (
    <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
      <p className=" text-md-end">
        <Amount amount={(localQuote.amount + (localQuote.bend_count >= 1 && localQuote.per_bend_price * localQuote.quantity))} /> total
      </p>
      <p className=" text-md-end">
        <strong className="quotes-price"> 
          <Amount amount={((localQuote.amount / localQuote.quantity) + (localQuote.bend_count >= 1 && localQuote.per_bend_price))} />
        </strong>
        /each 
      </p>
      <div className="d-flex align-item-center justify-content-center justify-content-md-end gap-2">
        <ActionButtons
          localQuote={localQuote}
          handleLocalQuantityChange={handleLocalQuantityChange}
          setSelectedNote={setSelectedNote}
          setSelectedPartId={setSelectedPartId}
          setModalShow3={setModalShow3}
          handleClick={handleClick}
          setSelectedQuote={setSelectedQuote}
          setModalShow={setModalShow}
          onDuplicateQuote={onDuplicateQuote}
          onDeleteQuote={onDeleteQuote}
          index={index}
          quoteList={quoteList}
          currentMonth={currentMonth}
          yearLastTwoDigits={yearLastTwoDigits}
        />
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
  ), (prev, next) =>
    prev.localQuote.quantity === next.localQuote.quantity &&
    prev.localQuote.discount === next.localQuote.discount &&
    prev.localQuote.amount === next.localQuote.amount &&
    prev.localQuote.bend_count === next.localQuote.bend_count &&
    prev.localQuote.per_bend_price === next.localQuote.per_bend_price &&
    prev.localQuote.estimated_lead_time === next.localQuote.estimated_lead_time &&
    prev.localQuote._id === next.localQuote._id
  );

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
              loading={loadingSelect && loadingSelect[`${localQuote._id}_dimensions`]}
            />
            <SelectDropdowns
              options={materials}
              value={localQuote.material_id}
              placeholder={"Select a Material"}
              type="material"
              id={localQuote._id}
              onOptionSelect={(option, type) => handleLocalOptionSelect(option, type, localQuote._id)}
              loading={loadingSelect && loadingSelect[`${localQuote._id}_material`]}
            />
            <SelectDropdowns
              options={localThicknessOptions}
              value={localQuote.thickness_id}
              placeholder={"Select a Thickness"}
              type="thickness"
              id={localQuote._id}
              onOptionSelect={(option, type) => handleLocalOptionSelect(option, type, localQuote._id)}
              loading={loadingSelect && loadingSelect[`${localQuote._id}_thickness`]}
            />
            <SelectDropdowns
              options={localFinishOptions}
              value={localQuote.finishing_id}
              placeholder={"Select a Finish"}
              type="finish"
              id={localQuote._id}
              onOptionSelect={(option, type) => handleLocalOptionSelect(option, type, localQuote._id)}
              loading={loadingSelect && loadingSelect[`${localQuote._id}_finish`]}
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
                              {infoIcon}
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
                                    {closeIcon}
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
                                {loadingFiles?.[`${localQuote._id}-optional`] ? (
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
                                    {closeIcon}
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

        <RightQuote
          localQuote={localQuote}
          handleLocalQuantityChange={handleLocalQuantityChange}
          setSelectedNote={setSelectedNote}
          setSelectedPartId={setSelectedPartId}
          setModalShow3={setModalShow3}
          handleClick={handleClick}
          setSelectedQuote={setSelectedQuote}
          setModalShow={setModalShow}
          onDuplicateQuote={onDuplicateQuote}
          onDeleteQuote={onDeleteQuote}
          index={index}
          quoteList={quoteList}
          currentMonth={currentMonth}
          yearLastTwoDigits={yearLastTwoDigits}
        />
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
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
		<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z" />
	</svg>


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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
		<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9 9 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9 9 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
	</svg>
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
                	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
		<path fill="currentColor" d="m9.129 0l1.974.005c.778.094 1.46.46 2.022 1.078c.459.504.7 1.09.714 1.728h5.475a.69.69 0 0 1 .686.693a.69.69 0 0 1-.686.692l-1.836-.001v11.627c0 2.543-.949 4.178-3.041 4.178H5.419c-2.092 0-3.026-1.626-3.026-4.178V4.195H.686A.69.69 0 0 1 0 3.505c0-.383.307-.692.686-.692h5.47c.014-.514.205-1.035.554-1.55C7.23.495 8.042.074 9.129 0m6.977 4.195H3.764v11.627c0 1.888.52 2.794 1.655 2.794h9.018c1.139 0 1.67-.914 1.67-2.794zM6.716 6.34c.378 0 .685.31.685.692v8.05a.69.69 0 0 1-.686.692a.69.69 0 0 1-.685-.692v-8.05c0-.382.307-.692.685-.692m2.726 0c.38 0 .686.31.686.692v8.05a.69.69 0 0 1-.686.692a.69.69 0 0 1-.685-.692v-8.05c0-.382.307-.692.685-.692m2.728 0c.378 0 .685.31.685.692v8.05a.69.69 0 0 1-.685.692a.69.69 0 0 1-.686-.692v-8.05a.69.69 0 0 1 .686-.692M9.176 1.382c-.642.045-1.065.264-1.334.662c-.198.291-.297.543-.313.768l4.938-.001c-.014-.291-.129-.547-.352-.792c-.346-.38-.73-.586-1.093-.635z" />
	</svg>
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

// Memoize the entire QuoteLineItem with a custom comparison that ignores dropdown loading changes
export default React.memo(QuoteLineItem, (prevProps, nextProps) =>
  prevProps.quote === nextProps.quote &&
  prevProps.index === nextProps.index &&
  prevProps.materials === nextProps.materials &&
  prevProps.getDimension === nextProps.getDimension &&
  prevProps.quoteList === nextProps.quoteList
); 