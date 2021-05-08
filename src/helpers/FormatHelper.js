export function formatToCurrency(amount){
    return parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
export function formatToCommaSeparate(amount) {
    if (amount != null && amount > 0) {
        return amount.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",");
    } return amount;
}
//module.exports.formatToCurrency = formatToCurrency;

export const formatToRate = (rate, decimalDigits = 4) => {
    return parseFloat(rate).toFixed(decimalDigits).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
//module.exports.formatToRate = formatToRate;

export function formatDateToDDMMYYYY(date){
    const d = new Date(date);
    let  month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

export function formatDateString(dateString){
    const d = new Date(dateString);
    let  month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
//module.exports.formatDate = formatDate;

export function formatDate(date){
    const d = new Date(date);
    let  month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export const formatStringToDate = (string) => {
    const [year, month, day] = string.split('/');
    const date = new Date(year, Number(month) - 1 , day)
    return date;
}

function addZero(i) {
    if (i < 10) {
    i = "0" + i;
    }
    return i;
}

export function getHoursDate(dateString) {
    var d = new Date(dateString);

    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());

    return [h,m,s].join(':');
}

export function formatDatetime(date){
    const d = new Date(date);
    let  month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var dateTest = `${year}-${month}-${day} ${h}:${m}:${s}.000`
    return dateTest;
}
//module.exports.getHoursDate = getHoursDate;

export function toDDMMMFormat(stringDate){
    var date = new Date(stringDate);
    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    var day = date.getDate();
    var month_index = date.getMonth();
    //var year = date.getFullYear();
    return month_names[month_index] + " " + day;
}
//module.exports.toDDMMMFormat = toDDMMMFormat;

export function getYear(stringDate){
    var date = new Date(stringDate);
    return date.getFullYear();
}
//module.exports.getYear = getYear;

export function titleCase(str) {
    if (str.includes(' ')){
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' ');
    } else {
        return str;
    } 
}

export function addDays(date, days) {
    var result = date;
    result.setDate(date.getDate() + days);
    return result;
}

export const removeWhiteSpace = (string) => string.replace(/\s/g, '');

export const formatStringToBool = (string) => {
    if (string && typeof string === 'string') {
        if (string.toLowerCase() === 'true') return true;
        if (string.toLowerCase() === 'false') return false;
    }
    return string;
}

export const formatDateToMMDDYY = (date) => {
    const year = date.getFullYear() % 100;
    const yearFormatted = (year) < 10 ? `0${year}` : year;
    const month = date.getMonth() + 1;
    const monthFormatted = (month) < 10 ? `0${month}` : month;
    const day = date.getDate();
    const dayFormatted = (day) < 10 ? `0${day}` : day;
    return [monthFormatted, dayFormatted, yearFormatted];
}

export function getTimehhmm(datetime){
    let hours = datetime.getHours();
    let minutes = datetime.getMinutes();
    var hoursText = hours;
    var minutesText = minutes;
    if(hours < 10){
        hoursText = '0' + hours;
    }
    if(minutes < 10){
        minutesText = '0' + minutes;
    }
    return hoursText + ':' + minutesText;
}