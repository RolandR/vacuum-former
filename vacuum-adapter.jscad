

function main(){
	var wallThickness = 2;
	var vacuumDiameterStart = 35.5;
	var vacuumDiameterEnd = 34.5;
	var tubeHeight = 50;
	var fnFactor = 4;
	
	var tube = cylinder({r1: vacuumDiameterStart/2 + 2*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: tubeHeight, fn: fnFactor*30});
	var flange = union(
		 cylinder({r1: vacuumDiameterStart/2 + 3*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 18, fn: fnFactor*30})
		,cylinder({r1: vacuumDiameterStart/2 + 4*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 13, fn: fnFactor*30})
		,cylinder({r1: vacuumDiameterStart/2 + 5*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 10, fn: fnFactor*30})
		,cylinder({r1: vacuumDiameterStart/2 + 6*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 8, fn: fnFactor*30})
		,cylinder({r1: vacuumDiameterStart/2 + 8*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 5, fn: fnFactor*30})
		,cylinder({r1: vacuumDiameterStart/2 + 8.5*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 4, fn: fnFactor*30})
	);
	
	var plateWidth = 120;
	var plateHeight = 70;
	var plateThickness = 3;
	
	flange = flange.translate([0, 0, plateThickness]);
	
	tube = union(
		tube,
		flange
	);
	
	//var boxOpeningWidth = 91;
	//var boxOpeningHeight = 21; //current
	//var boxOpeningHeight = vacuumDiameter; // saw it open to this size
	
	var plate = cube({size: [plateWidth, plateHeight, plateThickness], center: [true, true, false]});
	
	//var boxOpening = cube({size: [boxOpeningWidth, boxOpeningHeight, wallThickness], center: [true, true, false]});
	
	adapter = union(
		tube,
		plate
	);
	
	var screwConeHeight = 3;
	var screwOuterDiameter = 10;
	var screwInnerDiameter = 5;
	
	adapter = difference(
		adapter,
		cylinder({r1: vacuumDiameterEnd/2, r2: vacuumDiameterStart/2, h: tubeHeight, fn: fnFactor*30})
	);
	
	var screw = cylinder({r1: screwInnerDiameter/2, r2: screwOuterDiameter/2, h: screwConeHeight, fn: fnFactor*30});
	var screwMargin = screwOuterDiameter/2 + 2;
	
	adapter = difference(
		 adapter
		,screw.translate([plateWidth/2-screwMargin, plateHeight/2-screwMargin, 0])
		,screw.translate([plateWidth/2-screwMargin, -plateHeight/2+screwMargin, 0])
		,screw.translate([-plateWidth/2+screwMargin, plateHeight/2-screwMargin, 0])
		,screw.translate([-plateWidth/2+screwMargin, -plateHeight/2+screwMargin, 0])
	);
	
	return adapter;
}