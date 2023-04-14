import React, { useRef, useState } from "react";
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

function AvailabelProposal() {
  const inputRef1 = useRef();
  const inputRef3 = useRef();

  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
                <Grid item xs={6}>
                  {" "}
                  <div className="proposal-details">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                        </tr>
                        {isActive ? (
                          <tr>
                            <div>Active</div>
                          </tr>
                        ) : (
                          <tr>
                            <div className="proposal-inactive">Inactive</div>
                          </tr>
                        )}
                      </thead>
                      <tbody>
                        <tr className="proposal-details-content">
                          <label>Description</label>
                          <td>
                            ""This dataset contains 5.5k high-quality music
                            captions written by musicians"
                          </td>
                        </tr>
                        <tr className="proposal-details-content">
                          <label>Proposal File </label>
                          <td>This is the Proposal File</td>
                        </tr>
                        <tr className="proposal-details-content">
                          <label>Creator</label>
                          <td>Creator Address</td>
                        </tr>
                        <tr className="proposal-details-content">
                          <label>Category</label>
                          <td>Category</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="date-flex">
                              <span>Created-At</span>
                              <span>End-At</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="vote-btns">
                            <button className="rounded-view-data-dao-button button-to-view-more">
                              <span className="view-button-text">Up Vote</span>
                              <span className="view-circle d-flex justify-content-center align-items-center ">
                                <i className="fas fa-arrow-right view-arrow"></i>
                              </span>
                            </button>
                            <button className="rounded-join-data-dao-button button-to-join">
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
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvailabelProposal;
