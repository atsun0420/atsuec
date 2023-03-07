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
  database: "list_app"
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

// //【お問い合わせフォーム(PC用)】
// const contactBtn = document.getElementById("contactBtn"); // ボタン要素(PC用)を取得 
// const gender = document.getElementsByName("gender"); // 性別ラジオボタンのname要素を取得
// const selectage = document.getElementsByClassName("selectage")[0]; // 年代セレクトボックスのclass要素を取得
// const txttitle = document.querySelector(".txttitle"); // ご意見タイトルのclass要素を取得
// const txtgoiken = document.querySelector(".txtarea"); // ご意見のclass要素を取得

// // エラーメッセージ表示の要素を取得
// const errMsgGender = document.querySelector(".errMsgGender");
// const errMsgAge = document.querySelector(".errMsgAge");
// const errMsgTitle = document.querySelector(".errMsgTitle");
// const errMsgGoiken = document.querySelector(".errMsgGoiken");

// router.post('/contact', (req, res) => {
//   if(genderSP[0].checked === false && genderSP[1].checked === false) {    
//     errMsgGenderSP.textContent = "性別を選択してください";
//   }else{
//     errMsgGenderSP.textContent = "";
//   }

//   if(selectageSP.options[selectageSP.selectedIndex].value === "") {
//     errMsgAgeSP.textContent = "年代を選択してください";
//   }else{
//     errMsgAgeSP.textContent = "";
//   }  

//   if(!txttitleSP.value) {
//     errMsgTitleSP.textContent = "タイトルを入力してください";      
//   }else{
//     errMsgTitleSP.textContent = "";
//   }

//   if(!txtgoikenSP.value) {
//     errMsgGoikenSP.textContent = "ご意見を入力してください";
//   }else{
//     errMsgGoikenSP.textContent = "";
//   }
  
//   if(errMsgGenderSP.textContent === "" && errMsgAgeSP.textContent === "" &&
//     errMsgTitleSP.textContent === "" && errMsgGoikenSP.textContent === "") {
//       res.render('comp.ejs');
//   }

  
// })

// // 新規登録処理
// .post('/create',
//   (req, res, next) => {
//   let id = req.params.id;
//   let data = req.body.itemName;  
//   // insert～where not exists・・・データがあればinsertし、データがない場合はinsertしている     con.query('insert into items set ?',　通常のinsert文
//   con.query('INSERT INTO items (name) SELECT ? WHERE NOT EXISTS (SELECT * FROM items WHERE name = ?)',
//   [data,data],(error,results)=>{
//       if(error) {
//         console.log(error);
//         return;
//       } 
//       //変数resultsをconsole.logで表示して、affectedRowプロパティの値を確認する
//       if(results.affectedRows === 1) {        
//         res.render('complete.ejs',{compMsg : {insOk : '値を登録しました'}}); // 新規登録完了メッセージ  
//       } else {
//         res.render('new.ejs',{emptyErr : {insErr : data + 'はすでに登録されています'}}); // 重複エラーメッセージ 
//         return;
//       }         
//   });
// })

module.exports = router;
