/*
- ทำ REST API โดยใช้ Node JS (JavaScript หรือ TypeScript) สำหรับโปรแกรม To do list โดยห้ามเชื่อมต่อกับ database
แล้วส่งงานผ่าน Github
*/

const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser')



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// เรียกดูข้อมูล Task ทั้งหมด
app.get('/todo', (req, res) => {
    fs.readFile("./task.json", "utf8", (error, data) => {
        if (error) {
            res.status(500).json("Error");
        }
        res.status(200).json(JSON.parse(data));
    });

});

// เพิ่ม Task ใหม่
app.post("/todo", (req, res) => {
    console.log(req.body);
    fs.readFile("./task.json", "utf8", (error, data_read) => {
        if (error) {
            res.status(500).json("Error");
        }

        let data = JSON.parse(data_read)
        data.push({
            id: data[data.length - 1].id + 1,
            name: req.body.task,
            checked: false
        });

        writeFile("Add new", "", data, res)
    });
})

// Update status
app.put("/todo/:id/:checked", (req, res) => {
    fs.readFile("./task.json", "utf8", (error, data_read) => {
        if (error) {
            res.status(500).json({
                message: "Internal Error!!"
            })
        }

        let data = JSON.parse(data_read);
        let checked = req.params.checked == '1' ? true : false;
        let index = data.findIndex(({
            id
        }) => id === parseInt(req.params.id));
        data[index].checked = checked;
        writeFile("Update", "status", data, res);
    })
})

// Update name
app.patch("/todo/:id", (req, res) => {
    fs.readFile("./task.json", "utf8", (error, data_read) => {
        if (error) {
            res.status(500).json({
                message: "Internal Error!!"
            })
        }
        let data = JSON.parse(data_read);
        let name = req.body.name;
        if (name) {
            let index = data.findIndex(({id}) => id === parseInt(req.params.id));
            data[index].name = name;
            writeFile("Update", "name", data, res)
        }else{
            res.status(400).json({message: "Name is null"})
        }
    })
})

// Delete
app.delete("/todo/:id", (req, res) => {
    fs.readFile("./task.json", "utf8", (error, data_read) => {
        if (error) {
            res.status(500).json({
                message: "Internal Error!!"
            })
        }
        let data = JSON.parse(data_read);
        let index = data.findIndex(({id}) => id === parseInt(req.params.id));
        data.splice(index, 1);
        
        writeFile("Delete", "", data, res);

    })
})

function writeFile(action, name, data, res) {
    fs.writeFile("./task.json", JSON.stringify(data), (err) => {
        if (err) {
            res.status(500).json({
                message: "Internal Error!!"
            })
        } else {
            res.status(200).json({
                message: action + " task "+ name +" successfully"
            })
        }
    });
    
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})