import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  /* background: rgb(241, 103, 109); */
  /* position: sticky; */
  /* top: 0; */
  z-index: 999;
  .header-container {
    width: 100%;
    margin: 0 auto;
    /* height: 75px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .left {
    .logo-container {
      img {
        max-width: 100%;
        width: 130px;
        height: 80px;
        object-fit: contain;
      }
    }
  }
  a {
    color: #150e4b;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    &.active {
      border-bottom: 2px solid #f1676d;
      color: #f1676d;
    }
    &:hover {
      border-bottom: 2px solid #f1676d;
      color: #f1676d;
    }

    padding: 0 5px;
  }
  .right {
    a {
      border: none;
    }
    .cart-link {
      padding-left: 20px;
      svg {
        color: #150e4b;
        font-size: 32px !important;
      }
    }
  }
`;

export const HeaderMainContainer = styled.div`
  width: 100%;
  /* position: sticky;
  top: 0; */
  z-index: 999;
  background: #f8f8f8;
  .MuiFormControl-root {
    margin-bottom: 0 !important;
  }
  .hulaHop-icon-cover {
    width: 130px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .flex-box-header {
    padding: 10px 10px 10px 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    .contact-box {
      width: 200px;
      max-width: 100%;
      a {
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
        color: #2c2c2c;
      }
    }

    .header-slider-section {
      width: 100%;
      max-width: 420px;
      display: inline-block;
      text-align: center;

      .header-slider-text {
        font-size: 16px;
        font-weight: 600;
        color: #f1676d;
      }
      @media (max-width: 991.98px) {
        display: block;
        max-width: 100%;
      }
    }

    .top-area-end {
      display: inline-block;
      width: fit-content;

      .social-tab {
        display: inline-flex;
        align-items: center;
        gap: 5px;

        .social-icon {
          a {
            padding: 5px;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            svg {
              color: #2c2c2c;
              width: 24px;
              height: 24px;
            }

            &:hover {
              svg {
                color: #f1676d;
              }
            }
          }
        }
      }
    }
    .open-menu-box {
      display: none;
      width: 100%;
      .open-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 30px;
        height: 30px;
        background-color: #fff;
        svg {
          fill: #fff;
        }
      }
    }
    @media (max-width: 825px) {
      .open-menu-box {
        display: block;
      }
    }
  }
`;
