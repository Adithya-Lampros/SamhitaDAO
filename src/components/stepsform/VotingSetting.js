import { Slider, Box } from "@mui/material";
import React, { useEffect, useState } from "react";

function VotingSetting({
  handleNext,
  handleBack,
  dataDaoDetails,
  setDataDaoDetails,
}) {
  const [showConditionVote, setConditionVote] = useState(0);
  const [showMinimalApproval, setMinimalApproval] = useState(0);
  const [voteDay, setVoteDay] = useState("");
  const [voteHours, setVoteHours] = useState("");
  const [voteMins, setVoteMins] = useState("");
  const [voteStake, setVoteStake] = useState("");
  const [proposalStake, setProposalStake] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [showText, setShowText] = useState(false);
  const [showMinimalText, setShowMinimalText] = useState(false);

  const voteSettings = () => {
    if (!voteDay || !voteHours || !voteMins || !voteStake || !proposalStake) {
      alert("Enter Voting Details");
    }
    if (voteDay && voteHours && voteMins && voteStake && proposalStake) {
      const timestampMs =
        (parseInt(voteDay) * 24 * 60 * 60 +
          parseInt(voteHours) * 60 * 60 +
          parseInt(voteMins) * 60) *
        1000;
      setTimestamp(timestampMs);

      console.log(timestamp);

      setDataDaoDetails({
        ...dataDaoDetails,
        vote_day: voteDay,
        vote_hours: voteHours,
        vote_mins: voteMins,
        vote_stake: voteStake,
        proposal_stake: proposalStake,
      });
      handleNext();
    }
  };

  const handleMouseEnter1 = () => {
    setShowText(true)
  }
  const handleMouseLeave1 = () => {
    setShowText(false)
  }
  const handleMouseEnter2 = () => {
    setShowMinimalText(true)
  }
  const handleMouseLeave2 = () => {
    setShowMinimalText(false)
  }
  useEffect(() => {
    console.log(showConditionVote);
  }, [showConditionVote]);
  return (
    <div className="create-dao-info-main">
      <h1>Voting Settings</h1>
      <div className="create-dao-voting-inside">
        {/* <h3 className="voting-slider-title">Quorum % <i class="fas fa-info-circle"></i> <span class>The minimum number of members required to be present for a vote to be considered valid in percentage.</span></h3> */}
        <h3 className="voting-slider-title">
        Quorum % &nbsp;
        <i className="fas fa-info-circle" onMouseEnter={handleMouseEnter1}
          onMouseLeave={handleMouseLeave1} > </i>
          {showText && (
          <p className="info-text my-2">The minimum number of members required to be present for a vote to be considered valid in percentage.</p>)}
         
      </h3>
        <div className="slider-parent">
          <Box width={"70%"}>
            <Slider
              defaultValue={0}
              onChange={(e) => {
                setConditionVote(e.target.value);
                setDataDaoDetails({
                  ...dataDaoDetails,
                  vote_condition: e.target.value,
                });
              }}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </Box>
          <span className="display-vote">{showConditionVote} %</span>
        </div>
      </div>
      <div className="create-dao-voting-inside">
        <h3 className="voting-slider-title">Minimul Approval % &nbsp;
        <i className="fas fa-info-circle" onMouseEnter={handleMouseEnter2}
          onMouseLeave={handleMouseLeave2} > </i>
          {showMinimalText && (
          <p className="info-text my-2">The minimum number of approvals must be there for a post to be accepted.</p>)}
        </h3>
        <div className="slider-parent">
          <Box width={"70%"}>
            <Slider
              defaultValue={0}
              onChange={(e) => {
                setMinimalApproval(e.target.value);
                setDataDaoDetails({
                  ...dataDaoDetails,
                  vote_minapproval: e.target.value,
                });
              }}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </Box>
          <span className="display-vote">{showMinimalApproval} %</span>
        </div>
      </div>
      <div className="create-dao-voting-inside">
        <h3 className="voting-slider-title">Voting Period %</h3>
        <div className="slider-parent">
          <input
            className="display-vote-period dark-background"
            type="number"
            placeholder="Enter Days"
            onChange={(e) => {
              setDataDaoDetails({
                ...dataDaoDetails,
                vote_period_day: parseInt(e.target.value),
              });
              setVoteDay(e.target.value);
            }}
          ></input>
          <input
            className="display-vote-period dark-background"
            type="number"
            placeholder="Enter Hours"
            onChange={(e) => {
              setDataDaoDetails({
                ...dataDaoDetails,
                vote_period_hour: parseInt(e.target.value),
              });
              setVoteHours(e.target.value);
            }}
          ></input>
          <input
            className="display-vote-period dark-background"
            type="number"
            placeholder="Enter Minutes"
            onChange={(e) => {
              setDataDaoDetails({
                ...dataDaoDetails,
                vote_period_minutes: parseInt(e.target.value),
              });
              setVoteMins(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="create-dao-voting-inside">
        <h3 className="voting-slider-title">Stake %</h3>
        <div className="slider-parent">
          <input
            className="display-vote-period dark-background"
            type="number"
            placeholder="Voting Stake"
            onChange={(e) => {
              setVoteStake(e.target.value);
            }}
          ></input>
          <input
            className="display-vote-period dark-background"
            type="number"
            placeholder="Proposal Stake"
            onChange={(e) => {
              setProposalStake(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="create-dao-back-next-parent">
        <button className="create-dao-back" onClick={handleBack}>
          Back
        </button>
        <button
          className="create-dao-next"
          onClick={() => {
            voteSettings();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default VotingSetting;
