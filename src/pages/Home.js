import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import orangeCurvedLines from "../assets/landingPage/orange-curved-lines.svg";
import orangeSecondary from "../assets/landingPage/orange-secondary-curve.svg";
import yellowCircle from "../assets/landingPage/yellow-circle.png";
import purpleCircle from "../assets/landingPage/purple-circle.png";
import orangeCircle from "../assets/landingPage/orange-circle.svg";
import languageImage from "../assets/landingPage/language.svg";
import mainHeroBg from "../assets/landingPage/main-hero-bg.svg";
// import AboutBecomeMember from "../components/aboutPlatform/AboutBecomeMember";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navigate = useNavigate();
  const openCreateDaoPage = () => {
    navigate("/create-data-dao/select-template");
  };
  const openExistingDaoPage = () => {
    // navigate("/open-existing-data-dao");
    navigate("/pre-existing-data-dao");
  };
  const openYourdaos = () => {
    navigate("/your-daos");
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
  };

  // lighthouse decrypt the file function ********************************************************

  const [fileURL, setFileURL] = React.useState(null);

  const sign_auth_message = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return { publicKey: publicKey, signedMessage: signedMessage };
  };

  /* Decrypt file */
  const decrypt = async () => {
    // Fetch file encryption key
    const cid = "QmQEaxRkiCPjBmoHy452rgKxLhPaaMmyHoQyVG31Thh4Jp"; //replace with your IPFS CID
    const { publicKey, signedMessage } = await sign_auth_message();
    console.log(signedMessage);
    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of the file to decrypt
          publicKey: public key of the user who has access to file or owner
          signedMessage: message signed by the owner of publicKey
    */
    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of the file to decrypt
          key: the key to decrypt the file
          mimeType: default null, mime type of file
    */

    const fileType = "image/jpeg";
    const decrypted = await lighthouse.decryptFile(
      cid,
      keyObject.data.key,
      fileType
    );
    console.log(decrypted);
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log(url);
    setFileURL(url);
  };

  /// lighthouse file share to a particular address function code **********************************************

  const shareFile = async () => {
    // file cid which we want to share with others
    const cid = "QmSrwUGc6uqAwZWNEuwy5kBW4fJNRzgyS3WN8qaEvE3skK";

    // Then get auth message and sign
    // Note: message should be signed by owner of file.
    const { publicKey, signedMessage } = await sign_auth_message();

    /// addresses who can use open this file
    const publicKeyUserB = [
      "0x97861976283e6901b407D1e217B72c4007D9F64D",
      "0x054ae6107cAadC187c304de87365bc52F8c2ADB9",
    ];

    const res = await lighthouse.shareFile(
      publicKey,
      publicKeyUserB,
      cid,
      signedMessage
    );

    console.log(res);
    /*
    data: {
      cid: "QmTTa7rm2nMjz6wCj9pvRsadrCKyDXm5Vmd2YyBubCvGPi",
      shareTo: "0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"
    }
  */
    /*Visit: 
      https://files.lighthouse.storage/viewFile/<cid>  
    To view encrypted file
  */
  };
  return (
    <>
      <section className="hero-section">
        <div className="main-hero">
          <div className="hero-bg-images">
            <img
              src={mainHeroBg}
              className="main-hero-orange-bg"
              alt="mainbg"
            />
            <img
              src={orangeCurvedLines}
              className="orange-curved-lines"
              alt="orange-first"
            />
            <img
              src={orangeSecondary}
              className="orange-secondary"
              alt="orange-second"
            />
            <img
              src={yellowCircle}
              className="yellow-circle"
              alt="yellow-circle"
            />
            <img
              src={purpleCircle}
              className="purple-circle"
              alt="purple-circle"
            />
            <img
              src={orangeCircle}
              className="orange-circle"
              alt="orange-circle"
            />
          </div>
          <div className=" px-3 d-flex justify-content-center align-items-center">
            <div className="hero-text-image d-flex  align-items-center">
              <div className="hero-text  ">
                <p className="hero-text-head">
                  Welcome to <br /> SamhitaDAO
                </p>
                <p className="hero-sub-text">
                  
                  We preserve the past for the <br/>
                  future by reviving endangered languages.
                </p>
                <button
                  className="rounded-button button-to-join"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="hero-button-text"> Join SamhitaDAO </span>
                  <span className="circle d-flex justify-content-center align-items-center ">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </button>

                {isOpen && (
                  <>
                    <div className="popup-overlay" />
                    <div ref={popupRef} className="popup">
                      <div className="language-header">Language DAO</div>
                      <div className="language-sub-header text-center">If you’re new here, click on Existing Language Dao to first join Samhita DAO</div>
                      <div className="hero-btns">
                        <button
                          className="create-dao-btn"
                          onClick={() => openCreateDaoPage()}
                        >
                          Create Language Dao
                        </button>
                        <button
                          className="your-dao-btn"
                          onClick={() => openYourdaos()}
                        >
                          Your DAOs
                        </button>
                        <button
                          className="existing-dao-btn"
                          onClick={() => openExistingDaoPage()}
                        >
                          Existing Language Dao
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="language-image-div text-center">
                <img
                  src={languageImage}
                  className="language-image"
                  alt="LangImg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <AboutBecomeMember/> */}
    </>
  );
}

export default Home;
