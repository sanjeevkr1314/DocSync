import React, { useState } from "react";
import ShowDeleteModal from "./ShowDeleteModal";
import { Button } from "@mui/material";

const DeleteModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  // console.log(props.docId);

  return (
    <>
      {/* <button className="modal-button">Open Modal</button> */}
      <Button
        size="small"
        variant="outlined"
        style={{
          backgroundColor: "#eb3420",
          width: "20px",
          margin: "2px",
          color: "white",
        }}
        onClick={() => setShowModal(true)}
      >
        Delete
      </Button>
      {showModal && <ShowDeleteModal docId={props.docId} closeModal={closeModal} />}
    </>
  );
};

export default DeleteModal;
