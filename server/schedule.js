// Require schedule
let schedule = require('schedulejs');

// To make schedules easier to read, we'll be using the text parser from later,
// if you manually specify the later schedules, you don't need to require it here
let later = require('later'),
  p = later.parse.text;

// Step 1: Define the work items (tasks), property names don't matter at this
// point, we'll fix them up later using schedule.task
let workItems = [
  {
    name: 'Purchase supplies',
    length: 2,                      // lengths specified in hours
    minSchedule: 2,                 // have to schedule all 2 hours at once
    assignedTo: ['Bob', 'Sara'],    // both Bob and Sara are needed
    availability: 'after 8:00am and before 9:00pm'
    //can only complete when paint store is open
  },
  {
    name: 'Remove doors',
    length: 0.5,
    assignedTo: ['Bob']
  },
  {
    name: 'Clear furniture',
    length: 1,
    assignedTo: [['Sara', 'Bob']]   // either Bob or Sara is needed
  },
  {
    name: 'Protect carpet',
    dependsOn: ['Purchase supplies', 'Clear furniture', 'Remove doors'],
    length: 2,
    assignedTo: [['Bob', 'Sara']]
  },
  {
    name: 'Paint trim',
    dependsOn: ['Protect carpet'],  // specifying task dependencies
    length: 3,
    assignedTo: [['Bob', 'Sara']]
  },
  {
    name: 'Paint walls',
    dependsOn: ['Protect carpet'],
    length: 5,
    assignedTo: [['Bob', 'Sara']]
  },
  {
    name: 'Paint doors',
    dependsOn: ['Remove doors', 'Protect carpet'],
    length: 2,
    assignedTo: [['Bob', 'Sara']]
  },
  {
    name: 'Cleanup',
    dependsOn: ['Paint trim', 'Paint walls', 'Paint doors'],
    length: 1,
    assignedTo: [['Bob', 'Sara']]
  },
  {
    name: 'Replace furniture',
    dependsOn: ['Paint trim', 'Paint walls', 'Paint doors'],
    length: 0.5,
    assignedTo: [['Bob', 'Sara']]
  },
  {
    name: 'Install doors',
    dependsOn: ['Paint doors', 'Paint trim', 'Paint walls'],
    length: 0.5,
    assignedTo: ['Bob', 'Sara']
  }
];

// Step 2: Define our resources, we'll fix up property names with schedule.resources
let people = [
  {
    name: 'Bob',
    // Bob likes to sleep in a bit on the weekends
    availability: 'every weekend after 10:00am and before 6:00pm'
  },
  {
    name: 'Sara',
    // Sara gets up earlier but has plans Saturday afternoon so we note that in her availability
    availability: 'every weekend after 8:00am and before 6:00pm except on Sat after 1:00pm and before 4:00pm'
  }
];

// Step 3: Tasks aren't in the right format, need to create a generator
let t = schedule.tasks()
  .id(function(d) { return d.name; })
  // our length is in hours, convert to minutes
  .duration(function(d) { return d.length * 60; })
  // use later.parse.text to parse text into a usable schedule
  .schedule(function(d) { return d.availability ? p(d.availability) : undefined; })
  // convert minSchedule to minutes
  .minSchedule(function(d) { return d.minSchedule ? d.minSchedule * 60 : undefined; })
  // resources are the people the tasks have been assigned to
  .resources(function(d) { return d.assignedTo; });

let tasks = t(workItems);

// Step 4: Resources aren't in the right format either, need to create a generator
let r = schedule.resources()
  .id(function(d) { return d.name; })
  .schedule(function(d) { return d.availability ? p(d.availability) : undefined; });

let resources = r(people);

// Step 5: Pick a start date for the schedule and set correct timezone
let start = new Date(2013, 2, 21);
schedule.date.localTime();

// Step 6: Create the schedule
let s = schedule.create(tasks, resources, null, start);
