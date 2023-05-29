import React, { useState, useEffect, useRef } from "react";
import "../styles/daodetails.scss";
import Button from "@mui/material/Button";
import dataDaoFactory from "../contracts/artifacts/dataDaoFactory.json";
import topCurvedLinesDAO from "../assets/yourDaos/top-curved-lines-your-dao.svg";

import { ContractFactory, ethers } from "ethers";
import { Box, Modal } from "@mui/material";
import uploadfile from "../assets/upload.png";
import languageFactoryAbi from "../contracts/artifacts/LanguageDAOFactory.json";
import languageTokenAbi from "../contracts/artifacts/LanguageDAOToken.json";
import languageDAOAbi from "../contracts/artifacts/LanguageDAO.json";
import samhitaABI from "../contracts/artifacts/Samhita.json";
import samhitaTokenABI from "../contracts/artifacts/SamhitaToken.json";
// import { sign } from "crypto";
// import { async } from "q";

const languageFactoryAddress = "0x49cB4F263F16e09A84e95Ad608CF5b7f86d00fB8";
const samhitaAddress = "0x16ebae0D7673b9e3De6D21C38237708a0Af610Ee";
const samhitaTokenAddress = "0x14575fe559ffce940a9fc71053Bfe1316490cE2A";

function DataDaoDetails({
  datadaos,
  setDatadaos,
  setSingleDataDao,
  setYourDaos,
  yourDaos,
  daoAddress,
  isSamhita,
}) {
  const inputRef = useRef();
  const inputRefEnd = useRef();
  const fileInputRef = useRef();
  const [showCreateProposal, setCreateProposal] = useState(false);
  const [btnloading, setbtnloading] = useState(false);
  const handleOpen2 = () => setCreateProposal(true);
  const handleClose2 = () => setCreateProposal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,

    boxShadow: 24,
    p: 4,
  };
  const { ethereum } = window;

  const [dataDaoInfo, setDataDaoInfo] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState([]);
  const [userAmount, setUserAmount] = useState();
  const [tokenAddress, setTokenAddress] = useState();
  const [loading, setLoading] = useState(false);

  const getDataDaos = async () => {
    console.log(daoAddress);
    console.log(isSamhita);
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        console.log("switch case for this case is: " + chainId);
        if (chainId === 199) {
          if (!isSamhita) {
            const contract = new ethers.Contract(
              languageFactoryAddress,
              languageFactoryAbi,
              provider
            );
            const dataDao = await contract.allDataDaos(daoAddress);
            setDataDaoInfo(dataDao);
            console.log(dataDao);
            setTokenAddress(dataDao.dataDAOTokenAddress);
            const tokenContract = new ethers.Contract(
              dataDao.dataDAOTokenAddress,
              languageTokenAbi,
              signer
            );
            const tokenName = await tokenContract.name();
            console.log(tokenName);
            setName(tokenName);
            console.log(tokenContract);

            const languageContract = new ethers.Contract(
              daoAddress,
              languageDAOAbi,
              signer
            );
            const datasets = await languageContract.getAllProposals();
            setTemplates(datasets);
            console.log(datasets);
          } else {
            setName("Samhita");
            const samhitaContract = new ethers.Contract(
              samhitaAddress,
              samhitaABI,
              signer
            );
            const temp = await samhitaContract.getAllTemplates();
            console.log(temp);
            setTemplates(temp);
          }
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    }
  };

  function hexToTimestamp(hex) {
    const unixTimestamp = parseInt(hex, 16);
    const date = new Date(unixTimestamp * 1000);
    const localDate = date.toLocaleString("en-US");
    return localDate;
  }

  const buyToken = async () => {
    try {
      setbtnloading(true);
      console.log("in");
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        if (chainId === 199) {
          if (isSamhita) {
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
            const tx = await contract.addMember(userAmount, {
              value: String(userAmount * price),
            });
            tx.wait();
          } else {
            const contract = new ethers.Contract(
              daoAddress,
              languageDAOAbi,
              signer
            );
            console.log(userAmount);
            console.log(tokenAddress);
            const tokenContract = new ethers.Contract(
              tokenAddress,
              languageTokenAbi,
              signer
            );
            const price = await tokenContract.getTokenPrice();
            console.log(price);
            const tx = await contract.addMember(userAmount, {
              value: String(userAmount * price),
            });
            await tx.wait();
          }
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
      setbtnloading(false);
    } catch (error) {
      console.log(error);
      alert(error["message"]);
      setbtnloading(false);
    }
  };

  useEffect(() => {
    getDataDaos();
  }, []);

  return (
    <>
      {/* <div className="main-your-dao"> */}

      <div className="maindaoBg"></div>
      <div className="your-dao-bg-images">
        <img
          src={topCurvedLinesDAO}
          className="topCurvedLinesDao"
          alt="Top Curve"
        />
        {/* <img src={mainYourDAOBg} className="mainYourDaoBg" /> */}
      </div>
      <div className="datadao-details-main-div">
        <div className="datadao-details-div">
          <div className="datadao-details-section1">
            <div className="button-flex">
              <h1 className="datadao-existing-details-title">
                {dataDaoInfo.dataDaoName}
              </h1>
              <button
                className="datadao-details-morebtn-close"
                onClick={() => {
                  setDatadaos(true);
                  setSingleDataDao(false);
                }}
              >
                Go Back
              </button>
            </div>
            <p className="datadao-details-desc width-peragraph">
              {dataDaoInfo.dataDaoDescription}
            </p>
            <div className="dao-details-flext">
              <table className="dao-details-table table-borderless ">
                <thead className="text-center">
                  <tr style={{ borderRadius: "1.5rem 0 0 0 " }}>
                    <th
                      style={{
                        borderRadius: "1.5rem 0 0 0 ",
                        fontWeight: "500",
                      }}
                    >
                      Token Name
                    </th>
                    <th
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      Token address
                    </th>
                    <th
                      style={{
                        borderRadius: "0 1.5rem 0 0",
                        fontWeight: "500",
                      }}
                    >
                      Number of Tokens
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ borderRadius: "0 0 0 1.5rem " }}>{name}</td>
                    <td>
                      {isSamhita
                        ? samhitaTokenAddress
                        : dataDaoInfo.dataDAOTokenAddress}
                    </td>
                    <td style={{ borderRadius: "0 0 1.5rem 0" }}>
                      <input
                        type="Number"
                        onChange={(e) => {
                          setUserAmount(e.target.value);
                        }}
                        className="enter-value "
                        placeholder="Enter the Value"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="datadao-details-button ">
              <button
                className="datadao-details-buyrequestbtn text-center"
                onClick={() => buyToken()}
              >
                {btnloading ? (
                  <svg
                    className="animate-spin button-spin-svg-pic"
                    version="1.1"
                    id="L9"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 100 100"
                  >
                    <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                  </svg>
                ) : (
                  <>Buy Token</>
                )}
              </button>
            </div>
          </div>

          <div className="datadao-details-section2">
            <h1 className="datadao-details-dataset">
              {isSamhita ? "Available Templates" : "Available Dataset"}
            </h1>
            {templates.map((item) => {
              return (
                <div className="dataset-main-flex">
                  <div className="dataDaoTablesBg">
                    <table className="dataset-daodetails-main-table">
                      <thead>
                        <tr>
                          <div className="daodetails-main-proposal-name">
                            <th colSpan={2}>Name: {item.proposalName}</th>
                          </div>
                        </tr>
                      </thead>
                      <div className="">
                        <tr>
                          <td>
                            <p className=" width-peragraph">
                              {item.proposalDescription}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <h4
                              className=" width-peragraph"
                              style={{ fontWeight: "700" }}
                            >
                              Template structure :{" "}
                              <a
                                href={
                                  isSamhita
                                    ? item.proposalFile
                                    : item.proposalIamge
                                }
                                target="_blank"
                              >
                                {isSamhita
                                  ? item.proposalFile
                                  : item.proposalIamge}{" "}
                              </a>
                              <br></br>
                              {/* <img src={item.proposalFile} /> */}
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h4
                              className="width-peragraph"
                              style={{ fontWeight: "700" }}
                            >
                              Created At:
                              {/* {new Date(item.proposedAt).getHours()} */}
                              {hexToTimestamp(item.proposedAt._hex)}
                            </h4>
                          </td>
                        </tr>
                        {/* <tr>
                          <td>
                            <button className="datadao-details-buyrequestbtn my-3">
                              Request Dataset
                            </button>
                          </td>
                        </tr> */}
                      </div>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Modal
          open={showCreateProposal}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="create-proposal-parent-div">
            <div className="create-proposal-main-div">
              <div>
                <h1 className="create-proposal-title">New Proposal</h1>
                <p className="create-proposal-desc">
                  Enter the details of a new proposal and submit them.
                </p>

                <div className="create-proposal-div">
                  <label className="create-proposal-label">Title</label>
                  <div className="textfields-width">
                    <input type="text" />{" "}
                  </div>
                  <label className="create-proposal-label">Description</label>
                  <div className="textfields-width">
                    <textarea rows="70" type="text" className="desc-height" />
                  </div>{" "}
                  <label className="create-proposal-label">Upload File</label>
                  <div
                    className="proposal-margin-div"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {/* <div>
                      <label className="create-proposal-label">
                        Upload File/Folder
                      </label>
                    </div> */}
                    <img src={uploadfile} alt="upload" />
                    <input type="file" hidden ref={fileInputRef} />
                  </div>
                  <label className="create-proposal-label">Proposal Date</label>
                  <div className="start-end-div">
                    <input
                      type="text"
                      className="proposal-date"
                      placeholder="Start-Date"
                      ref={inputRef}
                      onChange={(e) => console.log(e.target.value)}
                      onFocus={() => (inputRef.current.type = "date")}
                      onBlur={() => (inputRef.current.type = "text")}
                    />
                    <input
                      type="text"
                      className="proposal-date  proposal-date1"
                      placeholder="End-Date"
                      ref={inputRefEnd}
                      onChange={(e) => console.log(e.target.value)}
                      onFocus={() => (inputRefEnd.current.type = "date")}
                      onBlur={() => (inputRefEnd.current.type = "text")}
                    />
                  </div>
                  <div className="uploadfile textfields-width">
                    <button className="create-proposal-btn-popup">
                      Create Proposal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      {/* </div> */}
    </>
  );
}
export default DataDaoDetails;
