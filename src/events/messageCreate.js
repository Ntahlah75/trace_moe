const fetch = require('node-fetch');
const util = require('../util');

module.exports = async (client, message) => {
    if (message.authorID === client.user.id) return;
    message.markSeen();

    let url = message.mediaData && message.mediaData.url || message.content;
    if (!(await util.isImageURL(url))) return message.chat.sendMessage('Masukkan url gambar yang valid');

    let msg = await message.chat.sendMessage('Tunggu bentar...');
    try {
        let response = await fetch(`https://trace.moe/api/search?url=${encodeURIComponent(url)}`);
        response = await response.json();
        if (!response.docs || !response.docs[0]) {
            msg.delete();
            return message.chat.sendMessage('Tidak dapat menemukan hasil!');
        }

        const result = response.docs[0];
        let imageBuffer = await fetch(`https://trace.moe/thumbnail.php?anilist_id=${result.anilist_id}&file=${encodeURIComponent(result.filename)}&t=${result.at}&token=${result.tokenthumb}`);
        imageBuffer = await imageBuffer.buffer();

        msg.delete();
        message.chat.sendMessage(`${result.title_romaji}
        Episode: ${result.episode || '?'}
        Timestamp: ${util.getTime(result.at)}
        Kemiripan: ${(result.similarity * 100).toFixed(1)}%`);
        return message.chat.sendPhoto(imageBuffer);
    } catch(Err) {
        console.error(Err);
        msg.delete();
        return message.chat.sendMessage('Masukkan url gambar yang valid');
    }
};