import React from 'react';


const asyncComp = (importedComponent) =>{
    return class extends React.Component{
        state={
            component: null
        }
        componentDidMount(){
            importedComponent().then(
                cmp=> {
                    this.setState({component: cmp.default})
                }
            )
        }
        render(){
            const C = this.state.component;
            return (
                
                C?<C {...this.props}/>:null
            )
        }
    }
}

export default asyncComp;