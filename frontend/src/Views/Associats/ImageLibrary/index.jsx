import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import ModalComponent from "../../../components/ModalComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { ImageLibraryContainer } from "./styled";
import { FlexBox } from "../../../components/Sections";
import SelectComponent from "../../../components/SelectComponent";
import { Col, Row } from "react-bootstrap";
import { map } from "lodash";
import { Checkbox } from "@mui/material";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../../Utils/constant";
import axios from "axios";
import { Loader } from "../../../components/Loader";

const ImageLibrary = ({ open, handleClose, onPickImage }) => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const getAllAssociateImage = async () => {
    setLoading(true);
    const response = await commonGetQuery("/associate_images");
    setLoading(false);
    if (response) {
      const { data } = response.data;
      setImages(data);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target && e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };
  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("image", file);
    try {
      setButtonLoading(true);
      const response = await axios.post(
        `${REST_URL_SERVER}/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        const { data } = response.data;
        createAssociateImages(data.id);
        setButtonLoading(false);
      }
    } catch (error) {
      setButtonLoading(false);
      if (error && error.data) {
        const { message } = error.data;
        return ErrorTaster(message);
      }
    }
  };

  const createAssociateImages = async (id) => {
    setButtonLoading(true);
    const response = await commonAddUpdateQuery("/associate_images", {
      image_id: id,
    });
    setButtonLoading(false);
    if (response) {
      const { message } = response.data;
      getAllAssociateImage();
      SuccessTaster(message);
    }
  };

  const handleOnSelectImage = (id) => {
    const copyArr = [...selectedImages];
    const hasImageAlready = copyArr.find((item) => item === id);
    if (hasImageAlready) {
      const updatedArray = copyArr.filter((item) => item !== id);
      setSelectedImages(updatedArray);
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleRemove = async () => {
    setDeleteButtonLoading(true);
    const response = await commonAddUpdateQuery(
      "/associate_images",
      {
        ids: selectedImages,
      },
      "DELETE"
    );
    setDeleteButtonLoading(false);
    if (response) {
      getAllAssociateImage();
      const { message } = response.data;
      SuccessTaster(message);
    }
  };
  useEffect(() => {
    getAllAssociateImage();
  }, []);

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <ImageLibraryContainer>
        <FlexBox className="mb-2 header">
          <div className="modal-title">A collection of files</div>
          <FlexBox>
            <SelectComponent
              id="1"
              labelId="demo-multiple-name-label"
              label="Filter Images"
              width={150}
              size="small"
            />
            <ButtonComponent
              variant="contained"
              startIcon={<AddIcon />}
              styled={{ position: "relative" }}
              text="Add a Photo"
              type="file"
              handleFileChange={handleFileChange}
              loading={buttonLoading}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox className="mt-3 mb-3">
          <div className="modal-sub-title ">Recent Used files (3)</div>
          {selectedImages.length > 0 && (
            <ButtonComponent
              variant="outlined"
              onClick={handleRemove}
              loading={deleteButtonLoading}
              text="Remove"
            />
          )}
        </FlexBox>
        <div className="images-list">
          {loading ? (
            <Loader />
          ) : (
            <Row className="g-4">
              {map(images, (item, key) => (
                <Col md={4} lg={4} sm={6} key={key}>
                  <div className="image-box">
                    <div className="image-cover">
                      <img
                        onClick={() => {
                          onPickImage(
                            `${REST_URL_SERVER}/images/${item.image_id}`
                          );
                        }}
                        src={`${REST_URL_SERVER}/images/${item.image_id}`}
                      />
                      <div className="input-check">
                        <Checkbox
                          size="medium"
                          checked={selectedImages.find(
                            (image) => image.id === item.id
                          )}
                          onClick={() => handleOnSelectImage(item.id)}
                        />
                      </div>
                    </div>
                    <div className="box-footer">
                      <div className="content">
                        <FlexBox
                          justifyContent={"flex-start"}
                          className="content-list"
                        >
                          <div className="title">Type :</div>
                          <div className="value">image/jpeg</div>
                        </FlexBox>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </ImageLibraryContainer>
    </ModalComponent>
  );
};

export default ImageLibrary;
