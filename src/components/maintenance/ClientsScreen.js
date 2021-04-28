import React from 'react';

import { Button, Layout, Space, Tag } from 'antd';
import DynamicTable from '../../shared/DynamicTable';
import ClientForm from './ClientForm';
import { UserAddOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const data = [
    {
        KEY: 1,
        NAME: 'Ann Mitchell',
        TELEPHONE: '7767355991',
        EMAIL: 'ann.mitchell@travelcounsellors.com',
        SERVICE: 'Enquiry',
        LEVEL: 'Beginners',
        FOUND: '',
        CITY: '',
        ADDRESS: '',
        COMMENTS: ''
    },
    {
        KEY: 2,
        NAME: 'Anne Simpson',
        TELEPHONE: '7910110483',
        EMAIL: 'anne.a.simpson@gmail.com',
        SERVICE: 'Client',
        LEVEL: 'Beginners',
        FOUND: 'Facebook',
        CITY: 'West Ewell',
        ADDRESS: '54 Gibraltar Crescent, West Ewell Kt19 9BT',
        COMMENTS: ''
    },
    {
        KEY: 3,
        NAME: 'Avinash Jobanpruta',
        TELEPHONE: '7714756813',
        EMAIL: 'a.jobanputra@btinternet.com',
        SERVICE: 'Client',
        LEVEL: 'Pre Intermediate',
        FOUND: 'private client',
        CITY: 'Chessington',
        ADDRESS: '163 Chantry Road, Chessington KT9 1XD',
        COMMENTS: ''
    },
    {
        KEY: 4,
        NAME: 'Beverley Gibson',
        TELEPHONE: '7775816582',
        EMAIL: 'beverleyjill@icloud.com',
        SERVICE: 'Club Member',
        LEVEL: 'Upper Intermediate',
        FOUND: '',
        CITY: '',
        ADDRESS: '',
        COMMENTS: ''
    },
    {
        KEY: 5,
        NAME: 'Catherine Michel',
        TELEPHONE: '7854466872',
        EMAIL: 'catherinemichel@hotmail.co.uk',
        SERVICE: 'Club Visitor',
        LEVEL: 'Intermediate',
        FOUND: '',
        CITY: '',
        ADDRESS: '',
        COMMENTS: ''
    }
];
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
            <Header className="site-layout-background">
                Clients
                <Button style={{ marginLeft: '5px' }} type="primary" icon={<UserAddOutlined />} size={'small'} onClick={this.NewClientClick}>
                    New Client
                </Button>
            </Header>
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 670,
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