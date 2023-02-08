const types = `
type Query {
    getAllproducts: [Product]
    getInfo: Info
    
}

type Mutation {
    createProduct(input:  CreatedProductInput) : Product
}

type Product {
    id: ID
    name: String
    price: String
    urlPhoto: String
}

type Info {
    args: [String],
    nameSO: String,
    nodeVersion: String,
    memoryReserved: Int,
    path: String,
    processId: Int,
    folderProyect: String,
    numCpus: Int
}

input CreatedProductInput {
    name: String
    price: Int
    urlPhoto: String
}
`;

module.exports = {
  types,
};
