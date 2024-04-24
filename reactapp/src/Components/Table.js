import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from './Form';
import { DeleteData, ViewData } from '../Helper/Apicalls';

const Table = () => {

    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [curntPage, setCurntPage] = useState(10);
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [userId , setUserId] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false); setUserId('')};
    const handleShow = () => setShow(true);

   const fetchData = async (page, per_page) => {
        setLoading(true);
        try {
          setCurntPage(page);
    
          let postData = { page: page, per_page: per_page };
    
          let Response = await ViewData(postData)

          console.log(Response,"555556633x");
    
          if (Response) {
              setData(Response?.data);
              setTotalRows(Response?.count);
              setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error("Error :", error)
          setLoading(false);
        }
      };
    
      const handlePageChange = (page) => {
        fetchData(page, perPage);
      };
    
      const handlePerRowsChange = async (newPerPage) => {
        setPerPage(newPerPage);
        fetchData(1, newPerPage);
      };

      const DeleteUSer = async(data) => {
        try {
            let formdata = {status : 1 , unqiueid: data}
            let Response = await DeleteData(formdata)

            if(Response){
                fetchData(curntPage, perPage);
            }
        } catch (error) {
            console.log(error);
        }
      }
    
      useEffect(() => {
        fetchData(1, perPage);
      }, [show])
    
    

      const caseInsensitiveSort = (rowA, rowB) => {
        const a = rowA.email.toLowerCase();
        const b = rowB.email.toLowerCase();
      
        if (a > b) {
          return 1;
        }
      
        if (b > a) {
          return -1;
        }
      
        return 0;
      };

      const caseInsensitiveSortName = (rowA, rowB) => {
        const a = rowA.name.toLowerCase();
        const b = rowB.name.toLowerCase();
      
        if (a > b) {
          return 1;
        }
      
        if (b > a) {
          return -1;
        }
      
        return 0;
      };
      
      
    const columns = [
        {
          name: "S.No",
          width: "8%",
          sortable: true,
          cell: (row, index) => (curntPage - 1) * perPage + (index + 1),
        },
        {
            name: "Email",
            sortable: true,
            sortFunction: caseInsensitiveSort,
            cell: (row) => <span>{row.email}</span>,
        },
        {
            name: "Name",
            sortable: true,
            sortFunction: caseInsensitiveSortName,
            cell: (row) => <span>{row.name}</span>,
        },
        {
            name: "Gender",
            sortable: true,
            cell: (row) => <span>{row.gender}</span>,
        },
        {
            name: "DOB",
            width : "10%",
            sortable: true,
            cell: (row) => <span>{row.bod}</span>,
        },
        {
            name: "Created On",
            sortable: true,
            cell: (row) => <span>{row.updatedAt}</span>,
        },
        {
            name: "Social Accounts",
            sortable: true,
            cell: (row) => <span>{row.socialMediaAccount.map((data)=> data)}</span>,
        },  
        {
            name: "Action",
            cell: (row) => (<span>
              <button aria-label="btnxheck" className="btn btn-primary" onClick={() => { handleShow(true); setUserId(row) }} id={row.id} > Edit</button>
              <button aria-label="btnxheck" className="btn btn-primary mx-2" onClick={() => {DeleteUSer(row.id) }} id={row.id} > Delete</button>
            </span>
            ),
          },
 
      ];
      
    
  return (
    <>
    <div className='container mt-5'>
        <Button variant="primary" style={{float:"right"}}  className='mb-4' onClick={handleShow}>Primary</Button>{' '}

        <DataTable
              columns={columns}
              data={data}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              progressPending={loading}
              highlightOnHover={true}
              noDataComponent={<div className="nodata-div">No Record Found</div>}
              paginationDefaultPage={curntPage}
              persistTableHead={true}
            />
</div>
            <div>
            
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{!!userId ? <p>Add User</p> : <p>Edit User</p>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form handleClose={handleClose} userId={userId}/>
        </Modal.Body>
      </Modal>
            </div>
    </>
  )
}

export default Table
