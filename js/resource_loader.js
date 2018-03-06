import {resource} from './resource.js'

export class ResourceLoader {
    constructor(){
        this.map = new Map(resource)
        for (let [k,v] of this.map) {
            let image = wx.createImage()
            image.src = v
            this.map.set(k, image)
        }
    }

    static sington () {
        if(!ResourceLoader.obj){
            ResourceLoader.obj = new ResourceLoader()
        }
        return ResourceLoader.obj
    }

    onloaded (callback) {
        let count = 0
        for (let [k,v] of this.map) {
            v.onload = ()=> {
                count++;
                console.log(`${k}加载完毕`)
                if(count==this.map.size){
                    console.log("全部资源加载完毕")
                    callback(this.map)
                }
            }
        }
    }
}