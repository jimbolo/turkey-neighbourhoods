const fs = require('fs')
const path = require('path')
const {updateSizeReport} = require('../../helpers')

const dataFilePath = path.join('data/core', 'index.json')
const targetFilePath = path.join('data/extra', 'neighbourhoods_by_district_and_city.json')

const data = JSON.parse( fs.readFileSync(dataFilePath, 'utf8') )
const tree = data.reduce(function(memo, obj) {
  if (obj.il) {
    const prop = obj.PK.slice(0, 2)
    if (!memo[prop]) memo[prop] = {}
    if (!memo[prop][obj['ilçe']]) memo[prop][obj['ilçe']] = []
    memo[prop][obj['ilçe']].push(obj.Mahalle)
  }
  return memo
}, {})

fs.writeFileSync(targetFilePath, JSON.stringify(tree), 'utf8')
updateSizeReport(targetFilePath, 'extra')
console.log(path.basename(targetFilePath) + ' has been created successfully.')
