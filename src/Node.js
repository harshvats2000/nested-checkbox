import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { status } from "./constants";

const Node = ({ item, calculate, childList }) => {
  const [expand, setExpand] = useState(true);

  return (
    <div>
      {item.children && (
        <button className={`${expand ? "expanded" : "collapsed"}`} onClick={() => setExpand(!expand)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      )}
      <Checkbox
        id={item.id}
        label={item.label}
        checked={item.status === status.checked}
        indeterminate={item.status === status.indeterminate}
        calculate={calculate}
      />
      <label htmlFor={item.label}>{item.label}</label>
      {expand && childList}
    </div>
  );
};

export default Node;
