var Tickets = (function(){
	//private members
	var string = "011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985",
		rows = 3,
		cols = 9,
		empty = '&nbsp;';
	
 	function parseTickets(){
 		//console.log(splStrOnNth(string, 30)); 		
 		var tickets = splStrOnNth(string, 30);
 		for(var it = 0; it < tickets.length; it++){
 			tickets[it] = splStrOnNth(tickets[it], 2);
 		}
 		//console.log(tickets);
 		for(var ij = 0, len = tickets.length; ij < len;ij++){
 			//console.log(tickets[ij]);
 			formTicketMatrix(tickets[ij], ij);
 		}
 	}

 	function formTicketMatrix(ticket, index){
 		//var matrix = [["","",""],["","",""],["","",""],["","",""],["","",""],["","",""],["","",""],["","",""],["","",""]];
 		var matrix = [[],[],[],[],[],[],[],[],[]];
 		for(var ni = 0, len = ticket.length; ni < len; ni++){
 			var temp = parseInt(ticket[ni])/10,
			tens = Math.floor(temp),
			ones = Math.abs(Math.round((temp - tens)*10)),
			//row = (row < 4 && row !== 0) ? 0 : ((row < 7 && row !== 0) ? 1 : 2);
			row = 0,
			col = (tens == cols) ? (tens-1) : tens ;

			if(!matrix[col][row]){
				matrix[col][row] = ticket[ni];
			} else {
				row += 1;
				if(!matrix[col][row]){
					matrix[col][row] = ticket[ni];
				} else {
					row += 1;
					matrix[col][row] = ticket[ni];
				}
			}
 		}
 		
 		for(var mi = 0; mi<cols; mi++){
 			switch (matrix[mi].length){
 				case 1:
 					matrix[mi][1] = matrix[mi][2] = empty; 					
 					matrix[mi] = switchArrElems(matrix[mi], 0,(Math.round(Math.random()*2)));
 					break;
 				case 2:
 					matrix[mi][2] = empty;
 					matrix[mi] = moveArrElems(matrix[mi],2,(Math.round(Math.random()*2)));
 					break;
 				case 3: default:
 					break;
 			}
 		}
 		//console.log(matrix);
 		displayTicket(matrix,index);
 	}

 	function displayTicket(ticket, index){
 		var cont = document.querySelector("#tickets"), 			
 			elTable = document.createElement('div'), 		
 			elRow = document.createElement('div'),
 			elCell = document.createElement('div'),
 			elTCont = document.createElement('div'),
 			ticketCell = document.createElement('div'),
 			counterCell = document.createElement('div'), 		
 			elCount = document.createElement('div'),
 			k = rows,
 			j = cols;
 		
 		elTCont.setAttribute('class', 'tCont');
 		ticketCell.setAttribute('class', 'leftCol');
 		counterCell.setAttribute('class', 'rightCol');
 		elTable.setAttribute('class','ticket hidden animated');
 		elRow.setAttribute('class','tRow');
 		elCell.setAttribute('class','tCell');
 		elCount.setAttribute('class', 'count hidden animated');
 		
 		elCell.innerHTML = empty;
 		elCount.innerHTML = '<span class="num">5</span> <p>TO</p> <p>GO</p>';
 		
        while(k!= 0){
        	while(j!=0){
        		elRow.appendChild(elCell.cloneNode(true));
        		j--;
        	}
        	elTable.appendChild(elRow.cloneNode(true));
        	k--;
        }
        elTCont.appendChild(ticketCell);
        elTCont.appendChild(counterCell);
        cont.appendChild(elTCont);
 		
 		cont.children[index].children[0].appendChild(elTable);
 		cont.children[index].children[1].appendChild(elCount);
 		var ticketElem = cont.children[index].children[0].children[0];
 		var countElem = cont.children[index].children[1].children[0];

 		for(var tc = 0; tc < cols; tc++){
 			for(var tr = 0; tr < rows; tr++){
 				var cellElem = ticketElem.children[tr].children[tc]; 			
 				setTimeout(function(){
 					ticketElem.classList.add('zoomInDown');
 					ticketElem.classList.remove ('hidden');
 					countElem.classList.add('slideInRight');
 					countElem.classList.remove ('hidden');}
 				,(250 * index));
 				cellElem.innerHTML = (ticket[tc][tr] != empty) ? parseInt(ticket[tc][tr]) : ticket[tc][tr]; 				
 			}
 		}
 	}

 	//utils
 	function splStrOnNth(string, n){
 		return string.match(new RegExp('.{1,' + n + '}', 'g'));
 	};

 	function switchArrElems(arr, x, y){
 		if(x==y) return arr;
 		var b = arr[y];
		arr[y] = arr[x];
		arr[x] = b;
		return arr;
 	}

 	function moveArrElems(arr, old_index, new_index) {
	    if (new_index >= arr.length) {
	        var k = new_index - arr.length;
	        while ((k--) + 1) {
	            arr.push(undefined);
	        }
	    }
	    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	    return arr; // for testing purposes
	};

	return {
		init: parseTickets
	}
}());