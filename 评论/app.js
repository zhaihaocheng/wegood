var express = require('express')
var mysql = require('mysql')
var app = express()

var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'taobao',
	
})
app.get('/get',(req,res)=>{
	pool.getConnection((err,connection)=>{
		if(err){
			console.log(err)
			return
		}
		var sql = 'select * from book'
		connection.query(sql,(err,data)=>{
			if(err){
			console.log(err)
			return
		     }
			res.send(data)
			connection.end()
		})
	})
	
})

app.get('/lu',(req,res)=>{
	var text = req.query.text
	var con=req.query.con
	pool.getConnection((err,connection)=>{
		if(err){
			console.log(err)
			return
		}
		var sql = 'insert into book(text,con) values(?,?)'
		connection.query(sql,[text],(err,data)=>{
			if(err){
			console.log(err)
			return
		     }
			console.log(data)
			res.send('ok')
			connection.end()
		})
	})
	
})
//详情
app.get('/gettext',(req,res)=>{
	var uid = req.query.uid
	pool.getConnection((err,connection)=>{
		if(err){
			console.log(err)
			return
		}
		var sql = 'select * from book where uid = ?'
		connection.query(sql,[uid],(err,data)=>{
			if(err){
			console.log(err)
			return
		    }
			res.send(data)
			connection.end()
		})
	})
})
//评论
app.get('/textlu',(req,res)=>{
	var text = req.query.text
	var uid = req.query.uid
	pool.getConnection((err,connection)=>{
		if(err){
			console.log(err)
			return
		}
		var sql = 'insert into text(text,bookuid) values(?,?)'
		connection.query(sql,[text,uid],(err,data)=>{
			if(err){
			console.log(err)
			return
		     }
			console.log(data)
			res.send('ok')
			connection.end()
		})
	})
	
})
//获取
app.get('/huoqu',(req,res)=>{
	var uid = req.query.uid
	pool.getConnection((err,connection)=>{
		if(err){
			console.log(err)
			return
		}
		var sql = 'select * from text where bookuid = ?'
		connection.query(sql,[uid],(err,data)=>{
			if(err){
			console.log(err)
			return
		    }
			res.send(data)
			connection.end()
		})
	})
})
//修改点赞
app.get('/xiu',(req,res)=>{
	var uid = req.query.uid
	var num = req.query.nums
	pool.getConnection((err,connection)=>{
		if(err){
			console.log(err)
			return
		}
		var sql = 'update book set good=? where uid = ?'
		connection.query(sql,[num,uid],(err,data)=>{
			if(err){
			console.log(err)
			return
		    }
			res.send('修改成功')
			connection.end()
		})
	})
})

app.use(express.static('./html'))
app.listen(8000,()=>{
	console.log('ok')
})

