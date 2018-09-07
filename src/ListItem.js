import React from "react";

export const ListItem = props => {
  return (
    <div>
      <h2>{props.item.message}</h2>
      {/* <img src={props.item.image} /> */}
      Contact <a href={"mailto:" + props.item.contact}>{props.item.contact}</a>
    </div>
  );
};
