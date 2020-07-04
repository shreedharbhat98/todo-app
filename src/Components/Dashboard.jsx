import React, { Component } from 'react';
import "../App.css"
import TodoList from "./TodoList"
import { Container, TextField, Button, Table, TableBody, } from "@material-ui/core"
import Pagination from '@material-ui/lab/Pagination';
import { connect } from "react-redux";
import { addTodo } from "../Redux/action";
import TodoCompleted from "./TodoCompleted"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      pageNo: 1,
      tasks: []
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleAdd = () => {
    if(this.state.value === ""){
      alert("Enter a task");
      return;
    }
    this.props.addTodo(this.state.value)
    this.setState({value:""})
  }
  handlePages = (page) => {
    this.setState({ pageNo: page }, () => { })
  }

  render() {
    const { todo } = this.props
    var todos = 0;
    let offset = ((this.state.pageNo || 1) - 1) * 5
    var tasks = todo.filter(item => !item.status).filter((item, index) => index >= offset && index < offset + 5);

    if (tasks.length <= 0) {
      offset = ((this.state.pageNo - 1 || 1) - 1) * 5
      tasks = todo.filter(item => !item.status).filter((item, index) => index >= offset && index < offset + 5);
    }
    todo && todo.map(item => item.status === false ? todos++ : todos)

    var todoPages = Math.ceil(todos / 5);
    return (
      <>
        <Container maxWidth="lg">
          <h1 style={{ fontFamily: "'Lora', serif" }}>Todo App</h1>
          <TextField
            id="outlined-basic"
            label="Enter task"
            variant="outlined"
            size="small"
            autoFocus
            style={{ width: "70%", margin: "20px 20px" }}
            value={this.state.value}
            onChange={this.handleChange} />

          <Button onClick={this.handleAdd}
            variant="contained"
            color="primary"
            size="medium"
            style={{ margin: "20px 0px", width: "100px", padding: "7px" }} >
            ADD
        </Button>
        </Container >
        <Container>
          <Container style={{ minHeight: "275px" }} >
            <Table>
              <TableBody >
                {tasks.length === 0 ? <h2>No Tasks Available</h2> : null}
                {tasks.map((item) =>
                  <TodoList
                    key={item.id}
                    data={item} />
                )}
              </TableBody>
            </Table>
          </Container>
          {todos > 5 ?
            <Pagination
              count={todoPages}
              color="secondary"
              style={{ marginTop: 10 }}
              onChange={(event: null, page: number) => this.handlePages(page)} /> : null}
          <TodoCompleted />

        </Container>
      </>
    );

  }
}

const mapStateToProps = state => ({
  todo: state.todo
})

const mapDispatchToProps = dispatch => ({
  addTodo: payload => dispatch(addTodo(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
