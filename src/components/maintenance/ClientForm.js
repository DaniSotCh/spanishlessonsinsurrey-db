import {
    Form, Input, Button, TreeSelect, Row, Col, Select, Modal, PageHeader
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { levelList, servicesList } from '../../resources/PackageResource';
import ServiceByClient from './ServiceByClient';
import { getLevels } from '../../networking/NetworkingLevel';
import { getServices } from '../../networking/NetworkingService';
import { saveClient, updateClient } from '../../networking/NetworkingClient';

const { TextArea } = Input;
const { Option } = Select;
export default class ClientForm extends React.Component {
    formRef = React.createRef();
    state = {
        //serviceList: servicesList(),
        //Form Values
        clientKey:0,
        clientName: '',
        clientEmail: '',
        telephone: '',
        clientCity: '',
        levelValue: '',
        clientFound: '',
        clientComment: '',
        clientAddress: '',
        servicesSelected: [],
        dateSelected: [],
        servicesList:[],
        levelsList:[],
        
        showDeleteAlert: false,
        content:'',
        servicesByClient:[],
        servicesByClientSave:[]
    }
    componentDidMount() {
        this.getServices();
        this.getLevels();
        if (this.props.clientObj != null) {
            this.setState({
                clientKey:this.props.clientObj.KEY,
                clientName: this.props.clientObj.NAME,
                clientEmail: this.props.clientObj.EMAIL,
                telephone: this.props.clientObj.TELEPHONE,
                clientCity: this.props.clientObj.CITY,
                levelValue: this.props.clientObj.LEVELID,
                clientFound: this.props.clientObj.FOUND,
                clientComment: this.props.clientObj.COMMENTS,
                clientAddress: this.props.clientObj.ADDRESS,
                servicesByClient:this.props.clientObj.SERVICE
            });
            this.formRef.current.setFieldsValue({
                clientKey:this.props.clientObj.KEY,
                clientName: this.props.clientObj.NAME,
                clientEmail: this.props.clientObj.EMAIL,
                telephone: this.props.clientObj.TELEPHONE,
                clientCity: this.props.clientObj.CITY,
                levelValue: this.props.clientObj.LEVELID,
                clientFound: this.props.clientObj.FOUND,
                clientComment: this.props.clientObj.COMMENTS,
                clientAddress: this.props.clientObj.ADDRESS,
                servicesByClient:this.props.clientObj.SERVICE
            })
        }
    }
    
    getServices = ()=>{
        getServices().then(
            (json) => {
                if (json != null) {
                    let helper = [];
                    json.forEach(element => {
                        helper.push({
                            value: element.id,
                            title: element.name
                        })
                    });
                    this.setState({ servicesList: helper })
                }
            }
        )
    }
    getLevels = () => {
        getLevels().then(
            (json) => {
                if (json != null) {
                    let helper = [];
                    json.forEach(element => {
                        helper.push({
                            value: element.id,
                            title: element.name
                        })
                    });
                    this.setState({ levelsList: helper })
                }
            }
        )
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
        this.setState({ levelValue: value.value })
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
    handleServiceChange = (value, obj) => {
        var helper = this.state.servicesSelected;

        helper = helper.filter((c) => c.key !== parseInt(obj.key));
        helper.push({ key: parseInt(obj.key), serviceName: value })

        this.setState({ servicesSelected: helper })
    }
    handleServiceDateChange = (key, date, dateString) => {
        var helper = this.state.dateSelected;

        helper = helper.filter((c) => c.key !== key);
        helper.push({ key: key, date: dateString })
        
        this.setState({ dateSelected: helper })
    }
    SaveClick = () => {
        let model = {
            Name: this.state.clientName,
            Telephone: this.state.telephone,
            Email: this.state.clientEmail,
            ClientServices: this.state.servicesByClientSave,
            LevelId: this.state.levelValue,
            Found: this.state.clientFound,
            City: this.state.clientCity,
            Address: this.state.clientAddress,
            Comments: this.state.clientComment,
        }
        if (this.state.clientKey > 0) {
            updateClient(this.state.clientKey, model).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        this.setState({ content: 'An error ocurred while saving a client. Please, try again.' })
                        this.error()
                    } else {
                        this.setState({ content: 'The client have been saved' })
                        this.success();
                        this.getLevels();
                    }
                }
            )
        } else {
            saveClient(model).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        this.setState({ content: 'An error ocurred while saving a client. Please, try again.' })
                        this.error()
                    } else {
                        this.setState({ content: 'The client have been saved' })
                        this.success();
                        this.getLevels();
                    }
                }
            )
        }
    }
    handleBack = () => {
        this.clearData();
        this.props.returnClick();
    }
    clearData = () => {
        this.formRef.current.setFieldsValue({
            serviceList: [],
            //Form Values
            clientKey: 0,
            clientName: '',
            clientEmail: '',
            telephone: '',
            clientCity: '',
            levelValue: '',
            clientFound: '',
            clientComment: '',
            clientAddress: ''
        });
        this.setState({
            serviceList: [],
            //Form Values
            clientKey: 0,
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
    success = () => {
        Modal.success({
            title: 'Success',
            content: this.state.content,
        });
    }

    error = () => {
        Modal.error({
            title: 'Error',
            content: this.state.content,
        });
    }
    addServicesByClient = (obj, objSave) => {
        this.setState({ servicesByClient: obj, servicesByClientSave: objSave })
    }
    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header site-layout-background"
                    onBack={this.handleBack}
                    title={this.props.clientObj != null ? this.props.clientObj.NAME : 'New Client'}
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
                        <Row>
                            <Col span={16}>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            name="clientName"
                                            label="Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your name',
                                                }
                                            ]}>
                                            <Input
                                                //defaultValue={this.props.clientObj != null ? this.props.clientObj.NAME : ''}
                                                value={this.state.clientName}
                                                onChange={this.handleClientNameChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="clientEmail"
                                            label="Email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                },
                                            ]}>
                                            <Input
                                                //defaultValue={this.props.clientObj != null ? this.props.clientObj.EMAIL : ''}
                                                value={this.state.clientEmail}
                                                onChange={this.handleClientEmailChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            name="telephone"
                                            label="Telephone"
                                        >
                                            <Input
                                                //defaultValue={this.props.clientObj != null ? this.props.clientObj.TELEPHONE : ''}
                                                value={this.state.telephone}
                                                onChange={this.handleTelephoneChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="clientCity" label="City/Town">
                                            <Input
                                                value={this.state.clientCity}
                                                onChange={this.handleClientCityChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item name="levelValue" label="Level">
                                            <TreeSelect
                                            labelInValue={true}
                                                placeholder="Select a level"
                                                treeData={this.state.levelsList}
                                                value={this.state.levelValue}
                                                onChange={this.handleLevelChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="clientAddress" label="Address">
                                            <Input
                                                value={this.state.clientAddress}
                                                onChange={this.handleClientAddressChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item name="clientComment" label="Comments">
                                            <TextArea
                                                value={this.state.clientComment}
                                                onChange={this.handleClientCommentChange}
                                                rows={4} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="clientFound" label="How you found us">
                                            <TextArea
                                                value={this.state.clientFound}
                                                onChange={this.handleClientFoundChange}
                                                rows={4} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>

                            <ServiceByClient
                                clientName={this.props.clientObj != null ? this.props.clientObj.NAME : ''}
                                servicesList={this.state.servicesList}
                                servicesByClient={this.state.servicesByClient}
                                addServicesByClient={this.addServicesByClient}
                            />
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