export const formatDate = (dateToFormat) => {
    let date = new Date(dateToFormat);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // months are zero indexed
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let hourFormatted = hour % 12 || 12; // hour returned in 24 hour format
    let minuteFormatted = minute < 10 ? "0" + minute : minute;
    let morning = hour < 12 ? "am" : "pm";

    return month + "/" + day + "/" + year + " " + hourFormatted + ":" +
            minuteFormatted + morning;
};