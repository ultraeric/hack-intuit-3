import processing from './processing';
function decisionHandler(id, msg, db) {
  let result = processing(id, msg, db);
  if (result) {
    return result;
  } else {
    /* JT your stuff here! */
  }
}
export default decisionHandler;
export {decisionHandler};
