import React from 'react';

import { Button, Layout, PageHeader } from 'antd';
import DynamicTable from '../../shared/DynamicTable';
import ClientForm from './ClientForm';
import { UserAddOutlined } from '@ant-design/icons';
import { clientsList } from '../../resources/PackageResource';

const { Header, Content } = Layout;
const data = clientsList();
export default class ClientsScreen extends React.Component {
    state = {
        clientForm: false,
        client: null,
        keyClient: 1
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
                    hiddenHeaders={['KEY', 'TELEPHONE', 'FOUND', 'CITY', 'ADDRESS', 'COMMENTS']}
                    data={data}
                    enableClick={true}
                    useCheckBox={false}
                    useDeleteButton={true}
                    deleteFunction={this.handleDeleteClick.bind(this)}
                    clickFunction={this.handleRowClick.bind(this)}
                />
            </Content>
        </div>);
        if (this.state.clientForm) {
            clientScreen = <ClientForm returnClick={this.handleBackClick} clientObj={this.state.client} keyClient={this.state.keyClient} />
        }

        return clientScreen
    }
}