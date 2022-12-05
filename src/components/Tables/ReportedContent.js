import React, { useEffect, useState } from 'react';

// React Table
import DataTable from 'react-data-table-component';

// React Router
import { useNavigate } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// Components
import { Header } from '../../components';

// API
import { isAuthenticated } from '../../helper/login/loginHelper';
import {reportedContentListData} from '../../helper/Table/TableHelper'

const ReportedContent = () => {
  // const navigate = useNavigate();
  const { data, token } = isAuthenticated();

  const [search, setSearch] = useState('');
  const [contentData, setContentData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // const [show, setShow] = useState(false);

  /*  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("adminId");
  }; */

  /* const handleShow = () => {
    setShow(true);
    localStorage.setItem("adminId", adminId);
  }; */
const reportContent = () =>{
  reportedContentListData(data.accessToken)
    .then((data) => {
      console.log('responseeee', data);
      setContentData(data.data.data.rows);
      setFilterData(data.data.data.rows);
      console.log('THIS IS DATA', data);
    })
    .catch((error) => {
      console.log(error);
    });
}


  /*  async function deleteAdmin() {
    let uId = localStorage.getItem("adminId");
    await fetch(`http://localhost:3002/admin/deleteAdmin/${uId}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resq) => {
        toast.success("Admin deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        admin();
        handleClose();
      });
    });
  } */

  const colunms = [
    {
      name: (
        <h6>
          <b>Id</b>
        </h6>
      ),
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Item Type</b>
        </h6>
      ),
      selector: (row) => row.itemType,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Reported By</b>
        </h6>
      ),
      selector: (row) => [row.user.firstName],
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Description</b>
        </h6>
      ),
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Status</b>
        </h6>
      ),
      selector: (row) => row.status,
      sortable: true,
    },
    // {
    //   name: (
    //     <h6>
    //       <b>Image</b>
    //     </h6>
    //   ),
    //   selector: (row) =>
    //     row.image ? (
    //       <img
    //         alt=""
    //         width={80}
    //         height={50}
    //         style={{ objectFit: "cover", border: "1px solid" }}
    //         src={`http://localhost:3002/${row.image}`}
    //       />
    //     ) : (
    //       <img
    //         alt=""
    //         width={80}
    //         height={50}
    //         style={{ objectFit: "cover", border: "1px solid" }}
    //         src=""
    //         // src={profilelogo}
    //       />
    //     ),
    //   sortable: true,
    // },
    {
      name: (
        <h6>
          <b>Action</b>
        </h6>
      ),
      selector: (row) => (
        // row.uId === userid ? (
        //   ""
        // ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '110px',
          }}
        >
          <button
            style={{ border: 'none', background: 'none' }}
            // onClick={() => navigate(`/editadmin/${row.uId}`)}
          >
            <i className="fa-solid fa-pen fa-lg"></i>
          </button>
          <button
            style={{ border: 'none', background: 'none' }}
            // onClick={() => deleteAdmin(row.uId)}
            // onClick={() => handleShow(row.uId)}
          >
            <i className="fa-regular fa-trash-can fa-lg"></i>
          </button>
          <button
            style={{ border: 'none', background: 'none' }}
            // onClick={() => blockAdmin(row.uId)}
          >
            <i className="fa-sharp fa-solid fa-xmark fa-lg"></i>
          </button>
        </div>
      ),
      // ),
    },
  ];

  const paginationComponentOptions = {
    rangeSeparatorText: 'Total',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  useEffect(() => {
    reportContent();
  }, []);

  console.log(contentData,"contentData888888")

  useEffect(() => {
    console.log(contentData,"contentData")
    const result = contentData.filter((value) => {
      return (
        value.itemType.toLowerCase().match(search.toLowerCase()) ||
        value.id.toLowerCase().match(search.toLowerCase()) ||
        value.description.toLowerCase().match(search.toLowerCase()) 
      );
    });
    setFilterData(result);
  }, [search]);
  // console.log(admin);

  // const handleRowClicked = (row) => {
  //   navigate(`/admindetails/${row.uId}`);
  // };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Reported Content" />
      <DataTable
        // title="Admin"
        columns={colunms}
        data={filterData}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        fixedHeader
        // onRowClicked={handleRowClicked}
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search..."
            className="  form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px' }}
          />
        }
      />

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteAdmin}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default ReportedContent;
