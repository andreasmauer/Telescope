//var OAuth = Meteor.npmRequire('oauth-1.0a');

//console.log(oauth
var Oauth = Meteor.npmRequire('oauth');
// var Fiber = Meteor.npmRequire('fibers');
// var passport = Meteor.npmRequire('passport');
// var twoLeggedStrategy = Meteor.npmRequire('passport-http-2legged-oauth').Strategy;







var InmobilienScoutProduction = {
  service: "InmobilienScout",
  consumerKey : "hackathonKey",
  secret : "cyqg0uAVZbgDhXWXC4aa",
  // accessToken: "59d634c4-819f-43b2-957f-8a62748c2fc3",
  // oauthSecret: "Bqe7S9PLQ3pZh4Uv5y3eRU0AL4NomXak%2BlCKX2Mp2DxHtPojwOaj6xrtpLCGRB08PENVcLNRusUEzkpyffYNOvQDP4tfyzBBIjbavZifbYk%3D"


};


var request = new Oauth.OAuth(null, null, InmobilienScoutProduction.consumerKey, InmobilienScoutProduction.secret, '1.0', null, 'HMAC-SHA1', null, {'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8'} );


//   var oauth = new Oauth.OAuth(
//     'http://rest.immobilienscout24.de/restapi/security/oauth/request_token',
//     'http://rest.immobilienscout24.de/restapi/security/oauth/access_token',
//     InmobilienScoutProduction.consumerKey,
//     InmobilienScoutProduction.secret,
//     '1.0',
//     null,
//     'HMAC-SHA1',
//     null,
//     {'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8'}
//   );

    var url='http://rest.immobilienscout24.de/restapi/api/search/v1.0/search/region?realestatetype=apartmentrent&geocodes=1276003001';
    request.get(
      url,
      null,
      null,
      function (e, data, res) {
        if(e){
          console.log('ERROR - getInmobilienScoutData gave an error, here is the object:');
          console.log(e);
        }
        // if(res){
        //   console.log('RES - getInmobilienScoutData gave a result, here is the object:');
        //   //console.log(res);
        // }
        if(data){
          try {
            var values = JSON.parse(data);
            console.log(values);
          } catch(err) {
            console.log("DATA - getInmobilienScoutData/update data: " + err);
          }
        }
      }
    );



  