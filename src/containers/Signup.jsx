import React from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'

const Option = Select.Option;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($age: Int,  $email: String!, $password: String!, $sex: String, $username: String!) {
    createUser(age: $age, email: $email, password: $password, sex: $sex, username:$username) {
        user{
            username
        }
    }
  }
`
class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        age: 20,
        email: '',
        password: '',
        sex: 'M',
        username: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const { age, email, password, sex, username, } = this.state


        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                    label="Username"
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                    })(
                        <Input onChange={e => this.setState({ username:e.target.value })} />
                    )}
                </Form.Item>
                <Form.Item
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" onChange={e => this.setState({ password:e.target.value })} />
                    )}
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input onChange={e => this.setState({ email:e.target.value })} />
                    )}
                </Form.Item>
                <Form.Item
                label="Sex"
                >
                {getFieldDecorator('sex', {
                    initialValue:"M",
                })(
                    <Select onChange={val => this.setState({ sex:val })}>
                        <Option value="M">Masculino</Option>
                        <Option value="W">Femenino</Option>
                    </Select>
                )}
                    
                </Form.Item>
                <Form.Item
                label="Age">
                    {getFieldDecorator('age', {
                        initialValue:20
                    })(
                          <InputNumber min={1} max={50} onChange={value => this.setState({ age:value })} />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                <Mutation mutation={SIGNUP_MUTATION}
                variables={{ age, email, password, sex, username }}
                >
                {mutation => (
                    <Button type="primary" htmlType="submit" onClick={mutation}>Register</Button>
                )}
                </Mutation>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;
