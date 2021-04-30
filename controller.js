
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	// Question9
	// Question10
	this.onInteractionStart = function(drag){
		if(this.currEditingMode) {
			this.currentShape = new Line(drag.initX, drag.initY, drag.initX, drag.initY, this.currLineWidth, this.currColour);
		} else {
			this.currentShape = new Rectangle(drag.initX, drag.initY, 0, 0, this.currLineWidth, this.currColour);
		}
		console.log(this.currColour);
		console.log(this.currLineWidth);
	}.bind(this);

	this.onInteractionUpdate = function(drag){
		if(this.currEditingMode) {
			this.currentShape.finalX = drag.finalX;
			this.currentShape.finalY = drag.finalY;
		} else {
			this.currentShape.longueur = Math.abs(drag.finalX - drag.initX);
			this.currentShape.largeur = Math.abs(drag.finalY - drag.initY);
		}
	}.bind(this);

	this.onInteractionEnd = function(drag){
		if(this.currEditingMode) {
			this.currentShape.finalX = drag.finalX;
			this.currentShape.finalY = drag.finalY;
		} else {
			this.currentShape.longueur = Math.abs(drag.finalX - drag.initX);
			this.currentShape.largeur = Math.abs(drag.finalY - drag.initY);
		}

		drawing.addForme(this.currentShape);
		this.currentShape.paint(ctx);
	}.bind(this);

	//Question11
	this.dessineRect = function() {
		this.currEditingMode = editingMode.rect;
	}.bind(this);

	this.dessineLine = function() {
		this.currEditingMode = editingMode.line;
	}.bind(this);

	this.changeEpaisseur = function(val) {
		this.currLineWidth = val.target.value;
	}.bind(this);

	this.changeCouleur = function(col) {
		this.currColour = col.target.value;
	}.bind(this);

	document.getElementById("butRect").addEventListener("click", this.dessineRect, false);
	document.getElementById("butLine").addEventListener("click", this.dessineLine, false);
	var spinner = document.getElementById("spinnerWidth");
	spinner.addEventListener("change", this.changeEpaisseur, false);
	var color = document.getElementById("colour");
	color.addEventListener("change", this.changeCouleur, false);
};


