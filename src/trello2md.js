import Trello from 'trello';

export default class Trello2md {
  constructor(key, token) {
    this.trello = new Trello(key, token);
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

      lines.map((line) => { console.log(line)});

      this.trello.makeRequest('get', '/1/cards/591865973e5bcf4b06f77117/actions', {}).then((result)=>{
        console.log(result);
      });

      //https://trello-avatars.s3.amazonaws.com/ + avatarHash
    });
  }

fetch(boardId) {
  return this.getLists(boardId)
    .then(this.resolveCards.bind(this))
    .catch((error) => {
      throw error;
    });
  }

  getLists(boardId) {
    return new Promise((resolve) => {
      this.trello.getListsOnBoard(boardId)
        .then((lists) => {
          resolve(lists);
        })
        .catch((error) => {
          throw error;
        });
    });
  };

  resolveCards(lists) {
    let requests = [];
    if (lists instanceof Array && lists.length > 0) {
      requests = lists.map((list) => {
        return this.getCard(list);
      });
    }
    return Promise.all(requests);
  }

  getCard(list) {
    return new Promise((resolve) => {
      this.trello.getCardsOnList(list.id)
        .then((cards) => {
          list.cards = cards;
          resolve(list);
        })
        .catch((error) => {
          throw error;
        })
    });
  }
}
