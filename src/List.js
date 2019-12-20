import React from 'react';

const List = (props) => {
  return (
    <li
      className="list-group-item"
      style={{ color: 'black', marginBottom: '5px', fontSize: "14px" }}
    >
      <button
        className="btn-sm btn-dangerlight"
        style={{ marginRight: '20px' }}
        onClick={ props.editTodo }
      >
        U
      </button>
      {props.item.name}
      <button
        className="btn-sm btn-danger"
        style={{ marginLeft: '20px' }}
        onClick={ props.deleteTodo}
      >
        X
      </button>
    </li>
  )
}

export default List;
