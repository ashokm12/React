
import jQuery from 'jquery';


var EventManager = (function () {

var topics = {};

/* eslint new-cap: 0 */
function getTopic(id) {
    var callbacks,
    topic = id && topics[ id ];

    if ( !topic ) {
        callbacks = jQuery.Callbacks();
        topic = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
        };
        if ( id ) {
            topics[ id ] = topic;
        }
    }
    return topic;
}

return {
    fireEvent: function(event, data) {
        var topic = getTopic(event);
        topic.publish.apply(topic, arguments);
    },

    addListener: function(event, callback) {
        getTopic(event).subscribe(callback);
    },
    
    removeListener: function(event, callback) {
        getTopic(event).unsubscribe(callback);
    },
    
    createCallbackHandler: function(topic, scope, fn, args){
        var handler = function(evt, response){
            if(!args){ args = [] }
            args.push(evt);
            args.push(response);
            fn.apply(scope, args);
            
            this.removeListener(topic, callback);
        };
        var callback = handler.bind(this);
        this.addListener(topic, callback);
    }
    }
})(); 
 

export default EventManager;