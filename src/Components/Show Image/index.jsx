import React, { useState } from "react";
import Modal from "react-modal";
import { ButtonElement, CenteredContainer } from "../../Style/style";

Modal.setAppElement("#root");

const ShowImage = (props) => {
  const { filePath, assignFilePath } = props;
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    assignFilePath("");
  };

  return (
    <div style={{ zIndex: 2, position: "relative", top: "30px" }}>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Popup"
        style={{
          content: {
            maxWidth: "90%",
            height: "auto",
            margin: "auto",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.322)",
            overflow: "auto",
            zIndex: 4,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 3,
          },
        }}
      >
        <img
          src={`http://localhost:3000${filePath}`}
          alt="Popup"
          style={{ maxWidth: "90%",  maxHeight: "95%"}}
        />
        <br />
        <CenteredContainer>
          <ButtonElement onClick={closeModal}>CLOSE</ButtonElement>
        </CenteredContainer>
      </Modal>
    </div>
  );
};

export default ShowImage;
