import React, { Component } from 'react'
import { Form, Icon, Input, Button,} from 'antd';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'
import { NavLink } from 'react-router-dom'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`


class NormalLoginForm extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    username: '',
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { login, email, password, username } = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username"
                onChange={e => this.setState({ username: e.target.value })} />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Mutation
              mutation={LOGIN_MUTATION}
              variables={{ username, password }}
              onCompleted={data => this._confirm(data)}
            >
              {mutation => (
                <Button type="primary" htmlType="submit" className="login-form-button"
                  onClick={mutation}>
                  Log in
              </Button>
              )}
            </Mutation>

            Or
            <NavLink to="/">
              Sign up
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    );
  }
  _confirm = async data => {
    const { token } = data.tokenAuth
    this._saveUserData(token)
    this.props.history.push(`/`)
  }
  
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;