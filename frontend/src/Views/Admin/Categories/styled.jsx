import styled from "styled-components";

export const Container = styled.div`
  .image-cover {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .MuiTableCell-root {
    vertical-align: inherit;
  }

  .border-table {
    border: 1px solid rgba(224, 224, 224, 1);
    border-radius: 4px;

    @media screen and (max-width: 768px) {
      width: calc(100% - 400px) !important;
    }
  }

  .sub-row-padding {
    padding: 0;
  }

  .delete-icon {
    @media screen and (max-width: 768px) {
      margin: 0 !important;
    }
  }
`;
