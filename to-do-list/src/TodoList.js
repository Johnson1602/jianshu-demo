import React, { Component, Fragment } from 'react';
import './style.css';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    }
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
            onChange={this.handleInputChange.bind(this)}
            ></input>
          <button onClick={this.handleBtnClick.bind(this)}>Add</button>
        </div>

        <ul>
          {
            // 使用js，遍历 this.state.list 列表，将其中的每个元素显示在 to do list 的列表中
            this.state.list.map((value, index) => {
              return (
              <li key={index}
                onClick={this.handleItemDelete.bind(this, index)}
                // 如果想要不转义，要设置这个属性
                dangerouslySetInnerHTML={{__html: value}}>
              {/* {value} */}
              </li>
              )
            })
          }
        </ul>
      </Fragment>
    )
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleBtnClick() {
    if (this.state.inputValue) {
      this.setState({
        list: [...this.state.list, this.state.inputValue],
        inputValue: ''
      })
    }
  }

  handleItemDelete(index) {
    // for (let i = 0; i < this.state.list.length; i++) {
    //   console.log(this.state.list[i], i);
    // }
    // console.log('----------');
    const newList = [...this.state.list];
    // 这里之所以可以使用 index 删除元素，而不会导致下次删除时 index 出错，是因为在下面 setState 时，重新为元素设置了 index
    // 每删除一个元素，index 就从 0 到 length-1 重置，这中间不会有间隔，也就不会出现 index 溢出的问题
    newList.splice(index, 1);
    // for (let i = 0; i < newList.length; i++) {
    //   console.log(newList[i], i);
    // }
    this.setState({
      list: newList
    })
  }
}

export default TodoList;