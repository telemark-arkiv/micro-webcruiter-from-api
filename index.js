'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { parse } = require('url')
const { send } = require('micro')
const config = require('./config')
const getData = require('./lib/get-data')

module.exports = async (request, response) => {
  const { pathname } = await parse(request.url, true)
  if (pathname === '/rss') {
    const json = await getData({url: config.RECRUITMENTS_URL, type: 'json'})
    send(response, 200, json)
  } else {
    response.setHeader('Content-Type', 'text/html')
    const readme = readFileSync('./README.md', 'utf-8')
    const html = marked(readme)
    send(response, 200, html)
  }
}
