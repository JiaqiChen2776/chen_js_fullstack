import React, { Component } from 'react';
import { db, loadCollection } from '../database'
import Note from './Note';

class Notes extends Component {
  // react state , vue data
  state = {
    entities: []
  }
  constructor(props) {
    super(props)
    this.getInitialData()
  }
  getInitialData() {
    loadCollection('notes')
      .then(collection => {
        // console.log(collection)
        // 插入两条数据到 localStorage
        // collection.insert([
        //   {
        //     text: 'hello ~'
        //   },
        //   {
        //     text: 'hola ~'
        //   }
        // ]);
        // db.saveDatabase();

        // simplesort('$loki', 'isdesc') 按照字段倒序排序
        const entities = collection.chain()
          .find()
          .simplesort('$loki', 'isdesc')
          .data()
        console.log(entities)
        this.setState({
          entities
        })
      })
  }
  
  createEntry() {
    // console.log(this.state.entities);
    loadCollection('notes')
      .then((collection) => {
        const entity = collection.insert({
          text: ''
        })
        db.saveDatabase();
        this.setState((prevState) => {
          const _entities = prevState.entities;
          _entities.unshift(entity);
          return {
            entities: _entities
          }
        })
      })
  }
  destoryEntity(entity) {
      console.log(entity);
      const _entities = this.state.entities.filter((_entity) => {
        // $loki 相当于 id，唯一标识
        return _entity.$loki !== entity.$loki
      });
      this.setState({
        entities: _entities
      })

      loadCollection('notes')
        .then((collection) => {
          collection.remove(entity)
          db.saveDatabase()
        })
  }
  render() {
    // react 独有的JSX 写在render模板引擎中
    // 在 js 里直接写 html，在render里 return，html -> js node 是会被编译成 js 的
    // class 是关键字，类名必须为 className
    // bind() 返回一个新的函数体，并将内部 this 指向对应的对象
    const entities = this.state.entities;
    // map 将一个数组转换成一个 组件数组  JSX
    const noteItems = entities.map((entity, index) => 
        <Note key={ entity.$loki } entity={ entity } destoryEntity={ this.destoryEntity.bind(this) }/>
    )
    // console.log(noteItems);
    return (
      <div className="ui container notes">
          <h4 className="ui horizontal divider header">
              <i className="paw icon"></i>
              Notes App _ React.js
          </h4>
          <button className="ui right floated basic violet button" onClick={ this.createEntry.bind(this) }>添加笔记</button>
          <div className="ui divided items">
            { noteItems }
            { !this.state.entities.length && <span className="ui small disabled header">还没有笔记，请先添加</span> }
          </div>
      </div>
    );
  }
}

export default Notes;
