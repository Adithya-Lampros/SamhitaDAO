import React from "react";
import "../../styles/AboutPlatform.css";
// import whiteCircle from "../../assets/how-works/become-member/white-circle.svg";
import becomeMember from "../../assets/how-works/become-member/become-member.svg";
import launchLanguage from "../../assets/how-works/launch-language/launch-language.svg";
import addUser from "../../assets/how-works/become-member/add-user.svg";
import contributeAsMembers from "../../assets/how-works/contribute-as-members/contribute-as-members.svg";
import joinLanguage from "../../assets/how-works/join-language/join-language.svg";

// -----BecomeMember icons----
import wallet from "../../assets/how-works/become-member/wallet.svg"
import vote from "../../assets/how-works/become-member/vote.svg"
const becomeMemberData =  [
  {
    icon:addUser,
    textContent:'To become a member, you’ll need to visit the website to create an account'
  },
  {
    icon:wallet,
    textContent:'Connect a wallet e.g. Metamask to buy Samhita Tokens'
  },
  {
    icon:vote,
    textContent:'As a member, you participate in the community’s ecosysytem by sending proposals'
  },
  {
    icon:vote,
    textContent:'You can also vote on proposals as per your voting rights'
  },
]


const launchLanguageDAO = [
  {
    icon:'',
    textContent:'To launch a languageDAO, you must be a member of Samhita DAO'
  },
  {
    icon:'',
    textContent:'Set token configuration with token name and symbol to launch token'
  },
  {
    icon:'',
    textContent:'Review information'
  },
  {
    icon:'',
    textContent:'Launch language DAO'
  },
]
function AboutBecomeMember() {
  return (
    <>
      <div className="how-works-bg container-fluid">
        <div className="hw-head-subhead">
          <div className="how-works-head">SamhitaDAO</div>
          <div className="hw-sub-head text-center"> How it works!</div>
        </div>

        <div className="">
          <div className="orange-bg  ">
            {/* <img
                  className="white-rounded-svg"
                  src={whiteCircle}
                  alt="white circular svg"
                /> */}

            <div className="hw-white-border d-flex align-items-center ">
              {/* <span>Become a Member of SamhitaDAO</span> */}
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
                {becomeMemberData.map((item,index)=>(

                
                <div className="block-1 hw-block-margin" key={index}>
                <div className="add-user-block d-flex justify-content-center align-items-center">
                  <div className="hw-icon-bg d-flex justify-content-center align-items-center">
                    <img className="hw-add-user-svg" src={item.icon} alt="" />
                  </div>
                  <div className="hw-icon-content-text text-center">
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




        {/* ----- Section two Starts from here ----------- */}

        <div>
          <div className="orange-bg ">
              <div className="hw-white-border d-flex align-items-center ">          
              <div className="hw-become-member-right">
                <div className="row d-flex justify-content-around ">
                {becomeMemberData.map((item,index)=>(
                <div className="block-1 hw-block-margin" key={index}>
                <div className="add-user-block d-flex justify-content-center align-items-center">
                  <div className="hw-icon-bg d-flex justify-content-center align-items-center">
                    <img className="hw-add-user-svg" src={addUser} alt="" />
                  </div>
                  <div className="hw-icon-content-text text-center">
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


        {/* ------ Second Block ends here ------------*/}


        {/* ------------- Third Block starts from here -------------  */}

        <div>
          <div className="orange-bg ">
            {/* <img
                  className="white-rounded-svg"
                  src={whiteCircle}
                  alt="white circular svg"
                /> */}

            <div className="hw-white-border d-flex align-items-center ">
              {/* <span>Become a Member of SamhitaDAO</span> */}
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
                {launchLanguageDAO.map((item,index)=>(

                
                <div className="block-1 hw-block-margin" key={index}>
                <div className="add-user-block d-flex justify-content-center align-items-center">
                  <div className="hw-icon-bg d-flex justify-content-center align-items-center">
                    <img className="hw-add-user-svg" src={addUser} alt="" />
                  </div>
                  <div className="hw-icon-content-text text-center">
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

        {/* ------------- Third Block ends here ------------------ */}

        {/* -------------- Fourth block starts here ------------------*/}

        <div>
          <div className="orange-bg ">
              <div className="hw-white-border d-flex align-items-center ">          
              <div className="hw-become-member-right">
                <div className="row d-flex justify-content-around ">
                {becomeMemberData.map((item,index)=>(
                <div className="block-1 hw-block-margin" key={index}>
                <div className="add-user-block d-flex justify-content-center align-items-center">
                  <div className="hw-icon-bg d-flex justify-content-center align-items-center">
                    <img className="hw-add-user-svg" src={addUser} alt="" />
                  </div>
                  <div className="hw-icon-content-text text-center">
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
                    src={joinLanguage}
                    alt=""
                    style={{width:"450px", marginRight:"-30%"}}
                  />
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
