
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe' 
  //Q1)
  this.initX = 0; this.initY = 0;
  this.finalX = 0; this.finalY = 0;
  this.canvas = canvas;
  this.isClicked = false

	// Developper les 3 fonctions gérant les événements 
  //Q2-Q3-Q5)
  this.clic = function(evt){
    this.isClicked = true;
    var reslt = getMousePosition(this.canvas,evt);
    this.initX = reslt.x;
    this.initY = reslt.y;
    console.log("clic: x= " + this.initX + ", y= " + this.initY);

    interactor.onInteractionStart(this);
  }.bind(this);

  this.deplacer = function (evt){
    if(!this.isClicked);
    else{
        let reslt = getMousePosition(this.canvas,evt);
        this.finalX = reslt.x;
        this.finalY = reslt.y;

        interactor.onInteractionUpdate(this);
    }
  }.bind(this);

  this.deposer = function (evt){
    if(!this.isClicked);
    else{
      let reslt = getMousePosition(this.canvas,evt);
      this.finalX = reslt.x;
      this.finalY = reslt.y;
      console.log("deposer: " + this.finalX + ' ' + this.finalY)
      this.isClicked = false; 
      
      interactor.onInteractionEnd(this);
    }
  }.bind(this);
  
  // Associer les fonctions précédentes aux évènements du canvas Q4)
  this.canvas.addEventListener('mousedown', this.clic, false);
  this.canvas.addEventListener('mousemove', this.deplacer, false);
  this.canvas.addEventListener('mouseup', this.deposer, false);
};

// Place le point de l'événement evt relativement à la position du canvas Q3)
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



