const fs = require('fs')
const path = require('path')

const customerDataPath = process.argv[2] || path.join(__dirname, 'sample-csv.csv')

fs.readFile(customerDataPath, 'utf8', (err, data) => {
  if (err) return console.error(err)

  const arrOfCsvRows = data.split('\r\n')
  const arrOfKeys = arrOfCsvRows[0].split(',')
  const arrOfUserCsvRows = arrOfCsvRows.slice(1, arrOfCsvRows.length - 1)

  const createArrOfUserInfo = userRowStr => userRowStr.split(',')

  const mainArrOfUsers = []

  for (let userRow of arrOfUserCsvRows) {
    const arrOfUserInfo = createArrOfUserInfo(userRow)
    const user = {}

    for (let i = 0; i < arrOfKeys.length; i++) {
      user[arrOfKeys[i]] = arrOfUserInfo[i]
    }

    mainArrOfUsers.push(user)
  }

  const jsonMainArrOfUsers = JSON.stringify(mainArrOfUsers, null, 2)

  fs.writeFile('./customer-data.json', jsonMainArrOfUsers, err => {
    if (err) console.log(err)
    console.log('JSON File Saved')
  })
})