import * as mysql from 'mysql';


const connection =	mysql.createConnection({
											host     : '127.0.0.1',
											user     : 'root',
											password : 'root',
											database : 'skillup-js'
										})


export default connection;