import React from 'react';

import { Layout } from 'antd';
const { Header, Content } = Layout;
export default class ServicesScreen extends React.Component {

    render() {
        return (
            <div>
                <Header className="site-layout-background">
                   Services
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 670,
                    }}
                >
                    Content
              </Content>
            </div>
        )
    }
}