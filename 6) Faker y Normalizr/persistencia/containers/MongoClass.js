class MongoClass {

    constructor(collection){
        this.collection = collection;
    }

   getAll() {
        try {
            return this.collection.find({},{author:1,text:1,time:1});
        } catch (error) {
            console.log(error);
        }
    }
    
 
    save(obj) {
        try {
            return new this.collection(obj).save();
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = {
    MongoClass
}