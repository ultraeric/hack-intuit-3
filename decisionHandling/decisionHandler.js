import processing from './processing';
function decisionHandler(id, msg, db) {
  let result = processing(id, msg, db);
  if (result) {
    return result;
  } else {
    /* JT your stuff here! */
  }
}

// Return list of possible queries/methods
function help(id, msg) {

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
