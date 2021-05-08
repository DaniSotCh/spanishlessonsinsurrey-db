import {
    Form, Input, Button, Row, Col, Modal, PageHeader, DatePicker
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { saveCompany, updateCompany } from '../../networking/NetworkingCompany';
import moment from 'moment';

const { TextArea } = Input;
const dateFormat = "YYYY-MM-DD";
export default class CompanyForm extends React.Component {
    formRefCompany = React.createRef();
    state = {
        //serviceList: servicesList(),
        //Form Values
        companyKey: 0,
        companyName: '',
        companyEmail: '',
        telephone: '',
        companyCity: '',
        companyFound: '',
        companyComment: '',
        companyAddress: '',
        companyService: '',
        companyPostalCode: '',
        companyDate: moment(),
        position: '',
        representative: '',

        showDeleteAlert: false,
        content: ''
    }
    componentDidMount() {
        if (this.props.companyObj != null) {
            this.setState({
                companyKey: this.props.companyObj.KEY,
                companyName: this.props.companyObj['COMPANY NAME'],
                companyEmail: this.props.companyObj.EMAIL,
                telephone: this.props.companyObj.TELEPHONE,
                companyCity: this.props.companyObj.CITY,
                companyFound: this.props.companyObj.FOUND,
                companyComment: this.props.companyObj.COMMENTS,
                companyAddress: this.props.companyObj.ADDRESS,
                companyService: this.props.companyObj.SERVICE,
                companyPostalCode: this.props.companyObj.POSTALCODE,
                companyDate: moment(this.props.companyObj.DATE),
                position: this.props.companyObj.POSITION,
                representative: this.props.companyObj.REPRESENTATIVE,
            });
            this.formRefCompany.current.setFieldsValue({
                companyKey: this.props.companyObj.KEY,
                companyName: this.props.companyObj['COMPANY NAME'],
                companyEmail: this.props.companyObj.EMAIL,
                telephone: this.props.companyObj.TELEPHONE,
                companyCity: this.props.companyObj.CITY,
                companyFound: this.props.companyObj.FOUND,
                companyComment: this.props.companyObj.COMMENTS,
                companyAddress: this.props.companyObj.ADDRESS,
                companyService: this.props.companyObj.SERVICE,
                companyPostalCode: this.props.companyObj.POSTALCODE,
                companyDate: moment(this.props.companyObj.DATE),
                position: this.props.companyObj.POSITION,
                representative: this.props.companyObj.REPRESENTATIVE,
            })
        }
    }
    handleCompanyNameChange = (event) => {
        this.setState({ companyName: event.target.value })
    }
    handlePositionChange = (event) => {
        this.setState({ position: event.target.value })
    }
    handleRepresentativeChange = (event) => {
        this.setState({ representative: event.target.value })
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
    handleCompanyServiceChange = (event) => {
        this.setState({ companyService: event.target.value })
    }
    handleCompanyPostalCodeChange = (event) => {
        this.setState({ companyPostalCode: event.target.value })
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
    handleCompanyDateChange = (companyDate, dateString) => {
        this.setState({ companyDate: dateString })
    }
    SaveClick = () => {
        let model = {
            Name: this.state.companyName,
            Representative: this.state.representative,
            Position: this.state.position,
            Email: this.state.companyEmail,
            Telephone: this.state.telephone,
            Date: this.state.companyDate,
            Service: this.state.companyService,
            Address: this.state.companyAddress,
            City: this.state.companyCity,
            Postcode: this.state.companyPostalCode,
            Found: this.state.companyFound,
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
        this.formRefCompany.current.setFieldsValue({
            //Form Values
            companyKey: 0,
            companyName: '',
            companyEmail: '',
            telephone: '',
            companyCity: '',
            companyFound: '',
            companyComment: '',
            companyAddress: '',
            companyService: '',
            companyPostalCode: '',
            position: '',
            representative: '',
        });
        this.setState({
            //Form Values
            companyKey: 0,
            companyName: '',
            companyEmail: '',
            telephone: '',
            companyCity: '',
            companyFound: '',
            companyComment: '',
            companyAddress: '',
            companyService: '',
            companyPostalCode: '',
            position: '',
            representative: '',
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
                    title={this.props.companyObj != null ? this.props.companyObj['COMPANY NAME'] : 'New Company'}
                />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        //minHeight: 670,
                    }}
                >
                    <Form ref={this.formRefCompany} labelCol={{ span: 14 }} wrapperCol={{ span: 22 }} layout="vertical" initialValues={{ size: '10px' }} size={'middle'}>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="companyName"
                                    label="Company Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input a company name',
                                        }
                                    ]}>
                                    <Input
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
                                            message: 'Please input a representative',
                                        }
                                    ]}>
                                    <Input
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
                                            message: 'Please input a position',
                                        }
                                    ]}>
                                    <Input
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
                                        value={this.state.telephone}
                                        onChange={this.handleTelephoneChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="companyDate"
                                    label="Date"
                                >
                                    <DatePicker
                                        className="w-100"
                                        format={dateFormat}
                                        value={this.state.companyDate}
                                        onChange={this.handleCompanyDateChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="companyAddress"
                                    label="Address"
                                >
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