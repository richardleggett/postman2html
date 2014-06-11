# README #

Node script which processes Postman collections into a HTML file for documentation or sharing.

### What is Postman?

Postman allows developers to test APIs and acts as the perfect "live documentation" for your server. Additionally it can be used for debugging API calls, viewing headers and responses.

You can get Postman at:

[https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en)


### Usage

Basic usage:


```
#!javascript

node index.js --input MyCollection.json.postman_collection 

```

Additional flags support custom CSS and custom output file location:

```
#!javascript

node index.js --input MyCollection.json.postman_collection --css mystyles.css --output ../somefolder/target.html

```

### Functionality 

Only basic functionality implemented at present:

* Parses requests
* Parses and organises requests into folders if used
* Displays method e.g. GET/POST
* Display headers
* Displays URL
* Displays parameters sent, or raw body (JSON is prettified)

### License 

MIT

Copyright (c) 2014 Richard Leggett (richardleggett.co.uk)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
