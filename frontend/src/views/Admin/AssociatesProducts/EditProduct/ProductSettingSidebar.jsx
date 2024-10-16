import React from "react";
import { ColorBox, ProductSettingSidebarContainer } from "./styled";
import { Divider, TextareaAutosize } from "@mui/material";
import ButtonComponent from "../../../../components/ButtonComponent";
import InputComponent from "../../../../components/InputComponent";
import SelectComponent from "../../../../components/SelectComponent";
import CategorySidebar from "../../../../components/SuperAdmin/CategorySidebar";
import { Col, Row } from "react-bootstrap";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const ProductSettingSidebar = ({
  handleAddDesign,
  formik,
  product,
  loading,
  generatedImageRef,
  selectImage,
  setShowFrame,
}) => {
  const { t } = useTranslation();
  const onColorChange = (data) => {
    if (formik.values.selectedColorIds.includes(data.id)) {
      const filtered = formik.values.selectedColorIds.filter(
        (item) => item !== data.id
      );
      formik.setFieldValue("selectedColorIds", filtered);
    } else {
      formik.setFieldValue("selectedColorIds", [
        ...formik.values.selectedColorIds,
        data.id,
      ]);
    }
  };

  const renderColorList = () => {
    const colors =
      product &&
      product.product_variants?.map((item) => {
        return {
          title: item.color?.name,
          id: item.color_id,
        };
      });
    return (
      (colors &&
        colors.filter((color) =>
          formik.values.selectedColorIds.includes(color.id)
        )) ||
      []
    );
  };
  return (
    <ProductSettingSidebarContainer>
      <div className="title">{t("Product settings")}</div>
      <Divider />
      <div className="tab-list">
        <ButtonComponent
          text={t("Add Your Design")}
          variant="outlined"
          width="50%"
          onClick={handleAddDesign}
          fontSize="12px"
        />
        <ButtonComponent
          fontSize="12px"
          text={t("ADD INFORMATION")}
          variant="outlined"
          width="50%"
        />
      </div>
      <Divider />
      <form className="info-form">
        <InputComponent
          InnerPlaceholder="Enter name of the product"
          fullWidth
          label={t("Name of the product")}
          name="productName"
          formik={formik}
        />
        <InputComponent
          InnerPlaceholder="Enter description of the product"
          fullWidth
          label={t("Description of the product")}
          type="textarea"
          height="100px"
          className="mt-3"
          name="productDescription"
          formik={formik}
        />

        <label className="mt-3">{t("Choose colors")}</label>
        <Row className="color-row">
          {product &&
            product.product_variants &&
            product.product_variants.map((item, i) => (
              <Col
                md={2}
                lg={2}
                sm={4}
                key={`color-${i}`}
                className="color-col"
              >
                {item.color && (
                  <ColorBox
                    onClick={() =>
                      onColorChange({
                        id: item.color_id,
                      })
                    }
                    color={item.color?.code}
                    className={
                      formik.values.selectedColorIds.find(
                        (color) => color === item.color_id
                      ) && "active"
                    }
                  >
                    <div className="dot"></div>
                  </ColorBox>
                )}
              </Col>
            ))}
        </Row>
        {formik.errors.selectedColorIds && (
          <div className="error-msg">{formik.errors.selectedColorIds}</div>
        )}
        <label className="mt-3">{t("Select Product cover image color")}</label>
        <SelectComponent
          optionList={renderColorList()}
          formik={formik}
          name="coverImageColor"
          width="100%"
          size="small"
        />
        {formik.errors.coverImageColor && (
          <div className="error-msg">{formik.errors.coverImageColor}</div>
        )}
        <Row>
          <Col>
            <label className="mt-3">{t("Selling Price")}</label>
            <InputComponent
              helperText="Selling Price (RSD)"
              InnerPlaceholder="Selling Price (RSD)"
              fullWidth
              name="productPrice"
              formik={formik}
            />
          </Col>
          <Col>
            <label className="mt-3">{t("Base Price")}</label>
            <InputComponent
              helperText="Base Price (RSD)"
              InnerPlaceholder="Base Price (RSD)"
              fullWidth
              value={get(product, "price")}
              disabled
            />
          </Col>
          <Col>
            <label className="mt-3">{t("Earning")}</label>
            <InputComponent
              helperText="Earning (RSD)"
              InnerPlaceholder="Earning (RSD)"
              fullWidth
              name="associateProfit"
              value={formik.values["productPrice"] - get(product, "price")}
              // formik={formik}
              disabled
            />
          </Col>
        </Row>
        <div className="fix-footer">
          <ButtonComponent
            text={t("Cancel")}
            variant="contained"
            width="50%"
            loading={loading}
          />
          <ButtonComponent
            onClick={() => {
              selectImage(null);
              setShowFrame(false);
              setTimeout(() => {
                formik.handleSubmit();
              }, 100);
            }}
            text={t("Add Product")}
            variant="contained"
            width="50%"
            loading={loading}
          />
        </div>
      </form>
    </ProductSettingSidebarContainer>
  );
};

export default ProductSettingSidebar;
