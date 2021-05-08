import React from 'react';
import { Layout, Menu } from 'antd';
import {
    UsergroupAddOutlined,
    ContainerOutlined,
    SettingOutlined
} from '@ant-design/icons';
import logoRedondo from '../../images/SLS - logo redondo.png';
import ClientsScreen from '../maintenance/ClientsScreen';
import ServicesScreen from '../maintenance/ServicesScreen';
import SubMenu from 'antd/lib/menu/SubMenu';
import LevelsScreen from '../maintenance/LevelsScreen';
import CompaniesScreen from '../maintenance/CompaniesScreen';

const { Sider } = Layout;

export default class PrincipalScreen extends React.Component {
    state = {
        collapsed:true,
        menuSelected:1,
        widthCollap:80
    };
    onCollapse = (collapsed) => {
        var num = collapsed ? 80 : 200;
        this.setState({ collapsed, widthCollap: num })
    }
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
                screen = <CompaniesScreen />;
                break;
            case 3:
                screen = <ServicesScreen />;
                break;
            case 4:
                screen = <LevelsScreen />;
                break;
            default:
                break;
        }
        let collapsed = this.state.collapsed;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}style={{position: 'fixed',minHeight: '100vh'}}>
                    <div className="logo"><img className="w-75" src={logoRedondo} alt="Logo_SLS"></img></div>
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<UsergroupAddOutlined />} onClick={this.menuClick.bind(this, 1)}>
                            Clients
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ContainerOutlined />} onClick={this.menuClick.bind(this, 2)}>
                            Companies
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<SettingOutlined />} title="Maintenance">
                            <Menu.Item key="3" onClick={this.menuClick.bind(this, 3)}>Services</Menu.Item>
                            <Menu.Item key="4" onClick={this.menuClick.bind(this, 4)}>Levels</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: this.state.widthCollap }}>
                    {screen}
                </Layout>
            </Layout>
        )
    }
}
