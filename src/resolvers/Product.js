const category = (parent, args, context) => {
    return context.prisma.product.findUnique({where: {id:parent.id}}).category()
}

module.exports = {
    category
}