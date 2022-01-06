import ECS from 'tnt-ecs';
import { Ticker } from 'pixi.js'
import Messages from "./messages";

// Systems
import CameraSystem from "../systems/camera-system";
import MovementSystem from "../systems/movement-system";
import TargetMovementSystem from "../systems/target-movement-system";
import TargetControlling from "../systems/target-controlling";
import InputSystem from "../systems/input-system";
import EntityLinkingSystem from "../systems/entity-linking-system";
import InteractionSystem from "../systems/interaction-system";
import DiscRenderingSystem from "../systems/disc-rendering-system";
import NodeSpawnSystem from "../systems/node-spawn-system";
import RenderingSystem from "../systems/rendering-system";
import TextRenderingSystem from "../systems/text-rendering-system";
import LineRenderingSystem from "../systems/line-rendering-system";
import SpriteRenderingSystem from "../systems/sprite-rendering-system";
import CameraControlSystem from "../systems/camera-control-system";
import PolygonRenderingSystem from "../systems/polygon-rendering-system";

// Components
import Position from "../components/position";
import Disc from "../components/disc";
import Target from "../components/target";
import Velocity from "../components/velocity";
import Camera from "../components/camera";
import CameraControl from "../components/camera-control";
import TargetControl from "../components/target-control";
import Interaction from "../components/interaction";
import Text from "../components/text";
import GridSystem from "../systems/grid-system";
import Slot from "../components/slot";
import Parent from "../components/parent";
import Polygon from "../components/polygon";

export default class App {

    constructor() {
        // init ECS Core
        this.ecs = new ECS.Core();
        
        // install ticker
        this.ticker = new Ticker();
        this.ticker.stop();
    }
    
    getGridCoord(coord) {
        return Math.round(coord / 32) * 32;
    }
    
    bind() {
        // Logic
        this.ecs.addSystem(new EntityLinkingSystem());
        this.ecs.addSystem(new CameraControlSystem());
        this.ecs.addSystem(new CameraSystem());
        this.ecs.addSystem(new TargetControlling());
        this.ecs.addSystem(new TargetMovementSystem());
        this.ecs.addSystem(new MovementSystem());
        this.ecs.addSystem(new InputSystem());
        this.ecs.addSystem(new NodeSpawnSystem());
        this.ecs.addSystem(new InteractionSystem());
        this.ecs.addSystem(new GridSystem());
        
        // Rendering
        let renderingSystem = new RenderingSystem();
        this.ecs.addSystem(renderingSystem);
        this.ecs.addSystem(new DiscRenderingSystem(renderingSystem.root));
        this.ecs.addSystem(new PolygonRenderingSystem(renderingSystem.root));
        this.ecs.addSystem(new LineRenderingSystem(renderingSystem.root));
        this.ecs.addSystem(new SpriteRenderingSystem(renderingSystem.root));
        this.ecs.addSystem(new TextRenderingSystem(renderingSystem.root));

        let camera = new ECS.Entity([
            new Disc({
                color: 0X000000
            }),
            new Position(),
            new Camera(),
            new CameraControl()
        ]);
        
        let cursor = new ECS.Entity([
            new Disc(),
            new Position()
        ]);

        this.ecs.addEntity(cursor);
        this.ecs.addEntity(camera);
        
        let look = false;
        let isDrawing = false;
        let polygonPoints = [];
        let polygonEntity;
        let polygonPlaceholderEntity;

        Messages.addListener('keydown', code => {
            if (code === 'Space') {
                look = true;
            }
        });

        Messages.addListener('keyup', code => {
            if (code === 'Space') {
                look = false;
            }
        });
        
        Messages.addListener('mousedown', data => {
            if (! look) {
                let x = this.getGridCoord(data.worldX);
                let y = this.getGridCoord(data.worldY);
                
                isDrawing = true;
                polygonPoints = [x, y];
                
                polygonEntity = new ECS.Entity([
                    new Polygon({
                        points: polygonPoints,
                        color: 0XF14000
                    })
                ]);
                
                polygonPlaceholderEntity = new ECS.Entity([
                    new Polygon({
                        points: polygonPoints,
                        alpha: .1,
                        color: 0XFFFFFF
                    })
                ]);
    
                this.ecs.addEntity(polygonEntity);
                this.ecs.addEntity(polygonPlaceholderEntity);
            }
        });

        Messages.addListener('mousemove', data => {


            let x = this.getGridCoord(data.worldX);
            let y = this.getGridCoord(data.worldY);
            
            cursor.components.position.x = x;
            cursor.components.position.y = y;
            
            if (! look) {
                
                if (isDrawing) {
                    polygonPlaceholderEntity.components.polygon.points = [
                        ...polygonPoints,
                        x, polygonPoints[1],
                        x, y,
                        polygonPoints[0], y 
                    ];
                }
            }
        });

        Messages.addListener('mouseup', data => {
            if (! look) {
                if (isDrawing) {
                    polygonEntity.components.polygon.points = polygonPlaceholderEntity.components.polygon.points;
                    isDrawing = false;
                }
            }
        });
    }
    
    start() {
        this.ticker.add(deltaTime => {
            Messages.process();
            this.ecs.update();
        });
        this.ticker.start();
    }
}