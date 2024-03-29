const fs = require("fs")
const path = require("path")
const { ApolloServer, PubSub } = require("apollo-server")
const { PrismaClient } = require("@prisma/client")
const {getUserId} = require("./utils/helper")

const prisma = new PrismaClient()
const pubsub = new PubSub()

const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const Subscription = require("./resolvers/Subscription")
const User = require("./resolvers/User")
const Link = require("./resolvers/Link")
const Product = require("./resolvers/Product")

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Product
}

const server = new ApolloServer({
    typeDefs : fs.readFileSync(
        path.join(__dirname, 'schema.graphql'), 'utf8'
    ), 
    resolvers,
    context: ({req}) => {
        return {
            ...req,
            prisma,
            pubsub,
            userId: req && req.headers.authorization ? getUserId(req) : null
        }
        prisma
    }
})

server.listen().then((data) => {
    console.log("Server Started")
})