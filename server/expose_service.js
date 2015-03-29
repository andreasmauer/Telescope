var Oauth = Meteor.npmRequire('oauth');
var Fiber = Meteor.npmRequire('fibers');

var InmobilienScoutProduction = {
  service: "InmobilienScout",
  consumerKey : "hackathonKey",
  secret : "cyqg0uAVZbgDhXWXC4aa",
 

};

var request = new Oauth.OAuth(null, null, InmobilienScoutProduction.consumerKey, InmobilienScoutProduction.secret, '1.0', null, 'HMAC-SHA1', null, {'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8'} );



Meteor.methods({

	'get_expose_data': function (expose_id, post_id){



				    // var url='http://rest.immobilienscout24.de/restapi/api/search/v1.0/search/region?realestatetype=apartmentrent&geocodes=1276003001';
				    var url='http://rest.immobilienscout24.de/restapi/api/search/v1.0/expose/' + expose_id;


				    data_test = request.get(
				      url,
				      null,
				      null,
				      function (e, data, res) {
				        if(e){
				          console.log('ERROR - getInmobilienScoutData gave an error, here is the object:');
				          console.log(e);
				        }

				        if(data){
				          try {
				            var values = JSON.parse(data);

				            //fixing picture URL
				            picture = values["expose.expose"].realEstate.titlePicture.urls[0].url[0]["@href"].split(".jpg");
				            picture = picture[0] + ".jpg";

				            var expose = {
				            	m2: values["expose.expose"].realEstate.livingSpace,
				            	rent: values["expose.expose"].realEstate.totalRent,
				            	picture: picture,
				            	address: values["expose.expose"].realEstate.address,

				            };

				            // update db
				            console.log("m2: " + expose.m2);
				            console.log("Warmmiete: " + expose.rent);
				            console.log("picture: " + expose.picture);
				            console.log("address: " + expose.address.street + ", " + expose.address.houseNumber);
				            console.log("postcode: " + expose.address.postcode);
				            console.log("city: " + expose.address.city + " - " + expose.address.quarter);
				            // Posts.update({_id: post_id}, { $set: {

				            // 	expose: "expose",
				            // 	}
				            // });

				            // console.log(values);
				          } catch(err) {
				            console.log("DATA - getInmobilienScoutData/update data: " + err);
				          }
				        }
				      }
				    );


	}



});