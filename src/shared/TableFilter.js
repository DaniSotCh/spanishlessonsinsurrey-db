import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle  from '@material-ui/core/DialogTitle';
import { Button,Input } from 'antd';

function capitalizeFirstLetter(str) {
    let header =  str.toLowerCase();
    const capitalized = header.charAt(0).toUpperCase() + header.slice(1);
    return capitalized;
}
class FilterInput extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            id: 'filter-' + this.props.header.split(' ').join('-'),
            value: '',
        };
    }

    onChange = event =>{
        this.setState({value: event.target.value});
        var filter = {
            header: this.props.header,
            value: event.target.value
        };
        
        this.props.getFilter(filter);
    }
    
    render() {
        return(
            <div className="uk-width-4-4" >
                <div className="uk-margin">
                    <label className="ant-form-item-label" htmlFor={this.state.id} >{capitalizeFirstLetter(this.props.header)}</label>
                    <div className="uk-form-controls">
                        <Input
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default class TableFilter extends React.Component {
    
    constructor(props){
        super(props);
        var finalFilters = [];
        //console.log(finalFilters);
        this.state = {
            filters: finalFilters,
        }
    }

    componentDidMount(){
        var finalFilters = [];
        var headers = this.props.headers;
        headers.forEach(element => {
            finalFilters.push({header: element, value: ''});
        });
        this.setState({filters: finalFilters});
    }

    componentDidUpdate(prevProps){
        if(prevProps.headers !== this.props.headers){
            var finalFilters = [];
            var headers = this.props.headers;
            headers.forEach(element => {
                finalFilters.push({header: element, value: ''});
            });
            this.setState({filters: finalFilters});
        }
    }
    
    getFilter = (filter) =>{
        var listFinalFilters = this.state.filters;
        
        for (var i = 0; i<listFinalFilters.length; i++){
            if(listFinalFilters[i].header === filter.header){
                listFinalFilters[i] = filter;
            }
        }

        this.setState({filters: listFinalFilters});
        //console.log(listFinalFilters);
    }
    
    clickApplyFilter = () => {
        this.props.runFilter(this.state.filters);
    }

    render() {
        var form = [];

        this.props.headers.forEach(element => {
            let key = 'filter-input-' + element.split(' ').join('-');
            form.push(<FilterInput key={key} header={element} getFilter={this.getFilter}/>);
        });


        return(
            <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="filter-title" maxWidth="sm" fullWidth={true}>
                <DialogTitle id="filter-title" style={{ borderBottom: '1px solid #e2e2e2' }}>
                    <h2 className="ant-modal-title"><b>Filter</b></h2>
                </DialogTitle>
                <DialogContent style={{ borderBottom: '1px solid #e2e2e2' }}>
                    <form className="uk-form-stacked uk-grid">
                        {form}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button type="primary" onClick={this.clickApplyFilter}>
                        Apply Filter
                    </Button>
                    <Button type="primary" onClick={this.props.onClose}>
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
