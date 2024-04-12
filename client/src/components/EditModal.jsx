import React, { useState } from "react";
import ShowEditModal from "./ShowEditModal";
import { Button } from "@mui/material";

const EditModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  // console.log(props.docId);

  return (
    <>
      {/* <button className="modal-button">Open Modal</button> */}
      <Button
        size="small"
        style={{
          backgroundColor: "#1c63f0",
          width: "20px",
          margin: "3px",
          color: "white",
        }}
        onClick={() => setShowModal(true)}
      >
        Edit
      </Button>
      {showModal && <ShowEditModal docId={props.docId} closeModal={closeModal} />}
    </>
  );
};

export default EditModal;
