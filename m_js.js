window.addEventListener('load', function() {
	if (window.performance) {
  console.info("window.performance works fine on this browser");
}console.log(window.location.href.split('mpage_')[1].split('#')[0])
  if (performance.navigation.type == 1) {
    console.info( "This page is reloaded" );
  } else {
    console.info( "This page is not reloaded");
  }
	//if very start : typeof window.location.href.split('mpage_')[1].split('#')[0] == 'undefined'
		var currentip
		var new_ip
		var ip_len
		enter()
		function enter(){
					if(typeof window.location.href.split('mpage_')[1].split('#')[1] == 'undefined'){
						console.log('first')
							$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
								ip_len = $.parseJSON(JSON.stringify(data, null, 2))['geobytesremoteip'].toString().split('.').length
								currentip =  $.parseJSON(JSON.stringify(data, null, 2))['geobytesremoteip'].toString().split('.')[ip_len-1]
							});
					}else{
						console.log('from other page')
								currentip =  window.location.href.split('mpage_')[1].split('#')[1]
					}
			setTimeout(function(){ loop() }, 500);
		}



		function loop(){
			$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
				ip_len = $.parseJSON(JSON.stringify(data, null, 2))['geobytesremoteip'].toString().split('.').length
				new_ip = $.parseJSON(JSON.stringify(data, null, 2))['geobytesremoteip'].toString().split('.')[ip_len-1]
			});
			setTimeout(function(){ 
				if(new_ip == currentip){
						$('#m-all').show()
				}else{
					changed()
				}
			}, 500);
			setTimeout(function(){ loop() }, 1000);
		}



		function changed(){
				var currenthref = window.location.href.split('mpage_')[1].split('#')[0]
				if(parseInt(currenthref)+1 == 12){
					window.location.href  = '../mpage_1/index.html#'+currentip
				alert('../mpage_1/index.html#'+currentip)
				}else{
				alert('../mpage_'+(parseInt(currenthref)+1)+'/index.html#'+currentip)
					window.location.href  = '../mpage_'+(parseInt(currenthref)+1)+'/index.html#'+currentip
				}
		}
	})
				// 	if(typeof currentip == 'undefined'){
				// 	ip = $.parseJSON(JSON.stringify(data, null, 2))['geobytesremoteip']
				// 	currentip = ip.toString().split('.')[ip.toString().split('.').length-1]
				// }

				// else if(typeof window.location.href.split('mpage_')[1].split('#')[0] == 'undefined'){
				// }

				// else if(ip == window.location.href.split('mpage_')[1].split('#')[0]){
				// 	ip == window.location.href.split('mpage_')[1].split('#')[0]
				// 	currentip = ip.toString().split('.')[ip.toString().split('.').length-1]
				// }
				// else{

				// }

				// else if(ip == $.parseJSON(JSON.stringify(data, null, 2))['geobytesremoteip']){
				// 	if(typeof window.location.href.split('mpage_')[1].split('#')[0] == 'undefined'){
				// 		console.log('1')
				// 	}else if(window.location.href.split('mpage_')[1].split('#')[0] == ip){
				// 		console.log('2')
				// 	}else{
				// 		console.log('3')
				// 	}
				// }

				// else{
				// 	var currenthref = window.location.href.split('mpage_')[1].split('#')[0]
				// 	alert('../mpage_1'+(parseInt(currenthref)+1)+'/index.html#'+currentip)
				// 	if(parseInt(currenthref)+1 == 12){
				// 		window.location.href  = '../mpage_1'+(parseInt(currenthref)+1)+'/index.html#'+currentip
				// 	}else{
				// 		window.location.href  = '../mpage_'+(parseInt(currenthref)+1)+'/index.html#'+currentip
				// 	}
				// 	console.log('../mpage_/'+(parseInt(currenthref)+1)+'#'+currentip)
				// }