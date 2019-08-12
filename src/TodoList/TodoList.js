import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Title from "../Ui/components/Title";
import ActionBar from "./components/ActionBar";
import { GetAllTodos } from '../queries/TodosQuery'
import { AddTodo, UpdateTodo, ToggleAllTodos, ClearCompletedTodos } from '../mutations/TodosMutations'
import Todos from "./components/Todos";

export default class TodoList extends Component {
  state = {
    filter: 'showAll'
  }

  toggleFilter = (filter) => {
    this.setState({
      filter
    })
  }

  render() {
    return (
      <Fragment>
        <Title>todos</Title>
        <Wrapper>
          <GetAllTodos filter={this.state.filter} >
            {(data, refetch) => {
              {/* const todos = this.filterTodos(data.todos) */}
              const {todos} = data
              return <Fragment >
                <ToggleAllTodos >
                  {
                    (toggleAllTodos) => (
                      <AddTodo refetch={refetch} toggleAllTodos={toggleAllTodos} />
                    )
                  }
                </ToggleAllTodos>
                <UpdateTodo>
                  {
                    (updateTodo) => (
                      <Todos
                        todos={todos}
                        refetch={refetch}
                        updateTodo={updateTodo}
                      />
                    )
                  }
                </UpdateTodo>
                <ClearCompletedTodos>
                  {
                    (clearCompletedTodos) => (
                      <ActionBar
                        clearCompletedTodos = {clearCompletedTodos}
                        refetch = {refetch}
                        count = {todos.length}
                        filter= {this.state.filter}
                        toggleFilter = {this.toggleFilter}
                      />
                    )
                  }
                </ClearCompletedTodos>
              </Fragment>
            }}
          </GetAllTodos>
        </Wrapper>
      </Fragment>
    );
  }
}

const Wrapper = styled.section`
  background: #fff;
  margin: 60px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;
