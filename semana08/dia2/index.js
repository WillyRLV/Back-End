const express = require("express");
const mysqlConnection = require("./database");

const app = express();
const port = 5000;

//para parsear dato en json
app.use(express.json());
//=============================================
app.get("/", function (req, res) {
  res.json({
    status: true,
    content: "Bienvenido a mi API",
  });
});

//get
app.get("/alumno", function (req, res) {
  mysqlConnection.query("select * from tbl_alumno", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


//get un alumno
app.get("/alumno/:id", function (req, res) {
    const {id} = req.params;
    mysqlConnection.query("select * from tbl_alumno where alumno_id= '"+id+"'", (err, rows, fields) => {
      if (!err) {
      
        // res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

//post

app.post("/alumno", function (req, res) {
  const { nombre, email, celular, github } = req.body;
  const query = `insert into tbl_alumno(alumno_nombre,alumno_email,alumno_celular,alumno_github)
    values('${nombre}','${email}','${celular}','${github}')`;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({
        status: true,
        content: "Alumno creado",
      });
    } else {
      console.log(err);
    }
  });
});

//put

app.put("/alumno/:id", function (req, res) {
  const { nombre, email, celular, github } = req.body;
  const {id} = req.params;
  const query = `update tbl_alumno set alumno_nombre=?,alumno_email=?,alumno_celular=?,alumno_github=? where alumno_id=?`
  mysqlConnection.query(query,[nombre,email,celular,github,id], (err, rows, fields) => {
    if (!err) {
      res.json({
        status: true,
        content: "Alumno actualizado",
      });
    } else {
      console.log(err);
    }
  });
});



//delete

app.delete("/alumno/:id", function (req, res) {
    const { nombre, email, celular, github } = req.body;
    const {id} = req.params;
    const query = `delete from tbl_alumno  where alumno_id=?`
    mysqlConnection.query(query,[id], (err, rows, fields) => {
      if (!err) {
        res.json({
          status: true,
          content: "Alumno eliminado",
        });
      } else {
        console.log(err);
      }
    });
  });

app.listen(port, () => {
  console.log(
    "servidor iniciado entra conchatumadre -> http://localhost:" + port
  );
});
