import React, { useEffect, useState } from 'react';

// REACT ROUTER DOM
import { useParams, Link } from 'react-router-dom';

// HEADER COMPONENT
import { Header } from '../../components';

//REACT ICONS
import { IoIosArrowBack } from 'react-icons/io';

// HELPER FILES
import { isAuthenticated } from '../../helper/login/loginHelper';
import { getAppVersionIndividualDetail } from '../../helper/Table/appVersionTableHelper';
import { toast } from 'react-toastify';

const ViewAppVersion = () => {
  // PARAMS
  const params = useParams();
  const ID = params.id;

  // Authentication
  const { data } = isAuthenticated();

  // STATE
  const [values, setValues] = useState({
    name: '',
    version: '',
    minimumVersion: '',
  });

  const { name, version, minimumVersion } = values;

  const preload = () => {
    //   console.log(userid);
    getAppVersionIndividualDetail(ID, data.accessToken)
      .then((data) => {
        console.log('DATA', data);

        if (data.message == 'success') {
          setValues({
            ...values,
            name: data.data.name,
            version: data.data.version,
            minimumVersion: data.data.minimumVersion,
          });
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Link to="/appVersion">
        <IoIosArrowBack size={25} className="mb-3" />
      </Link>
      <Header category="Details" title="App Version Details" />
      <div class="max-w-full rounded overflow-hidden shadow-lg pb-10">
        {/* <div class="px-6 py-4">
          <span></span>
        </div> */}
        <div class="px-6 pt-4 pb-2">
          <table class="border-none ">
            <tbody>
              <tr>
                <td class="border-none pr-32  py-2">Name</td>
                <td class="border-none">{name}</td>
              </tr>
              <tr>
                <td class="border-none pr-32 py-2">Version</td>
                <td class="border-none">{version}</td>
              </tr>

              <tr>
                <td class="border-none pr-32 py-2">minimumVersion</td>
                <td class="border-none">{minimumVersion}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAppVersion;
