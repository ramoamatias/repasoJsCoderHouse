class MessageDTO {
    constructor(message){
        this.nameComplete = `${message.author.firstName} ${message.author.lastName}`
        this.email = message.author,
        this.message = message.text
    }
}

module.exports = {
    MessageDTO
}