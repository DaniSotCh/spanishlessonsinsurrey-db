import React from 'react';

import { Button, Layout, PageHeader,Modal } from 'antd';
import DynamicTable from '../../shared/DynamicTable';
import ClientForm from './ClientForm';
import { UserAddOutlined } from '@ant-design/icons';
import { getClients } from '../../networking/NetworkingClient';

const { Content } = Layout;
let objClient = null;
export default class ClientsScreen extends React.Component {
    state = {
        clientForm: false,
        client: null,
        keyClient: 1,
        clientsList:[]
    }
    componentDidMount() {
        getClients().then(
            (jsonResponse) => {
                if (jsonResponse != null) {
                    let helper = [];
                    //level: {clients: [],id: 1,name: "Beginners"}
                    jsonResponse.forEach(element => {
                        helper.push({
                            KEY: element.id,
                            NAME: element.name,
                            TELEPHONE: element.telephone,
                            EMAIL: element.email,
                            SERVICE: element.services,
                            LEVELID: element.levelId,
                            LEVEL:element.level.name,
                            FOUND: element.found,
                            CITY: element.city,
                            ADDRESS: element.address,
                            COMMENTS: element.comments,
                        })
                    });
                    this.setState({ clientsList: helper })
                }
            }
        )
    }
    handleRowClick = (obj) => {
        this.setState({ clientForm: true, client: obj })
    }
    handleDeleteClick = (obj) => {
        objClient = obj
        this.setState({ showDeleteAlert: true })
    }
    handleBackClick = () => {
        this.setState({ clientForm: false })
    }
    NewClientClick = () => {
        this.setState({ clientForm: true, client: null, keyClient: 0 })
    }
    yesDelete = () => {
        if (objClient != null && objClient.key > 0) {
            /* deleteServiceByID(objService.key).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        this.setState({ content: 'An error ocurred while delete a service. Please, try again.' })
                        this.error()
                    } else {
                        this.setState({ content: 'The service have been deleted',showDeleteAlert: false })
                        this.getServices();
                        this.success();
                    }
                }
            ) */
        }
    }
    closeDeleteAlert = () => {
        this.setState({ showDeleteAlert: false })
    }
    render() {
        let clientScreen = (<div>
            <PageHeader
                className="site-page-header site-layout-background"
                title="Clients"
                extra={[
                    <Button style={{ marginLeft: '5px' }} type="primary" icon={<UserAddOutlined />} onClick={this.NewClientClick}>
                        New Client
                    </Button>
                ]}
            />
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    //minHeight: 670,
                }}
            >
                <DynamicTable
                    id="clients-table"
                    hiddenHeaders={['KEY','LEVELID', 'TELEPHONE', 'FOUND', 'CITY', 'ADDRESS', 'COMMENTS']}
                    data={this.state.clientsList}
                    enableClick={true}
                    useCheckBox={false}
                    useDeleteButton={true}
                    deleteFunction={this.handleDeleteClick.bind(this)}
                    clickFunction={this.handleRowClick.bind(this)}
                />
            </Content>
            {/*----------FOR DELETE-----------*/}
            <Modal
                title="Are you sure you want to delete this client?"
                visible={this.state.showDeleteAlert}
                onOk={this.yesDelete}
                onCancel={this.closeDeleteAlert}
                okText="Yes"
                cancelText="No"
            ><p>This action can not be undone.</p></Modal>
        </div>);
        if (this.state.clientForm) {
            clientScreen = <ClientForm returnClick={this.handleBackClick} clientObj={this.state.client} keyClient={this.state.keyClient} />
        }

        return clientScreen
    }
}