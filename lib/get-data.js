'use strict'
// Ugly fix
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const https = require('https')
const validUrl = require('valid-url')

module.exports = (options, callback) => {
  return new Promise((resolve, reject) => {
    if (!options) {
      const error = new Error('Missing required input: options')
      if (callback) {
        return callback(error, null)
      }
      reject(error)
    }
    if (!options.url) {
      const error = new Error('Missing required input: options.url')
      if (callback) {
        return callback(error, null)
      }
      reject(error)
    }
    if (options.url && !validUrl.isWebUri(options.url)) {
      const error = new Error('options.url is invalid')
      if (callback) {
        return callback(error, null)
      }
      reject(error)
    }

    const json = options.type === 'json'

    let body = ''

    https.get(options.url, (res) => {
      res.on('data', (chunk) => {
        body += chunk.toString()
      })

      res.on('end', () => {
        const result = json ? JSON.parse(body) : body.toString()
        if (callback) {
          return callback(null, result)
        }
        resolve(result)
      })
    }).on('error', (error) => {
      if (callback) {
        return callback(error, null)
      }
      reject(error)
    })
  })
}
