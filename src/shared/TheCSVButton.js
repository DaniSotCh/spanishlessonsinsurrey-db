import React from 'react';
import CsvDownload from 'react-json-to-csv';

export default class TheCSVButton extends React.Component {
    state = {
        array: [],
        filename: 'empty.csv',
    }

    componentDidMount = () => {
        let newData = [...this.props.data];
        if(newData.length>0){
            let keys = [...Object.keys(newData[0])];
        
            for(let i = 0; i<newData.length; i++){
                delete newData[i].Action;
                delete newData[i].Key;

                for(let j = 0; j<keys.length; j++){
                    if(keys[j].includes('$')){
                        delete newData[i][keys[j]];
                    }
                }
            }

            let today = new Date();
            let yearString = today.getFullYear().toString();
            let monthString = (today.getMonth()+1).toString().padStart(2, '0');
            let dayString = today.getDate().toString().padStart(2, '0');
            let hourString = today.getHours().toString().padStart(2, '0');
            let minuteString = today.getMinutes().toString().padStart(2, '0');
            let timeStamp = yearString + monthString + dayString + hourString + minuteString;
            this.setState({filename: this.props.board + timeStamp + '.csv'});
            this.setState({array: newData});
        }
    }

    componentDidUpdate = (prevProps) => {
        //return;
        if(prevProps.data !== this.props.data){
            let newData = [...this.props.data];
            if(newData){
                console.log(newData);
                if(newData.length > 0){
                    let keys = [...Object.keys(newData[0])];
                    for(let i = 0; i<newData.length; i++){
                        delete newData[i].Action;
                        delete newData[i].Key;
            
                        for(let j = 0; j<keys.length; j++){
                            if(keys[j].includes('$')){
                                delete newData[i][keys[j]];
                            }
                        }
                    }
                    let today = new Date();
                    let yearString = today.getFullYear().toString();
                    let monthString = (today.getMonth()+1).toString().padStart(2, '0');
                    let dayString = today.getDate().toString().padStart(2, '0');
                    let hourString = today.getHours().toString().padStart(2, '0');
                    let minuteString = today.getMinutes().toString().padStart(2, '0');
                    let timeStamp = yearString + monthString + dayString + hourString + minuteString;
                    this.setState({filename: this.props.board + timeStamp + '.csv'});
                    this.setState({array: newData});
                }
                
            }
        }
    }

    render = () => {
        if(this.props.useIcon){
            return(
                <CsvDownload
                className="fa fa-fw fa-download uk-align-right"
                data={this.state.array}
                filename={this.state.filename}
                style={{ //pass other props, like styles
                    width: '30px',
                    color: '#666',
                    marginLeft: '0px',
                    border:"0px solid #a511c0",
                    display:"inline-block",
                    backgroundColor: "white",
                    fontSize: '1.50em', verticalAlign: 'middle', cursor: 'pointer', marginBottom: '2px' 
                    }}
                > </CsvDownload>
            );
        } else {

        }
        return(
            <div>
                <CsvDownload 
                data={this.state.array}
                filename={this.state.filename}
                className="uk-button uk-button-green uk-float-right">Export</CsvDownload>
            </div>
        );
    }
}