import express from 'express'
import mariadb from 'mariadb'
const app = express()

app.get('/healthcheck', (req, res) => {
    async function asyncFunction() {
        let conn
        try {
            conn = await mariadb.createConnection({
                host: process.env.MYSQL_HOST || 'localhost',
                user: process.env.MYSQL_USER || 'user',
                password: process.env.MYSQL_PASSWORD || 'secret',
                database: process.env.MYSQL_DATABASE || 'database'
            });

            await conn.query('select 1', [2]);
            res.json({
                status: 'OK',
                message: 'Service is OK'
            })
        } catch (err) {
            res.status(500).json({
                status: 'NOT_OK',
                message: 'Service is NOT_OK. Connection to database failed'
            })
        }
        finally {
            conn?.end();
        }
    }

    asyncFunction();

    // mariadb.createConnection({
    //     host: process.env.MYSQL_HOST,
    //     user: process.env.MYSQL_USER,
    //     password: process.env.MYSQL_PASSWORD,
    //     database: process.env.MYSQL_DATABASE
    // }).then(conn => conn.query("SELECT 1 as val"))
    //     .then(() => {
    //         res.json({
    //             status: 'OK',
    //             message: 'Service is OK'
    //         })
    //     }).catch(() => {
    //         res.status(500).json({
    //             status: 'NOT_OK',
    //             message: 'Service is NOT_OK. Connection to database failed'
    //         })
    //     }).finally(() => {
    //         conn.end()
    //     })
    // pool.getConnection()
    //     .then(connection => {
    //         res.json({
    //             status: 'OK',
    //             message: 'Service is OK'
    //         })
    //         connection.end()
    //     }
    //     ).catch(e => {
    //         res.status(500).json({
    //             status: 'NOT_OK',
    //             message: 'Service is NOT_OK. Connection to database failed'
    //         })
    //     }).finally(() => {
    //         pool.end()
    //     });
})
app.get('/', (req, res) => {
    res.json({
        message: 'Hello my lord'
    })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})