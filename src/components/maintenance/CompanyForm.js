import {
    Form, Input, Button, Row, Col, Modal, PageHeader, DatePicker
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { getLevels } from '../../networking/NetworkingLevel';
import { getServices } from '../../networking/NetworkingService';
import { saveCompany, updateCompany } from '../../networking/NetworkingCompany';

const { TextArea } = Input;
export default class CompanyForm extends React.Component {
    formRef = React.createRef();
    state = {
        //serviceList: servicesList(),
        //Form Values
        companyKey: 0,
        companyName: '',
        companyEmail: '',
        telephone: '',
        companyCity: '',
        levelValue: '',
        companyFound: '',
        companyComment: '',
        companyAddress: '',
        servicesSelected: [],
        dateSelected: [],
        servicesList: [],
        levelsList: [],

        showDeleteAlert: false,
        content: '',
        servicesByCompany: [],
        servicesByCompanySave: []
    }
    componentDidMount() {
        this.getServices();
        this.getLevels();
        if (this.props.companyObj != null) {
            this.setState({
                companyKey: this.props.companyObj.KEY,
                companyName: this.props.companyObj.NAME,
                companyEmail: this.props.companyObj.EMAIL,
                telephone: this.props.companyObj.TELEPHONE,
                companyCity: this.props.companyObj.CITY,
                levelValue: this.props.companyObj.LEVELID,
                companyFound: this.props.companyObj.FOUND,
                companyComment: this.props.companyObj.COMMENTS,
                companyAddress: this.props.companyObj.ADDRESS,
                servicesByCompany: this.props.companyObj.SERVICE
            });
            this.formRef.current.setFieldsValue({
                companyKey: this.props.companyObj.KEY,
                companyName: this.props.companyObj.NAME,
                companyEmail: this.props.companyObj.EMAIL,
                telephone: this.props.companyObj.TELEPHONE,
                companyCity: this.props.companyObj.CITY,
                levelValue: this.props.companyObj.LEVELID,
                companyFound: this.props.companyObj.FOUND,
                companyComment: this.props.companyObj.COMMENTS,
                companyAddress: this.props.companyObj.ADDRESS,
                servicesByCompany: this.props.companyObj.SERVICE
            })
        }
    }

    getServices = () => {
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
    handleCompanyNameChange = (event) => {
        this.setState({ companyName: event.target.value })
    }
    handleCompanyEmailChange = (event) => {
        this.setState({ companyEmail: event.target.value })
    }
    handleTelephoneChange = (event) => {
        this.setState({ telephone: event.target.value })
    }
    handleCompanyCityChange = (event) => {
        this.setState({ companyCity: event.target.value })
    }
    handleLevelChange = (value) => {
        this.setState({ levelValue: value.value })
    }
    handleCompanyFoundChange = (event) => {
        this.setState({ companyFound: event.target.value })
    }
    handleCompanyCommentChange = (event) => {
        this.setState({ companyComment: event.target.value })
    }
    handleCompanyAddressChange = (event) => {
        this.setState({ companyAddress: event.target.value })
    }
    SaveClick = () => {
        let model = {
            Name: this.state.companyName,
            Telephone: this.state.telephone,
            Email: this.state.companyEmail,
            CompanyServices: this.state.servicesByCompanySave,
            LevelId: this.state.levelValue,
            Found: this.state.companyFound,
            City: this.state.companyCity,
            Address: this.state.companyAddress,
            Comments: this.state.companyComment,
        }
        if (this.state.companyKey > 0) {
            updateCompany(this.state.companyKey, model).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        this.setState({ content: 'An error ocurred while saving a company. Please, try again.' })
                        this.error()
                    } else {
                        this.setState({ content: 'The company have been saved' })
                        this.success();
                        this.getLevels();
                    }
                }
            )
        } else {
            saveCompany(model).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        this.setState({ content: 'An error ocurred while saving a company. Please, try again.' })
                        this.error()
                    } else {
                        this.setState({ content: 'The company have been saved' })
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
            companyKey: 0,
            companyName: '',
            companyEmail: '',
            telephone: '',
            companyCity: '',
            levelValue: '',
            companyFound: '',
            companyComment: '',
            companyAddress: ''
        });
        this.setState({
            serviceList: [],
            //Form Values
            companyKey: 0,
            companyName: '',
            companyEmail: '',
            telephone: '',
            companyCity: '',
            levelValue: '',
            companyFound: '',
            companyComment: '',
            companyAddress: ''
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
    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header site-layout-background"
                    onBack={this.handleBack}
                    title={this.props.companyObj != null ? this.props.companyObj.NAME : 'New Company'}
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
                            <Col span={12}>
                                <Form.Item
                                    name="companyName"
                                    label="Company Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name',
                                        }
                                    ]}>
                                    <Input
                                        //defaultValue={this.props.companyObj != null ? this.props.companyObj.NAME : ''}
                                        value={this.state.companyName}
                                        onChange={this.handleCompanyNameChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="representative"
                                    label="Representative"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name',
                                        }
                                    ]}>
                                    <Input
                                        //defaultValue={this.props.companyObj != null ? this.props.companyObj.NAME : ''}
                                        value={this.state.representative}
                                        onChange={this.handleRepresentativeChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="position"
                                    label="Position"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name',
                                        }
                                    ]}>
                                    <Input
                                        //defaultValue={this.props.companyObj != null ? this.props.companyObj.NAME : ''}
                                        value={this.state.position}
                                        onChange={this.handlePositionChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="companyEmail"
                                    label="Email"
                                    rules={[
                                        {
                                            type: 'email',
                                        },
                                    ]}>
                                    <Input
                                        //defaultValue={this.props.companyObj != null ? this.props.companyObj.EMAIL : ''}
                                        value={this.state.companyEmail}
                                        onChange={this.handleCompanyEmailChange}
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
                                        //defaultValue={this.props.companyObj != null ? this.props.companyObj.TELEPHONE : ''}
                                        value={this.state.telephone}
                                        onChange={this.handleTelephoneChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="date" label="Date">
                                    <DatePicker
                                        className="w-100"
                                        value={this.state.date}
                                        onChange={this.handleDateChange} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item name="companyAddress" label="Address">
                                    <Input
                                        value={this.state.companyAddress}
                                        onChange={this.handleCompanyAddressChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="companyCity" label="City/Town">
                                    <Input
                                        value={this.state.companyCity}
                                        onChange={this.handleCompanyCityChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item name="companyPostalCode" label="Postal Code">
                                    <Input
                                        value={this.state.companyPostalCode}
                                        onChange={this.handleCompanyPostalCodeChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>

                            <Col span={12}>
                                <Form.Item name="companyService" label="Service">
                                    <TextArea
                                        value={this.state.companyService}
                                        onChange={this.handleCompanyServiceChange}
                                        rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="companyFound" label="How you found us">
                                    <TextArea
                                        value={this.state.companyFound}
                                        onChange={this.handleCompanyFoundChange}
                                        rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>
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