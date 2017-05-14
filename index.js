var Promise = require("es6-promise");
var Trello = require("trello");

var Trello2md = function(key, token) {
  this.trello = new Trello(key ,token)
  this.lists = [];
};

Trello2md.prototype.fetch = function(boardId) {
  return this.getLists(boardId)
    .then(this.resolveCards.bind(this))
};

Trello2md.prototype.getLists = function(boardId) {
  self = this;
  return new Promise(function(resolve) {
    self.trello.getListsOnBoard(boardId).then(function(lists) {
      resolve(lists);
    });
  });
};

Trello2md.prototype.resolveCards = function(lists) {
  self = this;
  var requests = [];
  if (lists instanceof Array && lists.length > 0) {
    requests = lists.map(function (list) {
      return self.getCard(list);
    });
  }
  return Promise.all(requests);
};

Trello2md.prototype.getCard = function(list) {
  self = this;
  return new Promise(function(resolve){
    self.trello.getCardsOnList(list.id).then(function(cards) {
      list.cards = cards;
      resolve(list);
    });
  });
};

function dump(obj) {
  console.log(obj);
}

module.exports = Trello2md;
