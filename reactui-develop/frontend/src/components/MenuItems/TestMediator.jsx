import React, { Component, useState } from "react";
import { Button } from "antd";
import Mediator from '../../iweb/Mediator';
import { restEndpoint } from "../../common/config/customData";
import EventManager from "../../iweb/EventManager";


class TestMediator extends Component { 

    constructor(props) {

        super(props);
        this.testGetMethodBinding = this.getMethodResonseFromEMAPI.bind(this);
        EventManager.addListener('iweb.messageTest.get', this.testGetMethodBinding);

        this.testPostMethodBinding = this.postMethodResponseFromEMAPI.bind(this);
        EventManager.addListener('iweb.messageTest.new', this.testPostMethodBinding);
              Mediator.getInstance().subscribe("iweb.messageTest.new");

        this.testPutMethodBinding = this.putMethodResponseFromEMAPI.bind(this);
        EventManager.addListener('iweb.messageTest.update', this.testPutMethodBinding);

        this.testDeletetMethodBinding = this.deleteMethodResponseFromEMAPI.bind(this);
        EventManager.addListener('iweb.messageTest.delete', this.testDeletetMethodBinding);

    }

    invokeGet() {
        if (confirm("Press a button: GET!")) {
            let url = `${restEndpoint}/messageTest/success/ASHOK`;
            const topic = "iweb.messageTest.get";
            Mediator.getInstance().subscribe(topic);
            Mediator.getInstance().sendRequestMessage(url,topic);
        } else {
             alert("You pressed Cancel!");
        }
    }

    getMethodResonseFromEMAPI(event, response) {
        console.log("GET Method from EMAPI :: " + JSON.stringify(response));
        alert("Message Received - GET Method :: EventName \n" + event + "\n Response:: "+JSON.stringify(response));
        //console.log("Message Received - GET Method :: EventName \n" + event + "\n Response:: "+JSON.stringify(response));
    }

    invokePost() {
        if (confirm("Press a button : POST!")) {
            let url = `${restEndpoint}/messageTest/success`;
            let body = { "userName": "ashok", "userId": "userid",  "test": "test", "internal": {} };
            Mediator.getInstance().subscribe("iweb.messageTest.new");
            Mediator.getInstance().sendPostMessage(url,"iweb.messageTest.new",body);
        } else {
            alert("You pressed Cancel!");
        }
      }

    postMethodResponseFromEMAPI(event, response) {
        console.log("POST Method from EMAPI :: " + JSON.stringify(response));
        alert("Message Received - POST Method :: EventName \n" + event + "\n Response:: "+JSON.stringify(response));
    }

    invokePut() {
        if (confirm("Press a button : PUT!")) {
            let url = `${restEndpoint}/messageTest/success/ID`;
            let body = { "userName": "ashok", "userId": "userid",  "test": "test", "internal": {} };
            Mediator.getInstance().sendPutMessage(url,"iweb.messageTest.update",body);
        } else {
            alert("You pressed Cancel!");
        }
      }

    putMethodResponseFromEMAPI(event, response) {
        console.log("PUT Method from EMAPI :: " + JSON.stringify(response));
        alert("Message Received - PUT Method :: EventName \n" + event + "\n Response:: "+JSON.stringify(response));
    }

    invokeDelete() {
        if (confirm("Press a button : DELETE!")) {
            let url = `${restEndpoint}/messageTest/success/ID`;
            Mediator.getInstance().sendDeleteMessage(url,"iweb.messageTest.delete");
        } else {
            alert("You pressed Cancel!");
        }
      }

    deleteMethodResponseFromEMAPI(event, response) {
        console.log("DELETE Method from EMAPI :: " + JSON.stringify(response));
        alert("Message Received - DELETE Method :: EventName \n" + event + "\n Response:: "+JSON.stringify(response));
    }

  render() {

    return (
      <> 
         <div className="my-4">
            <Button type="primary" onClick={this.invokeGet}>
              GET
            </Button>
          </div>
          <div className="my-4">
            <Button type="primary" onClick={this.invokePost}>
             POST
            </Button>
          </div>
          <div className="my-4">
            <Button type="primary" onClick={this.invokePut}>
              PUT
            </Button>
          </div>
          <div className="my-4">
            <Button type="primary" onClick={this.invokeDelete}>
              DELETE
            </Button>
          </div>

      </>
    );
  }
}

export default  TestMediator;