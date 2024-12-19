import { useEffect, useState } from "react";
import { getImages, deleteFile } from "../../Services/api";
import './hide.css'
import ShowImage from '../Show Image/index'
import { toast } from "react-toastify";
import { ButtonElement, PageContainer,ListPageArrowContainer} from "../../Style/style";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { TableContainer, StyledTable } from "../../Style/admin.style";

const GetAllImages = (props) => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filePath, setFilePath] = useState('')
  const itemsPerPage = 10;
  const { triggerFetchData } = props;

  const fetchImages = async () => {
    const data = await getImages(currentPage, itemsPerPage);
    data.images ? setImages(data.images) : toast.error(data);
  };

  useEffect(() => {
    fetchImages();
  }, [triggerFetchData, currentPage]);

  const handleConfirm = (serialNumber) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div
          style={{
            background: '#282c34',
            padding: '20px',
            borderRadius: '10px',
            color: '#fff',
            textAlign: 'center',
            height: 'auto'
          }}
        >
          <h1 style={{ fontSize: '24px' }}>Are you sure?</h1>
          <p style={{ margin: '20px 0' }}>You want to delete this file?</p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button
              style={{
                background: 'green',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
              }}
              onClick={() => {
                handleDelete(serialNumber);
                onClose();
              }}
            >
              Yes
            </button>
            <button
              style={{
                background: 'red',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
              }}
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      ),
      overlayClassName: 'overlay'
    });

  };



  const handleDelete = async (serialNumber) => {
    const data = await deleteFile(serialNumber);
    data.success
      ? (toast.success(data.message), fetchImages())
      : toast.error(data);
  };

  const nextPage = () => {
    if (images.length === itemsPerPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const assignFilePath = (value) => {
    setFilePath(value);
  };



  const isNextDisabled = images.length < itemsPerPage;
  const isPrevDisabled = currentPage === 1;

  return (
    <>
      
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Date</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {images.map((each, index) => (
              <tr key={index}>
                <td>{each.serial_number}</td>
                <td>{each.serial_number_add_time.split(" ")[0]}</td>
                <td><button className="view-btn" onClick={() => { setFilePath(each.file_path) }}>View</button></td>
                <td><button onClick={() => {
                  handleConfirm(each.serial_number);
                }} className="delete-btn">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      <ListPageArrowContainer>
          <ButtonElement id="left" onClick={prevPage} disabled={isPrevDisabled}>
            <FaArrowLeft />
          </ButtonElement>
          <PageContainer>
            <h1 style={{ color: "" }}>{currentPage}</h1>
          </PageContainer>
          <ButtonElement id="right" onClick={nextPage} disabled={isNextDisabled}>
            <FaArrowRight />
          </ButtonElement>
        </ListPageArrowContainer>

      {
        filePath && (<ShowImage filePath={filePath} assignFilePath={assignFilePath} />)
      }
    </>
  );
};

export default GetAllImages;
