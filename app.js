'use strict';
const express = require('express'); // Node.jsのフレームワーク、expressを使用するための準備
const app = express(); // expressインスタンスを生成
const router = require('./router'); // ルーティング処理を記述していく

app.use(express.json()); 
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/', router); // ルーティングのトップページを設定

app.listen(3000); // port番号：3000番を指定
