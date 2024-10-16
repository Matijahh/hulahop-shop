import styled from "styled-components";

const HeaderWrapperStyled = styled.div`
  /* position: sticky; */
  top: 0;
  z-index: 999;
  .menu-wrapper {
    height: 100vh;
    width: 100%;
    position: absolute;
    background-color: #00000040;
    z-index: 888;
    cursor: pointer;
    display: none;
    &.open {
      display: block;
    }
  }
  .header-container {
    display: block;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }
  .flex-box-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    @media (max-width: 991.98px) {
      flex-wrap: wrap;
    }
  }
  .header-top-area {
    /* background: #eee; */
    background: #f8f8f8;
    padding: 10px 20px;

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
      .language-transfer-tab {
        display: inline-block;

        Button {
          all: unset;
          width: 90px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          font-size: 16px;
          padding: 5px;
          color: #2c2c2c;
          cursor: pointer;
        }
      }

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
        background-color: #f1676d;
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
  .header-middle-area {
    /* border: 1px solid #e0e0e0; */
    border-top: 1px solid #e5eaee;
    /* border-bottom: 1px solid #f1676d; */
    background: #fff;
    padding: 10px 20px;
    .logo-box {
      width: 200px;
      img {
        width: 180px;
        max-width: 100%;
        height: auto;
      }
    }

    .search-box {
      width: 420px;
      max-width: 100%;
    }

    @media (max-width: 825px) {
      .search-box {
        width: fit-content;
      }
    }
  }
  .middle-area-end {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    max-width: 210px;
    justify-content: end;
    .profile-box {
      padding: 5px;
      cursor: pointer;
      svg {
        color: #071c1f;
        width: 25px;
        height: 25px;
      }
    }

    .cart-box {
      padding: 5px;
      cursor: pointer;
      svg {
        color: #071c1f;
        width: 25px;
        height: 25px;
      }
    }
  }
  .header-bottom-area {
    /* background: #f1676d; */
    background: #fff;
    padding: 10px 5px;

    .header-main-user {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      /* padding: 20px; */

      .header-menu-user {
        width: 100%;
        .nav-user {
          position: relative;
          height: 45px;
          display: flex;
          -webkit-box-pack: justify;
          justify-content: space-between;
          -webkit-box-align: center;
          align-items: center;
          pointer-events: all;
          width: 100%;
          ul {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            list-style: none;
            margin-bottom: 0;
            height: 100%;
            padding: 0;
            li {
              height: 100%;
              padding: 0 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 10px;
              a {
                border: none;
                text-decoration: none;
                text-transform: capitalize;
                /* color: #fff; */
                color: #150e4b;
                font-size: 16px;
                font-weight: 700;
                border-bottom: 2px solid transparent;

                & + .MuiButton-endIcon {
                  svg {
                    color: #150e4b;
                    fill: currentColor;
                  }
                }

                &:hover {
                  /* color: #150e4b; */
                  color: #f1676d;
                  /* background: #fff; */
                  /* border-bottom: 2px solid #150e4b; */
                  border-bottom: 2px solid #f1676d;

                  & + .MuiButton-endIcon {
                    svg {
                      color: #f1676d;
                      fill: currentColor;
                    }
                  }
                }

                &.active-nav {
                  /* border-bottom: 2px solid #150e4b; */
                  /* color: #150e4b; */
                  border-bottom: 2px solid #f1676d;
                  color: #f1676d;

                  & + .MuiButton-endIcon {
                    svg {
                      color: #f1676d;
                      fill: currentColor;
                    }
                  }
                }
              }
            }
          }
          .close-menu-box {
            display: none;
            width: 100%;
            .close-menu {
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              width: 30px;
              height: 30px;
              background-color: #f1676d;
              svg {
                fill: #fff;
              }
            }
          }
        }
      }
    }

    @media (max-width: 825px) {
      padding: 0;
      .header-main-user {
        .header-menu-user {
          width: 100%;
          .nav-user {
            position: absolute;
            flex-direction: column;
            height: 100vh;
            overflow-y: auto;
            background-color: #fff;
            width: min(50%, 250px);
            top: 0;
            left: -100%;
            z-index: 9999;
            ul {
              display: block;
              /* width: unset; */
              li {
                height: 48px;
                padding: 5px 10px;
                background-color: #e5eaee;
                /* border: 1px solid #f1676d;
                border-left: none;
                border-right: none; */
                margin-bottom: 4px;
                margin-top: 4px;
              }
            }
            .close-menu-box {
              display: flex;
              justify-content: end;
            }
            &.open {
              left: 0;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    position: relative;
  }
`;

export default HeaderWrapperStyled;
