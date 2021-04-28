import {
    Form, Input, Button, DatePicker, InputNumber, TreeSelect, Row, Col,
} from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { levelList } from '../../resources/PackageResource';

const { TextArea } = Input;
export default class ClientForm extends React.Component {
    state = {
        serviceList: [],
        //Form Values
        clientName: '',
        clientEmail: '',
        telephone: '',
        clientCity: '',
        levelValue: '',
        clientFound: '',
        clientComment: '',
        clientAddress: ''
    }
    componentDidMount() {
        if (this.props.clientObj != null) {
            this.setState({
                clientName: this.props.clientObj.NAME,
                clientEmail: this.props.clientObj.EMAIL,
                telephone: this.props.clientObj.TELEPHONE,
                clientCity: this.props.clientObj.CITY,
                levelValue: this.props.clientObj.LEVEL,
                clientFound: this.props.clientObj.FOUND,
                clientComment: this.props.clientObj.COMMENTS,
                clientAddress: this.props.clientObj.ADDRESS,
            })
        }
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
    handleClientFoundChange = (event) => {
        this.setState({ clientFound: event.target.value })
    }
    handleClientCommentChange = (event) => {
        this.setState({ clientComment: event.target.value })
    }
    handleClientAddressChange = (event) => {
        this.setState({ clientAddress: event.target.value })
    }
    SaveClick = () => {
        let clientObj = {
            KEY: this.state.KEY,
            NAME: this.state.clientName,
            TELEPHONE: this.state.telephone,
            EMAIL: this.state.clientEmail,
            SERVICE: this.state.serviceList,
            LEVEL: this.state.levelValue,
            FOUND: this.state.clientFound,
            CITY: this.state.clientCity,
            ADDRESS: this.state.clientAddress,
            COMMENTS: this.state.clientComment,
        }
        debugger
    }
    handleBack = () => {
        this.clearData();
        this.props.returnClick();
    }
    clearData = () => {
        this.setState({
            serviceList: [],
            //Form Values
            clientName: '',
            clientEmail: '',
            telephone: '',
            clientCity: '',
            levelValue: '',
            clientFound: '',
            clientComment: '',
            clientAddress: ''
        })
    }
    render() {
        return (
            <div>
                <Header className="site-layout-background">
                    <ArrowLeftOutlined onClick={this.handleBack} style={{ marginRight: '5px' }} />
                    {this.props.clientObj != null ? this.props.clientObj.NAME : 'New Client'}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 670,
                    }}
                >
                    <Form labelCol={{ span: 14 }} wrapperCol={{ span: 22 }} layout="vertical" initialValues={{ size: '10px' }} size={'middle'}>
                        <Row>
                            <Col span={12}>
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
                                        defaultValue={this.props.clientObj != null ? this.props.clientObj.NAME : ''}
                                        value={this.state.clientName}
                                        onChange={this.handleClientNameChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['user', 'email']}
                                    label="Email"
                                    rules={[
                                        {
                                            type: 'email',
                                        },
                                    ]}>
                                    <Input
                                        defaultValue={this.props.clientObj != null ? this.props.clientObj.EMAIL : ''}
                                        value={this.state.clientEmail}
                                        onChange={this.handleClientEmailChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="phone"
                                    label="Telephone"
                                >
                                    <Input
                                        defaultValue={this.props.clientObj != null ? this.props.clientObj.TELEPHONE : ''}
                                        value={this.state.telephone}
                                        onChange={this.handleTelephoneChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="City/Town">
                                    <Input
                                        value={this.state.clientCity}
                                        onChange={this.handleClientCityChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Level">
                                    <TreeSelect
                                        placeholder="Select a level"
                                        treeData={levelList()}
                                        value={this.state.levelValue}
                                        onChange={this.handleLevelChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Address">
                                    <Input
                                        value={this.state.clientAddress}
                                        onChange={this.handleClientAddressChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Comments">
                                    <TextArea
                                        value={this.state.clientComment}
                                        onChange={this.handleClientCommentChange}
                                        rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="How you found us">
                                    <TextArea
                                        value={this.state.clientFound}
                                        onChange={this.handleClientFoundChange}
                                        rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* <Form.Item label="DatePicker">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="InputNumber">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Switch">
                            <Switch />
                        </Form.Item> */}
                        <Form.Item label="">
                            <Button
                            type="primary"
                            size={'large'}
                                onClick={this.SaveClick}>
                                Save
                                </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </div>
        )
    }
}