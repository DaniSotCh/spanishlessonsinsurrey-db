import React from 'react';
import { Layout, Menu } from 'antd';
import {
    UsergroupAddOutlined,
    SettingOutlined
} from '@ant-design/icons';
import logoRedondo from '../../images/SLS - logo redondo.png';
import ClientsScreen from '../maintenance/ClientsScreen';
import ServicesScreen from '../maintenance/ServicesScreen';

const { Sider } = Layout;

export default class PrincipalScreen extends React.Component {
    state = {
        menuSelected:1,
    };

    menuClick = (number) => {
        this.setState({menuSelected:number})
    }
    render() {
        let screen = <ClientsScreen />;
        switch (this.state.menuSelected) {
            case 1:
                screen = <ClientsScreen />;
                break;
            case 2:
                screen = <ServicesScreen />;
                break;
            default:
                break;
        }
        return (
            <Layout>
                <Sider trigger={null} collapsible>
                    <div className="logo"><img className="w-75" src={logoRedondo} alt="Logo_SLS"></img></div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UsergroupAddOutlined />} onClick={this.menuClick.bind(this,1)}>
                            Clients
                        </Menu.Item>
                        <Menu.Item key="2" icon={<SettingOutlined />} onClick={this.menuClick.bind(this,2)}>
                            Maintenance
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {screen}
                </Layout>
            </Layout>
        )
    }
}
