import $ from 'jquery';

class Util {

    // invalidInput= "Invalid Input";
    // safeString = new RegExp('[a-zA-Z0-9&_ !,@#$%*()?{}+-\\/\';:"|]*');
    // logPrefix= "IWEB - ";

    constructor(props) {
        this.invalidInput= "Invalid Input";
        this.safeString = new RegExp('[a-zA-Z0-9&_ !,@#$%*()?{}+-\\/\';:"|]*');
        this.logPrefix= "IWEB - ";
    }

    matchSafeString(input) {
        if(input != ""){
            var result = input.match(this.safeString);
            if ( result.length != 1 || result[0] == "" || result[0] != input ){
                return this.invalidInput;
            }else{
                return result[0];
            }
        }else{
            return input;
        }
    }

    getValidInput(input)
    {
        var inputStr = input + ""; //make string
        var inputArr = inputStr.split('\n');
        for(var i=0; i<inputArr.length; i++){
            if(this.matchSafeString(inputArr[i]) === this.invalidInput){
                return this.invalidInput;
            }
        }
        return input;
    }

    isValidInput(input)
    {
        if(this.getValidInput(input) == this.invalidInput){
            return false;
        }
        return true;
    }

    getBrowserVersion()
    {
        if (navigator && navigator.userAgent)
        {
            var ua = navigator.userAgent;
            ua = ua.toLowerCase();

            var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                /(msie) ([\w.]+)/.exec( ua ) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                [];

            return match[ 1 ] || "";
        }

        return "";
    }

    /**
     * Function: getUTCTimestamp
     * Gets the date/timestamp for the current UTC time.
     *
     * Returns:
     *        timestamp - a string representing the date/time
     *                    in the format "YYYY-MM-DD HH:MM:SS" (GMT/UTC)
     */
    getUTCTimestamp() {
        var date = new Date();
        return date.getUTCFullYear() + "-" + this.pad(date.getUTCMonth() + 1) +
        "-" + this.pad(date.getUTCDate()) + " " + this.pad(date.getUTCHours()) +
        ":" + this.pad(date.getUTCMinutes()) + ":" + this.pad(date.getUTCSeconds());
    }

    /**
     * Function getUTCTimestampZ
     * Gets the date/timestmap for the current UTC time in the 
     * standard format. Makes use of getUTCTimestamp()
     * 
     * Returns:
     * 		timestamp - a string representing the date/time
     * 					in the format "YYYY-MM-DDTHH:MM:SSZ"
     */
    getUTCTimestampZ() {
        var ts = this.getUTCTimestamp();
        ts = ts.replace(' ', 'T');
        ts += "Z";
        return ts;
    }

    /**
     * Function: pad
     * Pads a string with an extra zero on the left if the string is of
     * length 1.
     *
     * Parameters:
     *        inStr - the string to pad
     */
    pad(inStr) {
        var str = inStr + ""; // coerce to string
        if (str.length === 1) {
            return "0".concat(str);
        }
        return str;
    }

    /**
     * Function: generateUUID
     * Generates a UUID as per RFC 4122 ver4.
     * Code from this post: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
     */
    generateUUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === "x" ? r : r & 0x3 | 0x8;
            return v.toString(16);
        }).toUpperCase();
    }

    validateInterface(iface, obj) {
        for (var prop in iface) {
            if (obj[prop]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Date from db was considered an invalid date, so split it up and create a new date
     * @param date
     * @returns {Date}
     */
    splitDate(date)
    {
        var year,
            month,
            day,
            hour,
            min,
            sec;
        try
        {
            date = date.split("-");
            year = date[0];
            month = date[1] - 1;
            date = date[2].split(" ");
            day = date[0];
            date = date[1].split(":");
            hour = date[0];
            min = date[1];
            date = date[2].split(".");
            sec = date[0];

            return new Date(year, month, day, hour, min, sec);
        } catch (e)
        { // was just created if there's a problem with the date..
            return new Date();
        }
    } // split date

    /**
     * take created date and format to Y-m-d H:i:s
     * @param created
     */
    formatDateToString(date)
    {
        var str = date.getFullYear() + "-"
        + this.pad(date.getMonth() + 1) + "-"
        + this.pad(date.getDate()) + " "
        + this.pad(date.getHours() + ":" + this.pad(date.getMinutes())
        + ":" + this.pad(date.getSeconds()));

        return str;
    } // formatDateToString
}

export default new Util();
