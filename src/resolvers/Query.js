const info = () => null

const feeds = (parent, args, context) => {
    where = (args)?
        {
            id: args.id,
            url: args.url
        } : {}
    const links = context.prisma.link.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy
    })
    const count = context.prisma.link.count({where})
    return {links, count}
}

const products = (parent, args, context) => {
    return context.prisma.product.findMany()
}

const users = (parent, args, context) => {
    return context.prisma.user.findMany()
}

const categories = (parent, args, context) => {
    return context.prisma.category.findMany()
}

module.exports = {
    info,
    feeds,
    users,
    products,
    categories
}