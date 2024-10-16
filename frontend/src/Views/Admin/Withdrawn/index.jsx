import React, { useEffect, useState } from "react";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import Tables from "../../../components/SuperAdmin/Tables";
import { renderHeader } from "./mock";
import map from "lodash/map";
import associate2 from "../../../assets/images/associate2.jpg";
import { useNavigate } from "react-router-dom";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { LoaderContainer } from "../../../components/Loader";
import { get, size } from "lodash";
import ModalComponent from "../../../components/ModalComponent";
import SelectComponent from "../../../components/SelectComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import { getSelectobjectValue } from "../../../utils/commonFunctions";

const StatusList = [
  {
    id: "PENDING",
    title: "PENDING",
  },
  {
    id: "COMPLETED",
    title: "COMPLETED",
  },
  {
    id: "CANCELLED",
    title: "CANCELLED",
  },
];

const Withdrawn = () => {
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [withdrawnList, setWithdrawnList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [withdrawnStatus, setWithdrawnStatus] = useState("");

  const getWithdrawnList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/associate_withdrawn_request");
    if (response) {
      const { data } = response.data;
      setWithdrawnList(data);
      setLoading(false);
    }
    setLoading(false);
  };

  const setTableRenderData = (data) => {
    // setLoading(true);
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      id: item.id,

      associate_logo: get(item, "user.store_layout_details.0.logo_image", ""),
      associate_name:
        get(item, "user.first_name", "") +
        " " +
        get(item, "user.last_name", ""),
      store_name: get(item, "user.store_layout_details.0.name", ""),
      request_ammount: get(item, "amount", ""),
      email: get(item, "user.email", ""),
      contact_no: get(item, "user.mobile", ""),
      status: get(item, "status", "") ? get(item, "status", "") : "PENDING",
      withdrawnDetail: item,
      openModel,
    }));
    // setLoading(false);

    return renderData;
  };

  const openModel = (item) => {
    setIsOpen(true);
    let finalStatus = get(item, "status")
      ? `${get(item, "status")},${get(item, "status")}`
      : "PENDING,PENDING";
    setWithdrawnStatus(finalStatus);
    setSelectedData(item);
  };
  const closeModel = () => {
    setIsOpen(false);
    setWithdrawnStatus("");
    setSelectedData({});
  };

  const handelChangeStatus = (e) => {
    setWithdrawnStatus(e.target.value);
  };

  const handleUpdateWithdrawnStatus = async (id) => {
    setLoading(true);
    const URL = id ? `/associate_withdrawn_request/${id}` : "";
    if (URL) {
      let finalStatus =
        withdrawnStatus && getSelectobjectValue(withdrawnStatus);

      const reqBody = {
        status: finalStatus ? finalStatus.id : "PENDING",
      };
      try {
        const response = await commonAddUpdateQuery(URL, reqBody, "PATCH");
        if (response) {
          SuccessTaster("Withdrawn status updated sucessfully");
          closeModel();
          getWithdrawnList();
        }
        setLoading(false);
      } catch (error) {
        ErrorTaster(error.response.message);
      }
    }
  };

  useEffect(() => {
    getWithdrawnList();
  }, []);

  return (
    <>
      <CommonWhiteBackground>
        <FlexBox className="mb-4">
          <div className="main-title ">Associates Withdrawn Request</div>
        </FlexBox>
        {loading && <LoaderContainer />}
        <Tables
          body={
            size(withdrawnList) > 0 ? setTableRenderData(withdrawnList) : []
          }
          header={renderHeader}
        />
      </CommonWhiteBackground>
      <ModalComponent
        open={isOpen}
        title="Update Status"
        handleClose={closeModel}
        size="lg"
      >
        <div className="order-detail-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="order-status-box">
                  <div className="row ">
                    <div className="col-lg-6">
                      <SelectComponent
                        // label="Status"
                        fullWidth
                        name="status"
                        optionList={StatusList}
                        onChange={(e) => {
                          handelChangeStatus(e);
                        }}
                        isShowValue
                        value={withdrawnStatus}
                        // formik={formik}
                        title="Select Status"
                        disabled={loading}
                      />
                    </div>
                    <div className="col-lg-6 align-self-end">
                      <ButtonComponent
                        text="Update"
                        variant="contained"
                        className="mb-2"
                        onClick={() => {
                          handleUpdateWithdrawnStatus(selectedData.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalComponent>
    </>
  );
};
export default Withdrawn;
