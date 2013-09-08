//based heavily on the google demo
//https://www.google.com/intl/en/chrome/demos/speech.html

var recognition;

function initSpeechRecognition(options, resultsElement){
	//options is an object with properties continuous (boolean), interimResults (boolean), lang (language encoding, eg en-AU), keep alive (boolean)
	//resultsElement is an element we'll return results to

	var final_transcript = "";
	var interim_transcript = "";

	
	recognition = new webkitSpeechRecognition();
	recognition.continuous = options.continuous;
	recognition.interimResults = options.interimResults;
	recognition.lang = options.lang

	recognition.start();
	
	recognition.onstart = function() {
		recognizing = true;
		//you could use an icon or message to indicate recording is on
	};

	recognition.onerror = function(event) {
		if (event.error == 'no-speech') {
			// respond to the no-speech error
		}
		if (event.error == 'audio-capture') {
			// respond to the audio-capture error
		}
		if (event.error == 'not-allowed') {
			// respond to the not-allowed error
		}
	};

	recognition.onend = function(event) {
		//if you want to respond to the end event, do that here
	};
	
	recognition.onaudioend = function(event) {
		recognition.stop();
		
		if (options.keepAlive) {
			//restart recognition
			recognition.start();
		}
	}

	recognition.onresult = function(event) {
		var interim_transcript = '';
		if (typeof(event.results) == 'undefined') {
			recognition.onend = null;
			recognition.stop();
			return;
		}
		
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				final_transcript += event.results[i][0].transcript;
			} else {
				interim_transcript += event.results[i][0].transcript;
			}
		}
		
		if (interim_transcript !== "") {
			resultsElement.innerHTML = interim_transcript;
		}
		
	};
}
