import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContractFactory, ethers } from "ethers";
import MembershipToken from "../../contracts/artifacts/DataDaoToken.json";
import dataDaoInstace from "../../contracts/artifacts/dataDaoInstace.json";
import dataDaoFactory from "../../contracts/artifacts/dataDaoFactory.json";
import languageFactoryAbi from "../../contracts/artifacts/LanguageDAOFactory.json";
import languageTokenAbi from "../../contracts/artifacts/LanguageDAOToken.json";
import languageTokenBytecode from "../../contracts/artifacts/LanguageDAOTokenBytecode.json";
import languageDAOAbi from "../../contracts/artifacts/LanguageDAO.json";
import languageDAOBytecode from "../../contracts/artifacts/LanguageDAOBytecode.json";
import { useAccount } from "wagmi";
import { ConstructionOutlined } from "@mui/icons-material";

const languageFactoryAddress = "0x49cB4F263F16e09A84e95Ad608CF5b7f86d00fB8";
const samhitaAddress = "0x16ebae0D7673b9e3De6D21C38237708a0Af610Ee";
const templateNFTAddress = "0xe1C507d7b47b0D5446991a97CC98a124156F83Ca";

function ReviewInfo({
  handleNext,
  handleBack,
  dataDaoDetails,
  setDataDaoDetails,
}) {
  const { address } = useAccount();
  const [btnloading, setbtnloading] = useState(false);
  const navigate = useNavigate();

  const getContract = async () => {
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
        if (chainId === 199) {
          const contract = new ethers.Contract(
            languageFactoryAddress,
            languageFactoryAbi,
            signer
          );
          return contract;
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error["message"]);
    }
  };

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // ///to Deploy a smart contract
  // const deployContract = async (contractAbi, contractByteCode, deployArgs) => {
  //   const factory = new ContractFactory(contractAbi, contractByteCode);
  //   const contract = await factory.deploy(deployArgs);
  //   console.log(contract.address);
  //   return contract.address;
  // };

  // const deployToken = async (deployArgs) => {
  //   const address = deployContract(
  //     MembershipToken.abi,
  //     MembershipToken.data.bytecode,
  //     deployArgs
  //   );
  //   return address;
  // };

  // const deployDataDao = async (deployArgs) => {
  //   const address = deployContract(
  //     dataDaoInstace.abi,
  //     dataDaoInstace.data.bytecode,
  //     deployArgs
  //   );
  //   return address;
  // };

  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const luanchDataDao = async () => {
    const votingPeriodEpoch =
      Math.floor(dataDaoDetails.vote_period_day) * 86400 +
      Math.floor(dataDaoDetails.vote_period_hour) * 3600 +
      Math.floor(dataDaoDetails.vote_period_minutes) * 60;
    try {
      setbtnloading(true);
      const contract = await getContract();
      console.log(contract);
      const tokenFactory = new ContractFactory(
        languageTokenAbi,
        languageTokenBytecode.bytecode,
        signer
      );
      console.log("languagetoken");
      // console.log(ethers.utils.parseEther(
      //   String(dataDaoDetails.token_holders[0].tokenHolderBalance)
      // ))
      const tokenContract = await tokenFactory.deploy(
        dataDaoDetails.token_name,
        dataDaoDetails.token_symbol,
        ethers.utils.parseEther(
          String(dataDaoDetails.token_holders[0].tokenHolderBalance)
        )
      );
      const tokenAddress = tokenContract.address;
      console.log(tokenAddress);
      console.log("languagetoken deployed");

      const languageFactory = new ContractFactory(
        languageDAOAbi,
        languageDAOBytecode.bytecode,
        signer
      );
      console.log("languagefactory");
      const languageContract = await languageFactory.deploy(
        samhitaAddress,
        templateNFTAddress,
        tokenAddress
      );
      const languageDaoAddress = languageContract.address;
      console.log(languageDaoAddress);
      console.log("language factory deployed");

      console.log("transferring");

      const con = new ethers.Contract(tokenAddress, languageTokenAbi, signer);
      const tx1 = await con.transfer(
        languageDaoAddress,
        ethers.utils.parseEther(
          String(dataDaoDetails.token_holders[0].tokenHolderBalance / 2)
        )
      );
      await tx1.wait();
      console.log("transferred");

      console.log("config");
      const lanContract = new ethers.Contract(
        languageDaoAddress,
        languageDAOAbi,
        signer
      );
      const tx3 = await lanContract.setDataDaoVotingConfig(
        dataDaoDetails.vote_condition,
        dataDaoDetails.vote_minapproval,
        votingPeriodEpoch,
        ethers.utils.parseEther(String(dataDaoDetails.vote_stake)),
        ethers.utils.parseEther(String(dataDaoDetails.proposal_stake))
      );
      await tx3.wait();

      console.log("creating");
      const tx = await contract.createDataDao(
        languageDaoAddress,
        dataDaoDetails.name,
        dataDaoDetails.description,
        tokenAddress,
        0,
        0
        // ethers.utils.parseEther(
        //   String(dataDaoDetails.token_holders[0].tokenHolderBalance)
        // )
      );
      await tx.wait(); //dataDaoAddress,name, description, token, tokenPrice, totalSupply
      console.log(tx);
      setbtnloading(false);
      navigate("/your-daos");
    } catch (error) {
      console.log(error);
      alert(error["message"]);
      setbtnloading(false);
    }
  };

  console.log(dataDaoDetails);

  return (
    <div className="create-dao-info-main">
      <h1>Review Information</h1>
      <div className="review-main">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ borderRadius: "10px", background: "#fefcfc" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              backgroundColor: "#1976d2",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              LanguageDAO Information
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              I am an accordion
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "30px", color: "#ff5f00" }}>
            <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
              NAME
            </Typography>
            <Typography sx={{ textAlign: "left", margin: "10px 0px" }}>
              {dataDaoDetails.name}
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
                color: "#ff5f00",
              }}
            >
              DESCRIPTION
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                maxWidth: "100%",
                wordBreak: "break-all",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ borderRadius: "10px", background: "#fefcfc" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            sx={{
              backgroundColor: "#1976d2",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              Votting Settings
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              You are currently not an owner
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "30px", color: "#ff5f00" }}>
            <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
              QUORUM %
            </Typography>
            <Typography sx={{ textAlign: "left", margin: "10px 0px" }}>
              {dataDaoDetails.vote_condition} %
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              MINIMAL APPROVAL %
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                maxWidth: "100%",
                wordBreak: "break-all",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.vote_minapproval} %
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              Voting Period
            </Typography>

            <Typography
              sx={{
                textAlign: "left",
                maxWidth: "100%",
                wordBreak: "break-all",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.vote_period_day +
                " day, " +
                dataDaoDetails.vote_period_hour +
                " hours, " +
                dataDaoDetails.vote_period_minutes +
                " minutes. "}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{ borderRadius: "10px", background: "#fefcfc" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            sx={{
              backgroundColor: "#1976d2",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              Token Configuration
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              Filtering has been entirely disabled for whole web server
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "30px", color: "#ff5f00" }}>
            <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
              TOKEN NAME & SYMBOL
            </Typography>
            <Typography sx={{ textAlign: "left", margin: "10px 0px" }}>
              {dataDaoDetails.token_name +
                " (" +
                dataDaoDetails.token_symbol +
                ")"}
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              TOKEN HOLDERS
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.token_holders[0].tokenHolders +
                " - " +
                dataDaoDetails.token_holders[0].tokenHolderBalance}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="create-dao-back-next-parent">
        <button className="create-dao-back" onClick={handleBack}>
          Back
        </button>
        <button
          className="create-dao-next launch-dao"
          onClick={() => {
            luanchDataDao();
          }}
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
            <>Launch DAO</>
          )}
        </button>
      </div>
    </div>
  );
}

export default ReviewInfo;
