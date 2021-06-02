const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const createUser = (parent, args, context) => {
    return context.prisma.user.create({data: {name: args.name, age: args.age}})
}
const createCategory = (parent, args, context) => {
    return context.prisma.category.create({data: {name: args.name}})
}
const createProduct = (parent, args, context) => {
    return context.prisma.product.create({
        data:{
            name: args.name,
            price: args.price,
            categoryId: args.categoryId
        }
    })
}
const createLink = (parent, args, context) => {
    const newLink = context.prisma.link.create({
        data:{
            url: args.url,
            postedById: args.postedById,
            description: args.description
        }
    })
    context.pubsub.publish("NEW_LINK", newLink)
    return newLink
}

const signup = async(parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.user.create({data: {
            name: args.name,
            age: args.age,
            email: args.email,
            password,
        }})
    const token = jwt.sign({user: user.email, id: user.id}, process.env.APP_SECRET)
    return {
        token,
        status: 200, message: "success"
    }
}

const signin = async (parent, args, context, info) => {
    const user = await context.prisma.user.findFirst({where: {email :args.email}})
    console.log(user)
    if(!user){
        return {status:400, message: "No user Found"}
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if(!valid) {
        return {status:402, message: "Invalid password"}
    }
    const token = jwt.sign({user: user.email, id: user.id}, process.env.APP_SECRET)
    return {token, status:200, message: "success"}
}

const test = (parent, args, context, info) => {
    return args.demo
}

module.exports = {
    test,
    signin,
    signup,
    createUser,
    createLink,
    createProduct,
    createCategory,
}