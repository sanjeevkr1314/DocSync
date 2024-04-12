import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";

const ShowEditModal = (props) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(props.docId);
      const res = await axios.patch(
        `http://localhost:8080/api/user/documents/${props.docId}`,
        {
          name: e.target.docName.value,
          desc: e.target.docDesc.value,
        }
      );
      // console.log(res.data);
      // console.log("Form Submitted");
      props.closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-wrapper" onClick={props.closeModal}></div>
      <div className="modal-container">
        <h4>Edit Document</h4>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="File Name"
            variant="outlined"
            margin="normal"
            required
            name="docName"
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            required
            name="docDesc"
          />

          <div className="modal-button-container">
            <Button
              type="submit"
              size="medium"
              variant="outlined"
              style={{
                backgroundColor: "#1c63f0",
                margin: "6px",
                color: "white",
              }}
            >
              Confirm
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
        </form>
      </div>
    </>,
    document.querySelector(".myModalDiv")
  );
};

export default ShowEditModal;
