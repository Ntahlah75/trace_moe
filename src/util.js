const fetch = require('node-fetch');

module.exports = {
    /**
     * ngecek url
     * @param {string} url link
     * @returns {Promise<boolean>}
     */
    isImageURL: async function isImageURL(url) {
        if (!url) return false;
        try {
            let response = await fetch(url);
            let contentType = response.headers.get('content-type');
            return contentType.toLowerCase().startsWith('image');
        } catch {
            return false;
        }
    },

    /**
     * menghapus pesan dengan timeout
     * @param {*} message pesan
     * @param {string | number} timeout timeout berupa mildetik
     * @returns {Promise<any>}
     */
    deleteAfter: function deleteAfter(message, timeout) {
        if (!Number(timeout) || !message.delete) return Promise.resolve(null);
        setTimeout(() => {
            message.delete();
            return Promise.resolve(message);
        }, Number(timeout));
    },

    /**
     * umm
     * @param {string | number} ms mildetik
     * @returns {string}
     */
    getTime: function getTime(ms) {
        const time = parseInt(ms, 10);
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time - hours * 3600) / 60).toString().padStart(2, '0');
        const seconds = (time - hours * 3600 - minutes * 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
};