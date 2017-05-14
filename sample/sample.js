//
// This sample got key and token from process.env.
//
// node sample.js <BoardID>
//
var Trello2md = require('../index.js');

var t = new Trello2md(
  process.env.TRELLO_KEY,
  process.env.TRELLO_TOKEN
);

if (process.argv.length == 3) {
  t.fetch(process.argv[2]).then(function(lists){
    console.log(lists);
  });
} else {
  console.log('arguments error');
}
