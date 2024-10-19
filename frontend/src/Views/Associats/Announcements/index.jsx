import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../../utils/axiosInstance";

import Tables from "../../../components/SuperAdmin/Tables";
import InputComponent from "../../../components/InputComponent";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { Loader } from "../../../components/Loader";
import { Helmet } from "react-helmet";

const Announcements = () => {
  const [loading, setLoading] = useState(false);
  const [tableList, setTableList] = useState([]);

  const { t } = useTranslation();

  const tableHeaderTitle = [
    { field: "id", headerName: t("ID") },
    { field: "title", headerName: t("Title"), width: 200 },
    { field: "desc", headerName: t("Details"), width: 700 },
  ];

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
        <div className="main-title">{t("Announcements")}</div>
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
