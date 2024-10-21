import styled from "styled-components";

export const TranslatationContainer = styled.div`
  .title-wrapper {
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: start;
      margin-top: 20px;

      .filters-wrapper {
        flex-direction: column;
        width: 100%;
      }
    }
  }
`;
