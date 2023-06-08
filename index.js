// /* Your Code Here */

// /*
//  We're giving you this function. Take a look at it, you might see some usage
//  that's new and different. That's because we're avoiding a well-known, but
//  sneaky bug that we'll cover in the next few lessons!

//  As a result, the lessons for this function will pass *and* it will be available
//  for you to use if you need it!
//  */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

// Helper function to calculate the hours between two timestamps
const calculateHours = (timeIn, timeOut) => {
    const timeInHours = parseInt(timeIn.slice(-4), 10) / 100;
    const timeOutHours = parseInt(timeOut.slice(-4), 10) / 100;
    return timeOutHours - timeInHours;
  };
  
  //Creates an Employee Record object with the necessary information from an array.
  const createEmployeeRecord = (employeeData) => {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  };
  
  // Keeps record of the employee's data
  const createEmployeeRecords = (employeesData) => {
    return employeesData.map(createEmployeeRecord);
  };
  
  // Gets the timestamp and splits it into 2 strings and assigns it to the proper aspects of the Employee Record
  const createTimeInEvent = function (timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    this.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date });
    return this;
  };
  
  // Gets the timestamp and does what the TimeIn Event does except for time out
  const createTimeOutEvent = function (timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date });
    return this;
  };
  
  // Calculates the hours worked by an employee on a specific date
  const hoursWorkedOnDate = function (date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    return calculateHours(timeInEvent.hour.toString(), timeOutEvent.hour.toString());
  };
  
  // Calculates the wages Earned by an employee on a specific date
  const wagesEarnedOnDate = function (date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  };
  
//Calculate the total wages earned by an employee for all dates worked.
    const allWagesFor = function () {
        const eligibleDates = this.timeInEvents.map(function (e) {  // Get an array of all dates worked
        return e.date;
        });
    
        const payable = eligibleDates.reduce(function (memo, d) {  // Calculate the total wages by summing the wages earned on each date
        return memo + wagesEarnedOnDate.call(this, d);
        }.bind(this), 0);  // After asking Google it seems "Bind" would get the current context to the reduce function to maintain the correct context inside the callback
    
        return payable;  // Return the total wages earned
    };
    
    // Find an employee's record by the first name.
    const findEmployeeByFirstName = (srcArray, firstName) => {
        return srcArray.find(employee => employee.firstName === firstName);
    };
  
  // Calculates the total payroll for all employees.
  const calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
  };