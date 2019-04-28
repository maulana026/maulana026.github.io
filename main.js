// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
    Object.keys = (function() {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;
  
      return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }
  
        var result = [], prop, i;
  
        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
  
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }
function loadPost(params) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.github.com/repos/maulana026/maulana026.github.io/contents/post?page="+params, true);
    xhttp.send();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            //document.getElementById("column-margin-3rem").innerHTML = this.responseText;
            var apiObj = JSON.parse(this.responseText);
            //alert(apiObj[1].name);
            console.log(apiObj.length);
            var htmlElement = "";
            for (let index = 0; index < apiObj.length; index++) {
                var judul = apiObj[index].name;
                var url1 = apiObj[index].path;
                var url = url1.replace(".html", "");
                var download = apiObj[index].download_url;
                var git = apiObj[index].git_url;
                htmlElement += '<div class="card"><div class="column"><bold>';
                htmlElement += '<a href="' + url + '">' + judul + '</a>';
                htmlElement += '</bold></div>';
                htmlElement += '<a href="' + url + '">' + '<button class="button button-clear">Baca</button></a>';
                htmlElement += '<a href="' + download + '">' + '<button class="button button-clear">Download</button></a>';
                htmlElement += '<a href="' + git + '">' + '<button class="button button-clear">Clone</button></a>';
                htmlElement += '</div>';
                
            }
            //htmlElement += '<button onclick="loadPost('+params+2 + ')">Muat Lebih</button>';
            if (params == 1) {
                document.getElementById("column-margin-3rem").innerHTML = htmlElement;
            } else {
                var para = document.createElement("div");
                var node = document.createTextNode("This is new.");
                para.appendChild(node);
                var att = document.createAttribute("class");
                att.value = "page" + params;
                para.setAttributeNode(att);
                var element = document.getElementById("column-margin-3rem");
                element.appendChild(para);
                document.getElementById("page" + params).innerHTML = htmlElement;
            }
            
        }
    };
}
