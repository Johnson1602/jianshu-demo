import React, { Component, Fragment } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './style.css';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    }
    // 建议把绑定 this 的步骤放在构造函数中，可以提升代码性能
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor="input-box">Your input: </label>
          <input type="text"
            id="input-box"
            className="input"
            // 用状态中的数据设置 input 框中的内容
            value={this.state.inputValue}
            // 当向输入框中输入内容时，显示的内容要跟着更新
            onChange={this.handleInputChange}
            ></input>
          <button onClick={this.handleBtnClick}>Add</button>
        </div>

        <ul>
          {
            // 建议把成块的 js 代码单独抽离出去变成一个方法，可以优化 JSX 的书写和阅读
            this.getListItem()
            // 使用js，遍历 this.state.list 列表，将其中的每个元素显示在 to do list 的列表中
            // this.state.list.map((value, index) => {
            //   return (
            //     <li key={index}
            //       onClick={this.handleItemDelete.bind(this, index)}
            //       // 如果想要不转义，要设置这个属性
            //       dangerouslySetInnerHTML={{__html: value}}>
            //     {/* {value} */}
            //     </li>
            //   )
            // })

            // 使用子组件的方式向页面渲染 TodoItems
            // this.state.list.map((item, index) => {
            //   return (
            //     <TodoItem 
            //       item={item}
            //       index={index}
            //       // 这里要 bind 父组件的 this，因为子组件中没有这个方法，不 bind 的话会报错
            //       deleteItem={this.handleItemDelete}
            //     />
            //   )
            // })
          }
        </ul>
      </Fragment>
    )
  }

  componentDidMount() {
    axios.get('/api/todolist')
         .then((res) => {
           console.log(res.data);
           this.setState(() => ({
               list: [...res.data]
           }))
         })
         .catch(() => console.log('err'));
  }

  getListItem() {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem
          key={index}
          item={item}
          index={index}
          // 这里要 bind 父组件的 this，因为子组件中没有这个方法，不 bind 的话会报错
          deleteItem={this.handleItemDelete}
        />
      )
    })
  }

  handleInputChange(e) {
    // this.setState({
    //   inputValue: e.target.value
    // })
    const value = e.target.value;
    // 从 React 16 开始推荐给 setState() 方法传入一个回调函数，在回调函数中返回修改的 state 对象
    this.setState(() => {
      return {
        inputValue: value
      }
    })
  }

  handleBtnClick() {
    if (this.state.inputValue) {
      // this.setState({
      //   list: [...this.state.list, this.state.inputValue],
      //   inputValue: ''
      // })
      this.setState((prevState) => {
        return {
          list: [...prevState.list, this.state.inputValue],
          inputValue: ''
        }
      })
    }
  }

  handleItemDelete(index) {
    // for (let i = 0; i < this.state.list.length; i++) {
    //   console.log(this.state.list[i], i);
    // }
    // console.log('----------');
    // const newList = [...this.state.list];
    // 这里之所以可以使用 index 删除元素，而不会导致下次删除时 index 出错，是因为在下面 setState 时，重新为元素设置了 index
    // 每删除一个元素，index 就从 0 到 length-1 重置，这中间不会有间隔，也就不会出现 index 溢出的问题
    // newList.splice(index, 1);
    // for (let i = 0; i < newList.length; i++) {
    //   console.log(newList[i], i);
    // }
    // this.setState({
    //   list: newList
    // })
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return {
        list: list
      }
    })
  }
}

export default TodoList;