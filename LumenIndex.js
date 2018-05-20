$(function(){
	$( document ).ready(function() {
	   $.ajax({
                data:  {},
                url:   'https://fy53s9ibh5.execute-api.us-east-2.amazonaws.com/querydataarduino/querydataarduino',
                type:  'GET',
                success:  function (response) {
                	//data = JSON.parse(response);
                    console.log(response);

                    size =response.length;
                    console.log(size);
                    for (i = 0; i < size; i++) {
                    		if (response[i]['topic']=='light'){

								var myvar = 
								'      <tr>'+
								'<td align="center">'+response[i]['topic']+'</td>	'+
								'<td align="center">'+response[i]['channel']+'</td>	'+
								'<td align="center">'+response[i]['value']+'</td>	'+
								'<td align="center">'+response[i]['energy']+'</td>	'+
								'<td align="center">'+response[i]['date']+'</td>	'+
								'      </tr>';


								var div = document.getElementById('tbodyLight');
								div.innerHTML += myvar;


                    		}			

                    		if (response[i]['topic']=='weight'){

								var myvar = 
								'      <tr>'+
								'<td align="center">'+response[i]['topic']+'</td>	'+
								'<td align="center">'+response[i]['channel']+'</td>	'+
								'<td align="center">'+response[i]['value']+'</td>	'+
								'<td align="center">'+response[i]['energy']+'</td>	'+
								'<td align="center">'+response[i]['date']+'</td>	'+
								'      </tr>';


								var div = document.getElementById('tbodyWeight');
								div.innerHTML += myvar;


                    		}

                    		if (response[i]['topic']=='temperature'){

								var myvar = 
								'      <tr>'+
								'<td align="center">'+response[i]['topic']+'</td>	'+
								'<td align="center">'+response[i]['channel']+'</td>	'+
								'<td align="center">'+response[i]['value']+'</td>	'+
								'<td align="center">'+response[i]['energy']+'</td>	'+
								'<td align="center">'+response[i]['date']+'</td>	'+
								'      </tr>';


								var div = document.getElementById('tbodyTemperature');
								div.innerHTML += myvar;


                    		}

                    		if (response[i]['topic']=='distance'){

								var myvar = 
								'      <tr>'+
								'<td align="center">'+response[i]['topic']+'</td>	'+
								'<td align="center">'+response[i]['channel']+'</td>	'+
								'<td align="center">'+response[i]['value']+'</td>	'+
								'<td align="center">'+response[i]['energy']+'</td>	'+
								'<td align="center">'+response[i]['date']+'</td>	'+
								'      </tr>';


								var div = document.getElementById('tbodyDistance');
								div.innerHTML += myvar;


                    		}
						
					}

                }
        });
	});	


});