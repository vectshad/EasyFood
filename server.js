const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "m45kK1V32ht8f2q+X8eQVKnLxX4O5EmUd3BpMpbEFNO97jcaAH/l6w9rYq/GUQInhl6H997tg/hpB/Zjr2ZKifqnba90kD/h1BZR7P2oLeBZDIdu9Ow2jbNFIV4OXF2m7QiNvX3Di/dWr3CHGy0v8wdB04t89/1O/w1cDnyilFU=",
  channelSecret: "8303f4c197844b012e840ed3fec1eb15"
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });

});

function handleEvent(event) {
  
    if((event.message.text == "help") || (event.message.text == "Help")){
      const echo = { type: 'text', text: "Silahkan ketik perintah berikut : \n Menu = untuk menampilkan menu yang tersedia \n Pesan = untuk memesan makanan " };
      return client.replyMessage(event.replyToken, echo);
    }
    
    if((event.message.text == "Pesan") || (event.message.text == "pesan")){
      const echo = { type: 'text', text: "Ketik pesanan yang diinginkan dan jumlahnya, kemudian cantumkan alamat dan nomor telepon untuk pengiriman. \n \nKetik \"konfirmasi\" jika sudah setuju dengan pemesanannya." };
      return client.replyMessage(event.replyToken, echo);
    }
  
    if((event.message.text == "Konfirmasi") || (event.message.text == "konfirmasi")){
      const echo = { type: 'text', text: "Terimakasih sudah memesan :) \n\nAnda akan dihubungi apabila pesanan ingin kami antar." };
      return client.replyMessage(event.replyToken, echo);
    }
  
    if((event.message.text == "Menu") || (event.message.text == "menu")){
      const echo = { type: 'text', text: "Berikut adalah menu yang tersedia: \n Makanan :\n 1. Nasi Goreng Biasa 10k \n 2. Nasi Goreng Sosis/Bakso 12k \n 3. Nasi Goreng Spesial 15k \n 4. Mie Rebus/Goreng 4k \n 5. Kwetiau Goreng 10k \n 6. Kwetiau Goreng Spesial 13k \n 7. Nasi Ayam Goreng 14k \n 8. Nasi Lele Goreng 12k \n 9. Tahu/Tempe 1k \n 10. Usus/Kulit/Ati Ampela 2k \n \n Minuman:\n 1. Es Teh Manis 3k \n 2. Es Lemon Tea 4k \n 3. Nutrisari 3k \n 4. Es Kopi Susu 5k" };
      return client.replyMessage(event.replyToken, echo);
    }
  
    const echo = { type: 'text', text: " " };
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});