import React, { useState, useEffect } from "react";
import reactDom from "react-dom";
import { Button } from "./Button";
import "../../css/Modal.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
// import { socket } from "../../socket";

export const Modal = ({ visible, toggle, date, addJob}) => {
  // Store state for all clients 
  const [clients, setClients] = useState([]);
  // Store state for the form error checking
  const [formState, setFormState] = useState({
    label: false,
    description: false,
  });
  // store state for form data
  const [formData, setformData] = useState({
    label: "",
    client_id: 0,
    description: "",
    quote: "",
    date: moment().utc(),
  });

  // socket.on('CONFIRM_JOB', (userInfo)=>{
  //   console.log(userInfo)
  //   console.log(formData)
  //   // addJob(formData);
  // })

  // Gets all clients and stores in the state
  useEffect(() => {
    axios.get("/clients", { withCredentials: true }).then((data) => {
      data.data.forEach((element) => {
        element["label"] = element["client_name"];
        element["value"] = element["client_name"];
        delete element["client_name"];
      });
      setClients(data.data);
    });
  }, []);

    const SubmitJob = (e) => {
      e.preventDefault();
      
      if (formData.label === "") {
        setFormState({ ...formState, label: true });
      }
      if (formData.descripiton === "") {
        setFormState({ ...formState, description: true });
      }
      if (formData.label !== "" && formData.description !== "") {
        console.log(formData);
        socket.emit('SUBMIT_JOB',formData);
    } else {
      alert("make sure to submit label, description and client address");
    }
    }

  // clears data on close and hides the modal
  const CloseJob = (e) => {
    e.preventDefault();
    setformData({
      label: "",
      clientNumber: "",
      clientAddress: "",
      email: "",
      sprinklerStatus: "none",
      description: "",
      quote: "",
      date:  moment().utc(),
    });
    toggle();
  };

  // handles the selection for lavel and client id
  const handleSelect = (valueSelected) => {
    console.log(valueSelected);
    setformData({
      ...formData,
      label: valueSelected.label,
      client_id: valueSelected.client_id,
    });
  };

  if (date === "") {
    return visible
      ? reactDom.createPortal(
          <div className="modal">
            <div className="modal-pop" role="dialog" aria-modal="true">
              <h2 className="modalTitle">Create New Job</h2>
              <form onSubmit={SubmitJob} className="newJobForm">
                <label>Client</label>
                <Select
                  options={clients}
                  onChange={handleSelect}
                  className="modalInputs"
                  value={formData}
                />

                <label>Description</label>
                <textarea
                  className="modalInputs"
                  placeholder="..."
                  onChange={(e) =>
                    setformData({ ...formData, description: e.target.value })
                  }
                ></textarea>

                <label>Quote</label>
                <input
                  className="modalInputs"
                  placeholder="$16.50"
                  type="number"
                  min="0"
                  step=".01"
                  onChange={(e) =>
                    setformData({ ...formData, quote: e.target.value })
                  }
                ></input>

                <label>Date</label>
                <DatePicker
                  className="modalInputs"
                  selected={new Date(formData.date) || new Date()}
                  onChange={(date) => {
                    setformData({
                      ...formData,
                      date: moment(date).utc(),
                    });
                  }}
                />
              </form>
              <div className="modalButtonContainer">
                <Button
                  handleClick={CloseJob}
                  label="Close"
                  className="modalButton"
                />
                <Button
                  handleClick={SubmitJob}
                  label="Submit"
                  className="modalButton"
                />
              </div>
            </div>
            <div className="modal-overlay"></div>
          </div>,
          document.body
        )
      : null;
  } else {
    // CREATE MODAL DATA FOR listing jobs
    return visible
      ? reactDom.createPortal(
          <div className="modal">
            <div className="modal-pop" role="dialog" aria-modal="true">
              <Button handleClick={toggle} label="Close" />
            </div>
            <div className="modal-overlay"></div>
          </div>,
          document.body
        )
      : null;
  }
};

export default Modal;
