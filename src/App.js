import "./App.css";
import React, { useState } from "react";
import originalData from "./data.js";
import { status } from "./constants";
import List from "./List";

export default function App() {
  const setStatus = (root, status) => {
    root.status = status;
    if (Array.isArray(root.children)) {
      return root.children.forEach((item) => {
        setStatus(item, status);
      });
    }
  };

  const calculateStatus = (items) => {
    let checked = 0;
    let indeterminate = 0;

    items.forEach((item) => {
      if (item.status && item.status === status.checked) checked++;
      if (item.status && item.status === status.indeterminate) indeterminate++;
    });

    if (checked === items.length) {
      return status.checked;
    } else if (checked > 0 || indeterminate > 0) {
      return status.indeterminate;
    }
  };

  // Depth first traversal
  const traverse = (root, needle, status) => {
    let id;
    let items;

    if (Array.isArray(root)) {
      items = root;
    } else {
      id = root.id;
      items = root.children;
    }

    if (id === needle) {
      return setStatus(root, status);
    }

    if (!items) {
      return root;
    } else {
      items.forEach((item) => traverse(item, needle, status));
      root.status = calculateStatus(items);
    }
  };

  const [items, setItems] = useState([originalData]);
  const calculate = (checkboxId, status) => {
    traverse(items, checkboxId, status);
    setItems(items.slice());
  };

  return (
    <div className="App">
      <h1>PingSafe Task - Interview</h1>
      <List children={items} calculate={calculate} />
    </div>
  );
}
