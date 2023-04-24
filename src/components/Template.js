import React, { useState, useEffect, useRef } from "react";
import "../styles/Template.scss";
import { ethers } from "ethers";
import samhitaABI from "../contracts/artifacts/Samhita.json";
import languageDAOAbi from "../contracts/artifacts/LanguageDAO.json";
import languageFactoryAbi from "../contracts/artifacts/LanguageDAOFactory.json";

const languageFactoryAddress = "0x87B3Dd2f2FA919310ea010F514C6cBe69419863a";
const samhitaAddress = "0x656CCf107Eac3599A9A22445109e4c327451Ec76";

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
            <div className="template-id">ID</div>
            <div className="template-title">Title</div>
            <div className="template-description">Description</div>
            <div className="template-file">File</div>
          </div>
          {loading && templates.length > 0
            ? templates.map((item) => {
                return (
                  <div className="template-data">
                    
                      <div className="template-details template-id text-center">
                        {parseInt(item.proposalID, 16)}
                      </div>
                 
                  
                      <div className="template-details template-title">
                        {item.proposalName}
                      </div>
                    
                  
                      <div className="template-details template-description">
                        {item.proposalDescription}
                      </div>
                    
                  
                      <div className="template-details template-file">
                        <a href={item.proposalFile} target="_blank">{item.proposalFile}</a>
                      </div>
                    
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
