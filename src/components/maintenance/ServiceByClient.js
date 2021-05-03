import {
    Form, Input, Button, DatePicker, InputNumber, TreeSelect, Row, Col, Select, Space, PageHeader, Card,List
} from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { serviceByClientList, servicesList } from '../../resources/PackageResource';
import DynamicTable from '../../shared/DynamicTable';

const { TextArea } = Input;
const { Option } = Select;
let data = [];
export default class ServiceByClient extends React.Component {
    formRef = React.createRef();
    state = {
        serviceList: servicesList(),
        //Form Values
        clientName: '',
        clientEmail: '',
        telephone: '',
        clientCity: '',
        levelValue: '',
        clientFound: '',
        clientComment: '',
        clientAddress: '',
        servicesSelected: [],
        dateSelected: []
    }
    componentDidMount() {
        data = serviceByClientList();
        if (this.props.clientName != null && this.props.clientName !== '' && data.length > 0) {
            let helper = []
            data.forEach(element => {
                if (element['CLIENT NAME'] === this.props.clientName) {
                    helper.push(element);
                }
            })
            data = helper;
        } else if (this.props.clientName === '') {
            data = [];
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
        let clientObj = {
            KEY: this.state.KEY,
            NAME: this.state.clientName,
            TELEPHONE: this.state.telephone,
            EMAIL: this.state.clientEmail,
            SERVICE: this.state.servicesSelected,
            LEVEL: this.state.levelValue,
            FOUND: this.state.clientFound,
            CITY: this.state.clientCity,
            ADDRESS: this.state.clientAddress,
            COMMENTS: this.state.clientComment,
        }
        debugger
    }
    clearData = () => {
        this.formRef.current.setFieldsValue({
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
    handleDeleteClick = () => {

    }
    handleRowClick = () => {

    }
    render() {
        return (
            <Col span={8}>
                <DynamicTable
                    id="servbyclient-table"
                    hiddenHeaders={['CLIENT NAME']}
                    data={data}
                    enableClick={true}
                    useCheckBox={false}
                    useDeleteButton={true}
                    deleteFunction={this.handleDeleteClick.bind(this)}
                    clickFunction={this.handleRowClick.bind(this)}
                />
            </Col>
        )
    }
}