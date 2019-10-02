let express = require('express')
let crawler = require('./crawler')
let cors = require('cors');
const axios = require('axios')

let app = express()
app.use(cors())
app.use(express.static('dist'))

app.get('/search', function (req, res) {
  crawler.crawlPage(req.query.search).then(function(resp){
    res.send(resp)
  })
})

let port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)


// keep server alive
setInterval(function(){ 
  axios({
    url: "https://word-crawler-rmassi.herokuapp.com/",
    method: 'get'
  })
}, 5* 60 * 1000);