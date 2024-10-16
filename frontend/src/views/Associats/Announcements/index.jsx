import React, { useEffect, useState } from "react";
import Tables from "../../../components/SuperAdmin/Tables";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import InputComponent from "../../../components/InputComponent";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { Loader, LoaderContainer } from "../../../components/Loader";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Announcements = () => {
  const { t } = useTranslation();
  const tableHeaderTitle = [
    { field: "id", headerName: t("ID") },
    { field: "title", headerName: t("Title"), width: 200 },
    { field: "desc", headerName: t("Details"), width: 700 },
  ];
  const [loading, setLoading] = useState(false);
  const [tableList, setTableList] = useState([]);

  const getAnnouncementDat = async () => {
    setLoading(true);
    const response = await commonGetQuery("/announcements");
    setLoading(false);
    if (response) {
      const { data } = response.data;
      const modifiedData = data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          desc: item.description,
        };
      });
      setTableList(modifiedData);
    }
  };

  useEffect(() => {
    getAnnouncementDat();
  }, []);

  return (
    <CommonWhiteBackground>
      <Helmet>
        <title>{t("Announcements - Associate")}</title>
      </Helmet>
      <FlexBox className="mb-4" isWrap>
        <div className="main-title ">{t("Announcements")}</div>
        <InputComponent type="search" label={t("Search Announcements")} />
      </FlexBox>
      {loading ? (
        <Loader />
      ) : (
        <Tables header={tableHeaderTitle} body={tableList} />
      )}
    </CommonWhiteBackground>
  );
};
export default Announcements;
