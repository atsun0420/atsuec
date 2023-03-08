'use strict';
const express = require('express'); // Node.jsのフレームワーク、expressを使用するための準備
const router = express.Router(); // ルーティング処理を記述するための準備
const mysql = require('mysql'); // Node.jsからMySQLを操作するための準備

// MySQLの接続情報
const con = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: "userInfo"
});

// MySQLへ接続
con.connect((err) => {
  if(err) {
    console.log('error connectiong:' + err.stack);
    return;
  }
  console.log('create start!');
});

/* 画面を表示したいとき：getを使用  データベースを変更したいとき：postを使用 */
// TOP画面の表示
router.get('/', (req, res) => {
  res.render('top.ejs');
})

// 商品一覧画面の表示
.get('/menu', (req, res) => {
  res.render('menu.ejs');
})

// 商品詳細画面の表示
.get('/menu_details', (req, res) => {
  res.render('menu_details.ejs');
})

// お問い合わせ画面の表示
.get('/contact', (req, res) => {
  res.render('contact.ejs');
})

// お問い合わせ完了画面の表示
.get('/comp', (req, res) => {
  res.render('comp.ejs');
})

// 新規登録処理
 .post('/create',
   (req, res, next) => {
   let uname = req.body.userName;
   let ugender = req.body.userGender;
   let uage = req.body.userAge;
   let utitle = req.body.userTitle;
   let usentences = req.body.userSentences;
  
   con.query('insert into userreq(username,usergender,userage,usertitle,usersenetences) values(?,?,?,?,?)',
   [uname,ugender,uage,utitle,usentences],
  (error,results)=>{
      if(error) {
        console.log(error);
        return;
      }     
        // ラジオボタンが未選択の場合、値がundefinedになるので、void 0 を記述
        if(ugender === void 0) {
         res.render('contact.ejs',{emptyErr : {insGenderErr : '性別を選択してください'}});
        }
        if(uage === "") {
         res.render('contact.ejs',{emptyErr : {insAgeErr : '年齢を選択してください'}});
        }
        if(utitle === "") {
         res.render('contact.ejs',{emptyErr : {insTitleErr : 'タイトルを入力してください'}});
        }
        if(usentences === "") {
         res.render('contact.ejs',{emptyErr : {insSentencesErr : 'お問い合わせ内容を入力してください'}});
        }
        if(ugender !== "" && uage !== "" && utitle !== "" && usentences !== ""){
          res.redirect('/comp');
        }        
     });         
   });

module.exports = router;
