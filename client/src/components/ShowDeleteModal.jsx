import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "@mui/material";
import axios from "axios";

const ShowDeleteModal = (props) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleDelete = async () => {
    try {
      // console.log(props.docId);
      const res = await axios.delete(
        `http://localhost:8080/api/user/documents/${props.docId}`
      );
      // console.log(res.data);
      props.closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-wrapper" onClick={props.closeModal}></div>
      <div className="modal-container">
        <h5>Are you sure you want to delete this item?</h5>
        <div className="modal-button-container">
          <Button
            size="medium"
            variant="outlined"
            style={{
              backgroundColor: "#eb3420",
              margin: "6px",
              color: "white",
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            size="medium"
            variant="outlined"
            style={{
              backgroundColor: "gray",
              margin: "6px",
              color: "white",
            }}
            onClick={props.closeModal}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>,
    document.querySelector(".myModalDiv")
  );
};

export default ShowDeleteModal;
