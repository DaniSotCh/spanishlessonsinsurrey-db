import React from 'react';

import { Button, Input, Layout, Form, Row, Col, } from 'antd';
import DynamicTable from '../../shared/DynamicTable';

const { Header, Content } = Layout;
const data = [
    {
        key: 1,
        Name: 'CLIENT NOW',
    },
    {
        key: 2,
        Name: 'CLIENT PAST',
    },
    {
        key: 3,
        Name: 'CLUB MEMBER',
    },
    {
        key: 4,
        Name: 'CLUB VISITOR'
    },
    {
        key: 5,
        Name: 'GROUPS'
    },
    {
        key: 6,
        Name: 'PRIVATE EXPRESS'
    },
    {
        key: 7,
        Name: 'PRIVATE BLOCK'
    },
    {
        key: 8,
        Name: 'PRIVATE GCSE'
    },
    {
        key: 9,
        Name: 'PRIVATE ALEVEL'
    },
];
export default class ClientsScreen extends React.Component {
    state = {
        keyService: 0,
        serviceName: ''
    }
    handleRowClick = (obj) => {
        this.setState({ clientForm: true, client: obj })
    }
    handleDeleteClick = (obj) => {
        console.log(obj)
    }
    handleBackClick = () => {
        this.setState({ clientForm: false })
    }
    NewClientClick = () => {
        this.setState({ clientForm: true, client: null, keyClient: 0 })
    }
    handleServicetNameChange = (event) => {
        this.setState({ serviceName: event.target.value });
    }
    SaveClick = () => {

    }
    render() {
        let clientScreen = (<div>
            <Header className="site-layout-background">
                Services
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
                    <Row align="bottom">
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label="Service Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a service name',
                                    }
                                ]}>
                                <Input
                                    value={this.state.serviceName}
                                    onChange={this.handleServicetNameChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    size={'large'}
                                    onClick={this.SaveClick}>
                                    Save
                    </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <DynamicTable
                    id="clients-table"
                    hiddenHeaders={['key']}
                    data={data}
                    enableClick={true}
                    useCheckBox={false}
                    useDeleteButton={true}
                    deleteFunction={this.handleDeleteClick.bind(this)}
                    clickFunction={this.handleRowClick.bind(this)}
                />
            </Content>
        </div>);

        return clientScreen
    }
}