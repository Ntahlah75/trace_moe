module.exports = (client) => {
    console.log(`Bot login sebagai ${client.user.username}`);
    client.cache.pendingChats.forEach(chat => chat.approve());
}