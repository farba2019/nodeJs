const express = require('express')
const app = express()
const port = 3000

let tasks = [
    {
        id:'1',
        title:'tache 1',
        desc:'Desc task 1',
        assignee:'Ibou'
    },
    {
        id:'2',
        title:'tache 2',
        desc:'Desc task 2',
        assignee:'Maty'
    },
    {
        id:'3',
        title:'tache 3',
        desc:'Desc task 3',
        assignee:'Falou'
    },
    {
        id:'4',
        title:'tache 4',
        desc:'Desc task 4',
        assignee:'Issa'
    },
    {
        id:'5',
        title:'tache 5',
        desc:'Desc task 5',
        assignee:'Thierry'
    },


];

function getTasks(){
    return tasks
}
function getTaskById(taskId){
    return tasks.filter((task) => task.id == taskId)
}
function deleteTaskById(taskId){
    return tasks.filter(task => task.id !== taskId)
}

// get all task
app.get('/tasks', (req, res) => {
    res.send(getTasks())
})

// get task by id
app.get('/tasks/:taskId/', (req, res) => {
    let taskId = req.params.taskId
    let task = getTaskById(taskId)
    res.send(task[0])
})

// delete task by id
app.delete('/deleteTask/:taskId/', (req, res) => {
    let allTask = tasks
    let taskId = req.params.taskId
    allTask = allTask.filter(task => task.id !== taskId)
    res.send(allTask)
})

// create task
app.post('/createTask/:taskId/title/:titleParam/desc/:descParam/assignee/:assigneeParam', (req, res) => {
    let allTask = tasks
    let taskId = req.params.taskId
    let titleParam = req.params.titleParam
    let descParam = req.params.descParam
    let assigneeParam = req.params.assigneeParam
    allTask.push({ id: taskId, title: titleParam, desc: descParam, assignee: assigneeParam})
    res.send(allTask)
})

// modify task
app.put('/modifyTask/:taskId/title/:titleParam/desc/:descParam/assignee/:assigneeParam', (req, res) => {
    let allTask = tasks
    let taskId = req.params.taskId
    let titleParam = req.params.titleParam
    let descParam = req.params.descParam
    let assigneeParam = req.params.assigneeParam
    allTask = allTask.filter(task => task.id !== taskId)
    allTask.push({ id: taskId, title: titleParam, desc: descParam, assignee: assigneeParam})
    res.send(allTask)
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})


//Swagger
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition =
    {
        "openapi": "3.0.0",
        "info": {
            "title": "Mon API",
            "description": "Description de mon API",
            "version": "1.0.0"
        },
        "servers": [
            {
                "url": "http://localhost:3000",
                "description": "Serveur principal (production)"
            },
            {
                "url": "https://staging-api.example.com",
                "description": "Serveur de pré-production (tests)"
            }
        ],
        "paths": {
            "/tasks": {
                "get": {
                    "summary": "Affiche la liste de tâches",
                    "description": "Description étendue en CommonMark ou HTML",
                    "responses": {
                        "200": {
                            "description": "Un tableau JSON de noms de tâches",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/tasks/{taskId}": {
                "get": {
                    "summary": "Affiche une tâche spécifique",
                    "description": "Description étendue en CommonMark ou HTML",
                    "parameters": [
                        {
                            "name": "taskId",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Détails de la tâche au format JSON",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "string"
                                            },
                                            "name": {
                                                "type": "string"
                                            },
                                            "status": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/deleteTask/{taskId}": {
                "delete": {
                    "summary": "Supprime une tâche spécifique",
                    "description": "Description étendue en CommonMark ou HTML",
                    "parameters": [
                        {
                            "name": "taskId",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Détails de la tâche au format JSON",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "string"
                                            },
                                            "name": {
                                                "type": "string"
                                            },
                                            "status": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/createTask/{taskId}/title/{titleParam}/desc/{descParam}/assignee/{assigneeParam}": {
                "post": {
                    "summary": "Ajoute une tâche spécifique",
                    "description": "Description étendue en CommonMark ou HTML",
                    "parameters": [
                        {
                            "name": "taskId",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "titleParam",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "descParam",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "assigneeParam",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Détails de la tâche au format JSON",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "string"
                                            },
                                            "name": {
                                                "type": "string"
                                            },
                                            "status": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/modifyTask/{taskId}/title/{titleParam}/desc/{descParam}/assignee/{assigneeParam}": {
                "put": {
                    "summary": "Modifie une tâche spécifique",
                    "description": "Description étendue en CommonMark ou HTML",
                    "parameters": [
                        {
                            "name": "taskId",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "titleParam",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "descParam",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "assigneeParam",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Détails de la tâche au format JSON",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "string"
                                            },
                                            "name": {
                                                "type": "string"
                                            },
                                            "status": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

//const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// ...

// var app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));