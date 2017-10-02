
import request from 'request';


var helper = {};


helper.parseMessage = function (message) {
	let outputJson = {"mentions": [], "emotions": [], "links": []};
	let messageList = message.split(' ');
	var promises = [];
	return new Promise((resolve,reject) => {
			for (var i=0; i< messageList.length; i++) {
				console.log('oooooooll');
				if (messageList[i].indexOf('@') === 0) {
					outputJson.mentions.push(messageList[i].substring(1).split(/\W+/)[0]);
					promises.push(outputJson);
				} else if (messageList[i].indexOf('(') === 0 && messageList[i].indexOf(')') === messageList[i].length -1) {
					var emotion = messageList[i].replace(/\(|\)/gi,'');
					if (emotion.length <= 15) {
						outputJson.emotions.push(emotion);
						promises.push(outputJson);
					}
				} else if (isValidUrl(messageList[i])){
						let p3 = getPageHeading(messageList[i]).then((response) => {
							outputJson.links.push({"url": response.url,"title": response.title });
							return outputJson ;
							
						});
						promises.push(p3)
				} 
			}

			Promise.all(promises).then(() =>{

				resolve(JSON.stringify(outputJson));
			})
	});
	

	
}


function isValidUrl(url) {
	var pattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
  if (!pattern.test(url)){
  	return false;
  } else {
  	return true;
  }

}

function getPageHeading(url) {
	return new Promise((resolve,reject) => {
		request('https://cors-anywhere.herokuapp.com/'+url, function (error, response, body) {
			if (response.statusCode === 200) {
				var el = document.createElement('html');
				var frag = document.createDocumentFragment();
				el.innerHTML = response.body;
				frag.appendChild(el);
				var title = frag.firstChild.getElementsByTagName('title')[0].textContent;
				resolve({title: title,url:url});
				
			} else {
				reject();
			}
		});
		
	});
	
}


export default helper;