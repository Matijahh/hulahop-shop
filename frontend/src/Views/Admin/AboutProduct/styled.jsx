import styled from "styled-components";

const TABLE_OFFSET = "154px";

export const AboutProductContainer = styled.div`
  .products-table {
    height: calc(100vh - ${TABLE_OFFSET});

    .css-yrdy0g-MuiDataGrid-columnHeaderRow {
      .MuiDataGrid-withBorderColor:last-child {
        .MuiDataGrid-columnHeaderTitleContainer {
          justify-content: center;
        }
      }
    }
  }
`;
