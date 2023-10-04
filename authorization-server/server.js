require('dotenv').config();
let express = require('express')
let req = require('request')
//let querystring = require('querystring')
let cors = require('cors')
let app = express() 

let redirect_uri_login = process.env.URI + '/callback'
let client_id = process.env.SPOTIFY_CLIENT_ID
let client_secret = process.env.SPOTIFY_CLIENT_SECRET

app.use(cors())

app.get('/authenticate', function(request, response) {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: 'user-read-private user-read-email user-library-read',
    redirect_uri: redirect_uri_login
  });
  response.redirect('https://accounts.spotify.com/authorize?' + params.toString())
})


app.get('/callback', function(request, response) {

  var code = request.query.code || null;
  var state = request.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri_login,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    }
    req.post(authOptions, function(error, res, body) {
      var access_token = body.access_token
      let uri = process.env.URI + '/playlist'

      response.redirect(uri + '?access_token=' + access_token)
    })
  }
});

const jwt = require('jsonwebtoken');
const fs = require('fs');

const private_key = fs.readFileSync('AuthKey_7G7CPVSN78.p8').toString(); 
const team_id = process.env.APPLE_TEAM_ID 
const key_id = process.env.APPLE_KEY_ID
const token = jwt.sign({}, private_key, {
  algorithm: 'ES256',
  expiresIn: '180d',
  issuer: team_id,
  header: {
    alg: 'ES256',
    kid: key_id
  }
});

app.get('/token', function (request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({token: token}));
});


let port = process.env.PORT 
console.log('listening on port: ' + port)
app.listen(port)