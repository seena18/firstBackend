const express = require('express');
const app = express();
const port = 5000;

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
    addUser(userToAdd);
    res.status(200).end();
});
app.delete('/users', (req, res) => {
    const userToDelete = req.body;
    console.log(req);
    deleteUser(userToDelete);
    res.status(200).end();
});
function addUser(user) {
    users['users_list'].push(user);
}s
function deleteUser(u) {
    let id = u.id;
    let index = users['users_list'].findIndex((user) => user.id === u.id);
    console.log(`Index of user: ${index}`)
    delete users['users_list'][index];
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
