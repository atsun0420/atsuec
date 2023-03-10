'use strict';
const express = require('express'); // Node.jsのフレームワーク、expressを使用するための準備
const router = express.Router(); // ルーティング処理を記述するための準備
//const { check, validationResult } = require('express-validator'); // バリデーション処理の準備
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
  console.log('SQL start!');
});

/* 画面を表示したいとき：getを使用 データベースを変更したいとき：postを使用 */
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

// //バリデーション:express-validator使用
// const insValidator = [
//   check('userGender').not().isEmpty().withMessage("性別：性別を選択して下さい。"),
//   check('userAge').not().isEmpty().withMessage("年齢：年代を選択して下さい。"),
//   check('userTitle').not().isEmpty().withMessage("タイトル：タイトルを入力して下さい。"),
//   check('userSentences').not().isEmpty().withMessage("お問い合わせ内容：内容を入力して下さい。"),
//   // エラー処理まで行ってしまう
//   async(req, res, next) => {
//       // エラーの状況を取得
//       const errors = validationResult(req);
//       // エラーが発生していたら内容を取得して画面に表示
//       if (!errors.isEmpty()) {
//           res.render('contact.ejs', {errors: errors.array()});
//           return;
//       }
//       // エラーがなければnextメソッド呼び出し
//       next();
//   },
// ];

// 新規登録処理
 router.post('/create',
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
        // ラジオボタンが未選択の場合は特殊処理、値がundefinedになるので、void 0 を記述
        // if(ugender === void 0) {
        //  res.render('contact.ejs',{emptyErr : {insGenderErr : '性別を選択してください'}});
        // }
        // 全ての項目に値が入力または選択されていたら完了画面へ遷移
        if(ugender !== "" && uage !== "" && utitle !== "" && usentences !== ""){
          res.redirect('/comp');
        }        
     });         
  });
module.exports = router;
