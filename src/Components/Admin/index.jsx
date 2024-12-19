import { useState, useRef } from "react";
import GetAllImages from "../GetAllImages/getAllImages.jsx";
import logo from "../../assets/unique marine.png";
import Cookies from "js-cookie";
import {
  AdminSideparAndImagePar,
  HeaderContainer,
  AdminBg,
  SidePar,
  ImageTablesContainer,
} from "../../Style/admin.style.js";
import { ToastContainer, toast } from "react-toastify";
import { uploadFile, getImageByNumber } from "../../Services/api.js";
import "react-toastify/dist/ReactToastify.css";
import ShowImage from "../Show Image/index.jsx";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  SearchWrapper,
  SearchButton,
  SearchInput,
  InputElement,
  CenteredContainer,
  ButtonElement,
  FormContainer,
  LabelElement,
  LogoInput,
} from "../../Style/style.js";

const Admin = () => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [searchSerialNumber, setSearchSerialNumber] = useState("");
  const [triggerFetchData, setTriggerFetchData] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    Cookies.remove(process.env.JWT_COOKIE_NMAE);
    navigate("/login", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !serialNumber)
      return toast.warn("Please provide both an ID and a file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("serialNumber", serialNumber);

    const response = await uploadFile(formData);
    if (response.success) {
      toast.success("File uploaded successfully!");
      fileInputRef.current.value = "";
      setTriggerFetchData(!triggerFetchData);
      setSerialNumber("");
      setFile(null);
    } else {
      toast.error(response.message);
    }
  };

  const assignFilePath = (value) => {
    setFilePath(value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    console.log("aa");

    if (!searchSerialNumber) {
      toast.warn("Please enter a serial number.");
      return;
    }

    const data = await getImageByNumber(searchSerialNumber);
    data.file_path ? setFilePath(data.file_path) : toast.error(data);
  };

  return (
    <>
      <AdminBg>
        <HeaderContainer>
          <Link to="/">
            <LogoInput src={logo} />
          </Link>

          <FormContainer onSubmit={handleSearchSubmit}>
            <SearchWrapper>
              <SearchInput
                placeholder="Search..."
                onChange={(e) => setSearchSerialNumber(e.target.value)}
                type="search"
                display="inline"
                value={searchSerialNumber}
              />
              <SearchButton type="submit" value={serialNumber}>
                🔍
              </SearchButton>
            </SearchWrapper>
          </FormContainer>
          <ButtonElement
            backgruoundcolor="#DD0023"
            style={{
              fontFamily: "Poppins",
              fontSize: "16px",
              padding: "5px 10px",
              height: "30px",
              fontWeight: "bold",
            }}
            onClick={logout}
          >
            LOG OUT
          </ButtonElement>
        </HeaderContainer>
        <AdminSideparAndImagePar>
          <SidePar>
            <FormContainer onSubmit={handleSubmit}>
              <LabelElement>CERTIFICATE & PRODUCT SERIAL NUMBER</LabelElement>
              <InputElement
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="SERIAL NUMBER"
                value={serialNumber}
              />
              <LabelElement>CERTIFICATE</LabelElement>
              <InputElement
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileInputRef}
              />
              <CenteredContainer>
                <ButtonElement backgruoundcolor="green" type="submit">
                  Add
                </ButtonElement>
              </CenteredContainer>
            </FormContainer>
          </SidePar>

          <ImageTablesContainer>
            <GetAllImages triggerFetchData={triggerFetchData} />
          </ImageTablesContainer>
        </AdminSideparAndImagePar>
      </AdminBg>
      {filePath && (
        <ShowImage filePath={filePath} assignFilePath={assignFilePath} />
      )}
      <ToastContainer
        position="top-center"
        style={{
          top: "50%",
          zIndex: 9999,
        }}
      />
    </>
  );
};

export default Admin;
