/* eslint-disable */
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/api/logout', function(req, res) {
          res.json({
            code: -1
          })
        })

        app.get('/api/goods', function(req, res) {
          res.json({
            code: 0,
            data: [
              {'text': 'WEB前端工程师', 'price': 100},
              {'text': 'WEB前端架构师', 'price': 100}
            ]
          })
        })

        app.get('/api/login', function (req, res) {
          const { username, passwd } = req.query
          if (username == 'weikebang' && passwd == '123') {
            res.json({
              code: 0,
              token: 'weikebangzhenbucuo-' + (new Date().getTime() + 1000 * 60) + '-' +username
            })
          } else {
            res.json({
              code: 1,
              message: '用户名或密码错误'
            })
          }
        })
      }
    }
  }
}
