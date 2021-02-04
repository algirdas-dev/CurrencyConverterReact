import React, { Component } from 'react';
import CurrencyService from '../../services/currency-service'
import Select from 'react-select';
import CurrencyLabel from './shared/currency-label-component'


export default  class Cripto extends Component{
    
    constructor(prop){
        super(prop);
        this.state = {
            currencyList:[]
            , sum:0
            , selectedCurrencyList:[]
            , chartName : ''
        };
        this.currencyService = new CurrencyService();
    }

    componentDidMount() {
        this.updateCurrencyList();
        this.updateCurrencyListTimer = setInterval(
            () => this.updateCurrencyList(),
            60*1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.updateCurrencyListTimer);
    }
    
   

    updateCurrencyList = () => {
        this.currencyService.getCurrenPrices()
        .then((prices)=>prices.json())
        .then((data) => {
            let options = Object.values(data.bpi).map(
                    bpi=>{return {
                    value:bpi.code, 
                    label:bpi.code,
                    title:bpi.description, 
                    rate:bpi.rate
                }});
            this.setState({
                currencyList: options,
                chartName: data.chartName
            });
        });
    }

    updateSum = (e) => {
        this.setState({sum:e.target.value})
    }


    updateSelectedCurrencyList = (selectedCurrencyList) => {
        this.setState(
          { selectedCurrencyList },
          () => console.log(`Option selected:`, this.state.selectedCurrencyList)
        );
      };

    removeCurrency = (id) => {
        const items = this.state.selectedCurrencyList.filter( item => item.value !== id);
        this.setState({selectedCurrencyList: items});
    } 

    render(){
        const { selectedCurrencyList } = this.state;
        return <form className="col-md-6 col-sm-8 currency-form">
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">{this.state.chartName}</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" value={this.state.sum} onChange={this.updateSum}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Convert to</label>
                <div className="col-sm-10">
                        <Select
                            value={selectedCurrencyList}
                            onChange={this.updateSelectedCurrencyList}
                            options={this.state.currencyList}
                            isMulti={true}
                        />
                </div>
            </div>
            {selectedCurrencyList.map((currency, index) => 
                <CurrencyLabel key={currency.value} value={currency.value} text={currency.value} 
                sum={this.state.sum} rate={currency.rate} label={currency.label} title={currency.title} 
                onClose={this.removeCurrency}/>
            )}

        </form>;
    }

}

