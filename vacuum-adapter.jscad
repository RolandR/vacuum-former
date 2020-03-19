

/*

Adapter for attaching a vacuum cleaner to the box of the vaccum former
(or for attaching any tube to any flat surface, I guess)

This is an OpenJSCAD file: https://openjscad.org

CC-BY-SA 4.0 Roland Rytz, March 2020

*/

function main(){
	
	// wall thickness at the end of the tube
	var wallThickness = 2;
	
	// inside diameter at the outer end of the tube's hole
	var vacuumDiameterStart = 35.5;
	
	// inside diameter at the inner end of the tube's hole
	var vacuumDiameterEnd = 34.5;
	
	// height of the tube
	var tubeHeight = 50;
	
	// factor for the resolution of cylinders and such in openjscad
	// (higher = more faces)
	var fnFactor = 1;
	
	var tube = cylinder({
		r1: vacuumDiameterStart/2 + 2*wallThickness,
		r2: vacuumDiameterStart/2 + wallThickness,
		h: tubeHeight,
		fn: fnFactor*30
	});
	
	
	// quick and dirty way of adding a rounded flange at the base of the tube
	var flange = union(
		 cylinder({r1: vacuumDiameterStart/2 + 3*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 18, fn: fnFactor*30})
		,cylinder({r1: vacuumDiameterStart/2 + 4*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 13, fn: fnFactor*30})
		,cylinder({r1: vacuumDiameterStart/2 + 5*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 10, fn: fnFactor*30})
		,cylinder({r1: vacuumDiameterStart/2 + 6*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 8, fn: fnFactor*30})
		,cylinder({r1: vacuumDiameterStart/2 + 8*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 5, fn: fnFactor*30})
		,cylinder({r1: vacuumDiameterStart/2 + 8.5*wallThickness, r2: vacuumDiameterStart/2 + wallThickness, h: 4, fn: fnFactor*30})
	);
	
	// width of the plate at the base of the tube
	var plateWidth = 120;
	
	// height
	var plateHeight = 70;
	
	// thickness of the plate
	var plateThickness = 3;
	
	flange = flange.translate([0, 0, plateThickness]);
	
	tube = union(
		tube,
		flange
	);
	
	var plate = cube({size: [plateWidth, plateHeight, plateThickness], center: [true, true, false]});
	
	adapter = union(
		tube,
		plate
	);
	
	// cut hole
	adapter = difference(
		adapter,
		cylinder({r1: vacuumDiameterEnd/2, r2: vacuumDiameterStart/2, h: tubeHeight, fn: fnFactor*30})
	);
	
	// add holes for sunk screws
	
	// height of the conical head of the screw
	var screwConeHeight = 3;
	
	// outer diameter of the screw height
	var screwOuterDiameter = 10;
	
	// diameter of the screw itself
	var screwInnerDiameter = 5;
	
	var screw = cylinder({r1: screwInnerDiameter/2, r2: screwOuterDiameter/2, h: screwConeHeight, fn: fnFactor*30});
	
	screw = union(
		 screw.translate([0, 0, plateThickness - screwConeHeight])
		,cylinder({r: screwInnerDiameter/2, h: plateThickness, fn: fnFactor*30})
	);
	
	// margin of screws from edge of base plate
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