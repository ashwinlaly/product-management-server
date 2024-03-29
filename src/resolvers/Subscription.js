const newLinkSubscription = (parent, args, context, info) => {
    return context.pubsub.asyncIterator("NEW_LINK")
}

const newLink = {
    subscribe: newLinkSubscription,
    resolve: payload => payload
}

module.exports = {
    newLink
}