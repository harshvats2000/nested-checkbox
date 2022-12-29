import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { status } from "./constants";
import Node from "./Node";

export default function List(props) {
  const { children, calculate } = props;

  return (
    <ul>
      {children.map((item) => {
        let childList = null;
        if (Array.isArray(item.children)) {
          childList = <List children={item.children} calculate={calculate} />;
        }

        return (
          <li key={item.id}>
            <Node {...{ item, calculate, childList }} />
          </li>
        );
      })}
    </ul>
  );
}
