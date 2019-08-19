import React, { Component } from 'react';
import Calc     from './comps/calc';
//import Check    from './comps/check';

export default class App extends Component{
    constructor(props){
        super(props);
        this.handleIncrease     = this.handleIncrease.bind(this);  
        this.handleDecrease     = this.handleDecrease.bind(this);  
        this.handledisableBtn   = this.handledisableBtn.bind(this);
        this.handleDeleteBtn    = this.handleDeleteBtn.bind(this);    
        this.handleResetBtn     = this.handleResetBtn.bind(this);   
        this.state = {
            comp : [{id : 1, total:1},{id : 2, total:1},{id : 3, total:1}, {id : 4, total:1}, {id : 5, total:1}],
        }
    }

    render(){
        return(
            <div>
                <h1>Navbar <span className="badge badge-secondary">{this.state.comp.length}</span> </h1>
                <button onClick={()=>{this.handleResetBtn()}}>Reset</button>
                {this.state.comp.map( x => 
                    <Calc 
                        key             = {x.id}
                        id              = {x.id} 
                        total           = {x.total}
                        increaseBtn     = {this.handleIncrease}
                        decreaseBtn     = {this.handleDecrease}
                        deleteBtn       = {this.handleDeleteBtn}
                        disableBtn      = {this.handledisableBtn}
                    /> )}
            </div>
        )
    }

    handleIncrease(id){
        let newVal       = this.state.comp[id-1].total + 1;
        let obj          = this.state.comp;
        obj[id-1].total  = newVal;

        this.setState({
            comp : obj
        })
        console.log("test :" + id);
    }

    handleDecrease(id){
        let newVal       = this.state.comp[id-1].total - 1;
        let obj          = this.state.comp;
        obj[id-1].total  = newVal;

        this.setState({
            comp : obj
        })
        console.log("handleDecrease :" + id);
    }

    handleDeleteBtn(id){
        let obj   = this.state.comp;
        let start = 0;
        for (let i = 0; i < obj.length; i++) {
            if(obj[i].id === i){
                start = i;
            }
        }
        obj.splice((start-1),1);
        this.setState({
            comp : obj
        })
        console.log("ID :" + id);
        console.log("handleDeleteBtn :" + obj);
    }

    handledisableBtn(props){
        console.log("handledisableBtn");
        if(props.total < 1){
            return 'disabled';
        }else{
            return '';
        }
    }
    handleResetBtn(){
        this.setState({
            comp : [{id : 1, total:1},{id : 2, total:1},{id : 3, total:1}, {id : 4, total:1}, {id : 5, total:1}]
        })

    }
}
