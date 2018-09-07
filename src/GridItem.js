import React from "react";

export const GridItem = props => {
  return (
    <div className="GridItem">
      <p>{props.item.date}</p>
      <h2 className="GridItem-message">{props.item.message}</h2>
      {/* <img src={props.item.image} /> */}
      Contact{" "}
      <a className="GridItem-link" href={"mailto:" + props.item.contact}>
        {props.item.contact}
      </a>
    </div>
  );
};
