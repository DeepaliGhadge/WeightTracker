"use strict";

const path = require( "path" );

const auth = require( "./auth" );
const api = require( "./api" );
const measurements = require( "./measurements" );

const home = {
	method: "GET",
	path: "/",
	options: {
		auth: {
			mode: "try"
		},
		handler: ( request, h ) => {
			return h.view( "index", { title: "Home" } );
		}
	}
};

const staticAssets = {
	method: "GET",
	path: "/assets/{param*}",
	handler: {
		directory:{
			path: path.join( __dirname, "..", "assets" )
		}
	},
	options: { auth: false }
};

const error404 = {
	method: "*",
	path: "/{any*}",
	handler: function ( request, h ) {
		return h.view( "404", { title: "Not Found" } ).code( 404 );
	},
	options: { auth: false }
};

module.exports = [
	home,
	staticAssets,
	error404
].concat( auth, api, measurements );
