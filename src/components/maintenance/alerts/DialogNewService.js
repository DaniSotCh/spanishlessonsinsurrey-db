import { Col, DatePicker,Form, Row, TreeSelect } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

export default class DialogNewService extends React.Component {
    formRef = React.createRef();
    state = {
        openNewService: false,
        ServiceName: '',
        ServiceValue: '',
        ServiceDate: '',
        serviceList: []
    }
    componentDidUpdate(prevProps) {
        if (this.props.servicesList != null && prevProps.servicesList !== this.props.servicesList) {
            this.setState({ serviceList: this.props.servicesList })
        }
    }
    AddService = () => {
        //{ 'SERVICE NAME': 'Spanish Private'', 'DATE': '1/1/2009' }
        let model = {
            'Value': this.state.ServiceValue,
            'Service Name': this.state.ServiceName,
            'Date': this.state.ServiceDate
        }
        this.props.addService(model);
        this.CancelService();
    }
    CancelService = () => {
        this.setState({ ServiceDate: '', ServiceValue: '', ServiceName: '' });
        this.formRef.current.setFieldsValue({ ServiceDate: '', ServiceValue: '', ServiceName: '' });
        this.props.close();
    }
    handleServiceDateChange = (date, dateString) => {
        this.setState({ ServiceDate: dateString })
    }
    handleServiceChange = (value, element) => {
        this.setState({ ServiceName: element[0], ServiceValue: value })
    }
    render() {
        return (
            <Modal
                title="New Service"
                centered
                visible={this.props.open}
                onOk={this.AddService}
                onCancel={this.CancelService}
                okText={"Add"}
            >
                <Form ref={this.formRef} layout="vertical" wrapperCol={{ span: 22 }} name="userForm" initialValues={{ size: '10px' }}>
                    <Row>
                        <Col span={12}>
                            <Form.Item name="ServiceName" label="Service">
                                <TreeSelect
                                    placeholder="Select a service"
                                    treeData={this.state.serviceList}
                                    value={this.state.ServiceName}
                                    onChange={this.handleServiceChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="ServiceDate" label="Date">
                                <DatePicker
                                    className="w-100"
                                    value={this.state.ServiceDate}
                                    onChange={this.handleServiceDateChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}