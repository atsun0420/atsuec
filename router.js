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

// // ルートパラメータの値はparamsオブジェクトでフォームの値はbodyオブジェクトで受け取る
// // 更新処理
// .post('/update/:id',
// (req, res, next) => {
//   let id = req.params.id;
//   let data = req.body.itemName;
//   // 更新値未入力エラー(テキストボックスに更新する値が入っていなかった場合)
//   if(data === "") {
//     res.render('edit.ejs',{updItem : {updErr : '更新する値を入力してください。',id : id}}); // 更新値未入力エラー
//     return;
//   }
//   // テキストボックスに更新する値が入っている場合
//   else if(data !== "") {
//     con.query(
//       'UPDATE items SET name = ? WHERE id = ?',
//       [data,id], (error, results) => {
//       if(error) {
//           console.log(error);
//         }
//         res.render('complete.ejs',{compMsg : {updOk : '値を更新しました'}}); // 更新完了メッセージ  
//       });
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

// 削除処理 /delete/:id URLでidを渡す(ルートパラメータという)
// .post('/delete/:id', (req, res) => {
//   let id = req.params.id;
//   con.query(
//   'DELETE FROM items WHERE id = ?',
//   id,(error, results) => {  
//     if (error) {
//       console.log(error);
//       }
//       res.render('complete.ejs',{compMsg : {delOk : '値を削除しました'}}); // 削除完了メッセージ 
//   });
// });

module.exports = router;
