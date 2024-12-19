import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  InputElement,
  FormContainer,
  ButtonElement,
  LabelElement,
  HomeContainer
} from "../../Style/style.js";
import { RowCenterContainer,LogoInput } from "../../Style/style.js";

import ShowImage from "../Show Image/index.jsx";
import { getImageByNumber } from "../../Services/api.js";
import logo from '../../assets/unique marine.png'

const Home = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [filePath, setFilePath] = useState(null);

  const handleInputChange = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serialNumber) {
      toast.warn("Please enter a serial number.");
      return;
    }

    const data = await getImageByNumber(serialNumber);
    data.file_path ? setFilePath(data.file_path) : toast.error(data);
  };

  const assignFilePath = (value) => {
    setFilePath(value);
  };

  return (
    <HomeContainer>
      <RowCenterContainer>
      <LogoInput src={logo}/>
      <FormContainer onSubmit={handleSubmit}>
        <LabelElement>CERTIFICATE SERIAL NUMBER</LabelElement>
        <p>eg: xx/xxxx/xxxx</p>
        <InputElement
          onChange={handleInputChange}
          placeholder="CERTIFICATE SERIAL NUBER"
          value={serialNumber}
        ></InputElement>
        <ButtonElement type="submit">VIEW</ButtonElement>
      </FormContainer>
      </RowCenterContainer>
      
      <ToastContainer
        position="top-center"
        style={{
          top: "50%",
          zIndex: 9999,
        }}
      />

      {filePath && (
        <ShowImage filePath={filePath} assignFilePath={assignFilePath} />
      )}
    </HomeContainer>
  );
};

export default Home;
