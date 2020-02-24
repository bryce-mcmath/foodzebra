# Notes

## TM

- ES6 Module Syntax rather than require
- constant values should be LIKE_THIS
- constant should be in own file and imported
- prettier settings
  - keep brackets around single param arrow funcs
  - allow more arguments before putting each on own line
  - don't omit braces on multiline ifs
- for true/false returns, reformat
- concantenate errors in inserts and queries
- remove unused imports or at least comment them out
- (\_, res) when you don't need the first parameter
- menu item modal, limited description length
- modal text size
- spinner and display nothing while data loading
- no transparency on nav on tablet and under

## DM

- rebase bad commits
- no unnecessary default args
- too much logic in twilio_api.js
- break routes into smaller pieces
- no console.logs in commited code
- add tests
- readable as english

## GJ

- include scss files in style tags of components
- vue.config.js add proxy using devServer, remove baseURL
- vue router, send to requested page after login using beforeEach
- vuetify
- vuex
- async/await + trycatch
-

## KC

### Miscellaneous

​

- If you find you're extracting some very generic functions that don't specifically belong anywhere in the suggested project structure below, you can also have a `helpers/` or `utils/` folder to put those in (either in the project root, or in `server/` or `client/` if they belong there). For ex. you could probably remove the `numFormatAndValidator` function from `twilio_api.js` (as it's not specific to Twilio) and put it in some helper file.
  ​
- Queries should just return the useful object itself. Ones that are supposed to return a **single** object should not return an array. eg: Instead of returning `db.query(etc)`, `getUserById` should return `db.query(etc).then(res => res.rows[0] || null)`. This will help clean up your routes a bit, since they're always having to extract the actual result from `result.rows[0]`.
  ​
- Another thing that would help clean up many of your route handlers is the following:
  ​
  For example in `orders.js`, in the `get('/')` route):
  ```
  if (result.rows) {
    res.json(result.rows);
  } else {
    res.json([]);
  }
  ```
  ​
  could be replaced by:
  ```
  res.json(result.rows || []);
  ```
  ​
- Could extract your specific error message strings into reusable constants at the top of your file or even store them in another file if there are many. This makes them easy to edit in one place and you can reference `EMAIL_MISSING` in your code when you need to output the string.
  ​
- There's a fair amount of repeated code between route handlers.
  ​
- `isValid___` validator functions in `inserts.js` have a pattern similar to this:
  ```
  if (booleanExpression) {
    return true
  }
  return false
  ```
  This pattern can be replaced much more concisely with: `return booleanExpression`.
  ​
