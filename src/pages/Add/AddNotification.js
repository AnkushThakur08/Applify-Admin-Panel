import React, { useState } from 'react';

// react router dom
import { useNavigate, Link } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

//REACT ICONS
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

// Components
import { Header } from '../../components';

// Context
import { useStateContext } from '../../contexts/ContextProvider';

// API
import { isAuthenticated } from '../../helper/login/loginHelper';
import { createNotification } from '../../helper/Table/notificationTableHelper';

const AddNotification = () => {
  // Context
  const { currentMode } = useStateContext();

  // Authentication
  const { data } = isAuthenticated();

  // Navigate
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: '',
    message: '',
    platformType: '',
    image: '',
  });

  // Destructure
  const { title, message, platformType, image } = values;

  //   Handle Change
  const onChange = (name) => (event) => {
    const data = new FormData();
    const value = name === 'image' ? event.target.files[0] : event.target.value;
    data.append(name, value);
    setValues({ ...values, [name]: value });
    console.log('VALUES', value);
  };

  //   Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!title || !message) {
    //   return toast.error('Please Fill Out The Required Fields.');
    // }
    createNotification(data.accessToken, values).then((data) => {
      if (data.message == 'success') {
        setValues({
          ...values,
          title: '',
          message: '',
          platformType: '',
          image: '',
        });

        toast.success(data.message);

        setTimeout(() => {
          navigate('/notification');
        }, 2000);
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <>
      <div
        className={`m-2 md:m-10 mt-24 p-2 md:p-10 rounded-lg ${
          currentMode === 'Dark' ? 'bg-[#424242]' : 'bg-white'
        }`}
      >
        <Link to="/category">
          <BsFillArrowLeftCircleFill
            size={25}
            className={`mb-3 ${currentMode === 'Dark' ? 'text-white' : ''}`}
          />
        </Link>

        <Header category="Add" title="Notification" />
        {/* <div class="w-full max-w-xs  "> */}
        <form
          className={` shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ${
            currentMode === 'Dark'
              ? 'bg-[#424242] text-white'
              : 'bg-white text-black'
          }`}
          method="POST"
          encType="multipart/form-data"
        >
          <div class="mb-4">
            <label class="block  text-sm font-bold mb-2 " for="name">
              Title
            </label>
            <input
              class={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                currentMode === 'Dark'
                  ? 'bg-[#424242] text-white'
                  : 'bg-white text-black'
              }`}
              id="firstname"
              type="text"
              value={title}
              name="name"
              onChange={onChange('title')}
              placeholder="Enter Title"
            />
          </div>

          <div class="mb-4">
            <label class="block  text-sm font-bold mb-2 " for="name">
              Message
            </label>
            <input
              class={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                currentMode === 'Dark'
                  ? 'bg-[#424242] text-white'
                  : 'bg-white text-black'
              }`}
              id="firstname"
              type="text"
              value={message}
              name="message"
              onChange={onChange('message')}
              placeholder="Enter Message"
            />
          </div>

          <div class="flex w-full mb-3">
            <div class="mb-3 w-full ">
              <label class="blocktext-sm font-bold mb-2 " for="">
                Platform Type
              </label>

              <select
                class={`form-select appearance-none
                 block
                 w-full
                 px-3
                 py-1.5
                 text-base
                 font-normal
                 border border-solid border-gray-300
                 rounded
                 transition
                 ease-in-out
                 m-0
                focus:outline-none
                 ${
                   currentMode === 'Dark'
                     ? 'bg-[#424242] text-white focus:text-white focus:border-white focus:border-white'
                     : 'bg-white text-black focus:border-blue-600'
                 }
               `}
                onChange={onChange('platformType')}
                value={platformType}
                name="platformType"
              >
                <option
                  className={`${
                    currentMode === 'Dark'
                      ? 'bg-[#424242] text-white'
                      : 'bg-white'
                  }`}
                  value="Choose"
                >
                  Choose
                </option>

                <option
                  className={`${
                    currentMode === 'Dark'
                      ? 'bg-[#424242] text-white'
                      : 'bg-white'
                  }`}
                  value="IOS"
                >
                  IOS
                </option>

                <option
                  className={`${
                    currentMode === 'Dark'
                      ? 'bg-[#424242] text-white'
                      : 'bg-white'
                  }`}
                  value="ANDROID"
                >
                  ANDROID
                </option>

                <option
                  className={`${
                    currentMode === 'Dark'
                      ? 'bg-[#424242] text-white'
                      : 'bg-white'
                  }`}
                  value="WEB"
                >
                  WEB
                </option>
              </select>
            </div>
          </div>

          <div class="flex w-full mb-3">
            <div class="mb-3 w-full ">
              <label class="block text-gray-700 text-sm font-bold mb-2 ">
                image
              </label>
              <input
                onChange={onChange('image')}
                type="file"
                name="image"
                accept="image"
                placeholder="choose a file"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
              type="submit"
              onClick={handleSubmit}
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

export default AddNotification;
