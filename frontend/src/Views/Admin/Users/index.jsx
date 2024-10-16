import React, { useEffect, useState } from "react";

import Tables from "../../../components/SuperAdmin/Tables";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { renderHeader } from "./mock";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { Loader } from "../../../components/Loader";

import muska1 from "../../../assets/images/muska-1.jpg";
import { CircularProgress } from "@mui/material";
import UpdateUserStatus from "./updateUserStatus";
import { getImageUrlById } from "../../../utils/commonFunctions";
import ModalComponent from "../../../components/ModalComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { SuccessTaster } from "../../../components/Toast";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUser, setSelectedUser] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleToggle = () => {
    setDeleteModal(!deleteModal);
    if (deleteModal) {
      setSelectedUser();
    }
  };

  const handleOpenToggle = (id) => {
    if (id) {
      setDeleteModal(true);
      setSelectedUser(id);
    }
  };

  const getUsersData = async () => {
    setLoading(true);
    const response = await commonGetQuery("/users");
    setLoading(false);
    if (response && response.data) {
      const { data } = response.data;
      const sanitizedRecords =
        data.length > 0
          ? data.map((item, index) => {
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

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await commonAddUpdateQuery(`/users/${id}`, null, "DELETE");
    if (response) {
      getUsersData();
    }
    setLoading(false);
    handleToggle();
  };

  const toggleModal = (item) => {
    setIsOpen(!isOpen);
    setSelectedItem(item || null);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const handleSendPasswordForgetLink = async (email) => {
    await commonAddUpdateQuery("/auth/forgot-password", {
      email,
    });
    SuccessTaster("Password reset email has been successfully sent.");
  };

  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">Users</div>
      </FlexBox>
      {loading ? (
        <Loader height="200px" />
      ) : (
        <Tables
          body={userData}
          header={renderHeader(
            toggleModal,
            handleOpenToggle,
            handleSendPasswordForgetLink
          )}
        />
      )}
      {isOpen && (
        <UpdateUserStatus
          toggle={toggleModal}
          isOpen={isOpen}
          refresh={getUsersData}
          data={selectedItem}
        />
      )}
      <ModalComponent
        title="Delete Product"
        size={"m"}
        open={deleteModal}
        handleClose={handleToggle}
      >
        <p>Are you sure want to delete</p>
        <>
          <FlexBox hasBorderTop={true} className="pt-3 mt-3">
            <ButtonComponent
              className=""
              variant="outlined"
              fullWidth
              text="Cancel"
              onClick={handleToggle}
            />
            <ButtonComponent
              variant="contained"
              fullWidth
              text="Delete Product"
              type="button"
              onClick={() => {
                handleDelete(selectedUser);
              }}

              // loading={loading}
            />
          </FlexBox>
        </>
      </ModalComponent>
    </CommonWhiteBackground>
  );
};

export default Users;
