import {
  GET_MARKET_CAP,
  GET_GLOBAL_MARKET_CAP,
  GET_BTC_PERCENTILE,
  INIT_COINS,
  GET_COIN_PRICE,
  GET_WON_BY_DOLLAR,
  GET_TRANSACTIONS,
  GET_INFLATION,
  GET_DCB_DATA,
  GET_DDENGLE_DATA,
  GET_COINPAN_DATA,
  GET_CLIEN_DATA,
  GET_REDDIT_DATA,
} from './types.js';
import * as api from '../utils/api';


// -------------------------- Market Actions --------------------------
export const getMarketCap = (coin) => dispatch => {
  return api.getMarketCap(coin)
    .then(data => dispatch({type: GET_MARKET_CAP, data}));
};

export const getGlobalMarketCap = () => dispatch => {
  return api.getGlobalMarketCap()
    .then(data => dispatch({type: GET_GLOBAL_MARKET_CAP, data}));
};

export const getBTCPercentile = () => dispatch => {
  return api.getBTCPercentile()
    .then(data => dispatch({type: GET_BTC_PERCENTILE, data}));
};

export const initCoins = (coin) => dispatch => {
  return dispatch({
    type: INIT_COINS,
    name: coin.name,
    symbolBig: coin.symbolBig,
    symbolSmall: coin.symbolSmall,
    img: coin.img,
    coin
  });
};

export const getCoinPrice = (coin) => dispatch => {
  api.marketBithumb(coin.symbolBig)
  .then(data => dispatch({type: GET_COIN_PRICE, bithumbPrice: data, coin}))
  api.marketUpbit(coin.symbolBig)
  .then(data => dispatch({type: GET_COIN_PRICE, upbitPrice: data, coin}))
  api.marketBittrex(coin.symbolSmall)
  .then(data => dispatch({type: GET_COIN_PRICE, bittrexPrice: data, coin}))
  api.marketBitfinex(coin.symbolSmall)
  .then(data => dispatch({type: GET_COIN_PRICE, bitfinexPrice: data, coin}))
}

export const getWonByDollar = () => dispatch => {
  return api.getWonByDollar()
    .then(data => dispatch({type: GET_WON_BY_DOLLAR, data}))
}


// -------------------- Bubble Actions -------------------------
export const getTransactions = () => dispatch => {
  return api.getTransactions()
    .then(data => dispatch({type: GET_TRANSACTIONS, data}))
}

export const getInflation = (value, year) => dispatch => {
  return api.getInflation(value, year)
    .then(data => dispatch({type: GET_INFLATION, data}))
}

// -------------------- COMMUNITIES Actions -----------------------
export const getDCBData = () => dispatch => {
  return api.loadDCB()
    .then(data => dispatch({type: GET_DCB_DATA, data}))
}

export const getDdengleData = () => dispatch => {
  return api.loadDdengle()
    .then(data => dispatch({type: GET_DDENGLE_DATA, data}))
}

export const getCoinpanData = () => dispatch => {
  return api.loadCoinpan()
    .then(data => dispatch({type: GET_COINPAN_DATA, data}))
}

export const getClienData = () => dispatch => {
  return api.loadClien()
    .then(data => dispatch({type: GET_CLIEN_DATA, data}))
}

export const getRedditData = () => dispatch => {
  return api.loadReddit()
    .then(data => dispatch({type: GET_REDDIT_DATA, data}))
}
