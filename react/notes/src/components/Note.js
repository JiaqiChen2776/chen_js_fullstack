import React, { Component } from 'react';
import _ from 'lodash'
import moment from 'moment';
// 设定时区
import 'moment/locale/zh-cn';
moment.locale('zh-CN');

class Note extends Component {
  state = {
      entity: this.props.entity,
      text: this.props.entity.text,
      open: false,
      updated: this.props.entity.meta.updated || this.props.entity.meta.created,
      destoryEntity: this.props.destoryEntity
  }
  updated() {
    // moment 库，将时间戳格式化
    return moment(this.state.updated).fromNow()
  }
  header() {
    // lodash _.truncate 去除文本前后空格
    return _.truncate(this.state.text, { length: 30 }) || '新建笔记';
  }
  words() {
    return this.state.text.length
  }
  toggle() {
    this.setState((prevState) => {
      return {
        open: !prevState.open
      }
    })
  }
  render() {
    return (
      <div className="item">
        <div className="meta">{ this.updated() }</div>
        <div className="content" onClick={this.toggle.bind(this)}>
          { this.header() }
          <div className="extra">
            { this.words()}字
            { this.state.open && <i className="right floated trash on line icon" onClick={() => 
                this.state.destoryEntity(this.state.entity)
            }></i>}
          </div>
        </div>
        
       
      </div>
    );
  }
}

export default Note;
