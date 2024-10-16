import React from "react";
import {
  InputLabel,
  MenuItem,
  OutlinedInput,
  FormControl,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import styled from "styled-components";
import { size as lodashSize } from "lodash";
import { map } from "lodash";
import i18next from "i18next";

const SelectContainer = styled.div`
  .MuiInputBase-root {
    height: 40px !important;
  }
  .css-5d0qwl-MuiInputBase-root-MuiOutlinedInput-root,
  .MuiSelect-select {
    min-height: 40px !important;
    height: 40px !important;
    max-height: 40px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input-label {
    margin-bottom: 9px;
  }
  @media screen and (max-width: 768px) {
    display: block;
    min-width: 100% !important;
    width: 100% !important;
  }
  .selectbox-input {
    @media screen and (max-width: 768px) {
      min-width: 100% !important;
      width: 100% !important;
    }
  }
`;

const SelectComponent = (props) => {
  const {
    label,
    id,
    value,
    MenuProps,
    width,
    onChange = () => {},
    multiple = false,
    size,
    title,
    optionList,
    formik,
    name,
    fullWidth,
    className,
    disabled,
    isCustumeChangeFunction,
    isShowValue,
  } = props;
  const onValueChange = (e) => {
    if (formik) {
      const value = e.target && e.target.value;
      formik.setFieldValue(name, value);
      if (isCustumeChangeFunction) {
        onChange(e, name);
      }
    } else {
      onChange(e, name);
    }
  };

  return (
    <SelectContainer className={className || ""}>
      {title && <label className="input-label">{title}</label>}
      <FormControl
        className="selectbox-input"
        sx={{ width: width || (fullWidth && "100%") }}
        disabled={disabled}
      >
        <InputLabel size={size} id="demo-multiple-name-label">
          {label}
        </InputLabel>
        <Select
          value={
            isShowValue ? value : formik ? formik.values[name] : value || ""
          }
          onChange={onValueChange}
          input={<OutlinedInput label={label} size={size} />}
          size={size}
          // multiple={multiple}
          name={name}
        >
          {optionList &&
            lodashSize(optionList) > 0 &&
            map(optionList, (item, i) => (
              <MenuItem size={size} value={`${item.id},${item.title}`}>
                <ListItemText
                  key={i}
                  size={size}
                  id={item.id}
                  primary={i18next.t(item.title)}
                />
              </MenuItem>
            ))}
          {!optionList ||
            (lodashSize(optionList) < 1 && (
              <MenuItem size={size} value={10}>
                <ListItemText size={size} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </SelectContainer>
  );
};

export default SelectComponent;
