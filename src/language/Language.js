



class LanguageSystem {
    constructor(){
        this.type = '',
        this.data = '';
    }
    setLanguage(language){

        if(language == "tr"){
            this.data = require('./languages/tr.json');
            this.type = language
        }
        else if(language == "en"){
            this.data = require('./languages/en.json');
            this.type = language
        }


        
    }
    getType(){
        
    }


}

var Language = new LanguageSystem();


export {Language}