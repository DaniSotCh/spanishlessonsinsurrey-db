import React from 'react';

import { Button, Input, Layout, Form, Row, Col, PageHeader } from 'antd';
import DynamicTable from '../../shared/DynamicTable';
import { deleteLevelByID, getLevels, saveLevel, updateLevel } from '../../networking/NetworkingLevel';

const { Header, Content } = Layout;
export default class LevelsScreen extends React.Component {
    formRef = React.createRef();
    state = {
        keyLevel: 0,
        levelName: '',
        levels: []
    }
    componentDidMount() {
        this.getLevels();
    }
    handleRowClick = (obj) => {
        this.formRef.current.setFieldsValue({ keyLevel: obj.key, levelName: obj.Name });
        this.setState({
            keyLevel: obj.key,
            levelName: obj.Name
        });
    }
    handleDeleteClick = (obj) => {
        if (obj.key > 0) {
            deleteLevelByID(obj.key).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        console.log("ERROR")
                    } else {
                        this.getLevels();
                    }
                }
            )
        }
    }
    handleBackClick = () => {
        this.setState({ clientForm: false })
    }
    NewClientClick = () => {
        this.setState({ clientForm: true, client: null, keyClient: 0 })
    }
    handleLevelNameChange = (event) => {
        this.setState({ levelName: event.target.value });
    }
    getLevels = () => {
        getLevels().then(
            (json) => {
                if (json != null) {
                    let helper = [];
                    json.forEach(element => {
                        helper.push({
                            key: element.id,
                            Name: element.name
                        })
                    });
                    this.setState({ levels: helper })
                }
            }
        )
    }
    SaveClick = () => {
        let model = {
            "Name": this.state.levelName
        }
        if (this.state.keyLevel > 0) {
            updateLevel(this.state.keyLevel, model).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        console.log("ERROR")
                    } else {
                        this.getLevels();
                        this.ClearClick();
                    }
                }
            )
        } else {
            saveLevel(model).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        console.log("ERROR")
                    } else {
                        this.getLevels();
                        this.ClearClick();
                    }
                }
            )
        }
    }

    ClearClick = () => {
        this.formRef.current.setFieldsValue({ keyLevel: 0, levelName: ' ' });
        this.setState({
            keyLevel: 0,
            levelName: ''
        });
    }
    render() {
        let clientScreen = (<div>
            <PageHeader
                className="site-page-header"
                title="Levels"
            />
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    //minHeight: 670,
                }}
            >

                <Form ref={this.formRef} labelCol={{ span: 14 }} wrapperCol={{ span: 22 }} layout="vertical" initialValues={{ size: '10px' }} size={'middle'}>
                    <Row align="bottom">
                        <Col span={12}>
                            <Form.Item
                                name="levelName"
                                label="Level Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a level name',
                                    }
                                ]}>
                                <Input
                                    value={this.state.levelName}
                                    onChange={this.handleLevelNameChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    size={'large'}
                                    onClick={this.SaveClick}>
                                    Save
                                </Button>
                                <Button
                                    htmlType="clear"
                                    type="primary"
                                    size={'large'}
                                    onClick={this.ClearClick}>
                                    Clear
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <DynamicTable
                    id="clients-table"
                    hiddenHeaders={['key']}
                    data={this.state.levels}
                    enableClick={true}
                    useCheckBox={false}
                    useDeleteButton={true}
                    deleteFunction={this.handleDeleteClick.bind(this)}
                    clickFunction={this.handleRowClick.bind(this)}
                />
            </Content>
        </div>);

        return clientScreen
    }
}