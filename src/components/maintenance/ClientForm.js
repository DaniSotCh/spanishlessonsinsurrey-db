import {
    Form, Input, Button, DatePicker, InputNumber, TreeSelect, Switch,
} from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';
import { levelList } from '../../resources/PackageResource';

export default class ClientForm extends React.Component {
    state = {
        clientForm: false,
        //Form Values
        clientName: '',
        clientEmail: '',
        telephone: '',
        clientCity: '',
        levelValue: ''
    }
    handleClientNameChange = (event) => {
        this.setState({ clientName: event.target.value })
    }
    handleClientEmailChange = (event) => {
        this.setState({ clientEmail: event.target.value })
    }
    handleTelephoneChange = (event) => {
        this.setState({ telephone: event.target.value })
    }
    handleClientCityChange = (event) => {
        this.setState({ clientCity: event.target.value })
    }
    handleLevelChange = (value) => {
        this.setState({ levelValue: value })
    }
    render() {
        return (
            <div>
                <Header className="site-layout-background">
                    {this.props.clientObj != null && this.props.clientObj.NAME}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 670,
                    }}
                >
                    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="vertical" initialValues={{ size: '10px' }} size={'middle'}>
                        <Form.Item
                            name="username"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                }
                            ]}>
                            <Input
                                value={this.state.clientName}
                                onChange={this.handleClientNameChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'email']}
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                },
                            ]}>
                            <Input
                                value={this.state.clientEmail}
                                onChange={this.handleClientEmailChange}
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Telephone"
                        >
                            <Input
                                //addonBefore={prefixSelector}
                                value={this.state.telephone}
                                onChange={this.handleTelephoneChange}
                                pattern={"[0-9]{7,15}"}
                            />
                        </Form.Item>

                        <Form.Item label="City/Town">
                            <Input
                                value={this.state.clientCity}
                                onChange={this.handleClientCityChange}
                            />
                        </Form.Item>

                        <Form.Item label="Level">
                            <TreeSelect
                                treeData={levelList()}
                                value={this.state.levelValue}
                                onChange={this.handleLevelChange}
                            />
                        </Form.Item>

                        <Form.Item label="DatePicker">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="InputNumber">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Switch">
                            <Switch />
                        </Form.Item>
                        <Form.Item label="Button">
                            <Button>Button</Button>
                        </Form.Item>
                    </Form>
                </Content>
            </div>
        )
    }
}