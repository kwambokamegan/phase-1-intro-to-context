// Your code here
// create an employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// create multiple employee records
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Function to record a time in event
function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Function to record a time out event
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Calculatiog hours worked on a given date
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

//Calculating wages earned on a particular date

function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// calculating total wages earned

function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(event => event.date);
    let totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

//  calculating total payroll for all employees

function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}


// Create employee records

let employeeRecords = createEmployeeRecords([
    ["Jimmy", "Fallon", "Engineer", 25],
    ["Nara", "Smith", "Manager", 30]
]);

// Record time in and time out events

createTimeInEvent(employeeRecords[0], "2024-07-12 0900");
createTimeOutEvent(employeeRecords[0], "2024-07-12 1800");
createTimeInEvent(employeeRecords[1], "2024-07-12 0800");
createTimeOutEvent(employeeRecords[1], "2024-07-12 1200");

//  wages for specific dates

console.log(wagesEarnedOnDate(employeeRecords[0], "2024-07-12")); 
console.log(wagesEarnedOnDate(employeeRecords[1], "2024-07-12")); 

// total wages for all dates worked by an employee

console.log(allWagesFor(employeeRecords[0])); 
console.log(allWagesFor(employeeRecords[1])); 

//  total payroll for all employees

console.log(calculatePayroll(employeeRecords)); 
