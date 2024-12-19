import styled from "styled-components";


export const AdminBg = styled.div`
    min-height: 100vh;
    max-width:100vw;
    display:flex;
    flex-direction: column;   
`
export const HeaderContainer = styled.div`
   display: flex;
   width: 100%;
   justify-content: space-between;
   align-items: center;
   padding: 0px 5% 0px 5%;
   flex-grow:0;
   background-color: rgba(27, 46, 91, 0.45);
`

export const AdminSideparAndImagePar =styled.div`
    display:flex;
    width:100%;
    flex-grow:1;    
`

export const SidePar = styled.div`
    padding: 10px 20px 10px 20px;
    width:20%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    background-color: rgba(27, 46, 91, 0.45); 
`
export const ImageTablesContainer = styled.div`
    width: 80%;
    padding: 10px 5% 10px 5%;

`
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: 455px;
  margin-bottom:5px;
`;
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Poppins', sans-serif;
  background: white;

  th {
    padding: 12px 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  td {
    padding: 5px 10px;
    border: 2px solid #ddd;
    margin: 1px 1px 1px px;
    font-size: 1rem;

  }

  th {
    background: #f4f4f4;
    font-weight: bold;
    font-size: 1 rem;
    text-transform: uppercase;
  }

  tr:hover {
    background: #f9f9f9;
  }

  td:last-child, th:last-child {
    text-align: center;
  }
button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  .view-btn {
    background: #4CAF50;
    color: white;
  }

  .delete-btn {
    background: #DD0023;
    color: white;
  }
`;