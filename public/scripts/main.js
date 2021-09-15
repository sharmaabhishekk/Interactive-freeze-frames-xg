// xg value
var xg_val_elm = document.querySelector("h3#xg-value")
//odometer
od = new Odometer({el: xg_val_elm, value: 0.79, format: '(d).dd', theme: 'car', duration:500});
// plotting our pitch and adding ball and player points using interactivesvg.js utilities

function drawPitch(){

    draggableObjsAttributes = [
        {"x":350, "y":108, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1", title:"player"}, 
        {"x":433, "y":93, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1", title:"player"}, 
        {"x":461, "y":150, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1", title:"player"}, 
        {"x":490, "y":235, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1", title:"player"}, 
        {"x":519, "y":144, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1", title:"player"}, 
        {"x":515, "y":87, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1", title:"player"}, 
        {"x":312, "y":165, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1", title:"player"}, 
        {"x":391, "y":154, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1", title:"player"}, 
        {"x":285, "y":107, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1", title:"player"}, 
        {"x":350, "y":270, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1", title:"player"}, 
        {"x":400, "y":20, class:"drag-obj active player goalkeeper", r:12, style:"fill:dodgerblue;stroke:white;stroke-width:1", title:"player"}, 
        {"x":495, "y":172, class:"drag-obj active ball", r:7, style:"fill:black;stroke:white;stroke-width:1", title:"player"}, 
    ]

    if (screen.width >= 800) {
        var svg = InteractiveSVG.create('svg', 800, 400);

        var outline = svg.addElement('rect', {x:0, y:0, width:800, height:400, style:"fill:rgba(0,157,0, 0.8);stroke-width:2;stroke:white"});
        var pen_box = svg.addElement('rect', {x:180, y:0, width:440, height:180, style:"fill:transparent;stroke-width:2;stroke:white"});
        var six_yard_box = svg.addElement('rect', {x:300, y:0, width:200, height:60, style:"fill:transparent;stroke-width:2;stroke:white"});
        var goal = svg.addElement('rect', {x:360, y:0, width:80, height:4, style:"stroke-width:1;stroke:white;fill:white"});

        var corner_right = svg.addPoint({x: 800, y: 0, r: 10, static: true, style:"stroke:white;stroke-width:2;fill:transparent"});
        var corner_left = svg.addPoint({x: 0, y: 0, r: 10, static:true, style:"stroke:white;stroke-width:2;fill:transparent"});
        var pen_spot = svg.addPoint({x: 400, y: 120, r: 2, static: true, style:"stroke:white;stroke-width:2;fill:white"});
        var arc = svg.addElement("path", {d:"M 350 180 C 350 240, 450 240, 450 180", style:"stroke:white;fill:transparent;stroke-width:2"})

        //add players and ball
        draggableObjsAttributes.forEach(dragObjAttr => {
            var point = svg.addPoint({x: dragObjAttr["x"], y: dragObjAttr["y"], class:dragObjAttr["class"], r: dragObjAttr["r"], style:dragObjAttr["style"]});
    })

    } else {
        var width = 300;
        var height = 150;
        var svg = InteractiveSVG.create('svg', width, height);

        var outline = svg.addElement('rect', {x:0, y:0, width:width, height:height, style:"fill:rgba(0,157,0, 0.8);stroke-width:2;stroke:white"});
        var pen_box = svg.addElement('rect', {x:67.5, y:0, width:165, height:67.5, style:"fill:transparent;stroke-width:2;stroke:white"});
        var six_yard_box = svg.addElement('rect', {x:112.5, y:0, width:75, height:22.5, style:"fill:transparent;stroke-width:2;stroke:white"});
        var goal = svg.addElement('rect', {x:135, y:0, width:30, height:2, style:"stroke-width:1;stroke:white;fill:white"});

        var corner_right = svg.addPoint({x: width, y: 0, r: 10, static: true, style:"stroke:white;stroke-width:2;fill:transparent"});
        var corner_left = svg.addPoint({x: 0, y: 0, r: 10, static:true, style:"stroke:white;stroke-width:2;fill:transparent"});
        var pen_spot = svg.addPoint({x: height, y: 120, r: 2, static: true, style:"stroke:white;stroke-width:2;fill:white"});
        var arc = svg.addElement("path", {d:"M 131.25 67.5 C 131.25 90, 168.75 90, 168.75 67.5", style:"stroke:white;fill:transparent;stroke-width:2"})

        //add players and ball
        draggableObjsAttributes.forEach(dragObjAttr => {
            var point = svg.addPoint({x: (dragObjAttr["x"]/800)*width, y: (dragObjAttr["y"]/400)*height, class:dragObjAttr["class"], r: dragObjAttr["r"]/3, style:dragObjAttr["style"]});
    })

    }
    draggableObjs = document.querySelectorAll("circle.drag-obj")
    return draggableObjs
}
draggableObjs = drawPitch()

draggableObjs.forEach( el => {
    if (el.classList.contains("player")) {
        if (el.classList.contains("goalkeeper")) {
            var title = "Goalkeeper"
        } else {
            var title = "Opposition Player"
        }

    } else {
        var title = "Shot Location"
    }
    el.innerHTML = "<title>"+title+"</title>";
    el.addEventListener("pointerdown", dragStart);
    el.addEventListener("pointerup",  dragEnd);
    el.addEventListener("touchstart", touchStart);
    el.addEventListener("touchend",  touchEnd);
})

function dragStart(e){
     console.log("drag start")
}
 
function dragEnd(e){
    console.log("drag end")
    od.update(Math.random().toFixed(2)) 
}

function touchStart(e) {
    e.preventDefault();
}

function touchEnd(e) {
    od.update(Math.random().toFixed(2))     
}



// async function loadModel() {
//     model = undefined;
//     model = await tf.loadLayersModel("https://raw.githubusercontent.com/sharmaabhishekk/Interactive-freeze-frames-xg/main/model/model-2.json")
//     console.log("model loaded");
//     return model
// }

// model = loadModel();

// // function makePrediction() {
// //     var a, b, output;
// //     a = 
// // }