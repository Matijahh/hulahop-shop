import styled from "styled-components";
import Colors from "../../design/Colors";

export const CommonWhiteBackground = styled.div`
  background-color: #fff;
  padding: ${({ padding }) => padding || "30px"};
  /* max-height: calc(100vh - 60px); */
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
  .main-title {
    font: 700 24px "Nunito Sans";
    color: ${Colors.blackColor};
  }
  .sub-title {
    font: 600 18px "Nunito Sans";
    color: ${Colors.blackColor};
    margin-bottom: 10px;
  }
  #file-input {
    opacity: 0;
  }
  .error-msg {
    font-size: 0.9rem;
    font-weight: 400;
    color: #d32f2f;
    margin-top: 10px;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "space-between"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  gap: 0 10px;
  flex-wrap: ${({ isWrap }) => isWrap && "wrap"};
  border-top: ${({ hasBorderTop }) =>
    hasBorderTop && "1px solid rgba(0,0,0,0.2)"};
  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;
