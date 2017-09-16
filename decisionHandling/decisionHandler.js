import processing from './processing';

function returnAll(initMsg, repeatMsg, rows) {
  let returnStr = '' + initMsg;
  for (var i in rows) {
    returnStr += rows[i];
  }
  return returnStr;
}

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
      return goal(id, msg, db, sendTextMessage);
    } else if (msg.includes('log')) {
      return log(id, msg, db);
    } else if (msg.includes('average')) {
      return spent(id, msg, db);
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
          Check your average spending! (average)`;
}

// Returns financial advice!
function advise(id, msg) {
  var advice = Array('Save early and spend less! It will pay off in the long run.',
                    'It\'s never too early to start investing!' ,
                    'Hold off on purchases that you don\'t need.' ,
                    'Cooking food is significantly cheaper than eating out!' ,
                    'Keep a close eye on your expenses and spending habits.',
                    'Everything in moderation.',
                    'http://www.investopedia.com/articles/younginvestors/08/eight-tips.asp',
                    'https://www.themuse.com/advice/50-personal-finance-tips-that-will-change-the-way-you-think-about-money',
                    'https://www.thebalance.com/top-ten-financial-tips-1289309',
                    'https://www.forbes.com/sites/jamiehopkins/2016/12/15/expert-financial-planning-tips-for-2017/#3d72083d4eac',
                    'https://www.mint.com/personal-finance-4/personal-finance-tips-from-billionaires',
                  )
  return advice[Math.floor(Math.random()*advice.length)];
}

// Returns your progress to your financial goal
function goal(id, msg, db, sendTextMessage) {
  // db.all(
  //   'SELECT * FROM goals WHERE id=' + id.toString(),
  //   (rows) => {
  //     for (var i in rows) {
  //       row[i] = 'Get ' + row[i].item + ' for ' + row[i].cost;
  //       console.log(row[i]);
  //     }
  //     sendTextMessage(id, returnAll('Your goals: ', '', rows));
  //   }
  // );
  var advice = Array('')
  return "Your goals: iPad for 100\n Mac for 1000\n GTX 1080 for 700"
}

// Manually log a user's transaction
function log(id, msg, db) {
  return 'Transaction has been successfully logged';
}

// Return average amount spent per day
function spent(id, msg, db) {
  return 'You\'ve been spending an average of $35.12 per day';
}

export default decisionHandler;
export {decisionHandler};
