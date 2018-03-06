export class Store {

    constructor () {
        this.image_map = new Map()
    }
    static sington () {
        if(!Store.obj){
            Store.obj = new Store()
        }
        return Store.obj
    }

    put_actor (k,v) {
        this.image_map.set(k,v)
        return this
    }
    get_actor (k) {
        return this.image_map.get(k)
    }
    clear_actor () {
        for (let [k,v] of this.image_map) {
            v = null
        }
    }
}