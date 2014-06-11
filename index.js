var fs = require('fs'),
	path = require('path'),
	commander = require('commander');

commander
	.version('0.0.1')
	.option('-i, --input [input]', 'input path of Postman Collection JSON file')
	.option('-o, --output [output]', 'output path for HTML file (optional, defaults to ./index.html)')
	.option('-c, --css [css]', 'file path for optional CSS file (optional)');
commander.parse(process.argv);

if(!commander.input) {
	console.log("Please provide input with -i flag, or use --help for more");
	process.exit(0);
}

function requestToHTML(req) {
	var html = '<table class="request">';
			html += '<tr><td class="name" colspan="2">'+req.name+'</td></tr>';
			if(req.description) {
				html += '<tr><td class="description" colspan="2">'+req.description+'</td></tr>';
			}

			html += '<tr><td>Headers:</td><td>'+req.headers+'</td></tr>';
			html += '<tr><td>Method:</td><td>'+req.method+'</td></tr>';
			html += '<tr><td>URL:</td><td>'+req.url+'</td></tr>';
		
			if(req.dataMode==='params' && req.data && req.data instanceof Array) {
				// form values
				html += '<tr><td>Params:</td><td>';

				var paramTable = '<table class="params">';
				req.data.forEach(function(param) {
					paramTable += '<tr><td>Key:</td><td>'+param.key+'</td></tr>';
					paramTable += '<tr><td>Value:</td><td>'+param.type+'</td></tr>';
					paramTable += '<tr><td>Type:</td><td>'+param.value+'</td></tr>';
				});
				paramTable += '</table>';

				html += paramTable;
				html += '</td></tr>';

			} else {
				// raw e.g. JSON or file
				var data = req.data;
				if(req.headers &&
						req.headers.toLowerCase().indexOf('content-type: application/json')!=-1) {
					try {
						data = '<pre>'+JSON.stringify(JSON.parse(data), null, 2)+'</pre>';

					} catch(e) { console.log("Unable to prettify JSON: " + e); }
				}
				html += '<tr><td>Data:</td><td>'+data+'</td></tr>';
			}
		
		html += '</table>';
		return html;
}

function getRequestWithId(requests, requestId) {
	var retReq = null;
	requests.forEach(function(req) {
		if(req.id==requestId) {
			retReq = req;
		}
	});
	return retReq;
}

var cssFile = commander.css || 'styles.css';
var css = fs.readFileSync(cssFile, 'utf8');
var data = fs.readFileSync(commander.input, 'utf8');

var json = JSON.parse(data);
var folders = json.folders;
var requests = json.requests;
var html = '<html><head><style type="text/css">'+css+'</style></head><body>';
html += '<h1>'+json.name+'</h1>';

if(folders && folders.length>0) {
	// organise by folder
	folders.forEach(function(folder) {
		html += '<h2 class="folder">'+folder.name+'</h2>';
		folder.order.forEach(function(requestId) {
			var req = getRequestWithId(requests, requestId);
			if(req) html += requestToHTML(req);
		});
	});

} else {
	// simply list requests
	requests.forEach(function(req) {
		html += requestToHTML(req);
	});
}

html += '</body></html>';

var outputFilePath = commander.output || path.join(__dirname+'/index.html');
fs.writeFile(outputFilePath, html, function (err) {
	if (err) return console.log(err);
	console.log(outputFilePath += ' generated');
});