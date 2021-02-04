import React, { Component } from 'react';

export default class CurrencyLabel extends Component{
   

    close = (e) => {
        this.props.onClose(this.props.value)
    }

    render(){
        const value = (this.props.sum * parseFloat(this.props.rate.replace(',',''))).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });
          
        return <div className="form-group row result-row">
                    <label title={this.props.title} className="col-sm-2 col-form-label">{this.props.text}</label>
                    <div className="col-sm-10">
                        <input className="form-control" value={value} readOnly={true} onChange={this.updateSum}/>
                        <i onClick={this.close} className="icon-close-currency-label"></i>
                    </div>
                    
                </div>
    }
}