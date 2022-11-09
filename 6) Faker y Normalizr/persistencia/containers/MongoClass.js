class MongoClass {

    constructor(collection){
        this.collection = collection;
    }

   getAll() {
        try {
            return this.collection.find({});
        } catch (error) {
            console.log(error);
        }
    }

    getAllByProjection(obj) {
        try {
            return this.collection.find({},obj);
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