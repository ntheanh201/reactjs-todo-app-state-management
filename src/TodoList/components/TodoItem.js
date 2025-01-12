/* eslint-disable function-paren-newline */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckBox from '../../Ui/components/CheckBox';

const propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  updateTodo: PropTypes.func.isRequired
};

const TodoItem = props => {
  const [editMode, setEditMode] = useState(false);
  const { todo, updateTodo } = props;
  const ref = useRef();

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setEditMode(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      setEditMode(false);
      updateTodo({ ...props.todo, name: event.target.value });
    }
  };
  return (
    <Li>
      <Wrapper>
        <CheckBox
          onClick={() => updateTodo({ ...todo, isDone: !todo.isDone })}
          checked={todo.isDone}
        />
        {editMode ? (
          <EditInput onKeyDown={handleKeyDown} ref={ref} defaultValue={todo.name} />
        ) : todo.isDone ? (
          <DoneLabel onClick={() => setEditMode(true)}>{todo.name}</DoneLabel>
        ) : (
          <UndoneLabel onClick={() => setEditMode(true)}>{todo.name}</UndoneLabel>
        )}
      </Wrapper>
    </Li>
  );
};

TodoItem.propTypes = propTypes;
export default TodoItem;

const Input = styled.input`
  ::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  ::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  ::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;

const Wrapper = styled.div`
  display: block;
  position: relative;
`;

const Label = styled.label`
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center left;
`;

const UndoneLabel = styled(Label)`
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.23;
  transition: color 0.4s;
  font-size: 24px;
`;

const DoneLabel = styled(UndoneLabel)`
  color: #d9d9d9;
  text-decoration: line-through;
`;

const Li = styled.li`
  display: inline;
`;

const EditInput = styled(Input)`
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: block;
  width: calc(100% - 43px);
  padding: 12px 16px;
  margin: 0 0 0 43px;
`;

// const DestroyButton = styled.button`
//     display: none;
// 	position: absolute;
// 	top: 0;
// 	right: 10px;
// 	bottom: 0;
// 	width: 40px;
// 	height: 40px;
// 	margin: auto 0;
// 	font-size: 30px;
// 	color: #cc9a9a;
// 	margin-bottom: 11px;
//     transition: color 0.2s ease-out;

//     :hover {
//         color: #af5b5e;
//     }

//     ::after {
//         content: '×';
//     }
// `;
