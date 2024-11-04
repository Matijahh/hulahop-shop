import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import { filter } from "lodash";
import { camelCase, getImageUrlById } from "../../../utils/commonFunctions";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { AssociatesContainer } from "./styled";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { Loader } from "../../../components/Loader";

import Tables from "../../../components/SuperAdmin/Tables";
import UpdateUserStatus from "../Users/updateUserStatus";
import ModalComponent from "../../../components/ModalComponent";
import ButtonComponent from "../../../components/ButtonComponent";

const Associates = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { t } = useTranslation();

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
                id: item.id,
                user_type: item.type && t(`${camelCase(item.type)}`),
                email: item.email,
                contact_no: item.mobile,
                status: item.status ? t("Active") : t("Inactive"),
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

  const toggleDeleteModal = (item) => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setSelectedItem(item || null);
  };

  const deleteItem = () => {
    console.log("selected item", selectedItem);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <AssociatesContainer>
      <CommonWhiteBackground>
        <FlexBox className="mb-4 title-wrapper">
          <div className="main-title ">{t("Associate")}</div>
        </FlexBox>

        {loading ? (
          <Loader height="200px" />
        ) : (
          <Tables
            className="user-table"
            body={userData}
            header={renderHeader(toggleModal, toggleDeleteModal, () => {}).map(
              (item) => ({
                ...item,
                headerName: t(item.headerName),
              })
            )}
          />
        )}

        <ModalComponent
          title={t("Delete Associate")}
          size={"m"}
          open={isDeleteModalOpen}
          handleClose={toggleDeleteModal}
        >
          <p>
            {`${t("Are you sure you want to delete")} `}
            <span className="bold">{selectedItem?.user_name}</span>
            {`?`}
          </p>
          <>
            <FlexBox hasBorderTop={true} className="pt-3 mt-3">
              <ButtonComponent
                className=""
                variant="outlined"
                fullWidth
                text={t("Cancel")}
                onClick={toggleDeleteModal}
              />
              <ButtonComponent
                variant="contained"
                fullWidth
                text={t("Delete")}
                type="button"
                onClick={deleteItem}
              />
            </FlexBox>
          </>
        </ModalComponent>

        {isOpen && (
          <UpdateUserStatus
            toggle={toggleModal}
            isOpen={isOpen}
            refresh={getUsersData}
            data={selectedItem}
          />
        )}
      </CommonWhiteBackground>
    </AssociatesContainer>
  );
};

export default Associates;
