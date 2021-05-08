import {
    Col, PageHeader, Button,Modal
} from 'antd';
import React from 'react';
import { serviceByClientList, servicesList } from '../../resources/PackageResource';
import DynamicTable from '../../shared/DynamicTable';
import { PlusCircleOutlined } from '@ant-design/icons';
import DialogNewService from './alerts/DialogNewService';
let data = [];
let objService = null;
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
        dateSelected: [],
        openNewService: false,
        showDeleteAlert:false
    }
    componentDidUpdate(prevProps) {
        if (this.props.servicesByClient != null && prevProps.serviceByClientList!== this.props.servicesByClient) {
            data = this.props.servicesByClient;
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
    handleDeleteClick = (obj) => {
        objService = obj;
        this.setState({showDeleteAlert:true})
    }
    yesDelete = () => {
        if (objService != null) {
            let dataHelper = [];
            let helper = [];
            if (data.length > 0) {
                data.forEach((element, index) => {
                    if (element['Service Name'] !== objService['Service Name']) {
                        helper.push(element);
                        dataHelper.push({ serviceId: element.Value, date: element.Date })
                    }
                })
            }
            data = helper;
            this.closeDeleteAlert();
            this.success();
            this.props.addServicesByClient(data, dataHelper);
        }
    }
    closeDeleteAlert = () => {
        this.setState({ showDeleteAlert: false })
    }
    handleRowClick = (obj) => {
    }
    NewServiceClick = () => {
        this.setState({ openNewService: true })
    }
    CloseNewService = () => {
        this.setState({ openNewService: false })
    }
    addServiceByDialog = (obj) => {
        let helper = { serviceId: obj.Value, date: obj.Date }
        let dataHelper = [];
        if (data.length > 0) {
            data.forEach((elements) => {
                dataHelper.push({ serviceId: elements.Value, date: elements.Date })
            })
        }
        //Llena la tabla
        data.push(obj)
        //Pasa la data para el SAVE
        dataHelper.push(helper)
        this.props.addServicesByClient(data, dataHelper);
    }
    
    success = () => {
        Modal.success({
            title: 'Success',
            content: 'The service have been deleted',
        });
    }

    error = () => {
        Modal.error({
            title: 'Error',
            content: 'An error ocurred while delete a service. Please, try again.',
        });
    }
    render() {
        return (
            <Col span={8}>
                <PageHeader
                    className="site-page-header site-layout-background"
                    title="Services"
                    extra={[
                        <Button style={{ marginLeft: '5px' }} icon={<PlusCircleOutlined />} type="primary" onClick={this.NewServiceClick}>
                            New Service
                        </Button>
                    ]}
                />
                <DynamicTable
                    id="servbyclient-table"
                    hiddenHeaders={['Value']}
                    data={data}
                    enableClick={true}
                    useCheckBox={false}
                    useDeleteButton={true}
                    deleteFunction={this.handleDeleteClick.bind(this)}
                    clickFunction={this.handleRowClick.bind(this)}
                />
                <DialogNewService
                    open={this.state.openNewService}
                    close={this.CloseNewService}
                    servicesList={this.props.servicesList} 
                    addService={this.addServiceByDialog} />
                {/*----------FOR DELETE-----------*/}
                <Modal
                    title="Are you sure you want to delete this service?"
                    visible={this.state.showDeleteAlert}
                    onOk={this.yesDelete}
                    onCancel={this.closeDeleteAlert}
                    okText="Yes"
                    cancelText="No"
                ><p>This action can not be undone.</p></Modal>
            </Col>
        )
    }
}