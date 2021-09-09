

import $ from 'jquery';
import Util from './Util';
import EventManager from './EventManager';
import atmosphere from 'atmosphere.js';

var Mediator = (function () {
  
		var _mediator=null;
		var _DEBUG = true;
		var _CONNECTION_CHECK_INTERVAL = 20000;
		var _KEEP_TOKEN_ALIVE_INTERVAL = 180000;
		var _PERIODIC_UPDATE_INTERVAL = 30000;
		var connFailureCount = 0;
		var _CONN_FAILURE_INDICATOR_COUNT = 3;
		var ws = null;

		var sessionId = null;

		var currentUserSessionId = null;

		var SUCCESS = "Success";

		var message = "/mediator";

		var topics = []; //maintain a list of topics for reinitialization

		var initiated = false;
		var socketConnected = false;
		var timeOfDisconnect = null;
		var timeOfLastUpdate = -1;
		var timeOfLastReconnect = (new Date()).getTime();

		var requestLogging = false;

		var config = null;

		var reqLogLevel = 'info';

		var featureCache = [];
		var chatCache = new Map();

		function Mediator() { }
		function Logger() { }
		var logger = new Logger();

		function init(initTopics)  {

			var onConfig = function(evt, payload) {
				config = payload;

				if (config && config.logging && config.logging.request && config.logging.request === 'true') {
					EventManager.fireEvent('iweb.logger.log.debug', ["Setting requestLogging to: " + config.logging.request]);
					requestLogging = true;
				} else {
					requestLogging = false;
				}

				$.ajaxSetup({
					beforeSend: function(xhr){
						console.dir(xhr);
					   xhr.withCredentials = true;
					  // xhr.setRequestHeader('X-Test-Header', 'test-value');
					}
				});
				
				// TODO: NOTE, it's too late to set this here, so unless we delay, can't
				// alter the request object's logLevel
				if (config.atmosphere) {
					try {
						reqLogLevel = config.atmosphere.logging.level;
						EventManager.fireEvent('iweb.logger.log.info', ["Set logging level to: " + reqLogLevel]);
					} catch (e) {
						// properties file doesn't have logging property, can't set it        			
						EventManager.fireEvent('iweb.logger.log.warn',
							["Config file missing property: atmosphere.logging.level. Setting to default of 'info'"]);
						reqLogLevel = "info";
					}
				}
			};

			EventManager.addListener('iweb.config.loaded', onConfig);

			_mediator = new Mediator();

			var socket = atmosphere;

			var request = {
				url: 'mediator',
				contentType: "application/json",
				logLevel: reqLogLevel,	// TODO: nics-314 make configurable on the fly
				transport: 'websocket',
				trackMessageLength: true,
				reconnectInterval: 5000,
				fallbackTransport: 'long-polling',
				maxReconnectOnClose: 17280, //24 hours -- whatever the token expiration is...
				closeAsync: true //synchronous close call locks IE on connection drop
			};

			request.onOpen = function() {
				socketConnected = true;
				if (!initiated) {
					_mediator.setTimeOfDisconnect(null);
					initiated = true;
					if (initTopics) {
						_mediator.subscribe(initTopics);
					}
					//Load the config once the websocket is established
					logger.log("Mediator onOpen initiated with socketConnected " + socketConnected);
					_mediator.sendMessage({ type: "config" });
				} else {
					logger.log("Mediator onOpen reconnection with socketConnected " + socketConnected);
					_mediator.onReconnect();
				}
			};

			request.onError = function(error) {
				if (error.status && error.status == "WebSocket instantiation failed")
					EventManager.fireEvent('onWebSocketInstantiationFailed'); //Give everyone a chance to clean up
				else
					_mediator.onDisconnect();
			};

			request.onClose = function(error) {
				socketConnected = false;
				logger.log("Mediator onClose called  with socketConnected " + socketConnected);
				if (typeof error.messageCode == 'undefined' || error.messageCode != 1000) {
					logger.log("Mediator signalling disconnect...");
					_mediator.onDisconnect();
				} else {
					_mediator.doesConnectionExist();
				}
			};

			request.onClientTimeout = function(message) {
				logger.log("Mediator onClientTimeout will initiate reconnection after reconnectionInterval...");
				setTimeout(function() {
					ws = socket.subscribe(request);
				}, request.reconnectInterval);
			};

			request.onReconnect = function() {
				logger.log("Mediator onReconnect called with socketConnected " + socketConnected);
				socketConnected = true;
				_mediator.onReconnect();
			};

			request.onReopen = function() {
				//var onReopen = 'reconnect';
				socketConnected = true;
				_mediator.doesConnectionExist();
				logger.log("Mediator onReopen called with socketConnected " + socketConnected);
				_mediator.onReopen();
			};

			var onResponse = function(response) {
				var responseBody = response.responseBody; //JSON string

				if (!responseBody || responseBody === "") {
					// No message to process?
					return;
				}

				if ((responseBody.indexOf("Log in to") !== -1) && 
					(responseBody.indexOf("scout-logo") !== -1))
				{
					EventManager.fireEvent('onLogout'); //Give everyone a chance to clean up
					_mediator.close();
					return;					
				}
					
				var message = JSON.parse(responseBody);
				logger.log("Atmosphere Received with message::"+ JSON.stringify(message));
				if (requestLogging) {
					EventManager.fireEvent('iweb.logger.log.debug',
						[String.format("!!! Response with requestId: {0}", message.requestId), message]);
				}

				if (message.data != null) { //Check to see if there is data
					if (message.responseType == "json") {
						try {
							message.data = JSON.parse(message.data);
						} catch (e) {
							EventManager.fireEvent('iweb.logger.log.error', ["Exception parsing incoming message.data to JSON", e]);
						}
					}
					EventManager.fireEvent(message.eventName, message.data);
				} else if (message.errorMessage) {
					alert('Error', message.errorMessage);
				}
			};

			request.onMessage = onResponse;
			request.onMessagePublished = onResponse;

			if(socket) ws = socket.subscribe(request);

			function connectionCheck() {
				_mediator.doesConnectionExist();
				window.setTimeout(connectionCheck, _CONNECTION_CHECK_INTERVAL);
			}
			window.setTimeout(connectionCheck, _CONNECTION_CHECK_INTERVAL);

			function periodicUpdate() {
				if (timeOfLastUpdate < 0) {
					timeOfLastUpdate = (new Date()).getTime();
				}
				if (socketConnected) {
					EventManager.fireEvent("iweb.connection.periodicUpdate", timeOfLastUpdate);
					timeOfLastUpdate = (new Date()).getTime();
				}
				logger.log("Mediator Periodic update timeOfLastUpdate updated to " + timeOfLastUpdate);
				if (((new Date()).getTime() - timeOfLastReconnect) > 2 * _PERIODIC_UPDATE_INTERVAL) {
					_mediator.onReconnect();
				}
				window.setTimeout(periodicUpdate, _PERIODIC_UPDATE_INTERVAL);
			}
			window.setTimeout(periodicUpdate, _PERIODIC_UPDATE_INTERVAL);

			function keepTokenAlive() {
				_mediator.keepTokenAlive();
				window.setTimeout(keepTokenAlive, _KEEP_TOKEN_ALIVE_INTERVAL);
			}
			_mediator.keepTokenAlive();window.setTimeout(keepTokenAlive, _KEEP_TOKEN_ALIVE_INTERVAL);
			

			// Update the online status icon based on connectivity
			window.addEventListener('online',
				function() {
					connFailureCount = 0;
					logger.log("Mediator windows event signalling connection alive... ");
					EventManager.fireEvent("iweb.connection.reconnected", (new Date()).getTime());
				});
			window.addEventListener('offline',
				function() {
					logger.log("Mediator windows event signalling connection lost... ");
					socketConnected = false;
					_mediator.onDisconnect();
				});
		
		};

		Logger.prototype.log = function(msg) {
			if (_DEBUG) {
				console.log(`${new Date()} ${msg}`);
			};
		}

		Mediator.prototype.doesConnectionExist = function() {
			var xhr = new XMLHttpRequest();

			function processRequest(e) {
				if (xhr.readyState == 4) {
					if (xhr.status >= 200 && xhr.status < 304) {
						// alert("connection exists!");
						EventManager.fireEvent("iweb.connection.reconnected", (new Date()).getTime());
						
						logger.log("Mediator doesConnectionExist determined connection alive... ");
						connFailureCount = 0;
					} else {
						//alert("connection doesn't exist!");
						socketConnected = false;
						connFailureCount++;
						if (connFailureCount >= _CONN_FAILURE_INDICATOR_COUNT) {
							logger.log("Mediator doesConnectionExist determined connection lost... ");
							EventManager.fireEvent("iweb.connection.disconnected");
						}
					}
				}
			}
			xhr.addEventListener("readystatechange", processRequest, true);
			var file = "/.well-known/host-meta.json";
			var randomNum = Math.round(Math.random() * 10000);

			xhr.open('HEAD', file + "?rand=" + randomNum, true);
			xhr.timeout = 10000; // time in milliseconds
			xhr.send();

		}

		Mediator.prototype.keepTokenAlive = function() {

			let url = "/em-api/v1/snoop/oidc_access_token_expires?"+ $.param({rand: Math.round(Math.random() * 10000)});
            $.ajax({
                type: 'GET',  
                dataType: 'text',
                contentType: 'application/json' ,
                url: url,
                headers: {'Content-Type': 'application/json'},
                success: function(data, textStatus, response ){
                    const obj =  JSON.parse(response.responseText);
                    const expiresAt = obj.headers.oidc_access_token_expires;
                    localStorage.setItem('oidc_access_token_expires', expiresAt);
                },
                error: function( jqXhr, textStatus, response ){
                    alert('Request failed.  Returned status of ' + status);
                }
            });
		}

		Mediator.prototype.setTimeOfDisconnect = function(time) {
			timeOfDisconnect = time;
		};

		Mediator.prototype.sendCache = function() {
			featureCache.forEach(function(item) {
				if (socketConnected) {
					logger.log("Mediator processing message from featureCache " + JSON.stringify(item));
					delete item.payload.jsonData.internal;
					$.ajax(
						_mediator.attachHandlers(
						{
							type: item.payload.method,  
							dataType: 'text',
							contentType: item.payload.contentType ,
							data: JSON.stringify(item.payload.jsonData),
							url: item.payload.url,
							headers: item.payload.headers
						},item.eventName));
				}
			});
			chatCache.forEach(function(value, key) {
				if (socketConnected) {
					logger.log("Mediator processing message from chatCache " + JSON.stringify(value));
					// Ext.Ajax.request(_mediator.attachHandlers(key, value.payload));
					$.ajax(
						_mediator.attachHandlers(
						{
							type: value.payload.method,  
							dataType: 'text',
							contentType: value.payload.contentType ,
							data: value.payload,
							url: value.payload.url,
							headers: value.payload.headers
						},key));
				}
			});
		}

		Mediator.prototype.onReconnect = function() {
			logger.log("Mediator onReconnect prototype called with socketConnected " + socketConnected + " timeOfDisconnect " + timeOfDisconnect);
			this.sendCache();
			//Fire reconnect event
			if ((timeOfDisconnect != null) || (((new Date()).getTime() - timeOfLastReconnect) > _PERIODIC_UPDATE_INTERVAL)) {
				logger.log("Mediator firing reconnect event from onReconnect");
				for (var j = 0; j < topics.length; j++) {
					logger.log("Mediator Resubscribing to topic ::"+ topics[j]);
					this.subscribe(topics[j]);
				}
				EventManager.fireEvent("iweb.connection.reconnected", timeOfDisconnect);
				this.setTimeOfDisconnect(null);
			}
			timeOfLastReconnect = (new Date()).getTime();
		}

		Mediator.prototype.onReopen = function() {
			logger.log("Mediator onReopen prototype called with socketConnected " + socketConnected);
			if (socketConnected) {
				for (var j = 0; j < topics.length; j++) {
					this.subscribe(topics[j]);
				}
				//Fire reconnect event
				logger.log("Mediator firing reconnect event from onReopen");
				if (timeOfDisconnect != null) {
					EventManager.fireEvent("iweb.connection.reconnected", timeOfDisconnect);
					this.setTimeOfDisconnect(null);
				} else
					EventManager.fireEvent("iweb.connection.reconnected", (new Date()).getTime());
			}
		};

		Mediator.prototype.onDisconnect = function() {
			this.setTimeOfDisconnect((new Date()).getTime());
//			connFailureCount++;
//			if (connFailureCount >= _CONN_FAILURE_INDICATOR_COUNT)
//				EventManager.fireEvent("iweb.connection.disconnected");
		};

		Mediator.prototype.close = function() {
			atmosphere.unsubscribe();
		};

		//Set rest api
		Mediator.prototype.setRestAPI = function(url) {
			this.restApiUrl = url;
		};

		//Return configured rest api url
		Mediator.prototype.getRestAPI = function() {
			return this.restApiUrl;
		};

		Mediator.prototype.updateFeatureCache = function(message) {
			switch (message.payload.jsonData.internal.action)
			{
				case 'delete':
					featureCache = featureCache.filter(
						function(item) { 
							if (message.payload.jsonData.featureId) {
								if (item.payload.jsonData.featureId) 
									return message.payload.jsonData.featureId !==  item.payload.jsonData.featureId;
								else
									return true;
							}
							else {
								if (item.payload.jsonData.featureId) 
									return true;
								else
									return message.payload.jsonData.internal.ol_uid !==  item.payload.jsonData.internal.ol_uid;
							}
						});
					if (message.payload.jsonData.featureId) 
						featureCache.push(message);
					break;
				case 'change':
					var processed = false; 
					featureCache.forEach(
						function(item) {
							if (message.payload.jsonData.featureId && item.payload.jsonData.featureId)
								if (message.payload.jsonData.featureId === item.payload.jsonData.featureId) {
									item.payload.jsonData = message.payload.jsonData;
									processed = true;
								}
							if (!message.payload.jsonData.featureId && item.payload.jsonData.internal.ol_uid)
								if (message.payload.jsonData.internal.ol_uid === item.payload.jsonData.internal.ol_uid) {
									item.payload.jsonData = message.payload.jsonData;
									processed = true;
								}
							});
					if (!processed)
						featureCache.push(message);
					break;
				case 'new':
					featureCache.push(message);
					break;
			}
		}

		Mediator.prototype.deleteFeatureCache = function(message) {
			featureCache = featureCache.filter( 
				function(item) { return (item.eventName !== message.eventName) });
		}

		Mediator.prototype.updateChatCache = function(message) {
			if (message.payload != undefined) {
				var payload = message.payload;
				if (payload.jsonData.chatid != undefined) {
					chatCache.forEach(function(value, key) {
						var mapPayload = value.payload;
						if (mapPayload.jsonData.chatid == payload.jsonData.chatid) {
							chatCache.delete(key);
						}
					});
					chatCache.set(message.eventName, message);
				}
			}
		}

		Mediator.prototype.deleteChatCache = function(message) {
			chatCache.delete(message.eventName);
		}

		//Send Message on Rabbit Bus
		Mediator.prototype.sendMessage = function(message) {
			if (message) {
				var reqid = Util.generateUUID();
				if (requestLogging) {
					EventManager.fireEvent('iweb.logger.log.debug', ["Attaching client-side requestId to message: ", reqid, message]);
				}
				message.requestId = reqid;
			}

//			logger.log(" Mediator sendMessage " + JSON.stringify(message) + " with  socketConnected " + socketConnected);
			if (message.eventName != undefined) {
				if (message.eventName.indexOf('nics.collabroom.feature.create') >= 0 ||
					message.eventName.indexOf('nics.collabroom.feature.change') >= 0 ||
					message.eventName.indexOf('nics.collabroom.feature.delete') >= 0 ) {
					this.updateFeatureCache(message);
				}
				if (message.eventName.indexOf('chat.proxy.') >= 0) {
					this.updateChatCache(message);
				}
			}
			if (socketConnected) {
				if (!ws.request.isReopen)
					ws.push(JSON.stringify(message));
				return true;
			}
			return false;
		};

		Mediator.prototype.publishMessage = function(topic, message) {
			this.sendMessage({
				type: "publish",
				message: JSON.stringify(message),
				topic: topic
			});
		};

		//Subscribe to Message Bus
		Mediator.prototype.subscribe = function(topic) {
			if ($.inArray(topic, topics) == -1) { topics.push(topic); }
			this.sendMessage({ type: "subscribe", topic: topic });
		};

		//Unsubscribe from Message Bus
		Mediator.prototype.unsubscribe = function(topic) {
			var index = $.inArray(topic, topics);
			if (index != -1) { topics.splice(index, 1); }

			this.sendMessage({ type: "unsubscribe", topic: topic });
		};
		
		Mediator.prototype.handleSuccessResponse = function(eventName, response) {
				try {
					if (!response.responseText) {
						EventManager.fireEvent(eventName, response.responseText);
					} else {
						if ((response.responseText.indexOf("Log in to") !== -1) && 
							(response.responseText.indexOf("scout-logo") !== -1))
						{
							EventManager.fireEvent('onLogoutOfOIDCSession'); //Give everyone a chance to clean up
							return;					
						}
						var message = JSON.parse(response.responseText);
						if (message) {
							EventManager.fireEvent(eventName, message);
						}
						message.eventName = eventName;
						if (message.eventName != undefined) {
							if (message.eventName.indexOf('nics.collabroom.feature.create') >= 0 ||
								message.eventName.indexOf('nics.collabroom.feature.change') >= 0 ||
								message.eventName.indexOf('nics.collabroom.feature.delete') >= 0 ||
								message.eventName.indexOf('iweb.messageTest') >= 0) {
								_mediator.deleteFeatureCache(message);
							}
							if (message.eventName.indexOf('chat.proxy.') >= 0) {
								_mediator.deleteChatCache(message);
							}
						}
						
					}
				} catch (e) {
					//Log error...
					EventManager.fireEvent(eventName, response.responseText);
				}
			};
			
		Mediator.prototype.handleFailureResponse = function(eventName, response) {
				try {
					 
					var message = JSON.parse(response.responseText);
					if (message) {
						EventManager.fireEvent(eventName, message);
					}
				} catch (e) {
					//Log error...
					EventManager.fireEvent(eventName, response.responseText);
				}
			};	

		Mediator.prototype.attachHandlers = function(request, eventName) {
			request.success = function(data, textStatus, response ){
					_mediator.handleSuccessResponse(eventName, response);
				};
			request.error = function( jqXhr, textStatus, response ){
					_mediator.handleFailureResponse(eventName, response);
				}
			return request;
		}
		

		// Send delete message to the rest api
		Mediator.prototype.sendDeleteMessage = function(url, eventName, responseType) {
			var request = {
				url: url,
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json',
							'requestid': Util.generateUUID() },
			};
			var message = {
				eventName: eventName,
				payload: request
			}
			$.ajax(
				this.attachHandlers(
				{
					type: message.payload.method,  
					dataType: 'text',
					url: message.payload.url,
					headers: message.payload.headers
				},eventName));
		};

		// Send PUT message to the rest api
		Mediator.prototype.sendPutMessage = function(url, eventName, payload, responseType) {
				var request = {
					url: url,
					method: 'PUT',  
					dataType: 'text',
					contentType: 'application/json' ,
					jsonData: payload,
					headers: { 'Content-Type': 'application/json',
								'requestid': Util.generateUUID() },
				};
				var message = {
					eventName: eventName,
					payload: request
				}

				if (!responseType || responseType.indexOf('json')) {
					request.headers = { 'Content-Type': 'application/json' };
				}

				if (socketConnected) {
					try {
						$.ajax(
							this.attachHandlers(
							{
								type: message.payload.method,  
								dataType: 'text',
								contentType: message.payload.contentType ,
								data: JSON.stringify(message.payload.jsonData),
								url: message.payload.url,
								headers: message.payload.headers
							},eventName));
					} catch(err) {
						console.log("Error in attaching request handlers");
					}
				}
		};

		// Send post message to the rest api
		Mediator.prototype.sendPostMessage = function(url, eventName, payload, responseType) {
			var request = {
				url: url,
				method: 'POST',  
				dataType: 'text',
				contentType: 'application/json' ,
				jsonData: payload,
				headers: { 'Content-Type': 'application/json',
							'requestid': Util.generateUUID() },
			};

			if (!responseType || responseType.indexOf('json')) {
				request.headers = { 'Content-Type': 'application/json' };
			}
			var message = {
				eventName: eventName,
				payload: request
			}
			logger.log(" Mediator sendPostMessage " + JSON.stringify(message) + " with  socketConnected " + socketConnected);

			let messageToBeSent = true;
			if (message.eventName != undefined) {
				if (message.eventName.indexOf('nics.collabroom.feature.create') >= 0 ||
					message.eventName.indexOf('nics.collabroom.feature.change') >= 0 ||
					message.eventName.indexOf('nics.collabroom.feature.delete') >= 0 ||
					message.eventName.indexOf('iweb.messageTest') >= 0) {
					if (message.eventName.indexOf('iweb.messageTest.new') >= 0)
						message.payload.jsonData.internal.action = 'new';
					this.updateFeatureCache(message);
					messageToBeSent = (featureCache.length > 0);
				}
				if (message.eventName.indexOf('chat.proxy.') >= 0) {
					this.updateChatCache(message);
				}
			}
			if (socketConnected && messageToBeSent) {
				if (messageToBeSent) {
				if (request.data)
						delete request.data['internal'];
				try {
					
					//$.ajax(url, request).then(_mediator.attachHandlers(eventName, request));
					// $.ajax(url, request).then(_mediator.attachHandlers(eventName, request));
					// TO-DO : need to add common request handlers across POST,PUT,DELETE,GET methods 
					$.ajax(
						this.attachHandlers(
							{
								type: message.payload.method,  
								dataType: 'text',
								contentType: message.payload.contentType ,
								data: JSON.stringify(message.payload.jsonData),
								url: message.payload.url,
								headers: message.payload.headers
							},eventName));

				} catch(err) {
					console.log("Error in attaching request handlers");
				}
			}}
		};

		//Send request message to rest api
		Mediator.prototype.sendRequestMessage = function(url, eventName, responseType) {
			var request = {
				url: url,
				method: 'GET'
			};
			var message = {
				eventName: eventName,
				payload: request
			}
			logger.log("Mediator onOpen initiated with request " + request);
			
			$.ajax(
				this.attachHandlers(
				{
					type: message.payload.method,  
					dataType: 'text',
					url: message.payload.url,
					headers: message.payload.headers
				},eventName));
		};

		Mediator.prototype.setSessionId = function(id) {
			sessionId = id;
		};

		Mediator.prototype.getSessionId = function() {
			return sessionId;
		};

		Mediator.prototype.setReinitalizeUrl = function(url) {
			ws.request.url = url;
		};

		/*** NEED TO MOVE THIS OUT ***/
		Mediator.prototype.setCurrentUserSessionId = function(id) {
			currentUserSessionId = id;
		};

		Mediator.prototype.getCurrentUserSessionId = function() {
			return currentUserSessionId;
		};

		function createInstance() {
       		 var object = new Mediator();
       		 return object;
   		};

    return {
	
		initialize: function(initTopics, callback) {
			init(initTopics, callback);
		}, 

        getInstance: function () {
			console.log("GetInstance");
			console.dir(_mediator);
			// return _mediator;

				if (_mediator) {
					return _mediator;
				}
				//throw not initialized exception
        }
    };
})(); 
 
export default Mediator;