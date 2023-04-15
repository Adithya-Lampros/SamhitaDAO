import React, { useState, useEffect, useRef } from "react";
import "../styles/Template.scss";
import { ethers } from "ethers";
import samhitaABI from "../contracts/artifacts/Samhita.json";
import languageDAOAbi from "../contracts/artifacts/LanguageDAO.json";
import languageFactoryAbi from "../contracts/artifacts/LanguageDAOFactory.json";

const languageFactoryAddress = "0x85085FfFEb6C7a07b6B87fC87531a46cB54399cD";
const samhitaAddress = "0x325452DF45C4bBE7Dc6d839c0A2785B918DEe0eF";

const Template = ({ daoAddress, isSamhita }) => {
  console.log(daoAddress);
  console.log(isSamhita);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  const showTemplates = async () => {
    setLoading(false);
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        console.log("switch case for this case is: " + chainId);
        if (chainId === 1029) {
          // if (!isSamhita) {
          //   const contract = new ethers.Contract(
          //     languageFactoryAddress,
          //     languageFactoryAbi,
          //     provider
          //   );

          //   const languageContract = new ethers.Contract(
          //     daoAddress,
          //     languageDAOAbi,
          //     signer
          //   );
          //   const datasets = await languageContract.getAllProposals();
          //   setTemplates(datasets);
          //   console.log(datasets);
          // } else {
          //   const samhitaContract = new ethers.Contract(
          //     samhitaAddress,
          //     samhitaABI,
          //     signer
          //   );
          //   const temp = await samhitaContract.getAllTemplates();
          //   console.log(temp);
          //   setTemplates(temp);
          // }
          const samhitaContract = new ethers.Contract(
            samhitaAddress,
            samhitaABI,
            signer
          );
          const temp = await samhitaContract.getAllTemplates();
          console.log(temp);
          setTemplates(temp);
          setLoading(true);
          console.loh(temp);
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showTemplates();
  }, []);

  return (
    <>
      <div className="template-outer-main">
        <div className="template-header">Template</div>
        <div className="template-outer">
          <div className="template-main">
            <div>Proposal ID</div>
            <div>Title</div>
            <div>Description</div>
            <div>File</div>
          </div>
          {loading && templates.length > 0
            ? templates.map((item) => {
                return (
                  <div className="template-data">
                    <div>{parseInt(item.proposalID, 16)}</div>
                    <div>{item.proposalName}</div>
                    <div>{item.proposalDescription}</div>
                    <div>{item.proposalFile}</div>
                  </div>
                );
              })
            : "Templates are not available"}
        </div>
      </div>
    </>
  );
};

export default Template;
