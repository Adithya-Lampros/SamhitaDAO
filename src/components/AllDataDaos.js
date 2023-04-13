import React, { useEffect, useState } from "react";
import "../styles/alldatadaos.css";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ContractFactory, ethers } from "ethers";
import dataDaoFactory from "../contracts/artifacts/dataDaoFactory.json";
// import mainYourDAOBg from "../assets/yourDaos/main-your-dao-Bg.svg";
import topCurvedLinesDAO from "../assets/yourDaos/top-curved-lines-your-dao.svg";
import samhitaABI from "../contracts/artifacts/Samhita.json";
import samhitaTokenABI from "../contracts/artifacts/SamhitaToken.json";
const dataDaoFactoryContract = "0x0caC8C986452628Ed38483bcEE0D1cF85816946D";

const samhitaAddress = "0x246A9A278D74c69DE816905a3f6Fc9a3dFDB029d";
const samhitaTokenAddress = "0x3D79C81fa0EdE22A05Cd5D5AF089BCf214F39AcB";

function AllDataDaos({ setSingleDataDao, setDatadaos, setDaoAddress }) {
  const [allDataDaos, setDataDaos] = useState([]);
  const [hasJoinSamhita, setHasJoinSamhita] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // const [inputValue, setInputValue] = useState("");
  const [value1, setValue1] = useState({ fund: null });

  // const handleInputChange = (event) =>  {
  //   setInputValue(event.target.value);
  // };

  const handlePopupSubmit = (event) => {
    event.preventDefault();
    // joinSamhita(inputValue)
    // console.log(inputValue);

    setShowPopup(false);
  };

  const getContract = async () => {
    try {
      const { ethereum } = window;
      console.log("in");
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        console.log("switch case for this case is: " + chainId);
        if (chainId === 1029) {
          const contract = new ethers.Contract(
            dataDaoFactoryContract,
            dataDaoFactory.abi,
            provider
          );
          console.log(contract);
          return contract;
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDataDaos = async () => {
    const contract = await getContract();
    const dataDaos = await contract.getAllDataDaos();
    console.log(dataDaos);
    setDataDaos(dataDaos);
  };

  const joinSamhita = async () => {
    console.log("Join Samhita");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        console.log("switch case for this case is: " + chainId);
        if (chainId === 1029) {
          const contract = new ethers.Contract(
            samhitaAddress,
            samhitaABI,
            signer
          );
          const tokenContract = new ethers.Contract(
            samhitaTokenAddress,
            samhitaTokenABI,
            signer
          );
          const price = await tokenContract.getTokenPrice();
          console.log(price);
          console.log(parseInt(price, 16));
          const tx = await contract.addMember(value1.fund, {
            value: value1.fund * price,
          });
          tx.wait();
          console.log(tx);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSamhitaIsJoined = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        console.log("switch case for this case is: " + chainId);
        if (chainId === 1029) {
          const contract = new ethers.Contract(
            samhitaAddress,
            samhitaABI,
            signer
          );
          const user = await signer.getAddress();
          const hasJoined = await contract.isMemberAdded(user);
          console.log(hasJoined);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDataDaos();
  }, []);

  return (
    <>
      <div className="main-your-dao">
        <div className="maindaoBg"></div>
        <div className="your-dao-bg-images">
          <img src={topCurvedLinesDAO} className="topCurvedLinesDao" />
          {/* <img src={mainYourDAOBg} className="mainYourDaoBg" /> */}
        </div>
        <div className="all-datadao-main-div">
          <div className="all-datadao-div">
            <div className="all-datadao-section1">
              <h1 className="all-datadao-title">Language DAOs</h1>
              <p className="all-datadao-subtext">
                All the Language DAOs on the platform
              </p>
            </div>

            <div className="all-datadao-section2">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                  <Grid container item spacing={3}>
                    <React.Fragment>
                      <Grid item xs={4}>
                        <div className="proposal-details">
                          <table>
                            <thead>
                              <tr>
                                <th colSpan={2}>Samhita DAO</th>
                              </tr>
                            </thead>
                            <tr>
                              <td>
                                {" "}
                                <span>Data DAO Description </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="datadao-address">
                                  <p className=" my-auto">
                                    {/* {dao.dataDaoAddress.substring(0, 6) +
                                          "..." +
                                          dao.dataDaoAddress.substring(
                                            dao.dataDaoAddress.length - 5,
                                            dao.dataDaoAddress.length
                                          )} */}
                                    0x246A9A278D74c69DE816905a3f6Fc9a3dFDB029d
                                  </p>
                                  <svg
                                    width="16"
                                    height="18"
                                    viewBox="0 0 16 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ margin: " 0 20px" }}
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
                              <td className="last-proposal">
                                {/* <button
                                    className="view-more-all-dao"
                                    onClick={() => {
                                      setSingleDataDao(true);
                                      setDatadaos(false);
                                      setDaoAddress(dao.dataDaoAddress);
                                    }}
                                  >
                                    View More
                                  </button> */}
                                <div className="d-flex justify-content-around mb-2">
                                  <button
                                    className="rounded-view-data-dao-button button-to-view-more"
                                    onClick={() => {
                                      setSingleDataDao(true);
                                      setDatadaos(false);
                                      // setDaoAddress(dao.dataDaoAddress);
                                    }}
                                  >
                                    <span className="view-button-text">
                                      View More{" "}
                                    </span>
                                    <span className="view-circle d-flex justify-content-center align-items-center ">
                                      <i className="fas fa-arrow-right view-arrow"></i>
                                    </span>
                                  </button>

                                  <button
                                    className="rounded-join-data-dao-button button-to-join"
                                    onClick={() => setShowPopup(false)}
                                  >
                                    <span className="join-button-text">
                                      Join{" "}
                                    </span>
                                    <span className="join-circle d-flex justify-content-center align-items-center ">
                                      <i className="fas fa-arrow-right join-arrow"></i>
                                    </span>
                                  </button>

                                  {setShowPopup && (
                                    <>
                                      <div className="popup-overlay" />
                                      <div  className="pop-up">
                                        <div className="pop-up-header-name">Enter the Value</div>
                                        
                                        <div className="pop-up-input-field"><input type="text" placeholder="Enter the Value"/></div>
                                        <button className="btn btn-danger">Submit</button>
                                      </div>
                                      
                                    </>
                                  )}

                                  {/* {showPopup && (
                                    <div>
                                    <div className="popup-overlay" />
                                    <div className="popup">
                                    <div>Enter a value:</div>
                                    <input type="text" onChange={(e) => {setValue1({
                                      ...value1,fund:e.target.value,
                                    });
                                    }}  />
                                    <button onClick={handlePopupSubmit}>Submit</button>
                                    <button onClick={()=>setShowPopup(false)}>Cancel</button>
                                    </div>

                                    </div>
                                
                                      )} */}

                                  <button onClick={() => getSamhitaIsJoined()}>
                                    click
                                  </button>
                                </div>
                                {/* <button className="view-more-all-dao">
                                    Join
                                  </button> */}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </Grid>
                      {allDataDaos.length > 0 ? (
                        allDataDaos.map((dao, i) => (
                          <Grid item xs={4}>
                            {" "}
                            <div className="proposal-details">
                              <table>
                                <thead>
                                  <tr>
                                    <th colSpan={2}>{dao.dataDaoName}</th>
                                  </tr>
                                </thead>
                                <tr>
                                  <td>
                                    {" "}
                                    <span>{dao.dataDaoDescription} </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="datadao-address">
                                      <p className=" my-auto">
                                        {dao.dataDaoAddress.substring(0, 6) +
                                          "..." +
                                          dao.dataDaoAddress.substring(
                                            dao.dataDaoAddress.length - 5,
                                            dao.dataDaoAddress.length
                                          )}
                                      </p>
                                      <svg
                                        width="16"
                                        height="18"
                                        viewBox="0 0 16 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ margin: " 0 20px" }}
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
                                  <td className="last-proposal">
                                    {/* <button
                                    className="view-more-all-dao"
                                    onClick={() => {
                                      setSingleDataDao(true);
                                      setDatadaos(false);
                                      setDaoAddress(dao.dataDaoAddress);
                                    }}
                                  >
                                    View More
                                  </button> */}
                                    <div className="d-flex justify-content-around mb-2">
                                      <button
                                        className="rounded-view-data-dao-button button-to-view-more"
                                        onClick={() => {
                                          setSingleDataDao(true);
                                          setDatadaos(false);
                                          setDaoAddress(dao.dataDaoAddress);
                                        }}
                                      >
                                        <span className="view-button-text">
                                          View More{" "}
                                        </span>
                                        <span className="view-circle d-flex justify-content-center align-items-center ">
                                          <i className="fas fa-arrow-right view-arrow"></i>
                                        </span>
                                      </button>

                                      <button
                                        className="rounded-join-data-dao-button button-to-join"
                                        // onClick={()=>setShowPopup(true)}
                                      >
                                        <span className="join-button-text">
                                          Join{" "}
                                        </span>
                                        <span className="join-circle d-flex justify-content-center align-items-center ">
                                          <i className="fas fa-arrow-right join-arrow"></i>
                                        </span>
                                      </button>

                                      {/* ----------- Pop Up --------------- */}

                                      {showPopup && (
                                        <div
                                          className="modal"
                                          tabIndex="-1"
                                          role="dialog"
                                        >
                                          <div
                                            className="modal-dialog"
                                            role="document"
                                          >
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h5 className="modal-title">
                                                  Enter a value
                                                </h5>
                                                <button
                                                  type="button"
                                                  className="close"
                                                  data-dismiss="modal"
                                                  aria-label="Close"
                                                  onClick={() =>
                                                    setShowPopup(false)
                                                  }
                                                >
                                                  <span aria-hidden="true">
                                                    &times;
                                                  </span>
                                                </button>
                                              </div>
                                              <div className="modal-body">
                                                <form
                                                  onSubmit={handlePopupSubmit}
                                                >
                                                  <div className="form-group">
                                                    <label htmlFor="inputValue">
                                                      Value
                                                    </label>
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      id="inputValue"
                                                      // value={inputValue}
                                                      // onChange={
                                                      //   handleInputChange
                                                      // }
                                                    />
                                                  </div>
                                                  <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                  >
                                                    Submit
                                                  </button>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    {/* <button className="view-more-all-dao">
                                    Join
                                  </button> */}
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </Grid>
                        ))
                      ) : (
                        <h3 className="artist-streams">
                          No Data Daos available
                        </h3>
                      )}
                    </React.Fragment>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllDataDaos;
