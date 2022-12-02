import React, { useState, useEffect } from 'react';

// react router dom
import { useNavigate, useParams } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

// Components
import { Header } from '../../components';

// API
import { adminIndividualData } from '../../helper/adminHelper/admin';
import { editAdmin } from '../../helper/adminHelper/admin';
import { isAuthenticated } from '../../helper/login/loginHelper';

const EditAdmin = () => {
  // PARAMS
  const params = useParams();
  const userid = params.id;

  // Authentication
  const { data } = isAuthenticated();

  // Navigate
  const navigate = useNavigate();

  // STATE
  const [adminData, setAdminData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    id: userid,
    email: '',
    adminType: '',
    admin_permissions: [
      {
        module: 'module',
        permission: '0',
      },
    ],
  });

  // Destructure
  const { firstName, lastName, id, admin_permissions, email, adminType } =
    formData;

  const preload = () => {
    console.log(userid);

    adminIndividualData(userid, data.accessToken)
      .then((data) => {
        console.log(data.data.admin_permissions[0], '6666');

        setAdminData(data.data.admin_permissions[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    // adminData.map((individualData, index) => {
    //   console.log(individualData, "individualData")

    // })
    console.log(adminData.dashboard, '5555555555');
  };

  console.log(adminData.dashboard, 'data.data.admin_permissions[]');

  useEffect(() => {
    preload();
  }, []);

  // Edit Admin
  const edit = () => {
    editAdmin(userid, formData, data.accessToken)
      .then((result) => {
        // setAdminData(data.data.rows);
        toast.success('edit successful');
        console.log('resulttt', result);

        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheck = (e) => {
    console.log(e.target.value, 'valueeeee'); /* Dashbaord */
  };

  // Setting object in Item
  let item = { firstName, lastName, id, admin_permissions, email, adminType };

  console.log(item, '.....000000.....');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('formData', formData);
  };

  const test = (e) => {
    const value = e.target.value; /* Dasboard */
    console.log(e.target.checked);
    const somevalue = admin_permissions; /* Allocated Permission */

    if (e.target.checked) {
      somevalue.push({
        module: value,
        permission: '1',
      });
      setFormData({ ...formData, admin_permissions: somevalue });
    }

    if (!e.target.checked) {
      somevalue.push({
        module: value,
        permission: '0',
      });
    }

    console.log(somevalue, 'somevalue');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) {
      toast.error('Please Fill Out The Required Fields.');
    }
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Edit Admin" />
        {/* <div class="w-full max-w-xs  "> */}
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 "
              for="firstname"
            >
              First Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
              value={firstName}
              name="firstName"
              placeholder="First Name"
              onChange={onChange}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 "
              for="lastname"
            >
              Last Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="text"
              value={lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={onChange}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 "
              for="username"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="email"
              value={email}
              placeholder="Username"
              onChange={onChange}
            />
          </div>

          <div class="flex w-full mb-3">
            <div class="mb-3 w-full ">
              <label class="block text-gray-700 text-sm font-bold mb-2 " for="">
                Admin Type
              </label>
              <select
                class="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                onChange={onChange}
                value={adminType}
                name="adminType"
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="SUB_ADMIN">Sub Admin</option>
              </select>
            </div>
          </div>

          <label class="block text-gray-700 text-sm font-bold mb-2 ">
            Admin Access
          </label>

          <div className="flex justify-between mb-2.5">
            <div class="flex flex-col">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="dashboard"
                  value="dashboard"
                  onChange={test}
                  name="permissions"
                  defaultChecked={adminData.dashboard === '1' ? true : false}
                  // onClick={test}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
                  for="inlineCheckbox1"
                >
                  Dashboard
                </label>
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="report"
                  value="reportManagement"
                  name="permissions"
                  onChange={test}
                  defaultChecked={
                    adminData.reportManagement === 1 ? true : false
                  }
                  // onClick={test}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
                  for="inlineCheckbox2"
                >
                  Report
                </label>
              </div>
            </div>

            <div class="flex flex-col">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="userManagement"
                  name="permissions"
                  onChange={test}
                  defaultChecked={adminData.userManagement === 1 ? true : false}
                  // onClick={test}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
                  for="inlineCheckbox1"
                >
                  User Mangement
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="adminManagement"
                  name="permissions"
                  onChange={test}
                  defaultChecked={
                    adminData.adminManagement === 1 ? true : false
                  }
                  // onClick={test}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
                  for="inlineCheckbox2"
                >
                  Admin
                </label>
              </div>
            </div>

            <div class="flex flex-col">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="notificationManagement"
                  name="permissions"
                  onChange={test}
                  defaultChecked={
                    adminData.notificationManagement === 1 ? true : false
                  }
                  // onClick={test}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
                  for="inlineCheckbox1"
                >
                  Notification
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="systemConfiguration"
                  name="permissions"
                  // onChange={(e)=> setSystemConfiguration(e.target.checked)}
                  onChange={test}
                  defaultChecked={
                    adminData.systemConfiguration === 1 ? true : false
                  }
                  // onClick={test}
                />
                <label
                  class="form-check-label mr-1.5 inline-block text-gray-800 opacity-50"
                  for="inlineCheckbox2"
                >
                  System Configuration
                </label>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={edit}
            >
              Save
            </button>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs"></p>
        {/* </div> */}
      </div>
    </>
  );
};

export default EditAdmin;
