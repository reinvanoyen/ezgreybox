import ECS from 'tnt-ecs';
import { Application, Container } from 'pixi.js';
import Messages from "../core/messages";

export default class RenderingSystem extends ECS.System {

    constructor() {

        super();
        
        this.camera = null;
        
        // PIXI setup
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // create app
        this.app = new Application({
            width: this.width,
            height: this.height,
            antialias: true,
            backgroundColor: 0x000F14
        });
        
        // install root container
        this.root = new Container();
        this.app.stage.addChild(this.root);

        // add canvas to HTML document
        document.body.appendChild(this.app.view);
        
        // get info from camera
        Messages.addListener('camera', e => this.camera = e);
        
        // broadcast info about renderer
        Messages.trigger('renderer', {
            width: this.width,
            height: this.height
        });
    }
    
    /*
    enter(entity) {

        if (entity.components.line) {
            entity.graphic = new Graphics();
            this.root.addChild(entity.graphic);
        }
        
        if (entity.components.sprite) {
            entity.sprite = new Sprite(Texture.from(entity.components.sprite.src));
            this.root.addChild(entity.sprite);
        }
        
        if (entity.components.debug) {
            entity.text = new Text('Debug...', {fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'left'});
            this.root.addChild(entity.text);
        }
    }
    
    exit(entity) {
        
        if (entity.components.line) {
            this.root.removeChild(entity.graphic);
            delete entity.graphic;
        }
        
        if (entity.components.name) {
            this.root.removeChild(entity.text);
            delete entity.text;
        }
    }*/
    
    postUpdate() {
        if (this.camera) {
            
            this.root.scale.x = this.camera.zoom;
            this.root.scale.y = this.camera.zoom;
            
            this.root.position.x = (this.camera.x + this.camera.offsetX);
            this.root.position.y = (this.camera.y + this.camera.offsetY);
        }
    }
}