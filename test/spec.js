import test from 'ava'
import Trello2md from '../lib/trello2md.js'
import sinon from 'sinon'
import sinonStubPromise from 'sinon-stub-promise'
sinonStubPromise(sinon)

var trello2md = new Trello2md(
  'API_KEY',
  'API_TOKEN',
);

test.serial('#fetch', async(t) => {
  const spy1 = sinon.spy(trello2md, 'getLists')
  const spy2 = sinon.spy(trello2md, 'resolveCards')
  const listsIncludeCards = await trello2md.fetch('BOARD_ID')
  t.is(listsIncludeCards instanceof Array, true)
  t.is(spy1.calledOnce, true)
  t.is(spy2.calledOnce, true)
});

test.serial('#getLists', async(t) => {
  const spy = sinon.spy(trello2md.trello, 'getListsOnBoard')
  const lists = await trello2md.getLists('BOARD_ID')
  t.is(spy.calledOnce, true)
});

test.serial('#resolveCards', async(t) => {
  const spy = sinon.spy(trello2md, 'getCard')
  const lists = await trello2md.resolveCards([
    {id: 'ID_1st'},
    {id: 'ID_2nd'},
    {id: 'ID_3rd'}
  ])
  t.is(spy.callCount, 3)
})

test.serial('#getCard', async(t) => {
  const spy = sinon.spy(trello2md.trello, 'getCardsOnList')
  const cards = await trello2md.getCard({id: 'LIST_ID'})
  t.is(spy.calledOnce, true)
})


// closed: false,
//   id: "5918658adf26c88b63387727",
//   idBoard: "5918657a91c7c1fb21c9cebe",
//   name: "Problem",
//   pos: 131071,
//   subscribed: false,
