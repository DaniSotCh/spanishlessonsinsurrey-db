import React from 'react';

import { Button, Input, Layout, Form, Row, Col,PageHeader } from 'antd';
import DynamicTable from '../../shared/DynamicTable';

const { Header, Content } = Layout;
const data = [
    {
        key: 1,
        Name: 'Beginners'
    },
    {
        key: 2,
        Name: 'Beginners II'
    },
    {
        key: 3,
        Name: 'Beginners III'
    },
    {
        key: 4,
        Name: 'GCSE'
    },
    {
        key: 5,
        Name: 'Pre Intermediate'
    },
    {
        key: 6,
        Name: 'Intermediate'
    },
    {
        key: 7,
        Name: 'Upper Intermediate'
    },
    {
        key: 8,
        Name: 'Advanced - Alevel'
    },
    {
        key: 9,
        Name: 'Proffesional'
    }
];
export default class LevelsScreen extends React.Component {
    formRef = React.createRef();
    state = {
        keyLevel: 0,
        levelName: ''
    }
    handleRowClick = (obj) => {
        this.formRef.current.setFieldsValue({ levelName: obj.Name })
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
    handleLevelNameChange = (event) => {
        this.setState({ levelName: event.target.value });
    }
    SaveClick = () => {

    }
    ClearClick = () => {
        this.formRef.current.setFieldsValue({ levelName: ' ' })
    }
    render() {
        let clientScreen = (<div>            
            <PageHeader
                className="site-page-header"
                title="Levels"
            />
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    //minHeight: 670,
                }}
            >

                <Form ref={this.formRef} labelCol={{ span: 14 }} wrapperCol={{ span: 22 }} layout="vertical" initialValues={{ size: '10px' }} size={'middle'}>
                    <Row align="bottom">
                        <Col span={12}>
                            <Form.Item
                                name="levelName"
                                label="Level Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a level name',
                                    }
                                ]}>
                                <Input
                                    value={this.state.levelName}
                                    onChange={this.handleLevelNameChange}
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
                                <Button
                                    htmlType="clear"
                                    type="primary"
                                    size={'large'}
                                    onClick={this.ClearClick}>
                                    Clear
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