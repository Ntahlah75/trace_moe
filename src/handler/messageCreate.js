const axios = require('axios');
const utils = require('../utils');

module.exports = async (client, msg) => {
    if (msg.authorID === client.user.id) return;
    msg.markSeen();

    let url = msg.mediaData && msg.mediaData.url ? msg.mediaData.url : msg.content;
    if (!(await utils.isImageURL(url))) return msg.chat.sendMessage('Masukkan Gambar yang Valid!');

    let mess = await msg.reply('Tunggu bentar...');
    try {
        const response = await axios.get(`https://trace.moe/api/search?url=${encodeURIComponent(url)}`);
        if (!response.data || !response.data.docs[0]) {
            mess.delete();
            return msg.chat.sendMessage('Saya tidak dapat menemukan hasil yang cocok!').then(m => utils.deleteAfter(m, 8000));
        }
        const result = response.data.docs[0];

        mess.delete();
        msg.chat.sendMessage(`${result.title_romaji}
        Episode: ${result.episode || '?'}
        Waktu: ${utils.getTime(result.at)}
        Kemiripan: ${(result.similarity * 100).toFixed(1)}%`);
        return msg.chat.sendPhoto(`https://trace.moe/thumbnail.php?anilist_id=${result.anilist_id}&file=${encodeURIComponent(result.filename)}&t=${result.at}&token=${result.tokenthumb}`);
    } catch (Err) {
        mess.delete();
        return msg.reply('Masukkan Gambar yang Valid!');
    }
}