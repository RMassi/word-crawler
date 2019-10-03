const axios = require('axios')
const cheerio = require('cheerio')
const _ = require('lodash')

const baseUrl = "https://dicionariocriativo.com.br/sinonimos-e-antonimos/"
const maxSynonyms = 5

async function crawlPage(word, prevWords, currDepth, maxDepth) {
  prevWords = _.union(prevWords || [], [word])
  maxDepth = maxDepth || 3
  currDepth = currDepth || 0

  if(currDepth == maxDepth) {
    return Promise.resolve({word: word, synonyms: []})
  }
  // https://dicionariocriativo.com.br/sinonimos-e-antonimos/verifica%C3%A7%C3%A3o
  const requestUrl = baseUrl + encodeURI(word)

  let promise = axios({
    url: requestUrl,
    method: 'get'
  })
  .then(function(resp){
    let parsedData = parseAndGetSynonyms(resp.data)
    parsedData = _.slice(_.pullAll(parsedData, prevWords), 0, maxSynonyms)
    
    if(!parsedData.length) return Promise.resolve({word: word, synonyms: []})

    let synonymsRequests = _.map(parsedData, async function(synonym){
      if(synonym == 'teste') {
        console.log(parsedData)
      }
      return await crawlPage(synonym, prevWords ,currDepth + 1, maxDepth)
    })

    return Promise.all(synonymsRequests)
      .then(function(responses){
        if(word == 'teste') {
          console.log(parsedData)
        }
        return {word: word, synonyms: responses}
      });
  })
  .catch(function(err){
      console.log(err)
  })

  return promise
}

function parseAndGetSynonyms(htmlBody) {
  const $ = cheerio.load(htmlBody)
  let synonyms = $('#contentList .contentListData > p:first-child')
  synonyms = synonyms.map(function(idx, node){
    return cheerio(node).contents().not('span').text().split(', ')
  })

  synonyms = _.flatMap(synonyms)
  synonyms = _.uniq(synonyms)
  synonyms = _.map(synonyms, function(val){ return val + ""})

  return synonyms
}


var api = {
  crawlPage: crawlPage
}

module.exports = api
