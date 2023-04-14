import React, { useEffect, useRef, useState } from "react";
import "../styles/availabelproposal.scss";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Modal, TextField } from "@mui/material";
import "../styles/createproposal.css";
import uploadfile from "../assets/upload.png";
import { ethers } from "ethers";
import languageDAOAbi from "../contracts/artifacts/LanguageDAO.json";
import samhitaABI from "../contracts/artifacts/Samhita.json";

const samhitaAddress = "0x246A9A278D74c69DE816905a3f6Fc9a3dFDB029d";

function AvailabelProposal({ daoAddress, isSamhita }) {
  const inputRef1 = useRef();
  const inputRef3 = useRef();
  console.log(isSamhita);
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProposals = async () => {
    console.log(daoAddress);
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
        if (chainId === 1029) {
          if (isSamhita) {
            const contract = new ethers.Contract(
              samhitaAddress,
              samhitaABI,
              signer
            );
            const allProposals = await contract.getaAllProposals();
            console.log(allProposals);
            setProposals(allProposals);
          } else {
            const contract = new ethers.Contract(
              daoAddress,
              languageDAOAbi,
              signer
            );
            const allProposals = await contract.getAllProposals();
            console.log(allProposals);
            setProposals(allProposals);
          }
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const upVote = async (id) => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        if (chainId === 1029) {
          if (daoAddress.issamhita) {
            const contract = new ethers.Contract(
              samhitaAddress,
              samhitaABI,
              signer
            );
            const tx = await contract.upvoteProposal(id, { value: 1 });
            tx.wait();
          } else {
            const contract = new ethers.Contract(
              daoAddress,
              languageDAOAbi,
              signer
            );
            const tx = await contract.upvoteProposal(id, {
              value: 10000000000000,
            });
            await tx.wait();
          }
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downVote = async (id) => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        if (chainId === 1029) {
          if (daoAddress.issamhita) {
            const contract = new ethers.Contract(
              samhitaAddress,
              samhitaABI,
              signer
            );
            const tx = await contract.downvoteProposal(id, { value: 1 });
            tx.wait();
          } else {
            const contract = new ethers.Contract(
              daoAddress,
              languageDAOAbi,
              signer
            );
            const tx = await contract.downvoteProposal(id, {
              value: 10000000000000,
            });
            await tx.wait();
          }
        } else {
          alert("Please connect to the BitTorrent Chain Donau!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <>
      <div className="availabel-proposal-main-div">
        <div className="availabel-proposal">
          <div className="availabel-proposal-section1">
            <div className="A-proposal-title">Proposals</div>
            <div className="create-proposal-parent"></div>
          </div>
          <div className="availabel-proposal-section2">
            <div>
              <FormControl
                sx={{ m: 1, minWidth: 70 }}
                size="small"
                id="dropdown-formcontrol"
                className="select-parent"
              >
                <InputLabel id="select-label-status">Status</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Open</MenuItem>
                  <MenuItem value={30}>Closed</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                sx={{ m: 1, minWidth: 70 }}
                size="small"
                id="dropdown-formcontrol"
                className="select-parent"
              >
                <InputLabel id="select-label-status">Outcomes</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="Outcomes"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Passed</MenuItem>
                  <MenuItem value={30}>Rejected</MenuItem>
                  <MenuItem value={30}>Pending</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                sx={{ m: 1, minWidth: 70 }}
                size="small"
                id="dropdown-formcontrol"
                className="select-parent"
              >
                <InputLabel id="select-label-status">App</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="App"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Voting</MenuItem>
                  <MenuItem value={30}>Tokens</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <input
                type="text"
                className="proposal-date"
                placeholder="Start-Date"
                ref={inputRef1}
                onChange={(e) => console.log(e.target.value)}
                onFocus={() => (inputRef1.current.type = "date")}
                onBlur={() => (inputRef1.current.type = "text")}
              />
            </div>
            <div>
              <input
                type="text"
                className="proposal-date"
                placeholder="End-Date"
                ref={inputRef3}
                onChange={(e) => console.log(e.target.value)}
                onFocus={() => (inputRef3.current.type = "date")}
                onBlur={() => (inputRef3.current.type = "text")}
              />
            </div>
          </div>
          <div className="availabel-proposal-section3">
            <div className="A-proposal-title A-proposal-title2">Proposals</div>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {proposals.length > 0
                  ? proposals.map((items) => {
                      return (
                        <Grid item xs={6}>
                          <div className="proposal-details">
                            <table>
                              <thead>
                                <tr>
                                  <th>{items.proposalName}</th>
                                </tr>
                                {!items.votingResult ? (
                                  <tr>
                                    <div>Active</div>
                                  </tr>
                                ) : (
                                  <tr>
                                    <div className="proposal-inactive">
                                      Inactive
                                    </div>
                                  </tr>
                                )}
                              </thead>
                              <tbody>
                                <tr className="proposal-details-content">
                                  <label>Description</label>
                                  <td>{items.proposalDescription}</td>
                                </tr>
                                <tr className="proposal-details-content">
                                  <label>Proposal File </label>
                                  <td>
                                    {isSamhita
                                      ? items.proposalFile
                                      : items.proposalIamge}
                                  </td>
                                </tr>
                                <tr className="proposal-details-content">
                                  <label>Creator</label>
                                  <td>{items.proposalCreator}</td>
                                </tr>
                                {isSamhita ? (
                                  <tr className="proposal-details-content">
                                    <label>Category</label>
                                    <td>{items.category}</td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                                <tr>
                                  <td>
                                    <div className="date-flex">
                                      <span>
                                        Created-At:
                                        {parseInt(items.proposedAt, 16)}
                                      </span>
                                      <span>
                                        End-At:{" "}
                                        {parseInt(items.proposalExpireAt, 16)}{" "}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="vote-btns">
                                    <button
                                      className="rounded-view-data-dao-button button-to-view-more"
                                      onClick={() =>
                                        upVote(parseInt(items.proposalID, 16))
                                      }
                                    >
                                      <span className="view-button-text">
                                        Up Vote
                                      </span>
                                      <span className="view-circle d-flex justify-content-center align-items-center ">
                                        <i className="fas fa-arrow-right view-arrow"></i>
                                      </span>
                                    </button>
                                    <button
                                      className="rounded-join-data-dao-button button-to-join"
                                      onClick={() =>
                                        downVote(parseInt(items.proposalID, 16))
                                      }
                                    >
                                      {" "}
                                      <span className="join-button-text">
                                        Down Vote
                                      </span>
                                      <span className="join-circle d-flex justify-content-center align-items-center ">
                                        <i className="fas fa-arrow-right join-arrow"></i>
                                      </span>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </Grid>
                      );
                    })
                  : "no proposals"}
              </Grid>
              ;
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvailabelProposal;
