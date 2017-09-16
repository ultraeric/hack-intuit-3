import processing from './processing';
function decisionHandler(id, msg, db, sendTextMessage) {
  let result = processing(id, msg, db, sendTextMessage);
  if (result) {
    return result;
  } else {
    /* JT your stuff here! */
    if (msg.includes('help')) {
      return help();
    } else if (msg.includes('advice')) {
      return advise(id, msg);
    } else if (msg.includes('goal')) {
      return goal(id, msg, db);
    } else if (msg.includes('log')) {
      return log(id, msg, db);
    } else if (msg.includes('average')) {
      return log(id, msg, db);
    }
  }
}

// Return list of possible queries/methods
function help(id, msg) {
    return `Possible commands:
            Ask for help! (help)
            Ask for financial advice! (advice)
            Check your financial goal! (goal)
            Log an expense! (log <num>)
            Check your average spending! (average)`
}

// Returns financial advice!
function advise(id, msg) {

}

// Returns your progress to your financial goal
function goal(id, msg, db) {

}

// Manually log a user's transaction
function log(id, msg, db) {

}

// Return average amount spent per day
function spent(id, msg, db) {

}

export default decisionHandler;
export {decisionHandler};
