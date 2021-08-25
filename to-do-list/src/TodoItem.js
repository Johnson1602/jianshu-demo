import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  render() {
    // 建议先把变量单独拿出来写，这样在后续使用的时候就不用每次都写一大长串了
    const { item } = this.props;
    return (
      <li
        onClick={this.deleteItem}
      >{item}</li>
    )
  }

  deleteItem() {
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }
}

export default TodoItem;