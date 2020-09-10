const axios = require('axios');
const fetch = require('node-fetch');

module.exports = {
    /**
     * cek apakah konten url tersebut adalah gambar
     * @param {string} url
     * @returns {Promise<boolean>}
     */
    isImageURL: async function(url) {
        try {
            const response = await axios.get(url);
            return /image/gi.test(response.headers['content-type']);
        } catch {
            return false;
        }
    },

    /**
     * 
     * @param {Message} message
     * @param {number} timeout
     */
    deleteAfter: async function(message, timeout) {
        setTimeout(() => {
            message.delete();
        }, Number(timeout));
    },

    /**
     * 
     * @param {string | number} time 
     */
    getTime: function(time) {
        const Time = parseInt(time, 10);
        const hours = Math.floor(Time / 3600).toString().padStart(2, "0");
        const minutes = Math.floor((Time - hours * 3600) / 60).toString().padStart(2, "0");
        const seconds = (Time - hours * 3600 - minutes * 60).toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }
}