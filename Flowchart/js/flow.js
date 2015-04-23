jsPlumb.ready(function() {

	instance = jsPlumb.getInstance({
		DragOptions : { cursor: 'pointer', zIndex:2000 },
		ConnectionOverlays : [
			[ "Arrow", { location:1 } ],
			// [ "Label", { 
			// 	location:0.1,
			// 	id:"label",
			// 	cssClass:"aLabel"
			// }]
		],
		Container:"flowchart"
	});


	connectorPaintStyle = {
		lineWidth:4,
		strokeStyle:"#61B7CF",
		joinstyle:"round",
		outlineColor:"white",
		outlineWidth:2
	},
	connectorHoverStyle = {
		lineWidth:4,
		strokeStyle:"#216477",
		outlineWidth:2,
		outlineColor:"white"
	},
	endpointHoverStyle = {
		fillStyle:"#216477",
		strokeStyle:"#216477"
	},
	sourceEndpoint = {
		endpoint:"Dot",
		paintStyle:{ 
			strokeStyle:"green",
			fillStyle:"transparent",
			radius:7,
			lineWidth:3 
		},				
		isSource:true,
		connector:[ "Flowchart", { stub:[0, 20], gap:10, cornerRadius:2, alwaysRespectStubs:true } ],								                
		connectorStyle:connectorPaintStyle,
		hoverPaintStyle:endpointHoverStyle,
		connectorHoverStyle:connectorHoverStyle,
        dragOptions:{},
        // overlays:[
        // 	[ "Label", { 
        //     	location:[0.5, 1.5], 
        //     	label:"Oui",
        //     	cssClass:"endpointSourceLabel" 
        //     } ]
        // ]
	},		
	targetEndpoint = {
		endpoint:"Dot",					
		paintStyle:{ fillStyle:"green",radius:11 },
		hoverPaintStyle:endpointHoverStyle,
		maxConnections:-1,
		dropOptions:{ hoverClass:"hover", activeClass:"active" },
		isTarget:true,			
        overlays:[
        	// [ "Label", { location:[0.5, -0.5], label:"Drop", cssClass:"endpointTargetLabel" } ]
        ]
	},			
	init = function(connection) {			
		//connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
		connection.bind("editCompleted", function(o) {
			if (typeof console != "undefined")
				console.log("connection edited. path is now ", o.path);
		});
	};	

	trueEndpoint = jQuery.extend(true, {}, sourceEndpoint);
	falseEndpoint = jQuery.extend(true, {}, sourceEndpoint);
	trueEndpoint["overlays"] = [
        	[ "Label", { 
            	location:[0.5, 1.5], 
            	label:"Oui",
            	cssClass:"endpointLabel" 
            } ]
        ];
    falseEndpoint["overlays"] = [
        	[ "Label", { 
            	location:[0.5, 1.5], 
            	label:"Non",
            	cssClass:"endpointLabel" 
            } ]
        ];
    trueEndpoint["paintStyle"]= { 
			strokeStyle:"red",
			fillStyle:"transparent",
			radius:7,
			lineWidth:3 
		};

	instance.doWhileSuspended(function() {

		e8 = instance.addEndpoint("forward", targetEndpoint, { anchor:"TopCenter", uuid:"forwardTopCenter" });
		instance.addEndpoint("forward", sourceEndpoint, { anchor:"BottomCenter", uuid:"forwardBottomCenter" });
		e10 = instance.addEndpoint("turn", targetEndpoint, { anchor:"TopCenter", uuid:"turnTopCenter" });
		instance.addEndpoint("turn", sourceEndpoint, { anchor:"BottomCenter", uuid:"turnBottomCenter" });

		e6 = instance.addEndpoint("if", targetEndpoint, { anchor:"TopCenter", uuid:"ifTopCenter" });
		e7 = instance.addEndpoint("if", falseEndpoint, { anchor:"Left", uuid:"ifLeft" });
		e9 = instance.addEndpoint("if", trueEndpoint, { anchor:"Right", uuid:"Right" });

		// e2 = instance.addEndpoint("repeat", targetEndpoint, { anchor:"TopCenter", uuid:"repeatTopCenter" });
		// e3 = instance.addEndpoint("repeat", sourceEndpoint, { anchor:"BottomCenter", uuid:"repeatBottomCenter" });
		// e5 = instance.addEndpoint("repeat", sourceEndpoint, { anchor:"Right", uuid:"repeatRight" });
		
		e1 = instance.addEndpoint("begin", sourceEndpoint, { anchor:"BottomCenter", uuid:"beginBottomCente"});
		e4 = instance.addEndpoint("end", targetEndpoint, { anchor:"TopCenter", uuid:"endTopCente"});

		// instance.connect({source : e1, target : e6, editable:true});
		// instance.connect({source : e3, target : e4, editable:true});
		// instance.connect({source : e5, target : e6, editable:true});
		// instance.connect({source : e7, target : e8, editable:true});
		// instance.connect({source : e9, target : e10, editable:true});
		// instance.connect({uuids:["repeatRight", "ifTopCenter"], editable:true});

		instance.draggable(jsPlumb.getSelector(".window"), { grid: [25,25] });

		instance.bind("connection", function(connInfo, originalEvent) { 
			init(connInfo.connection);
			console.log("new connection");
		});	

	});	
	

});
function setIf(el){
	instance.addEndpoint(el, targetEndpoint, { anchor:"TopCenter", uuid:"ifTopCenter" });
	instance.addEndpoint(el, falseEndpoint, { anchor:"Left", uuid:"ifLeft" });
	instance.addEndpoint(el, trueEndpoint, { anchor:"Right", uuid:"Right" });
}
function setAction(el){
	instance.addEndpoint(el, targetEndpoint, { anchor:"TopCenter", uuid:"forwardTopCenter" });
	instance.addEndpoint(el, sourceEndpoint, { anchor:"BottomCenter", uuid:"forwardBottomCenter" });
}
function setBegin(el){
	instance.addEndpoint(el, sourceEndpoint, { anchor:"BottomCenter", uuid:"beginBottomCente"});
}
function setEnd(el){
	instance.addEndpoint(el, targetEndpoint, { anchor:"TopCenter", uuid:"endTopCente"});
}
function update(el){
	instance.draggable(jsPlumb.getSelector(".window"), { grid: [25,25] });
	instance.repaint(el);
	//instance.revalidate(el);
	 instance.repaintEverything();
}