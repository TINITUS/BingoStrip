var temp = 1/10,
	col = Math.floor(temp),
	row = Math.abs(Math.round((temp - col)*10));
	if(row < 4) {
		row = 0;
	} else if(row < 7) {
		row = 1;
	} else {
		row = 2;
	}
console.log(row+" "+col);