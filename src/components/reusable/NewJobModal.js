import React, { useState, useEffect } from "react";
import reactDom from "react-dom";
import { Button } from "./Button";
import "../../css/Modal.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

// RRRREFACTORRR
export const Modal = ({ visible, toggle, date, jobs }) => {
  // const [startDate, setStartDate] = useState(new Date());
  const [clients, setClients] = useState([]);
  const [formState, setFormState] = useState({
    label: false,
    description: false,
  });
  const [formData, setformData] = useState({
    label: "",
    client_id: 0,
    description: "",
    quote: "",
    date: moment(),
  });

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
    console.log(formData);
    // TODO: Create a check that client name,
    // address, and description is filled out

    if (formData.label === "") {
      setFormState({ ...formState, label: true });
    }
    if (formData.descripiton === "") {
      setFormState({ ...formState, description: true });
    }
    if (formData.label !== "" && formData.description !== "") {
      console.log(formData);
      axios.post("/submitJob", formData).then((res) => {
        // if successfull close window
        // else show error message
        console.log(res);
      });
    } else {
      alert("make sure to submit label, description and client address");
    }
  };

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
      date: new Date(),
    });
    toggle();
  };

  const handleSelect = (valueSelected) => {
    console.log(valueSelected);
    setformData({
      ...formData,
      label: valueSelected.label,
      client_id: valueSelected.client_id,
    });
  };
  // TODO: change the select back to normal
  //    select the client id and send it back to the server

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

                {/* <label>Phone Number</label>
                <input
                  className="modalInputs"
                  value={formData.clientNumber}
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                  placeholder="3062849011"
                  onChange={(e) =>
                    setformData({ ...formData, clientNumber: e.target.value })
                  }
                ></input>

                <label>Email</label>
                <input
                  className="modalInputs"
                  value={formData.email}
                  placeholder="test@gmail.com"
                  type="text"
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                ></input>

                <label>Address</label>
                <input
                  className="modalInputs"
                  type="text"
                  value={formData.clientAddress}
                  placeholder="808 5th St East"
                  onChange={(e) =>
                    setformData({ ...formData, clientAddress: e.target.value })
                  }
                ></input>

                <label>Sprinkler</label>
                <select
                  className="modalInputs"
                  name="sprinkers"
                  value={formData.sprinklerStatus}
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      sprinklerStatus: e.target.value,
                    })
                  }
                >
                  <option value="none">None</option>
                  <option value="front">Front</option>
                  <option value="back">Back</option>
                  <option value="both">Both</option>
                </select> */}

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
                      date: moment(new Date(date)),
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
