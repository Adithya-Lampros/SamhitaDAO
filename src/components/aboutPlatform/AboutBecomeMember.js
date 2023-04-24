import React from "react";
import "../../styles/AboutPlatform.css";
// import whiteCircle from "../../assets/how-works/become-member/white-circle.svg";
import becomeMember from "../../assets/how-works/become-member/become-member.svg";
import launchLanguage from "../../assets/how-works/launch-language/launch-language.svg";
import addUser from "../../assets/how-works/become-member/add-user.svg";
import contributeAsMembers from "../../assets/how-works/contribute-as-members/contribute-as-members.svg";
import joinLanguage from "../../assets/how-works/join-language/join-language.svg";

// -----BecomeMember icons----
import wallet from "../../assets/how-works/become-member/wallet.svg";
import vote from "../../assets/how-works/become-member/vote.svg";
import participate from "../../assets/how-works/become-member/participate.svg";

// ------ Contribute as Members ----
import createLanguage from "../../assets/how-works/contribute-as-members/create-language.svg";
import contributeTemplate from "../../assets/how-works/contribute-as-members/hw-template.svg";
import nft from "../../assets/how-works/contribute-as-members/hw-nft.svg";
import royalties from "../../assets/how-works/contribute-as-members/royalties.svg";
import buySell from "../../assets/how-works/contribute-as-members/buy-sell.svg";

// ----- Launch Langugae DAO Icons ----------
import miniRocket from "../../assets/how-works/launch-language/launch-language-mini-rocket.svg";
import tokenName from "../../assets/how-works/launch-language/token-name.svg";
import reviewInfo from "../../assets/how-works/launch-language/review-info.svg";
import launchLanguageDaoIcon from "../../assets/how-works/launch-language/launch-language-dao.svg";

// -------Join Language DAO Icons ----------
import nftDatabase from "../../assets/how-works/join-language/nft-database.svg";
const becomeMemberData = [
  {
    icon: addUser,
    textContent:
      "To become a member, you’ll need to visit the website to create an account",
  },
  {
    icon: wallet,
    textContent: "Connect a wallet e.g. Metamask to buy Samhita Tokens",
  },
  {
    icon: participate,
    textContent:
      "As a member, you participate in the community’s ecosysytem by sending proposals",
  },
  {
    icon: vote,
    textContent: "You can also vote on proposals as per your voting rights",
  },
];

const contributeasMember = [
  {
    icon:createLanguage,
    // textContent:'Create a languageDAO'
    textContent:'Start by creating a languageDAO'
  },
  {
    icon:contributeTemplate,
    textContent:'Create templates of databases e.g. lexical, text, audio to be used by other language DAOs'
  },
  {
    icon:nft,
    textContent:'When a template is approved, an NFT will be minted'
  },
  {
    icon:royalties,
    textContent:'You get royalties when a language DAO uses your templates'
  },
  {
    icon:buySell,
    textContent:'You can also buy and sell Samhita tokens'
  }
]

const launchLanguageDAO = [
  {
    icon: miniRocket,
    textContent: "To launch a languageDAO, you must be a member of Samhita DAO",
  },
  {
    icon: tokenName,
    textContent:
      "Set token configuration with token name and symbol to launch token",
  },
  {
    icon: reviewInfo,
    textContent: "Review information",
  },
  {
    icon: launchLanguageDaoIcon,
    textContent: "Launch language DAO",
  },
];
const joinLanguageDAO = [
  {
    icon: addUser,
    textContent: "Become a member of a languageDAO by purchasing their token",
  },
  {
    icon: contributeTemplate,
    textContent:
      "You can use templates created by SamhitaDAO for language preservation",
  },
  {
    icon: buySell,
    textContent: "Buy and sell tokens of that particular languageDAO",
  },
  {
    icon: nft,
    textContent: "When a particular languageDAO validates a database, it will be stored as an NFT.",
  },
  {
    icon: nftDatabase,
    textContent: "These database NFTs will be rentable for organisations or AI models and the languageDAO will be paid in the form of royalties.",
  },
];
function AboutBecomeMember() {
  return (
    <>
      <div className="how-works-bg container-fluid">
        <div className="hw-head-subhead">
          {/* <div className="how-works-head">SamhitaDAO</div> */}
          <div className="hw-sub-head text-center"> How it works!</div>
        </div>

        <div className="">
          <div className="orange-bg  ">
            {/* <img
                  className="white-rounded-svg"
                  src={whiteCircle}
                  alt="white circular svg"
                /> */}

            <div className="hw-white-border">
              <div className="text-center hw-block-head-line">
                Become a member of SamhitaDAO
              </div>
              <div className=" hw-content-of-block d-flex align-items-center">
                <div className="hw-become-member-left my-auto">
                  <div className="hw-white-circle d-flex justify-content-center">
                    <img
                      className="hw-become-member-svg"
                      src={becomeMember}
                      alt=""
                    />
                  </div>
                </div>

                <div className="hw-become-member-right">
                  <div className="row d-flex justify-content-around ">
                    {becomeMemberData.map((item, index) => (
                      <div className="block-1 hw-block-margin" key={index}>
                          <div className="hw-icon-bg hw-odd-block-icon-bg d-flex justify-content-center align-items-center">
                            <img
                              className="hw-add-user-svg"
                              src={item.icon}
                              alt=""
                            />
                          </div>
                        <div className="add-user-block d-flex justify-content-center align-items-center">
                          <div className="hw-icon-content-text hw-odd-icon-content-text text-center">
                            {item.textContent}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----- Section two Starts from here ----------- */}

        <div>
          <div className="orange-bg ">
            <div className="hw-white-border">
              <div className="text-center hw-block-head-line">
                Contribute as a member of SamhitaDAO
              </div>
              <div className=" hw-content-of-block d-flex align-items-center">
                <div className="hw-become-member-right">
                  <div className="row d-flex justify-content-around ">
                    {contributeasMember.map((item, index) => (
                      <div className="block-1 hw-even-block-margin" key={index}>
                      <div className="hw-icon-bg hw-even-block-icon-bg d-flex justify-content-center align-items-center">
                        <img
                          className="hw-add-user-svg"
                          src={item.icon}
                          alt=""
                        />
                      </div>
                    <div className="add-user-block add-even-user-block d-flex justify-content-center align-items-center">
                      <div className="hw-icon-content-text hw-even-icon-content-text text-center ">
                        {item.textContent}
                      </div>
                    </div>
                  </div>

                      
                    ))}
                  </div>
                </div>

                <div className="hw-become-member-left my-auto">
                  <div className="hw-second-block-white-circle d-flex justify-content-center">
                    <img
                      className=" hw-second-block-main-svg"
                      src={contributeAsMembers}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------ Second Block ends here ------------*/}

        {/* ------------- Third Block starts from here -------------  */}

        <div>
          <div className="orange-bg ">
            {/* <img
                  className="white-rounded-svg"
                  src={whiteCircle}
                  alt="white circular svg"
                /> */}

            <div className="hw-white-border">
              <div className="text-center hw-block-head-line">
                Launch a languageDAO
              </div>
              <div className=" hw-content-of-block d-flex align-items-center">
                <div className="hw-become-member-left my-auto">
                  <div className="hw-white-circle d-flex justify-content-center">
                    <img
                      className="hw-launch-language-svg"
                      src={launchLanguage}
                      alt=""
                    />
                  </div>
                </div>

                <div className="hw-become-member-right">
                  <div className="row d-flex justify-content-around ">
                    {launchLanguageDAO.map((item, index) => (
                      <div className="block-1 hw-block-margin" key={index}>
                      <div className="hw-icon-bg hw-odd-block-icon-bg d-flex justify-content-center align-items-center">
                        <img
                          className="hw-add-user-svg"
                          src={item.icon}
                          alt=""
                        />
                      </div>
                    <div className="add-user-block d-flex justify-content-center align-items-center">
                      <div className="hw-icon-content-text hw-odd-icon-content-text text-center">
                        {item.textContent}
                      </div>
                    </div>
                  </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------- Third Block ends here ------------------ */}

        {/* -------------- Fourth block starts here ------------------*/}

        <div>
          <div className="orange-bg ">
            <div className="hw-white-border">
              <div className="text-center hw-block-head-line">
                Join a Language DAO community
              </div>
              <div className=" hw-content-of-block d-flex align-items-center">
                <div className="hw-become-member-right">
                  <div className="row d-flex justify-content-around ">
                    {joinLanguageDAO.map((item, index) => (
                      <div className="block-1 hw-even-block-margin" key={index}>
                          <div className="hw-icon-bg hw-even-block-icon-bg d-flex justify-content-center align-items-center">
                            <img
                              className="hw-add-user-svg"
                              src={item.icon}
                              alt=""
                            />
                          </div>
                        <div className="add-user-block add-even-user-block d-flex justify-content-center align-items-center">
                          <div className="hw-icon-content-text hw-even-icon-content-text text-center ">
                            {item.textContent}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hw-become-member-left my-auto">
                  <div className="hw-second-block-white-circle d-flex justify-content-center">
                    <img
                      className=" hw-fourth-block-main-svg"
                      src={joinLanguage}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------- Fourth block ends here ------------------------------------ */}
      </div>
    </>
  );
}

export default AboutBecomeMember;
