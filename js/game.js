import {Director} from './director.js'
import {ResourceLoader} from './resource_loader.js'
import {Store} from './store.js'


export class Game {

    constructor () {
        this.canvas = wx.createCanvas()
        this.pen = this.canvas.getContext('2d')
        // this.set_canvas_width_height()
        this.resource_loader = ResourceLoader.sington()
        this.resource_loader.onloaded(data=> {this.callback(data)})
    }

    static sington () {
        if(!Game.obj){
            Game.obj = new Game()
        }
        return Game.obj
    }
    // 设置画布宽高
    // set_canvas_width_height () {
    //     this.canvas.width = window.innerWidth
    //     this.canvas.height = window.innerHeight
    // }
    // 
    callback (data) {
        // 存放不可变数据到store==>>服装道具舞台准备
        this.store = Store.sington()
        this.store.clothes = data
        this.store.canvas = this.canvas
        this.store.pen = this.pen
        this.director = Director.sington()
        this.director.init()
        this.run_loop()
    }
    // 数据初始化==>>存放可变数据到store
    init () {
        this.store.action_number = 0
        this.store.score = 0
        // 演员进入表演后台前先清空上一批演员
        this.store.clear_actor()
        this.store.put_actor('background', new Background())
        //           .put_actor('land', new Land())
        //           .put_actor('bird', new Bird())
        //           .put_actor('flash', new Flash())
        //           .put_actor('pipe', [])
        //           .put_actor('score', new Score())  

        // this.store.get_actor('pipe').push(new Pipe())
    }
    // 开始循环==>>表演开始
    run_loop () {
        // 开始画前先清除以前画的
        this.pen.clearRect(0,0,this.canvas.width, this.canvas.height)
        // 开始画画
        this.director.action(this.store.action_number)
        // 继续循环
        requestAnimationFrame(()=> {this.run_loop()})
    }
    
}