import React, { useEffect, useState } from "react";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import Tables from "../../../components/SuperAdmin/Tables";
import { renderHeader } from "./mock";
import map from "lodash/map";
import associate2 from "../../../assets/images/associate2.jpg";
import { filter } from "lodash";
import { getImageUrlById } from "../../../utils/commonFunctions";
import { commonGetQuery } from "../../../utils/axiosInstance";
import UpdateUserStatus from "../Users/updateUserStatus";
import { Loader } from "../../../components/Loader";

const Associates = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getUsersData = async () => {
    setLoading(true);
    const response = await commonGetQuery("/users");
    setLoading(false);
    if (response && response.data) {
      const { data } = response.data;
      const associateUsers = filter(data, { type: "ASSOCIATE" });
      const sanitizedRecords =
        associateUsers.length > 0
          ? associateUsers.map((item, index) => {
              return {
                no: `${index + 1}`,
                user_image: getImageUrlById(item.image_id),
                user_name: `${item.first_name} ${item.last_name}`,
                // address:
                //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
                id: item.id,
                user_type: item.type,
                email: item.email,
                contact_no: item.mobile,
                status: item.status ? "Active" : "Inactive",
              };
            })
          : [];
      setUserData(sanitizedRecords);
    }
  };

  const toggleModal = (item) => {
    setIsOpen(!isOpen);
    setSelectedItem(item || null);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">Assosiate</div>
      </FlexBox>
      {loading ? (
        <Loader height="200px" />
      ) : (
        <Tables body={userData} header={renderHeader(toggleModal)} />
      )}
      {isOpen && (
        <UpdateUserStatus
          toggle={toggleModal}
          isOpen={isOpen}
          refresh={getUsersData}
          data={selectedItem}
        />
      )}
    </CommonWhiteBackground>
  );
};

export default Associates;
