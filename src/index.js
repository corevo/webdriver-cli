#!/usr/bin/env node

'use strict'

const path = require('path')
const { fork } = require('child_process')

const [_bin, _module, ...args] = process.argv
const execArgv = Array.from(
  new Set([...process.execArgv, '--experimental-repl-await'])
)

fork(path.resolve(__dirname, 'webdriver.js'), args, {
  execArgv,
  stdio: 'inherit',
})
