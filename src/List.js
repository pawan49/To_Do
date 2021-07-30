import React from "react";

const List = ({ items, deleteItem, editItem }) => {
  return (
    <div className="doto-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="todo-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteItem(id)}
              >
                Delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
