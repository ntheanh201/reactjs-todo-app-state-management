import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  toggleAllTodo: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired
};

const InputBar = props => {
  const [value, setValue] = useState('');
  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    props.createTodo(value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <Wrapper>
      <ToggleLabel onClick={props.toggleAllTodo} htmlFor="toggle-all">
        Mark all as complete
      </ToggleLabel>
      <HeaderInput
        value={value}
        onChange={value => handleChange(value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
      />
    </Wrapper>
  );
};

InputBar.propTypes = propTypes;
export default InputBar;

const ToggleLabel = styled.label`
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: 13px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  z-index: 3;

  ::before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }
`;

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

const Wrapper = styled.header``;

const HeaderInput = styled(Input)`
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

  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`;
