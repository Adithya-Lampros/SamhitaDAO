import React from "react";
import "../styles/Template.scss";

const Template = () => {
  return (
    <>
      <div className="template-outer-main">
        <div className="template-header">Template</div>
        <div className="template-outer">
          <div className="template-main">
            <div>No</div>
            <div>Title</div>
            <div>Description</div>
            <div>File</div>
          </div>
          <div className="template-data">
            <div>1</div>
            <div>Old Song Lyrics</div>
            <div>
              A old folke song about the wealth and prosperty of the new land
            </div>
            <div>Lyrics.pdf</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
