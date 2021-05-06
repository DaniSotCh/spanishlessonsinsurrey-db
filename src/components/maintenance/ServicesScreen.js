import React from 'react';

import { Button, Input, Layout, Form, Row, Col,PageHeader } from 'antd';
import DynamicTable from '../../shared/DynamicTable';
import { deleteServiceByID, getServices, saveService, updateService } from '../../networking/NetworkingService';

const { Header, Content } = Layout;
export default class ServicesScreen extends React.Component {
    formRef = React.createRef();
    state = {
        keyService: 0,
        serviceName: '',
        services:[]
    }
    componentDidMount(){
        this.getServices();
    }
    handleRowClick = (obj) => {
        this.formRef.current.setFieldsValue({ keyService: obj.key, serviceName: obj.Name })
        this.setState({ keyService: obj.key, serviceName: obj.Name })
    }
    handleDeleteClick = (obj) => {
        if (obj.key > 0) {
            deleteServiceByID(obj.key).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        console.log("ERROR")
                    } else {
                        this.getServices();
                    }
                }
            )
        }
    }
    handleBackClick = () => {
        this.setState({ clientForm: false })
    }
    NewClientClick = () => {
        this.setState({ clientForm: true, client: null, keyClient: 0 })
    }
    handleServiceNameChange = (event) => {
        this.setState({ serviceName: event.target.value });
    }
    getServices = ()=>{
        getServices().then(
            (json) => {
                if (json != null) {
                    let helper = [];
                    json.forEach(element => {
                        helper.push({
                            key: element.id,
                            Name: element.name
                        })
                    });
                    this.setState({ services: helper })
                }
            }
        )
    }
    SaveClick = () => {
        let model = {
            "Name": this.state.serviceName
        }
        if (this.state.keyService > 0) {
            updateService(this.state.keyService, model).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        console.log("ERROR")
                    } else {
                        this.getServices();
                        this.ClearClick();
                    }
                }
            )
        } else {
            saveService(model).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        console.log("ERROR")
                    } else {
                        this.getServices();
                        this.ClearClick();
                    }
                }
            )
        }
    }
    ClearClick = () => {
        this.formRef.current.setFieldsValue({ keyService: 0, serviceName: ' ' })
        this.setState({ keyService: 0, serviceName: 0 })
    }
    render() {
        let clientScreen = (<div>
            <PageHeader
                className="site-page-header"
                title="Services"
            />
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    //minHeight: '670',
                }}
            >

                <Form ref={this.formRef} labelCol={{ span: 14 }} wrapperCol={{ span: 22 }} layout="vertical" initialValues={{ size: '10px' }} size={'middle'}>
                    <Row align="bottom">
                        <Col span={12}>
                            <Form.Item
                                name="serviceName"
                                label="Service Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a service name',
                                    }
                                ]}>
                                <Input
                                    value={this.state.serviceName}
                                    onChange={this.handleServiceNameChange}
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
                    data={this.state.services}
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