import React from 'react';

class ComponentExamplePropType extends React.Component {

    render() {

        return (

            <div>
               <h2>
                   {this.props.arrayProp} 
                    <br/>
                
                    {this.props.stringProp}
                    <br />
 
                    {this.props.numberProp}
                    <br />
 
                    {this.props.boolProp}
                    <br />
               </h2>

            </div>

        )
    }

  
}

export default ComponentExamplePropType;
 