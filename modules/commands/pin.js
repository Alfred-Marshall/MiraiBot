module.exports.config = {
    name: "pin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "TÃ¬m kiáº¿m hÃ¬nh áº£nh",
    commandCategory: "tiá»‡n Ã­ch",
    usages: "[Text]",
    cooldowns: 0,
};
module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    const keySearch = args.join(" ");
    if(keySearch.includes("-") == false) return api.sendMessage('ðŸŒ¸Vui lÃ²ng nháº­p theo Ä‘á»‹nh dáº¡ng: tá»« khÃ³a cáº§n tÃ¬m kiáº¿m - sá»‘ áº£nh cáº§n tÃ¬mðŸŒ¸', event.threadID, event.messageID)
    const keySearchs = keySearch.substr(0, keySearch.indexOf('-'))
    const numberSearch = keySearch.split("-").pop() || 6
    const res = await axios.get(`https://api-dien.cuongpham23074.repl.co/pinterest?search=${encodeURIComponent(keySearchs)}`);
    const data = res.data.data;
    var num = 0;
    var imgData = [];
    for (var i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/cache/${num+=1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
    }
    api.sendMessage({
        attachment: imgData,
        body: numberSearch + 'ðŸŒ¸Káº¿t quáº£ tÃ¬m kiáº¿m cá»§a tá»« khÃ³a: '+ keySearchs
    }, event.threadID, event.messageID)
    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.jpg`)
    }
};