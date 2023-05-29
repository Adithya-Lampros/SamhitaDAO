import React, { useEffect, useState } from "react";
import "../styles/alldatadaos.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Arrow from "../assets/Arrow.svg";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { ContractFactory, ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount, useSigner } from "wagmi";
import { useNavigate } from "react-router-dom";
import leftCurvedLinesDAO from "../assets/yourDaos/left-curved-lines-your-dao.svg";
import mainYourDAOBg from "../assets/yourDaos/main-your-dao-Bg.svg";
import topCurvedLinesDAO from "../assets/yourDaos/top-curved-lines-your-dao.svg";
import languageFactoryAbi from "../contracts/artifacts/LanguageDAOFactory.json";
import languageTokenAbi from "../contracts/artifacts/LanguageDAOToken.json";
import samhitaAbi from "../contracts/artifacts/Samhita.json";
import languageAbi from "../contracts/artifacts/LanguageDAO.json";
import { sign } from "@pushprotocol/restapi/src/lib/chat/helpers";

const samhitaAddress = "0x16ebae0D7673b9e3De6D21C38237708a0Af610Ee";
const languageFactoryAddress = "0x49cB4F263F16e09A84e95Ad608CF5b7f86d00fB8";
const samhitaTokenAddress = "0x14575fe559ffce940a9fc71053Bfe1316490cE2A";

function YourDaos({ setSingleYourDataDao, setYourDaos, setDaoAddress }) {
  const navigate = useNavigate();

  const [allDataDaos, setDataDaos] = useState([]);
  const [joinedDaos, setJoinedDaos] = useState([]);
  const { address, isConnected } = useAccount();
  const [isJoined, setIsJoined] = useState();
  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = useState(false);
  const [isSamhita, setIsSamhita] = useState();
  const openDaoPage = (a, b) => {
    navigate("/open-existing-data-dao", { state: { data: a, address: b } });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllDataDaos = async () => {
    setLoading(false);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        if (chainId === 199) {
          const samhitaContract = new ethers.Contract(
            samhitaAddress,
            samhitaAbi,
            signer
          );
          const isJoined = await samhitaContract.checkIsMemberAdded(address);
          // console.log(isJoined);
          setIsJoined(isJoined);
          const contract = new ethers.Contract(
            languageFactoryAddress,
            languageFactoryAbi,
            signer
          );
          const dataDaos = await contract.getUserDataDaos(address);
          // console.log(dataDaos);
          setDataDaos(dataDaos);
          // console.log(contract);
          // const tokenAddress = ethers.utils.getAddress(
          //   dataDaos.dataDAOTokenAddress
          // );
          // const tokenContract = new ethers.Contract(
          //   dataDaos.dataDAOTokenAddress,
          //   languageTokenAbi,
          //   signer
          // );
          // console.log(tokenContract);
          // return contract;

          // get all the joined DAOs
          const allDAOs = await contract.getAllDataDaos();
          console.log(allDAOs);
          for (let i = 0; i < allDAOs.length; i++) {
            const languageContract = new ethers.Contract(
              allDAOs[i].dataDaoAddress,
              languageAbi,
              signer
            );
            const isMember = await languageContract.isMemberAdded(address);
            console.log(isMember);
            if (isMember) {
              joinedDaos.push(allDAOs[i]);
            }
          }
          setJoinedDaos(joinedDaos);
          console.log(joinedDaos);
          setLoading(true);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    }
    // const contract = await getContract();
  };

  useEffect(() => {
    getAllDataDaos();
  }, []);

  // copy to clipboard function ***************
  const toastInfo = () => toast.success("Address Copied");
  const copyContent = async (e) => {
    try {
      await navigator.clipboard.writeText(e);
      toastInfo();
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert(err["message"]);
    }
  };

  return (
    <>
      <div className="main-your-dao">
        <div className="your-dao-bg"></div>
        <div className="your-dao-bg-images">
          <img
            src={leftCurvedLinesDAO}
            className="leftCurvedLinesDao"
            alt="leftcurve"
          />
          <img
            src={topCurvedLinesDAO}
            className="topCurvedLinesDao"
            alt="topcurve"
          />
        </div>
        <div className="all-datadao-main-div">
          <div className="all-datadao-div ">
            <div className="all-datadao-section1">
              <h1 className="all-datadao-title">Your Language DAOs</h1>

              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Joined DAOs" value="1" />
                      <Tab label="Created DAOs" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div className="your-Dao-table-data">
                      {isJoined ? (
                        <Grid item xs={4}>
                          <div className="proposal-details">
                            <table>
                              <thead>
                                <tr>
                                  <th colSpan={2}>Samhita DAO</th>
                                </tr>

                                {/* <tr>
                                  <td>
                                    <p className="proposal-header">
                                      This is the samhita DAO
                                    </p>
                                  </td>
                                </tr> */}
                              </thead>
                              <tr>
                                <td>
                                  <p className="proposal-header">
                                    Samhita DAO was born from a deep sense of
                                    urgency to save endangered languages from
                                    disappearing into oblivion. Samhita DAO is
                                    empowering communities to create
                                    dictionaries, grammar guides, and oral
                                    histories that capture the essence of their
                                    language.
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="datadao-address">
                                    <h3 className="proposal-info">
                                      Token Address :
                                      {samhitaTokenAddress.substring(0, 6) +
                                        "..." +
                                        samhitaTokenAddress.substring(
                                          samhitaTokenAddress.length - 5,
                                          samhitaTokenAddress.length
                                        )}
                                    </h3>

                                    <svg
                                      width="16"
                                      height="18"
                                      viewBox="0 0 16 18"
                                      fill=""
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{
                                        margin: " 0 20px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        copyContent(samhitaTokenAddress)
                                      }
                                    >
                                      <path
                                        d="M10.7 0.666748H7.455C5.985 0.666748 4.82 0.666748 3.90917 0.790081C2.97083 0.916748 2.21167 1.18341 1.61333 1.78425C1.01417 2.38508 0.748333 3.14758 0.6225 4.08925C0.5 5.00425 0.5 6.17341 0.5 7.64925V12.5142C0.5 13.7709 1.26667 14.8476 2.35583 15.2992C2.3 14.5409 2.3 13.4784 2.3 12.5934V8.41841C2.3 7.35091 2.3 6.43008 2.39833 5.69341C2.50417 4.90341 2.7425 4.14675 3.35417 3.53258C3.96583 2.91841 4.72 2.67925 5.50667 2.57258C6.24 2.47425 7.15667 2.47425 8.22083 2.47425H10.7792C11.8425 2.47425 12.7575 2.47425 13.4917 2.57258C13.2717 2.01123 12.8877 1.52916 12.3897 1.18921C11.8917 0.849264 11.3029 0.6672 10.7 0.666748Z"
                                        fill="#F8F8F8"
                                      />
                                      <path
                                        d="M3.5 8.49763C3.5 6.22597 3.5 5.09013 4.20333 4.3843C4.90583 3.67847 6.03667 3.67847 8.3 3.67847H10.7C12.9625 3.67847 14.0942 3.67847 14.7975 4.3843C15.5 5.09013 15.5 6.22597 15.5 8.49763V12.5143C15.5 14.786 15.5 15.9218 14.7975 16.6276C14.0942 17.3335 12.9625 17.3335 10.7 17.3335H8.3C6.0375 17.3335 4.90583 17.3335 4.20333 16.6276C3.5 15.9218 3.5 14.786 3.5 12.5143V8.49763Z"
                                        fill="#F8F8F8"
                                      />
                                    </svg>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ textAlign: "center" }}>
                                  <button
                                    className="rounded-view-data-dao-button button-to-view-more"
                                    onClick={() => {
                                      // setIsSamhita(true);
                                      openDaoPage(true, samhitaAddress);
                                    }}
                                  >
                                    <span className="view-button-text">
                                      View More
                                    </span>
                                    <span className="view-circle d-flex justify-content-center align-items-center ">
                                      <i className="fas fa-arrow-right view-arrow"></i>
                                    </span>
                                  </button>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </Grid>
                      ) : (
                        ""
                      )}
                      {/* {loading &&
                      joinedDaos.map((dao, i) => (
                        <>
                          <Grid item xs={4}>
                            <div className="proposal-details">
                              <table>
                                <thead>
                                  <tr>
                                    <th colSpan={2}>{dao.dataDaoName}</th>
                                  </tr>
                                </thead>
                                <tr>
                                  <td>
                                    <p className="proposal-header">
                                      {dao.dataDaoDescription}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="datadao-address">
                                      <h3 className="proposal-info">
                                        Token Address :
                                        {dao.dataDAOTokenAddress.substring(
                                          0,
                                          6
                                        ) +
                                          "..." +
                                          dao.dataDaoAddress.substring(
                                            dao.dataDaoAddress.length - 5,
                                            dao.dataDaoAddress.length
                                          )}
                                      </h3>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        enable-background="new 0 0 24 24"
                                        height="18px"
                                        viewBox="0 0 24 24"
                                        width="18px"
                                        fill="#4c2ffd"
                                        style={{
                                          margin: "0px 20px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          copyContent(dao.dataDaoAddress)
                                        }
                                      >
                                        <g>
                                          <rect
                                            fill="none"
                                            height="24"
                                            width="24"
                                          />
                                        </g>
                                        <g>
                                          <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                                        </g>
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{ textAlign: "center" }}
                                    onClick={() => {
                                      // setIsSamhita(false);
                                      openDaoPage(false, dao.dataDaoAddress);
                                    }}
                                  >
                                    <span className="view-button-text">
                                      View More
                                    </span>
                                    <span className="view-circle d-flex justify-content-center align-items-center ">
                                      <i className="fas fa-arrow-right view-arrow"></i>
                                    </span>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </Grid>
                      ) : 
                        ""
                      } */}
                      {loading &&
                        joinedDaos.map((dao, i) => (
                          <>
                            <Grid item xs={4}>
                              <div className="proposal-details">
                                <table>
                                  <thead>
                                    <tr>
                                      <th colSpan={2}>{dao.dataDaoName}</th>
                                    </tr>
                                  </thead>
                                  <tr>
                                    <td>
                                      <p className="proposal-header">
                                        {dao.dataDaoDescription}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="datadao-address">
                                        <h3 className="proposal-info">
                                          Token Address :
                                          {dao.dataDAOTokenAddress.substring(
                                            0,
                                            6
                                          ) +
                                            "..." +
                                            dao.dataDAOTokenAddress.substring(
                                              dao.dataDAOTokenAddress.length -
                                                5,
                                              dao.dataDAOTokenAddress.length
                                            )}
                                        </h3>
                                        <svg
                                          width="16"
                                          height="18"
                                          viewBox="0 0 16 18"
                                          fill=""
                                          xmlns="http://www.w3.org/2000/svg"
                                          style={{
                                            margin: " 0 20px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            copyContent(dao.dataDAOTokenAddress)
                                          }
                                        >
                                          <path
                                            d="M10.7 0.666748H7.455C5.985 0.666748 4.82 0.666748 3.90917 0.790081C2.97083 0.916748 2.21167 1.18341 1.61333 1.78425C1.01417 2.38508 0.748333 3.14758 0.6225 4.08925C0.5 5.00425 0.5 6.17341 0.5 7.64925V12.5142C0.5 13.7709 1.26667 14.8476 2.35583 15.2992C2.3 14.5409 2.3 13.4784 2.3 12.5934V8.41841C2.3 7.35091 2.3 6.43008 2.39833 5.69341C2.50417 4.90341 2.7425 4.14675 3.35417 3.53258C3.96583 2.91841 4.72 2.67925 5.50667 2.57258C6.24 2.47425 7.15667 2.47425 8.22083 2.47425H10.7792C11.8425 2.47425 12.7575 2.47425 13.4917 2.57258C13.2717 2.01123 12.8877 1.52916 12.3897 1.18921C11.8917 0.849264 11.3029 0.6672 10.7 0.666748Z"
                                            fill="#F8F8F8"
                                          />
                                          <path
                                            d="M3.5 8.49763C3.5 6.22597 3.5 5.09013 4.20333 4.3843C4.90583 3.67847 6.03667 3.67847 8.3 3.67847H10.7C12.9625 3.67847 14.0942 3.67847 14.7975 4.3843C15.5 5.09013 15.5 6.22597 15.5 8.49763V12.5143C15.5 14.786 15.5 15.9218 14.7975 16.6276C14.0942 17.3335 12.9625 17.3335 10.7 17.3335H8.3C6.0375 17.3335 4.90583 17.3335 4.20333 16.6276C3.5 15.9218 3.5 14.786 3.5 12.5143V8.49763Z"
                                            fill="#F8F8F8"
                                          />
                                        </svg>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ textAlign: "center" }}>
                                      <button
                                        className="rounded-view-data-dao-button button-to-view-more"
                                        onClick={() => {
                                          // setIsSamhita(false);
                                          openDaoPage(
                                            false,
                                            dao.dataDaoAddress
                                          );
                                        }}
                                      >
                                        <span className="view-button-text">
                                          View More
                                        </span>
                                        <span className="view-circle d-flex justify-content-center align-items-center ">
                                          <i className="fas fa-arrow-right view-arrow"></i>
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </Grid>
                          </>
                        ))}
                    </div>
                  </TabPanel>
                  {loading ? (
                    <TabPanel value="2">
                      <div className="all-datadao-section2">
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={1}>
                            <Grid container item spacing={3}>
                              <React.Fragment>
                                {allDataDaos.length > 0
                                  ? allDataDaos.map((dao, i) => (
                                      <Grid item xs={4}>
                                        <div className="proposal-details">
                                          <table>
                                            <thead>
                                              <tr>
                                                <th colSpan={2}>
                                                  {dao.dataDaoName}
                                                </th>
                                              </tr>
                                            </thead>
                                            <tr>
                                              <td>
                                                <p className="proposal-header">
                                                  {dao.dataDaoDescription}
                                                </p>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <div className="datadao-address">
                                                  <h3 className="proposal-info">
                                                    Token Address :
                                                    {dao.dataDAOTokenAddress.substring(
                                                      0,
                                                      6
                                                    ) +
                                                      "..." +
                                                      dao.dataDAOTokenAddress.substring(
                                                        dao.dataDAOTokenAddress
                                                          .length - 5,
                                                        dao.dataDAOTokenAddress
                                                          .length
                                                      )}
                                                  </h3>
                                                  <svg
                                                    width="16"
                                                    height="18"
                                                    viewBox="0 0 16 18"
                                                    fill=""
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    style={{
                                                      margin: " 0 20px",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                      copyContent(
                                                        dao.dataDAOTokenAddress
                                                      )
                                                    }
                                                  >
                                                    <path
                                                      d="M10.7 0.666748H7.455C5.985 0.666748 4.82 0.666748 3.90917 0.790081C2.97083 0.916748 2.21167 1.18341 1.61333 1.78425C1.01417 2.38508 0.748333 3.14758 0.6225 4.08925C0.5 5.00425 0.5 6.17341 0.5 7.64925V12.5142C0.5 13.7709 1.26667 14.8476 2.35583 15.2992C2.3 14.5409 2.3 13.4784 2.3 12.5934V8.41841C2.3 7.35091 2.3 6.43008 2.39833 5.69341C2.50417 4.90341 2.7425 4.14675 3.35417 3.53258C3.96583 2.91841 4.72 2.67925 5.50667 2.57258C6.24 2.47425 7.15667 2.47425 8.22083 2.47425H10.7792C11.8425 2.47425 12.7575 2.47425 13.4917 2.57258C13.2717 2.01123 12.8877 1.52916 12.3897 1.18921C11.8917 0.849264 11.3029 0.6672 10.7 0.666748Z"
                                                      fill="#F8F8F8"
                                                    />
                                                    <path
                                                      d="M3.5 8.49763C3.5 6.22597 3.5 5.09013 4.20333 4.3843C4.90583 3.67847 6.03667 3.67847 8.3 3.67847H10.7C12.9625 3.67847 14.0942 3.67847 14.7975 4.3843C15.5 5.09013 15.5 6.22597 15.5 8.49763V12.5143C15.5 14.786 15.5 15.9218 14.7975 16.6276C14.0942 17.3335 12.9625 17.3335 10.7 17.3335H8.3C6.0375 17.3335 4.90583 17.3335 4.20333 16.6276C3.5 15.9218 3.5 14.786 3.5 12.5143V8.49763Z"
                                                      fill="#F8F8F8"
                                                    />
                                                  </svg>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{ textAlign: "center" }}
                                                onClick={() => {
                                                  openDaoPage(
                                                    false,
                                                    dao.dataDaoAddress
                                                  );
                                                }}
                                              >
                                                <button
                                                  className="rounded-view-data-dao-button button-to-view-more"
                                                  onClick={() => {
                                                    openDaoPage(
                                                      false,
                                                      dao.dataDaoAddress
                                                    );
                                                  }}
                                                >
                                                  <span className="view-button-text">
                                                    View More
                                                  </span>
                                                  <span className="view-circle d-flex justify-content-center align-items-center ">
                                                    <i className="fas fa-arrow-right view-arrow"></i>
                                                  </span>
                                                </button>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </Grid>
                                    ))
                                  : ""}
                              </React.Fragment>
                            </Grid>
                          </Grid>
                        </Box>
                      </div>
                    </TabPanel>
                  ) : (
                    ""
                  )}
                </TabContext>
              </Box>
              <p className="all-datadao-subtext"></p>
            </div>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </>
  );
}
export default YourDaos;
