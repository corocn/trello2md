import Trello from 'trello';

Trello.prototype.getActionsOnBoard = function (boardId, callback) {
  return makeRequest(rest.get, this.uri + '/1/boards/' + boardId + '/actions', {query: this.createQuery()}, callback);
};

export default class Trello2md {
  constructor(key, token) {
    this.trello = new Trello(key, token);
    this.clear();
  }

  clear() {
    this.lists = [];
    this.cards = [];
    this.actions = [];
  }

  convert(boardId) {
    this.fetch(boardId).then((lists) => {
      let lines = [];
      lists.map((list) => {
        lines.push('## :apple: ' + list.name);
        lines.push('');

        list.cards.map((card) => {
          lines.push('### :wrench: [' + card.name + '](' + card.url + ')');
          lines.push('');
          lines.push(card.desc);
          lines.push('');

          console.log(card);
        });
      });

      lines.map((line) => {
        console.log(line)
      });

      this.trello.makeRequest('get', '/1/cards/591865973e5bcf4b06f77117/actions', {}).then((result) => {
        console.log(result);
      });

      //https://trello-avatars.s3.amazonaws.com/ + avatarHash
    });
  }

  fetch(boardId) {
    this.getActions(boardId).then((data) => {
      console.log(data);
    })
  }

  getLists(boardId) {
    return new Promise((resolve) => {
      this.trello.getListsOnBoard(boardId)
        .then((lists) => {
          resolve(lists);
        });
    });
  };

  getCards(boardId) {
    return new Promise((resolve) => {
      this.trello.getCardsOnBoard(boardId)
        .then((cards) => {
          resolve(cards);
        });
    });
  }

  getActions(boardId) {
    return new Promise((resolve) => {
      this.trello.makeRequest('get', '/1/boards/' + boardId + '/actions', {}).then((actions) => {
        resolve(actions);
      });
    });
  }
}
