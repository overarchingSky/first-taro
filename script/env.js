const dotenv = require('dotenv')
const path = require('path')
const debug = require('debug')
const dotenvExpand = require('dotenv-expand')
// 先加载的具有优先权，加入先后执行loadEvn('prod');loadEvn('dev')，那么最终结果为prod的
function loadEnv (mode) {
  const logger = debug('taro:env')
  const basePath = path.resolve(`.env${mode ? `.${mode}` : ``}`)
  const localPath = `${basePath}.local`

  const load = path => {
    try {
      const env = dotenv.config({ path, debug: process.env.DEBUG })
      console.log('env',env)
      dotenvExpand(env)
      logger(path, env)
    } catch (err) {
      // only ignore error if file is not found
      if (err.toString().indexOf('ENOENT') < 0) {
        console.error(err)
      }
    }
  }
  console.log('env',process.env.NODE_ENV)
  
  if(process.env.NODE_ENV === 'development'){
    load(localPath)
  }
  load(basePath)
  // by default, NODE_ENV and BABEL_ENV are set to "development" unless mode
  // is production or test. However the value in .env files will take higher
  // priority.
  if (mode) {
    // always set NODE_ENV during tests
    // as that is necessary for tests to not be affected by each other
    const shouldForceDefaultEnv = (
      process.env.VUE_CLI_TEST &&
      !process.env.VUE_CLI_TEST_TESTING_ENV
    )
    const defaultNodeEnv = (mode === 'production' || mode === 'test')
      ? mode
      : 'development'
    if (shouldForceDefaultEnv || process.env.NODE_ENV == null) {
      process.env.NODE_ENV = defaultNodeEnv
    }
    if (shouldForceDefaultEnv || process.env.BABEL_ENV == null) {
      process.env.BABEL_ENV = defaultNodeEnv
    }
  }
}

module.exports = loadEnv

