import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../styles/SelectTemplate.scss";
import { Button, CardActions } from "@mui/material";
import img from "../assets/section3.jpg";
// import TemplateDetails from "./TemplateDetails";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.scss";
import YourDaos from "../components/YourDaos";
import AvailabelProposal from "../components/AvailabelProposal";
// import AllDataDaos from "../components/AllDataDaos";
import Template from "../components/Template";
import DataDaoDetails from "../components/DataDaoDetails";
import YourDataDaoDetails from "../components/YourDataDaoDetails";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
import { Box, Modal } from "@mui/material";
import uploadfile from "../assets/upload.png";
import dataDaoFactory from "../contracts/artifacts/dataDaoFactory.json";
import dataDaoInstace from "../contracts/artifacts/dataDaoInstace.json";

const dataDaoFactoryContract = "0x0caC8C986452628Ed38483bcEE0D1cF85816946D";

function Dashboard() {
  const [dashboard, setDashboard] = useState(true);
  const [proposals, setProposals] = useState(false);
  const [yourDaos, setYourDaos] = useState(false);
  const [datadaos, setDatadaos] = useState(false);
  const [daoAddress, setDaoAddress] = useState();

  const [singleDataDao, setSingleDataDao] = useState(false);
  const [singleYourDataDao, setSingleYourDataDao] = useState(false);

  const dashboardLinks = (a) => {
    if (a === "Dashboard") {
      setDashboard(true);
      setProposals(false);
      setYourDaos(false);
      setDatadaos(false);
    }
    if (a === "Proposals") {
      setDashboard(false);
      setProposals(true);
      setYourDaos(false);
      setDatadaos(false);
    } else if (a === "YourDaos") {
      setDashboard(false);
      setProposals(false);
      setYourDaos(true);
      setDatadaos(false);
    } else if (a === "DataDAOs") {
      setDashboard(false);
      setProposals(false);
      setYourDaos(false);
      setDatadaos(true);
    }
  };

  const [data, setData] = useState([
    {
      cover: image1,
      title: "Proposals",
      link: "Proposals",
      info: "Check all the Active Proposals and contribute to your Data Dao ! ",
    },
    {
      cover: image2,
      title: "YourDaos",
      link: "YourDaos",
      info: "Check all the data daos that you have created and contribute in it to build your community !",
    },
    {
      cover: image3,
      title: "DataDAOs",
      link: "DataDAOs",
      info: "Check all the data daos available in the platform and be part of one you like the most !",
    },
  ]);

  {
    const inputRef = useRef();
    const inputRefEnd = useRef();
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const [showCreateProposal, setCreateProposal] = useState(false);
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

    const [dataDaoInfo, setDataDaoInfo] = useState([]);
    const [proposalInfo, setProposalInfo] = useState({
      Name: null,
      Description: null,
      startDate: null,
      endDate: null,
    });
    const [fileInfo, setFileInfo] = useState(null);
    const { ethereum } = window;

    console.log(dataDaoInfo);

    const getContract = async () => {
      try {
        console.log("in");
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          if (!provider) {
            console.log("Metamask is not installed, please install!");
          }
          const { chainId } = await provider.getNetwork();
          console.log("switch case for this case is: " + chainId);
          if (chainId === 3141) {
            const contract = new ethers.Contract(
              dataDaoFactoryContract,
              dataDaoFactory.abi,
              signer
            );
            console.log(contract);
            return contract;
          } else {
            alert("Please connect to the Mumbai Testnet Network!");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getDataDaos = async () => {
      const contract = await getContract();
      const dataDao = await contract.allDataDaos(daoAddress);
      setDataDaoInfo(dataDao);
      console.log(dataDao);
    };

    /// lighthouse encrypted upload *************************************************************

    const encryptionSignature = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const messageRequested = (await lighthouse.getAuthMessage(address)).data
        .message;
      const signedMessage = await signer.signMessage(messageRequested);
      return {
        signedMessage: signedMessage,
        publicKey: address,
      };
    };
    const progressCallback = (progressData) => {
      let percentageDone =
        100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
      console.log(percentageDone);
    };

    const encryptionSignature_ = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const messageRequested = (await lighthouse.getAuthMessage(address)).data
        .message;
      const signedMessage = await signer.signMessage(messageRequested);
      return {
        signedMessage: signedMessage,
        publicKey: address,
      };
    };

    /* Deploy file along with encryption */
    const deployEncrypted = async (e) => {
      /*
           uploadEncrypted(e, publicKey, accessToken, uploadProgressCallback)
           - e: js event
           - publicKey: wallets public key
           - accessToken: your api key
           - signedMessage: message signed by the owner of publicKey
           - uploadProgressCallback: function to get progress (optional)
        */
      const sig = await encryptionSignature();
      const response = await lighthouse.uploadEncrypted(
        e,
        sig.publicKey,
        "710d524c-69dd-4666-93dc-54d7107d1172",
        sig.signedMessage,
        progressCallback
      );

      setFileInfo(response);
      console.log(response);
      /*
          output:
            {
              Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
              Size: "318557",
              Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
            }
          Note: Hash in response is CID.
        */

      // Conditions to add
      const conditions = [
        {
          id: 1,
          chain: "Hyperspace",
          method: "balanceOf",
          standardContractType: "ERC20",
          contractAddress: dataDaoInfo.dataDAOTokenAddress,
          returnValueTest: { comparator: ">=", value: "1" },
          parameters: [sig.publicKey],
        },
      ];

      // Aggregator is what kind of operation to apply to access conditions
      // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
      const aggregator = "([1])";
      const { publicKey, signedMessage } = await encryptionSignature_();

      /*
        accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
          Parameters:
            publicKey: owners public key
            CID: CID of file to decrypt
            signedMessage: message signed by owner of publicKey
            conditions: should be in format like above
            aggregator: aggregator to apply on conditions
      */
      const response_ = await lighthouse.accessCondition(
        publicKey,
        response.data.Hash,
        signedMessage,
        conditions,
        aggregator
      );

      console.log(response_);
    };

    const createProposal = async () => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        daoAddress,
        dataDaoInstace.abi,
        signer
      );
      const date1 = new Date(proposalInfo.startDate);
      const date2 = new Date(proposalInfo.endDate);
      const diffTime = Math.abs(date2 - date1);
      console.log(diffTime);

      // console.log(String2Hex(fileInfo.data.Hash));
      contract.createDataSetDealProposal(
        fileInfo.data.Hash,
        fileInfo.data.Size,
        diffTime / 1000,
        0,
        proposalInfo.Name,
        proposalInfo.Description,
        {
          gasLimit: 10000000,
        }
      );
    };

    useEffect(() => {
      getDataDaos();
      return setDataDaoInfo([]);
    }, []);

    return (
      <div className="dashboard-main">
        <div className="left-db">
          <ul>
            <li
              className={dashboard ? "active" : ""}
              onClick={() => {
                dashboardLinks("Dashboard");
              }}
            >
              <svg
                className="dash-svg"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <g>
                  <rect fill="none" height="24" width="24" />
                </g>
                <g>
                  <g>
                    <path d="M5,11h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v4C3,10.1,3.9,11,5,11z" />
                    <path d="M5,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2H5c-1.1,0-2,0.9-2,2v4C3,20.1,3.9,21,5,21z" />
                    <path d="M13,5v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-4C13.9,3,13,3.9,13,5z" />
                    <path d="M15,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v4C13,20.1,13.9,21,15,21z" />
                  </g>
                </g>
              </svg>
              Dashboard
            </li>
            <li
              className={proposals ? "active" : ""}
              onClick={() => {
                dashboardLinks("Proposals");
              }}
            >
              <svg
                className="dash-svg"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <g>
                  <rect fill="none" height="24" width="24" />
                </g>
                <g>
                  <g>
                    <path d="M5,11h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v4C3,10.1,3.9,11,5,11z" />
                    <path d="M5,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2H5c-1.1,0-2,0.9-2,2v4C3,20.1,3.9,21,5,21z" />
                    <path d="M13,5v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-4C13.9,3,13,3.9,13,5z" />
                    <path d="M15,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v4C13,20.1,13.9,21,15,21z" />
                  </g>
                </g>
              </svg>
              Proposals
            </li>
            <li
              className={yourDaos ? "active" : ""}
              onClick={() => {
                dashboardLinks("YourDaos");
              }}
            >
              <svg
                className="dash-svg"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <rect fill="none" height="24" width="24" y="0" />
                <path d="M12.97,2.54c-0.6-0.34-1.34-0.34-1.94,0l-7,3.89L9.1,9.24C9.83,8.48,10.86,8,12,8s2.17,0.48,2.9,1.24l5.07-2.82L12.97,2.54z M10,12c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S10,13.1,10,12z M3,8.14l5.13,2.85C8.04,11.31,8,11.65,8,12c0,1.86,1.27,3.43,3,3.87 v5.57l-6.97-3.87C3.39,17.22,3,16.55,3,15.82V8.14z M13,21.44v-5.57c1.73-0.44,3-2.01,3-3.87c0-0.35-0.04-0.69-0.13-1.01L21,8.14 l0,7.68c0,0.73-0.39,1.4-1.03,1.75L13,21.44z" />
              </svg>
              Dao Details
            </li>
            <li
              className={datadaos ? "active" : ""}
              onClick={() => {
                dashboardLinks("DataDAOs");
              }}
            >
              <svg
                className="dash-svg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 13H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM19 3H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
              Template
            </li>
          </ul>
        </div>
        <div className="right-db">
          {dashboard ? (
            <>
              <div className="select-main" id="right-db-inside">
                <h1>Manage Your DataDAO</h1>
                <p>Click on any datadao to open dashboard for that dao.</p>
                <div className="templates-div">
                  {data.map((item, key) => {
                    return (
                      <Card
                        sx={{
                          width: "100%",
                          maxWidth: 400,
                        }}
                        key={key}
                        className="card"
                      >
                        <CardActionArea
                          onClick={() => {
                            dashboardLinks(`${item.link}`);
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="180"
                            image={item.cover}
                            alt="green iguana"
                          />
                          <CardContent sx={{}}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              className="template-info"
                            >
                              {item.info}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </>
          ) : yourDaos ? (
            <div className="datadao-details-main-div">
              <div className="datadao-details-div">
                <div className="datadao-details-section1">
                  <div className="button-flex">
                    <h1 className="datadao-details-title padding-div">
                      {dataDaoInfo.dataDaoName}
                    </h1>
                  </div>
                  <p className="datadao-details-desc padding-div width-peragraph">
                    {dataDaoInfo.dataDaoDescription}
                  </p>
                  <div className="dao-details-flext">
                    <table className="dao-details-table">
                      <thead>
                        <tr>
                          <th>Token Name</th>
                          <th>No of Tokens</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>DMS</td>
                          <td>100000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="datadao-details-button">
                    <button
                      className="create-proposal-btn"
                      onClick={handleOpen2}
                    >
                      Create Proposal
                    </button>
                    <button
                      className="create-proposal-btn"
                      onClick={() => navigate("/open-existing-data-dao/meet")}
                    >
                      Start Meet
                    </button>
                  </div>
                </div>

                <div className="datadao-details-section2">
                  <h1 className="datadao-details-dataset">Available Dataset</h1>
                  <div className="dataset-main-flex">
                    <table className="dataset-main-table">
                      <thead>
                        <tr>
                          <div className="daodetails-proposal-name">
                            <th colSpan={2}>MusicCaps</th>
                          </div>
                        </tr>
                      </thead>
                      <div className="padding-div">
                        <tr>
                          <td>
                            <p className=" width-peragraph">
                              "This dataset contains 5.5k high-quality music
                              captions written by musicians."
                            </p>
                          </td>
                          <td className="datadao-width-btn">
                            {" "}
                            <div className=" ">
                              <button className="datadao-details-extra-btn">
                                Update
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <h4 className=" width-peragraph">uploaded file</h4>
                          </td>
                          <td>
                            <div className=" datadao-details-btn-padding">
                              <button className="datadao-details-extra-btn">
                                Put on Sell
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h4 className="width-peragraph">23/10/2022</h4>
                          </td>
                          <td></td>
                        </tr>
                      </div>
                    </table>
                  </div>
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
                          <input
                            type="text"
                            onChange={(e) =>
                              setProposalInfo({
                                ...proposalInfo,
                                Name: e.target.value,
                              })
                            }
                          />{" "}
                        </div>
                        <label className="create-proposal-label">
                          Description
                        </label>
                        <div className="textfields-width">
                          <textarea
                            rows="70"
                            type="text"
                            className="desc-height"
                            onChange={(e) =>
                              setProposalInfo({
                                ...proposalInfo,
                                Description: e.target.value,
                              })
                            }
                          />
                        </div>{" "}
                        <label className="create-proposal-label">
                          Upload File
                        </label>
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
                          <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onChange={(e) => deployEncrypted(e)}
                          />
                        </div>
                        <label className="create-proposal-label">
                          Proposal Date
                        </label>
                        <div className="start-end-div">
                          <input
                            type="text"
                            className="proposal-date"
                            placeholder="Start-Date"
                            ref={inputRef}
                            onChange={(e) =>
                              setProposalInfo({
                                ...proposalInfo,
                                startDate: e.target.value,
                              })
                            }
                            onFocus={() => (inputRef.current.type = "date")}
                            onBlur={() => (inputRef.current.type = "text")}
                          />
                          <input
                            type="text"
                            className="proposal-date  proposal-date1"
                            placeholder="End-Date"
                            ref={inputRefEnd}
                            onChange={(e) =>
                              setProposalInfo({
                                ...proposalInfo,
                                endDate: e.target.value,
                              })
                            }
                            onFocus={() => (inputRefEnd.current.type = "date")}
                            onBlur={() => (inputRefEnd.current.type = "text")}
                          />
                        </div>
                        <div className="uploadfile textfields-width">
                          <button
                            className="create-proposal-btn-popup"
                            onClick={() => createProposal()}
                          >
                            Create Proposal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
          ) : proposals ? (
            <AvailabelProposal />
          ) : datadaos ? (
            <Template />
          ) : singleDataDao ? (
            <DataDaoDetails
              datadaos={datadaos}
              setDatadaos={setDatadaos}
              setSingleDataDao={setSingleDataDao}
              setYourDaos={setYourDaos}
              yourDaos={yourDaos}
              daoAddress={daoAddress}
            />
          ) : singleYourDataDao ? (
            <YourDataDaoDetails
              datadaos={datadaos}
              setDatadaos={setDatadaos}
              setSingleYourDataDao={setSingleYourDataDao}
              setYourDaos={setYourDaos}
              yourDaos={yourDaos}
              daoAddress={daoAddress}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Dashboard;
