'use strict'

const repl = require('repl')
const webdriver = require('selenium-webdriver')
const safari = require('selenium-webdriver/safari')

const args = require('yargs')
  .scriptName('webdriver-cli')
  .command('launch', 'Launch a new WebDriver session', {
    browser: {
      alias: 'b',
      description: 'Browser to launch',
      default: 'chrome',
      choices: ['chrome', 'safari'],
    },
    url: {
      alias: 'u',
      description: 'WebDriver remote url',
      string: true,
    },
    ['ios-sim-id']: {
      alias: 'sim',
      description: 'iOS Simulator UDID',
      string: true,
    },
  })
  .command('connect', 'Connect to existing WebDriver session', {
    ['session-id']: {
      alias: 'session',
      description: 'WebDriver Session ID to connect to',
      required: true,
    },
  })
  .help().argv

;(async () => {
  const builder = new webdriver.Builder()

  if (args._[0] === 'launch') {
    const { browser, iosSimId } = args

    builder.forBrowser(browser)

    if (browser === 'safari' && iosSimId) {
      builder.setSafariOptions(
        new safari.Options()
          .set('platformName', 'ios')
          .set('safari:useSimulator', true)
          .set('safari:deviceUDID', iosSimId)
      )
    }

    await startRepl(builder)
  } else {
    throw new Error('illegal usage')
  }
})()

async function startRepl(builder) {
  const driver = builder.build()

  process.on('exit', async () => {
    console.log('tearing down the webdriver session')
    await driver.quit()
    console.log('webdriver session destroyed')
  })

  console.log('Starting REPL use `d` to access the driver')
  const replServer = repl.start('> ')
  replServer.context.d = driver
}
