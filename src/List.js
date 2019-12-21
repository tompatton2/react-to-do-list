import React from 'react';

const List = (props) => {
  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <li
        className="list-group-item"
        style={
          {
            color: 'black',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            fontSize: '14px',
            width: '475px'
          }
        }
      >
        <button
          className="btn-sm btn-dangerlight"
          style={{ marginRight: '20px' }}
          onClick={ props.editTodo }
        >
          Update
        </button>
        {props.item.name}
        <button
          className="btn-sm btn-danger"
          style={{ marginLeft: '20px' }}
          onClick={ props.deleteTodo}
        >
          Delete
        </button>
      </li>
    </div>
  )
}

export default List;
