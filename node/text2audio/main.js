var http = require('http')
var queryString = require('querystring')
var fs = require('fs')
var path = require('path')

var text2audio = (text) => {
  var data = queryString.stringify({
    "lan": "zh",
    "ie": "UTF-8",
    "spd": 4,
    "text": text || '你好'
  })

  var options = {
    "method": "GET",
    "hostname": "tts.baidu.com",
    "path": "/text2audio?" + data
  }

  var req = http.request(options, res => {
    var chunks = []

    res.on('data', chunk => {
      chunks.push(chunk)
    })

    res.on('end', () => {
      var body = Buffer.concat(chunks)
      var filePath = path.normalize('./test.mp3')
      fs.writeFileSync(filePath, body)
    })
  })

  req.end()
}

var str = "荒诞学家有他浮夸独特的审美,唱着歌踏着舞步在这扭曲的世界,去揭露形形色色的假面。"
text2audio(str)