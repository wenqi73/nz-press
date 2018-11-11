const chalk = require('chalk')
const fs = require('fs-extra')
const read = require('readline-sync')
const path = require('path')
const log = require('../utils/log')

/* Shortcut methods */
const execSync = require('child_process').execSync

/* The whole process */

log.info('Starting publishing process...')

let nextVersion

fetchOlderVersions()
changeVersion()
generatingPublishNote()
preRelease()
checkout()

// publish()

/**
 * Publisher should input the new version number. This script would check if the input is valid.
 */
function changeVersion() {
  log.info('Updating version number...')

  const packageJson = path.join(__dirname, '../../package.json')
  const currentVersion = fs.readFileSync(packageJson, 'utf-8').match(/"version": "([0-9.]+)"/)[ 1 ]

  let versionNumberValid = false
  let version

  function checkVersionNumber(cur, next) {
    // Must be numbers and dots.
    if (!/^[0-9][0-9.]{1,10}[0-9](\-\w+)*$/.test(next)) { return false }

    const curArr = cur.split('.')
    const nextArr = next.split('.')
    const length = curArr.length

    if (nextArr.length !== nextArr.length) {
      return false
    }
    
    for (let i = 0; i < length; i++) {
      if (curArr[ i ] < nextArr[ i ]) { return true }
      if (curArr[ i ] > nextArr[ i ]) { return false }
      if (i === length - 1 && curArr[ i ] === nextArr[ i ]) { return false }
    }
  }

  while (!versionNumberValid) {
    version = read.question(chalk.bgYellow.black('Please input the new version:') + '  ')
    if (checkVersionNumber(currentVersion, version)) {
      versionNumberValid = true
      nextVersion = version
    } else {
      log.error(`Your input ${version} is not after the current version ${currentVersion} or is unvalid. Please check it.`)
    }
  }

  fs.writeFileSync(packageJson,
    fs.readFileSync(packageJson, 'utf-8').replace(/"version": "[0-9.]+"/g, `"version": "${version}"`)
  )

  log.success('Version updated!')
}

function fetchOlderVersions() {
  log.info('Fetching older versions...')
  execSync('git checkout master')
  execSync('git pull origin master')
  execSync('git fetch origin master --prune --tags')
  log.success('Older versions fetched!')
}

function generatingPublishNote() {
  log.info('Generating changelog...')
  execSync('npm run changelog')
  log.success('Changelog generated!')

  let completeEditing = false

  while (!completeEditing) {
    const result = read.question(chalk.bgYellow.black('Please manually update docs/changelog. Press [Y] if you are done:') + '  ')
    if (result.trim().toLowerCase() === 'y') {
      completeEditing = true
    }
  }

  log.success('Change log finished!')
}

function preRelease() {
  // FIXME: No command line output???
  // log.info('Running pre-release script... Be patient...')
  // execSync('npm run pre-release')
  // log.info('pre-release completed!')
}

function checkout() {
  log.info('Checkout and push a new branch for publishing...')
  execSync(`git checkout -b publish-${nextVersion}`)
  execSync('git add .')
  execSync(`git commit -m "release(${nextVersion}): release ${nextVersion}"`)
  execSync(`git push origin publish-${nextVersion}`)
  log.success('Please go to GitHub and make a pull request.')
  log.success('Bye!')
}
