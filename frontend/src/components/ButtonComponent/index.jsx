import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import cx from "classnames";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const VisuallyHiddenInput = styled("input")({
  opacity: 0,
  height: "100%",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "100%",
  zIndex: 1,
});

const ButtonComponent = (props) => {
  const { t } = useTranslation();

  const {
    variant,
    startIcon,
    text,
    onClick,
    className,
    width,
    endIcon,
    maxHeight,
    styled,
    type,
    fontSize,
    disabled,
    fullWidth,
    loading,
    handleFileChange,
  } = props;
  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      size="large"
      disabled={disabled}
      style={{
        maxHeight: maxHeight ? maxHeight : "40px",
        width: width || (fullWidth ? "100%" : ""),
        ...styled,
        fontSize: `${fontSize || "14px"} `,
      }}
      className={cx(className, "brand-btn")}
      onClick={onClick}
      endIcon={endIcon}
      type={type}
    >
      {type === "file" ? (
        <>
          {loading ? <Spinner color="light" /> : text}
          <VisuallyHiddenInput
            onChange={handleFileChange}
            accept="image/*"
            type="file"
          />
        </>
      ) : (
        <>{loading ? <Spinner color="light" /> : t(text)}</>
      )}
    </Button>
  );
};

export default ButtonComponent;
