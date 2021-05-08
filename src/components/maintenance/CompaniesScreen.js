import React from 'react';

import { Button, Layout, PageHeader,Modal } from 'antd';
import DynamicTable from '../../shared/DynamicTable';
import CompanyForm from './CompanyForm';
import { UserAddOutlined } from '@ant-design/icons';
import { deleteCompanyByID, getCompanys } from '../../networking/NetworkingCompany';
import { formatDate } from '../../helpers/FormatHelper';

const { Content } = Layout;
let objCompany = null;
export default class CompaniesScreen extends React.Component {
    state = {
        companyForm: false,
        company: null,
        keyCompany: 1,
        companysList:[],
        content:''
    }
    componentDidMount() {
        this.updateCompanys();
    }
    updateCompanys = ()=>{
        /* getCompanys().then(
            (jsonResponse) => {
                if (jsonResponse != null) {
                    let helper = [];
                    let servicesTags=[], companyServices = [];
                    //level: {companys: [],id: 1,name: "Beginners"}
                    jsonResponse.forEach(element => {
                        if (element.companyServices.length > 0) {
                            element.companyServices.forEach(items => {
                                companyServices.push({ 'Value': items.service.id, 'Service Name': items.service.name, 'Date': formatDate(items.date) })
                                servicesTags.push(items.service.name)
                            })
                        }
                        helper.push({
                            KEY: element.id,
                            NAME: element.name,
                            TELEPHONE: element.telephone,
                            EMAIL: element.email,
                            SERVICES: servicesTags,
                            SERVICE: companyServices,
                            LEVELID: element.levelId,
                            LEVEL: element.level.name,
                            FOUND: element.found,
                            CITY: element.city,
                            ADDRESS: element.address,
                            COMMENTS: element.comments,
                        })
                    });
                    this.setState({ companysList: helper })
                }
            }
        ) */
    }
    handleRowClick = (obj) => {
        this.setState({ companyForm: true, company: obj })
    }
    handleDeleteClick = (obj) => {
        objCompany = obj
        this.setState({ showDeleteAlert: true })
    }
    handleBackClick = () => {
        this.updateCompanys();
        this.setState({ companyForm: false })
    }
    NewCompanyClick = () => {
        this.setState({ companyForm: true, company: null, keyCompany: 0 })
    }
    yesDelete = () => {
        if (objCompany != null && objCompany.KEY > 0) {
            deleteCompanyByID(objCompany.KEY).then(
                (jsonResponse) => {
                    if (jsonResponse.httpStatusCode !== 200) {
                        this.setState({ content: 'An error ocurred while delete a company. Please, try again.' })
                        this.error()
                    } else {
                        this.setState({ content: 'The company have been deleted', showDeleteAlert: false })
                        this.updateCompanys();
                        this.success();
                    }
                }
            )
        }
    }
    closeDeleteAlert = () => {
        this.setState({ showDeleteAlert: false })
    }
    success = () => {
        Modal.success({
            title: 'Success',
            content: this.state.content,
        });
    }

    error = () => {
        Modal.error({
            title: 'Error',
            content: this.state.content,
        });
    }
    render() {
        let companyScreen = (<div>
            <PageHeader
                className="site-page-header site-layout-background"
                title="Companys"
                extra={[
                    <Button style={{ marginLeft: '5px' }} type="primary" icon={<UserAddOutlined />} onClick={this.NewCompanyClick}>
                        New Company
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
                    id="companys-table"
                    //hiddenHeaders={['KEY','LEVELID','SERVICE', 'TELEPHONE', 'FOUND', 'CITY', 'ADDRESS', 'COMMENTS']}
                    data={this.state.companysList}
                    enableClick={true}
                    useCheckBox={false}
                    useDeleteButton={true}
                    deleteFunction={this.handleDeleteClick.bind(this)}
                    clickFunction={this.handleRowClick.bind(this)}
                />
            </Content>
            {/*----------FOR DELETE-----------*/}
            <Modal
                title="Are you sure you want to delete this company?"
                visible={this.state.showDeleteAlert}
                onOk={this.yesDelete}
                onCancel={this.closeDeleteAlert}
                okText="Yes"
                cancelText="No"
            ><p>This action can not be undone.</p></Modal>
        </div>);
        if (this.state.companyForm) {
            companyScreen = <CompanyForm returnClick={this.handleBackClick} companyObj={this.state.company} keyCompany={this.state.keyCompany} />
        }

        return companyScreen
    }
}