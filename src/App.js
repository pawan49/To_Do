import React, { useState, useEffect } from "react";
import List from "./List";

//to get locag storage.........
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // to handle the submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Enter the Value");
    } else if (name && edit) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setEdit(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  //function to delete all the data into list.......
  const clearList = () => {
    setList([]);
  };

  //function to delete single item into the list.............
  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  //function to edit data item into the list........
  const editItem = (id) => {
    const spcificItem = list.find((item) => item.id === id);
    setEdit(true);
    setEditId(id);
    setName(spcificItem.title);
  };

  //useeffect is use for show the data in localstorage........
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section className="section-center">
        <form className="todo-form" onSubmit={handleSubmit}>
          <h3> Item List</h3>
          <div className="form-control">
            <input
              type="text"
              className="input-item"
              placeholder="Enter Item"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">
              {edit ? "edit" : "submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="todo-container">
            <List items={list} deleteItem={deleteItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>
              Clear All
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default App;
