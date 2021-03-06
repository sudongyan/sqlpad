const router = require('express').Router()
const passport = require('passport')
const getVersion = require('../lib/get-version.js')
const config = require('../lib/config.js')
const User = require('../models/User.js')
const ConfigItem = require('../models/ConfigItem.js')

// NOTE: this route needs a wildcard because it is fetched as a relative url
// from the front-end. The static SPA does not know if sqlpad is mounted at
// the root of a domain or if there is a base-url provided in the config
router.get('*/api/app', function(req, res) {
  User.adminRegistrationOpen(function(err, open) {
    if (err) {
      console.error(err)
      return res.json({
        error: 'Problem querying users'
      })
    }
    const adminRegistrationOpen = open

    const currentUser =
      req.isAuthenticated() && res.locals.user
        ? {
            _id: res.locals.user.id,
            email: res.locals.user.email,
            role: res.locals.user.role
          }
        : undefined

    const strategies = Object.keys(
      passport._strategies
    ).reduce((prev, curr) => {
      prev[curr] = true
      return prev
    }, {})

    // Get config items relevant to UI
    const uiConfig = ConfigItem.findAll()
      .filter(item => item.uiDependency)
      .reduce((allValues, item) => {
        allValues[item.key] = item.effectiveValue
        return allValues
      }, {})

    res.json({
      adminRegistrationOpen,
      currentUser,
      config: uiConfig,
      smtpConfigured: config.smtpConfigured(),
      googleAuthConfigured: config.googleAuthConfigured(),
      version: getVersion(),
      passport: {
        strategies
      }
    })
  })
})

module.exports = router
