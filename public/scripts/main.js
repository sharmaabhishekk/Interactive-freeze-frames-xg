// xg value

var xg_val = document.querySelector("h3#xg-value").textContent
// plotting our pitch and adding ball and player points using interactivesvg.js utilities

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

draggableObjsAttributes = [
    {"x":400, "y":100, class:"drag-obj active player", r:12,style:"fill:orangered;stroke:white;stroke-width:1"}, 
    {"x":460, "y":145, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1"}, 
    {"x":450, "y":150, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1"}, 
    {"x":470, "y":143, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1"}, 
    {"x":480, "y":136, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1"}, 
    {"x":490, "y":130, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1"}, 
    {"x":350, "y":160, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1"}, 
    {"x":450, "y":160, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1"}, 
    {"x":250, "y":160, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1"}, 
    {"x":380, "y":160, class:"drag-obj active player", r:12, style:"fill:orangered;stroke:white;stroke-width:1"}, 
    {"x":400, "y":10, class:"drag-obj active player goalkeeper", r:12, style:"fill:dodgerblue;stroke:white;stroke-width:1"}, 
    {"x":500, "y":200, class:"drag-obj active ball", r:7, style:"fill:black;stroke:white;stroke-width:1"}, 
]

draggableObjsAttributes.forEach(dragObjAttr => {
    svg.addPoint({x: dragObjAttr["x"], y: dragObjAttr["y"], class:dragObjAttr["class"], r: dragObjAttr["r"], style:dragObjAttr["style"]});
})

draggableObjs = document.querySelectorAll("circle.drag-obj")

draggableObjs.forEach( el => {
    el.addEventListener("mousedown", dragStart);
    el.addEventListener("mouseup",  dragEnd);
})

function dragStart(){
     console.log("drag start")
}
 
function dragEnd(){
    console.log("drag end")
    document.querySelector("h3#xg-value").textContent = Math.random().toFixed(2);
}
