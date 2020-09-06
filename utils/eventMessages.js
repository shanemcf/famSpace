const monthLengthCommon = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthLengthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekDays = ['Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday', 'Saturday', 'Friday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var today = Date.now();

//Returns Full Day count from MS count of current time
function dayCountFromMilliseconds(dayMS) {

    let dayMSR = dayMS % 86400000;
    dayMS = (dayMS - dayMSR) / 86400000;
    return dayMS;

}

//Determines if a year is a leap year and returns either the number of days in the year, or a boolean of if it is a leap year
function isLeapYear(year, purpose) {

    //if a year is divisible by 4, then it is potentially a leap year, if it is not divisible by 100 unless it is also divisible by 400 it is a leap year
    if (year % 4 == 0 && (year % 100 != 0 || (year % 100 == 0 && year % 400 == 0))) {

        if (purpose == 'yearDayCount') {
            return 366;
        }
        else if (purpose == 'bool') {
            return true;
        }
    }
    else {
        if (purpose == 'yearDayCount') {
            return 365;
        }
        else if (purpose == 'bool') {
            return false;
        }
    }
}

//Days since Base Day, passed day in YYYY.MM.DD format
function dayCountFromCalendarDate(calendarDate) {

    let dayCount = 0;

    //Split the string
    calendarDate = calendarDate.split('.');

    let year = parseInt(calendarDate[0]);
    let month = parseInt(calendarDate[1]);
    let day = parseInt(calendarDate[2]);

    //Years since 1920 to days
    for (var i = 1970; i < year; i++) {
        dayCount += isLeapYear(i, 'yearDayCount');
    }

    //months to days
    for (let i = 0; i < month - 1; i++) {
        if (i == 1 && isLeapYear(year, 'bool')) {
            dayCount += monthLengthLeap[i];
        }
        else {
            dayCount += monthLengthCommon[i];
        }
    }

    // add days
    dayCount += day;

    return dayCount;

}

function calendarDateFromDayCount(dayCount) {

    //Base Day is January 1, 1970, a Thursday
    let year = 1970;
    let month = 1;
    let date = 0;

    while (dayCount > 365) {

        dayCount = dayCount - isLeapYear(year, 'yearDayCount');
        year++;

    }

    for (let i = 0; i < 12; i++) {

        if(dayCount < 28){
            break;
        }

        if (isLeapYear(year, "bool")) {
            dayCount = dayCount - monthLengthLeap[i];
        }
        else {
            dayCount = dayCount - monthLengthCommon[i];
        }

        month++;
    }


    date += dayCount;

    return year + "." + month + "." + date;

}

//Given a day count since January 1, 1970, what is the day of the week
function dayOfTheWeek(dayCount) {

    let daysSinceBase = dayCount - 1;

    var iterator = 0;

    for (let i = daysSinceBase; i < daysSinceBase + 7; i++) {

        if (i % 7 == 0) {
            return weekDays[iterator]
        }
        iterator++;
    }
}

//takes a numerical date and returns it as text
function verboseDate(calendarDate) {

    calendarDate = calendarDate.split('.');
    let monthName = months[calendarDate[1] - 1];

    return (monthName + ' ' + calendarDate[2] + ', ' + calendarDate[0]);

}

//tells user of upcoming events
function eventNotification(buffer, eventData) {

    let todaysDate = (calendarDateFromDayCount(dayCountFromMilliseconds(today))).split(".");
    let currentYear = todaysDate[0];

    let daysToEvent = 0;
    let currentYearEventDate = "";
    let nextYearEventDate = "";
    let tempDataContainer = "";
    let message = "";

    let upcomingEvents = [];
    let messages = [];

    for (let i = 0; i < eventData.length; i++){

        tempDataContainer = eventData[i].birthday.split('.');
        currentYearEventDate = currentYear + "." + tempDataContainer[1] + "." + tempDataContainer[2];
        nextYearEventDate = (parseInt(currentYear) + 1) + "." + tempDataContainer[1] + "." + tempDataContainer[2];

        daysToEvent = dayCountFromCalendarDate(currentYearEventDate) - dayCountFromMilliseconds(today) - 1;

        if( daysToEvent < buffer && daysToEvent == 0){

            message = eventData[i].name + "'s birthday is today!";
            upcomingEvents.push({daysToEvent, message})
        }

        else if( daysToEvent < buffer && daysToEvent > 0){

            message = eventData[i].name + "'s birthday is " + daysToEvent + " days from now on " + dayOfTheWeek(dayCountFromCalendarDate(eventData[i].birthday)) + " " + verboseDate(currentYearEventDate);
            upcomingEvents.push({daysToEvent, message})
        }

        daysToEvent = dayCountFromCalendarDate(nextYearEventDate) - dayCountFromMilliseconds(today);

        if(daysToEvent < buffer && daysToEvent > 0){
            message = eventData[i].name + "'s birthday is " + daysToEvent + " days from now on " + dayOfTheWeek(dayCountFromCalendarDate(eventData[i].birthday)) + " " + verboseDate(nextYearEventDate);
            upcomingEvents.push({daysToEvent, message})
        }
    }

    upcomingEvents.sort(function(a,b){return a.daysToEvent-b.daysToEvent});

    for(let i = 0; i < upcomingEvents.length; i++){
        
        messages.push(upcomingEvents[i].message);
    }

    return messages;

}

module.exports = { eventNotification };