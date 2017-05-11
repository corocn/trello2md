var Promise = require("es6-promise");
var Trello = require("trello");

var Trello2md = function(key, token) {
  this.trello = new Trello(key ,token)
};

Trello2md.prototype.fetch = function(boardId) {
  this.getLists(boardId)
    .then(this.getCards.bind(this))
    .then(dump);
};

Trello2md.prototype.getLists = function(boardId) {
  self = this;
  return new Promise(function(resolve, reject) {
    self.trello.getListsOnBoard(boardId, function(error, lists) {
      if (error) {
        reject(error);
      } else {
        resolve(lists);
      }
    });
  });
};

Trello2md.prototype.getCards = function(lists) {
  self = this;
  var requests = lists.map(function(list) {
    return self.getCard(list);
  });
  return Promise.all(requests);
};

Trello2md.prototype.getCard = function(list) {
  self = this;
  return new Promise(function(resolve, reject){
    self.trello.getCardsOnList(list.id, function(error, cards) {
      if (error) {
        reject(error);
      } else {
        list.cards = cards;
        resolve(list);
      }
    });
  });
};

function dump(obj) {
  console.log(obj);
}

module.exports = Trello2md;
