import EventManager from './EventManager';

class Translate {

	eventManager;
 	translation;
	systemLanguages;
	translationUrl;
	translationCode;
	browserLanguage = [];
	constructor(eventManager) {
		this.eventManager = eventManager;
	}

	init(url){
		if(url){
			this.loadLanguages(url);
		}
	}
	 
	i18nJSON(string){
		return (this.translation && this.translation[string]) ? (this.translation[string]) : string;
	} 
	
	getSystemLanguages() {
		if(this.systemLanguages){
			return this.systemLanguages;
		}	
		//return languages not loaded error
	}
	
	setDefaultLanguage(){
		this.loadDefaultTranslation();
	}
	
	setSystemLanguage(code){
		this.loadTranslation(code);
	}
	
	selectAnOrganization(){
		return this.selectAnOrg();
	}

	loadLanguages(url){
		this.translationUrl = url;
		me = this;
		$.getJSON(this.translationUrl + "registry.json", function(registry) {
				me.systemLanguages = registry;
				EventManager.fireEvent("iweb.translations.loaded");
			}).fail(function(e, e2, e3) {
				alert( "There was an error loading the translation registry." );
		});
	};
	
	loadDefaultTranslation(){
		if(this.systemLanguages){
			for(i=0; i<this.systemLanguages.length; i++){
				if(this.systemLanguages[i].default){
					this.loadTranslation(this.systemLanguages[i].code);
					return;
				}
			}
		}
		
		var defaultLanguage = getBrowserLanguage();
		if(defaultLanguage){
			for(var i=0; i<defaultLanguage.length; i++){
				translation = loadTranslation(defaultLanguage[i]);
				if(translation){
					break;
				}
			}
		}
	};
	
	getBrowserLanguage() {
		if(this.browserLanguage.length == 0){
			//Figure out which ones we have loaded,
			var navigatorLanguage = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
			
			//remove hyphen
			this.browserLanguage.push(navigatorLanguage.replace(/-/i, "")); 
			this.browserLanguage.push(navigatorLanguage.split("-")[0]);
		}
		return this.browserLanguage;
	};
	
	loadTranslation(code){
		//Don't reload if the language has already been loaded
		if(code != this.translationCode){ //TODO: configure the default that the app is built with?
			let url = this.translationUrl + //configured web enabled directory
						code + "/" + //language specific directory
						code + ".json"; //translation file
			me  = this;
			$.getJSON(url, function(json) {
				if(json) {
				me.translationCode = code;
				me.translation = json;
				EventManager.fireEvent("nics.translation.loaded");
				}
			}).fail(function(e, e2, e3) {
				alert( "There was an error loading the translation." );
			});
		}
	}
    	
     selectAnOrg(){
		if(this.systemLanguages){
			for(i=0; i<this.systemLanguages.length; i++){
				if(this.systemLanguages[i].default){
					let defaultLanguage = this.systemLanguages[i];
					if(defaultLanguage && defaultLanguage.code && defaultLanguage.selectAnOrg){
						return defaultLanguage.selectAnOrg;
					}
				}
			}
		}
		return "Select an organization for this session";
    }
        

 }

 export default Translate;