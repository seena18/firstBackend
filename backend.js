const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());



const users = {
    users_list:
        [
            {
                id: 'xyz789',
                name: 'Charlie',
                job: 'Janitor',
            },
            {
                id: 'abc123',
                name: 'Mac',
                job: 'Bouncer',
            },
            {
                id: 'ppp222',
                name: 'Mac',
                job: 'Professor',
            },
            {
                id: 'yat999',
                name: 'Dee',
                job: 'Aspring actress',
            },
            {
                id: 'zap555',
                name: 'Dennis',
                job: 'Bartender',
            },
            {
                id: 'xyz890',
                name: 'Dennis',
                job: 'Dude',
            }
        ]
}


app.get('/', (req, res) => {
    res.send(users);
});
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    }
    else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    }
    else if (job != undefined) {
        let result = findUserByJob(job);
        result = { users_list: result };
        res.send(result);
    }
    else {
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = { users_list: result };
        res.send(result);
    }
});
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    console.log(req);
    if (userToAdd.id == undefined) {
        generateId(userToAdd);
    }
    console.log(`id: ${userToAdd.id}`);
    addUser(userToAdd);
    res.status(201).send(userToAdd).end();
});
app.delete('/users/:id', (req, res) => {
    let userToDelete = req.params['id'];
    console.log(`${userToDelete}`);
    deleteUser(userToDelete);
    res.status(204).end();
});
function addUser(user) {
    users['users_list'].push(user);
}
function deleteUser(u) {
    users['users_list'] = users['users_list'].filter((user) => user.id != u);
    console.log(`${u}`);

}
function generateId(user) {
    let str = "";
    let c = '';
    let n = 0;
    while (true) {
        for (let i = 0; i < 6; i++) {
            if (i > 2) {
                n = Math.floor(Math.random() * 10);
                str = str + n;
            }
            if (i <= 2) {
                c = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                str = str + c;
            }
            console.log(str);
        }

        if (findUserById(str) == undefined) {
            break;
        }
    }

    user.id = str;
    return user;
}
function findUserById(id) {
    return users['users_list'].find((user) => user['id'] === id);
}
const findUserByName = (name) => {
    return users['users_list'].filter((user) => user['name'] === name);
}
const findUserByJob = (job) => {
    return users['users_list'].filter((user) => user['job'] === job);
}
const findUserByNameAndJob = (name, job) => {
    return users['users_list'].filter((user) => user['job'] === job && user['name'] === name);
}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

