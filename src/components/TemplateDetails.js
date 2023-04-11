import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Vector2 from "../assets/Vector2.svg";
import Vote1 from "../assets/vote1.svg";
import Vote2 from "../assets/vote2.svg";
import Arrow from "../assets/Arrow.svg";

function TemplateDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="template-bg">
      <div className="template-details-main">
        <div className="gradient-1"></div>
        <div className="gradient-2"></div>
        <div className="left-div">
          <img
            className="datadao-cover"
            src={location.state.cover}
            alt="datadao coverimage"
          />
          <h1>{location.state.title}</h1>
          <p>{location.state.info}</p>

          <h2>Registery</h2>
          <p>datadao.eth</p>

          <div className="use-temp-main">
            <button
              className="use-template"
              onClick={() => navigate("/create-data-dao")}
            >
              Use This Template
            </button>
            <img
              className="use-btn-aro"
              src={Arrow}
              alt="Arrow"
              onClick={() => navigate("/create-data-dao")}
            />
          </div>
        </div>
        <div className="right-div">
          <h2>Template Configuration</h2>
          <div className="included-config">
            <div className="included-item">
              <img src={Vote1} alt="Vote1" />
              <p>Voting</p>
            </div>
            <div className="included-item">
              <img src={Vote2} alt="Vote2" />
              <p>Tokens</p>
            </div>
          </div>
        </div>
      </div>
      <img className="Vector2" src={Vector2} alt="Vector2" />
    </div>
  );
}

export default TemplateDetails;
