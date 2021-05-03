import { Space, Table, Tag } from 'antd';
import React from 'react';
import { servicesList } from '../resources/PackageResource';
//import TableFilter from './TableFilter';
//import TheCSVButton from './TheCSVButton';



export default class DynamicTable extends React.Component {

    state = {
        data: this.props.data,
        listToShow: [],
        filterScreen: false,
        loading: false,
        filtering: false,
        filters: {},
        pageNumber: this.props.pageNumber,
        isAllChecked: false,
    }

    componentDidMount = () => {
        this.setState({ data: this.props.data });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
    }

    getFilterHeaders = () => {
        var hiddenHeaders = [];
        var columns = [];
        if (this.props.data != null && this.props.data.length > 0) {
            var testObj = this.props.data[0];
            var headers = Object.keys(testObj);
            if (this.props.hiddenHeaders !== undefined) {
                hiddenHeaders = this.props.hiddenHeaders;
            }

            headers.forEach((value) => {

                var includesHiddenDollar = value.includes('$');
                if (value !== 'TotalCount') {
                    if (!includesHiddenDollar) {
                        var isHidden = false;
                        for (let i = 0; i < hiddenHeaders.length; i++) {
                            if (value === hiddenHeaders[i]) {
                                isHidden = true;
                                break;
                            }
                        }

                        if (!isHidden) {
                            columns.push(value);
                        }
                    }
                }
            })
        }

        return columns;
    }

    getColumns = () => {
        var hiddenHeaders = [];
        var columns = [];
        if (this.props.data != null && this.props.data.length > 0) {
            var testObj = this.props.data[0];
            var headers = Object.keys(testObj);
            if (this.props.hiddenHeaders !== undefined) {
                hiddenHeaders = this.props.hiddenHeaders;
            }

            headers.forEach((value) => {

                var includesHiddenDollar = value.includes('$');
                if (value !== 'TotalCount') {
                    if (!includesHiddenDollar) {
                        var isHidden = false;
                        for (let i = 0; i < hiddenHeaders.length; i++) {
                            if (value === hiddenHeaders[i]) {
                                isHidden = true;
                                break;
                            }
                        }
                        if (value === 'SERVICE') {
                            columns.push({
                                title: value,
                                dataIndex: value,
                                key: value,
                                render: tags => (
                                    <span>
                                        {tags.map(tag => {
                                            let color = tag.length > 5 ? 'geekblue' : 'green';
                                            servicesList().forEach((element, index) => {
                                                if (tag.toUpperCase() === element.title) {
                                                    switch (index) {
                                                        case 0: color = 'magenta'; break;
                                                        case 1: color = 'orange'; break;
                                                        case 2: color = 'gold'; break;
                                                        case 3: color = 'green'; break;
                                                        case 4: color = 'cyan'; break;
                                                        case 5: color = 'purple'; break;
                                                        case 6: color = 'lime'; break;
                                                        case 7: color = 'volcano'; break;
                                                        case 8: color = 'blue'; break;
                                                        case 9: color = 'default'; break;
                                                        default: color = 'geekblue'; break;
                                                    }
                                                }
                                            }
                                            )
                                            return (
                                                <Tag color={color} key={tag}>
                                                    {tag.toUpperCase()}
                                                </Tag>
                                            );
                                        })}
                                    </span>
                                ),
                                sorter: (a, b) => {
                                    let aValue = a[value];
                                    let bValue = b[value];
                                    if (!aValue) {
                                        aValue = '';
                                    }
                                    if (!bValue) {
                                        bValue = '';
                                    }
                                    if (typeof aValue === 'number') {
                                        return aValue - bValue;
                                    }

                                    return aValue.toString().localeCompare(bValue.toString());
                                },
                                sortDirections: ['descend', 'ascend'],
                            });
                        } else {
                            if (!isHidden) {
                                columns.push({
                                    title: value,
                                    dataIndex: value,
                                    key: value,
                                    sorter: (a, b) => {
                                        let aValue = a[value];
                                        let bValue = b[value];
                                        if (!aValue) {
                                            aValue = '';
                                        }
                                        if (!bValue) {
                                            bValue = '';
                                        }
                                        if (typeof aValue === 'number') {
                                            return aValue - bValue;
                                        }

                                        return aValue.toString().localeCompare(bValue.toString());
                                    },
                                    sortDirections: ['descend', 'ascend'],
                                });
                            }
                        }
                    }
                }
            })

            if (this.props.dynamicActions !== undefined || this.props.useDeleteButton) {
                let links = [];

                columns.push({
                    title: 'Actions',
                    key: 'actions',
                    render: (text, record) => {
                        let links = [];
                        if (this.props.dynamicActions) {
                            this.props.dynamicActions.forEach((dynAction) => {
                                links.push(<a style={{ cursor: 'pointer' }} onClick={(event) => { event.stopPropagation(); dynAction.function(record) }}>{dynAction.name}</a>);
                            });
                        }
                        if (this.props.useDeleteButton) {
                            links.push(<a style={{ cursor: 'pointer' }} onClick={(event) => { event.stopPropagation(); this.handleDeleteClick(record); }}>Delete</a>);
                        }
                        return (
                            <Space size="middle">
                                {links}
                            </Space>
                        );
                    },
                });
            }
        }

        return columns;
    }

    handleDeleteClick = (obj) => {
        if (!JSON.parse(localStorage.getItem('HasComplianceAccess'))) {
            this.props.deleteFunction(obj);
        }
    }

    onFilterButtonClick = () => {
        this.setState({ filterScreen: true });
    }

    clearFilterButtonClick = () => {
        this.setState({ filtering: false, filters: {}, data: this.props.data, numberOfPages: this.props.numberOfPages });
    }

    onCloseFilterScreen = () => {
        this.setState({ filterScreen: false });
    }

    runFilter = (filters) => {
        var newData = [];
        this.setState({ filterScreen: false, loading: true, filtering: true, filters: filters });
        this.props.filterFunction().then((rows) => {
            rows.forEach(element => {
                var isOkay = true;
                for (var i = 0; i < filters.length; i++) {
                    if (filters[i].value !== '' && element[filters[i].header] !== undefined) {
                        if (String(element[filters[i].header]).toLowerCase().includes(String(filters[i].value).toLowerCase()) && isOkay) {
                            isOkay = true;
                        } else {
                            isOkay = false;
                        }
                    }
                }
                if (isOkay) {
                    newData.push(element);
                }
            });
            this.setState({ data: newData, loading: false, numberOfPages: Math.ceil(newData.length / this.props.numberPerPage), });
        });
    }

    render = () => {
        var showFilter = false;
        var showExport = false;
        var filterButton = [];
        var filterHeaders = [];

        var id = "";

        if (this.props.id !== undefined) {
            id = "-" + this.props.id;
        }

        if (this.props.useExportButton !== undefined) {
            showExport = this.props.useExportButton;
        }

        if (this.props.useFilter !== undefined) {
            showFilter = this.props.useFilter;
        }

        let dataSource = this.state.data;

        let columns = this.getColumns();
        filterHeaders = this.getFilterHeaders();

        if (showFilter) {
            if (!this.state.filtering) {
                filterButton.push(<i className="fa fa-fw fa-filter uk-align-right" key={"filter-icon" + id} onClick={this.onFilterButtonClick} style={{ fontSize: '1.50em', verticalAlign: 'middle', cursor: 'pointer', marginBottom: '2px', marginLeft: '10px' }} />);
            } else {
                filterButton.push(<i className="fa fa-fw fa-ban uk-align-right" key={"filter-icon" + id} onClick={this.clearFilterButtonClick} style={{ fontSize: '1.50em', verticalAlign: 'middle', cursor: 'pointer', marginBottom: '2px', marginLeft: '10px' }} />);
            }
        }

        /* if(showExport){
            filterButton.push(<TheCSVButton board={this.props.tableName} data={this.state.data} useIcon={true}/>);
        } */

        return (
            <div>{/* 
                <div className="uk-overflow-auto">
                    {filterButton}
                </div> */}
                <Table
                    dataSource={[...dataSource]}
                    columns={columns}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                this.props.clickFunction(record);
                            }
                        };
                    }}
                    size='small'
                />
                {/* <TableFilter 
                    open={this.state.filterScreen}
                    onClose={this.onCloseFilterScreen}
                    headers={filterHeaders}
                    runFilter={this.runFilter}
                /> */}
            </div>
        );
    }
}