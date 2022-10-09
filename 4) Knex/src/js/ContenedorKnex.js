const knex = require("knex");

class Container {
  constructor(config, nameTable) {
    this.db = knex(config);
    this.nameTable = nameTable;
  }

  async save(object) {
    try {
      let result = await this.db.from(this.nameTable).insert(object);
      return result[0];
    } catch (error) {
      console.error(error);
    }
  }

  async getById(idObject) {
    try {
      let result = await this.db
        .from(this.nameTable)
        .where("id", idObject)
        .select("*");
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      let result = await this.db.from(this.nameTable).select("*");
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(idObject) {
    try {
      let result = await this.db
        .from(this.nameTable)
        .where("id", idObject)
        .del();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      let result = await this.db.from(this.nameTable).del();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(idObject, object) {
    try {
      let result = await this.db
        .from(this.nameTable)
        .where("id", idObject)
        .update(object);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updateAll(object) {
    try {
      let result = await this.db.from(this.nameTable).update(object);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Container;