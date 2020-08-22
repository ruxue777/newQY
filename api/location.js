let location = (Latitude,Longitude)=>{
	var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	
	var x1 = Longitude - 0.0065;
	var y1 = Latitude - 0.006;
	
	var z1 = Math.sqrt(x1 * x1 + y1 * y1) - 0.00002 * Math.sin(y1 * x_pi);
	var theta1 = Math.atan2(y1, x1) - 0.000003 * Math.cos(x1 * x_pi);
	var lngs = z1 * Math.cos(theta1);
	var lats = z1 * Math.sin(theta1);
	
	return {lngs,lats}
}

export {location};