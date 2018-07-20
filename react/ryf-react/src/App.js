import React, { Component } from 'react';
// 对react ui 阿里的antd 部份引用
import { Table, Pagination, Input, Row, Button, Modal, Form, message } from 'antd';
import 'antd/dist/antd.css';
import './App.css'
import axios from 'axios'
const { Search } = Input;
const FormItem = Form.Item;
const { confirm } = Modal;

class App extends Component {
  columns = [
    {
      dataIndex: "username",
      title: '用户'
    },{
      dataIndex: "age",
      title: '年龄'
    },{
      dataIndex: "address",
      title: '地址'
    },{
      dataIndex: "action",
      title: "操作",
      width: 200,
      render: (text, row) => {
        return (
          <div>
            <Button type="primary" onClick={()=> {this.modal('edit', row)}}>编辑</Button>
            <Button type="danger"style={{marginLeft: 10}} onClick={ ()=> this.remove(row) }>删除</Button>
          </div>
        )
      }
    }
  ]
  state = {
    visible: false,
    users: [
      {
        username: 'zk',
        age: 18,
        address: '杭州',
        id: 1
      },
      {
        username: 'zll',
        age: 18,
        address: '杭州',
        id: 2
      },
     
    ],
    modalType: "add",
    id: 3,
    editRow:{}
  }
  render() {
    // 容器组件：将App包在Form内，export default Form.create()(App) 封装，this.props.form 拿出
    // 可在 react-dev-tool 中查看，最外层标签为 <Form(App)></Form(App)>
    // 解构：获取一个字段的装饰器(表单验证)
    // 装饰者模式
    const { getFieldDecorator } = this.props.form

    const FormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
    }
    return (
      <div className="App">
        <Row>
          <Search style={{width: 300}} onChange={this.searchUser.bind(this)}/>
          <Button type="primary" style={{marginLeft: 20}} onClick={() => this.modal('add')}>添加用户</Button>
        </Row>
        <Row style={{paddingTop: 20}}>
          <Table dataSource={this.state.users} columns={this.columns} rowKey={row => row.id} bordered pagination={false}/>
        </Row>
        <Modal title={this.state.modalType === 'add' ? "添加用户" : "编辑用户"} visible={this.state.visible} onCancel={()=>this.setState({visible:false})} onOk= {()=> this.handleOk()}>
          <Form>
            <FormItem label="用户" {...FormItemLayout}>
              {
                getFieldDecorator('username', {
                  rules: [{ required: true, message: '  Please input your username'}]
                })(<Input placeholder="UserName"/>)
              }
            </FormItem>
            <FormItem label="年龄" {...FormItemLayout}>
              {
                getFieldDecorator('age', {
                  rules: [{required: true, message: 'Please input your age'}]
                })(<Input placeholder="age"/>)
              }
            </FormItem>
            <FormItem label="地址" {...FormItemLayout}>
              {
                getFieldDecorator('address', {
                  rules: [{required: true, message: 'Please input your address'}]
                })(<Input placeholder="address"/>)
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
  searchUser() {
    axios.get('http://localhost:3006/user')
      .then(data => {
        console.log(data.data);
      })
  }
  // 删除用户
  remove (row) {
    const that = this
    confirm({
      title: '是否要删除用户',
      okText: '是',
      cancelText: '否',
      onOk () {
        const _users = that.state.users.filter(data => {
          return data.id !== row.id
        })
        that.setState({
          users: _users
        })
      }
    })
  }
  handleOk () {
    // 验证表单API validateFieldsAndScroll 使用了 异步回调
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {username, age, address} = values;
      const _id = this.state.id++;
      
      if (!err) {
        // 表单验证通过
        // if (this.state.modalType === 'add')  {
        //   // 添加用户
        //   this.state.users.push({
        //     username,age,address,
        //     id: _id
        //   })
        // } else {
        //   // 编辑用户信息
        //   this.state.users.forEach((item)=>{
        //     if(item.id === this.state.editRow.id) {
        //         item= Object.assign(item,values)
        //     }
        //   })
        // }
        
        let data = {
          username: values.username,
          age: values.age,
          address: values.address
        };
        console.log(data);
        axios.post('http://127.0.0.1:3006/user', data)
          .then(msg => {
            console.log(msg);
            this.setState({
              visible: false,
            });
            message.success('添加成功');
          })
      }
    })
  }
  modal (type, row) {
    this.setState({
      visible: true,
      modalType: type
    }, () => {
      this.props.form.resetFields();
      if (type === 'add') return;
      // setFieldsValue API  设置每个FormItem 的 value
      this.props.form.setFieldsValue({
        username: row.username,
        age: row.age,
        address: row.address
      })
      // editRow 表示当前编辑的数据项
      this.setState({editRow: row})
    })
  }
}

export default  Form.create()(App);
