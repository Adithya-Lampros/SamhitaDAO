import React, { useState } from "react";
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

const dataDaoFactoryContract = "0x0caC8C986452628Ed38483bcEE0D1cF85816946D";
const languageFactoryAddress = "0x733A11b0cdBf8931614C4416548B74eeA1fbd0A4";

function ReviewInfo({
  handleNext,
  handleBack,
  dataDaoDetails,
  setDataDaoDetails,
}) {
  const { address } = useAccount();
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
        if (chainId === 1029) {
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

  const votingPeriodEpoch =
    Math.floor(dataDaoDetails.vote_period_day) * 86400 +
    Math.floor(dataDaoDetails.vote_period_hour) * 3600 +
    Math.floor(dataDaoDetails.vote_period_minutes) * 60;
  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const luanchDataDao = async () => {
    const contract = await getContract();
    console.log(contract);
    const tokenFactory = new ContractFactory(
      languageTokenAbi,
      languageTokenBytecode.bytecode,
      signer
    );
    const tokenContract = await tokenFactory.deploy(
      dataDaoDetails.token_name,
      dataDaoDetails.token_symbol,
      dataDaoDetails.token_holders[0].tokenHolderBalance
    );
    await tokenContract.wait()
    const tokenAddress = tokenContract.address;
    console.log(tokenAddress);

    const languageFactory = new ContractFactory(
      languageDAOAbi,
      languageDAOBytecode.bytecode,
      signer
    );
    const languageContract = await languageFactory.deploy(
      "0x246A9A278D74c69DE816905a3f6Fc9a3dFDB029d",
      "0x378fDf90216725F9684C00Bb0dbA8814fEfDB3a2",
      tokenAddress
    );
    await languageContract.wait()
    const languageDaoAddress = languageContract.address;
    console.log(languageDaoAddress)

    const tx = await contract.createDataDao(
      languageDaoAddress,
      dataDaoDetails.name,
      dataDaoDetails.description,
      tokenAddress,
      0,
      dataDaoDetails.token_holders[0].tokenHolderBalance
    );
    await tx.wait(); //dataDaoAddress,name, description, token, tokenPrice, totalSupply
    console.log(tx);
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
              DataDao Information
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              I am an accordion
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "30px" }}>
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
          <AccordionDetails sx={{ padding: "30px" }}>
            <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
              SUPPORT %
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
          <AccordionDetails sx={{ padding: "30px" }}>
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
          Launch DataDao
        </button>
      </div>
    </div>
  );
}

export default ReviewInfo;
