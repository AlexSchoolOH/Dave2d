//Dave 2D classes
const DocBod = document.body;

class renderer {
    constructor(options){
        this.width = options.width;
        this.height = options.height;
        this.scalable = options.fitToWindow;
        this.backgroundColor = options.Color;

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.gl = this.canvas.getContext("2d")

        DocBod.append(this.canvas)
    }

    update(){
        if(this.scalable){
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    clearbg(){
        this.gl.fillStyle = this.backgroundColor
        this.gl.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    drawSprite(Image,FittingOptions)
    {
        this.gl.rotate(FittingOptions.Rotation * Math.PI / 180);
        this.gl.translate(FittingOptions.RenderX, FittingOptions.RenderY);
        if (!FittingOptions.type == "Full"){
            this.gl.drawImage(Image,FittingOptions.ImageX,FittingOptions.ImageY,FittingOptions.ImageWidth,FittingOptions.ImageHeight,FittingOptions.SizeX/-2,FittingOptions.SizeY/-2,FittingOptions.SizeX,FittingOptions.SizeY);
        }
        else{
            this.gl.drawImage(Image,0,0,256,256);
        }
        
        this.gl.translate(-FittingOptions.RenderX, -FittingOptions.RenderY);
        this.gl.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawPixel(X,Y,Colour)
    {
        this.gl.fillStyle = Colour
        this.gl.fillRect(x, y, 1, 1);
    }

    drawBox(x1,y1,x2,y2,Colour)
    {
        this.gl.fillStyle = Colour
        this.gl.fillRect(x1, y1, x2-x1, y2-y1);
    }
}

class entity {
    constructor(x,y,angle,sprite){
        this.x = x;
        this.y = y;
        this.angle = angle;
        let img = new Image();
        img.src = sprite;
        this.image = img;
    }

    draw(renderer){
        renderer.drawSprite(this.image,{
        type:"Full",
        RenderX:this.x,
        RenderY:this.y,
        Rotation:this.angle
    })
    }

    update(elasped){
        //your code here
    }
}
//Main app code
class app {
    constructor(Name,RendererOptions){
        this.Renderer = new renderer(RendererOptions);
        this.LastTimestamp = 0;
        this.fps = 0
        this.entities = [];
        document.title = Name;
    }

    init() {
        console.log("awesome");
        this.render();
        this.addEntity(new entity(0,0,0,"Images/WorldTiles.png"))
        window.requestAnimationFrame(update);
    }
    
    addEntity(entity) {
        this.entities.push(entity)
    }

    render(){
        this.Renderer.update();
        this.Renderer.clearbg();
        this.entities.forEach(entity => {
            entity.draw(elasped)
        });
    }

    updateEntities(elasped){
        this.entities.forEach(entity => {
            entity.update(elasped)
        });
    }

    update(timestamp) {
        let elasped = timestamp - this.LastTimestamp
        this.LastTimestamp = timestamp;
        this.fps = 1 / (elasped / 1000);
        this.render(elasped / 1000);
    }
}

let game = new app("Dispair",{
    width: 100,
    height: 100,
    fitToWindow: true,
    backgroundColor: "#333333"
});

game.init();

function update(timestamp){
    game.update(timestamp);
    window.requestAnimationFrame(update);
}