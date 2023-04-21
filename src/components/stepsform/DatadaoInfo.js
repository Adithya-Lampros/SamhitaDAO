import React, { useState } from "react";

function DatadaoInfo({
  handleBack,
  dataDaoDetails,
  setDataDaoDetails,
  handleNext,
}) {
  const [daoName, setDaoName] = useState("");
  const [daoDesc, setDaoDesc] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!daoName.trim()) {
      alert("Please enter the DAO Name");
      return;
    }

    if (!daoDesc.trim()) {
      alert("Please enter the DAO Description");
      return;
    }

    handleNext();
  }

  return (
    <div className="create-dao-info-main">
      <h1>Enter the LanguageDAO Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-dao-info-input-parent">
          <div className="create-dao-info-input-child">
            <input
              value={daoName}
              type="text"
              placeholder="Enter name of the LanguageDAO"
              className="dark-background"
              onChange={(e) =>
                setDataDaoDetails(
                  { ...dataDaoDetails, name: e.target.value },
                  setDaoName(e.target.value)
                )
              }
            />
          </div>
          <div className="create-dao-info-input-child">
            <textarea
              value={daoDesc}
              type="text"
              placeholder="Enter LanguageDAO description"
              rows="6"
              cols="50"
              className="dark-background"
              onChange={(e) =>
                setDataDaoDetails(
                  {
                    ...dataDaoDetails,
                    description: e.target.value,
                  },
                  setDaoDesc(e.target.value)
                )
              }
            />
          </div>
        </div>
        <div className="create-dao-back-next-parent">
          <button className="create-dao-back" disabled onClick={handleBack}>
            Back
          </button>
          <button className="create-dao-next" type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default DatadaoInfo;
