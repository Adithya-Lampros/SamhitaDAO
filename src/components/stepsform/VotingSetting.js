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

  const voteSettings = () => {
    if (!voteDay || !voteHours || !voteMins || !voteStake || !proposalStake) {
      alert("Enter Voting Details");
    }
    if (voteDay && voteHours && voteMins && voteStake && proposalStake) {
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

  useEffect(() => {
    console.log(showConditionVote);
  }, [showConditionVote]);
  return (
    <div className="create-dao-info-main">
      <h1>Voting Settings</h1>
      <div className="create-dao-voting-inside">
        <h3 className="voting-slider-title">Support %</h3>
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
        <h3 className="voting-slider-title">Minimul Approval %</h3>
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
