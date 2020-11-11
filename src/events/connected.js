module.exports = (client) => {
    console.log(`Login Sebagai ${client.user.username}`);
    client.cache.chats.forEach(chat => chat.approve());
};