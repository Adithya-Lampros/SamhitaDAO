import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Web3Storage } from "web3.storage";
import "../styles/createproposal.css";

function CreateProposal() {
  const client = Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxNjc0MzQ1NzIwMzU1NjFGMTFkNTM0ODk1OTQyNTJCNjUxOTgxNjgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODE0NDk3OTY0MTcsIm5hbWUiOiJTYW1oaXRhREFPIn0.EdesCPnTd8cF8Z3pdC45kKrmVZqPGEzTq3RdpHI1Vh0",
  });

  const [proposalName, setProposalName] = useState();
  const [proposalDesc, setProposalDesc] = useState();

  const upload = async () => {
    const fileInput = document.querySelector("#fimg");
    const CID = await client.put(fileInput.files);
    console.log(CID);
  };

  return (
    <>
      <div className="create-proposal-main-div">
        <h1 className="create-proposal-title">New Proposal</h1>
        <p className="create-proposal-desc">
          Enter the details of a new proposal and submit them.
        </p>

        <div className="create-proposal-div">
          <div>
            <label className="create-proposal-label">Title</label>
            {/* <p>Identify your proposal</p> */}
            <input
              type="text"
              placeholder="Enter Proposal Title"
              onChange={(e) => {
                setProposalName(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="create-proposal-label">Description</label>
            {/* <p>An introduction of about 2-3 lines</p> */}
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              onChange={(e) => {
                setProposalDesc(e.target.value);
              }}
            />
          </div>
          <div className="proposal-margin-div">
            <div>
              <label className="create-proposal-label">
                Upload File/Folder
              </label>
            </div>
            <Button
              variant="contained"
              component="label"
              color="primary"
              className="uploadfile"
            >
              Upload a file
              <input type="file" hidden id="fimg" onChange={() => upload()} />
            </Button>
          </div>
          <div className="proposal-margin-div">
            <div>
              <label className="create-proposal-label">Proposal Date</label>
            </div>
            <div className="uploadfile">
              <input type="date" className="proposal-date" />
              <input type="date" className="proposal-date  proposal-date1" />
            </div>
          </div>
          <div className="uploadfile">
            <Button variant="contained" size="large">
              Create Proposal
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProposal;
