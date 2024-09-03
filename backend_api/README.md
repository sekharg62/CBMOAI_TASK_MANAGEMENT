
# API


## create task

```
method: post
url: http://localhost:6000/createtasks

json body input :

{
  "title": "Complete Project Documentation",
  "desc": "Finish writing the project documentation before the deadline.",
  "dueDate": "2024-09-07T12:00:00Z",
  "labels": ["work", "urgent"],
  "priority": "High",
  "reminder": "2024-09-06T10:00:00Z",
  "custom": "Weekly"
}


```

## get all tasks

```
method: get
url: http://localhost:6000/tasks


```
## update task

```
method: put
url: http://localhost:6000/updatetasks/:taskId

{
  "title": "Update Project Documentation",
  "desc": "Add recent changes to the project documentation.",
  "priority": "Medium"
}

```

## delete task

```
method: delete
url: http://localhost:6000/deletetasks/:taskId


```

## add subtask

```
method: post
url: http://localhost:6000/tasks/:taskId/subtasks

json body:

{
  "title": "4334ask 2t33432n",
  "dueDate": "2024-09-06T12:00:00Z"
}


```

## update subtask

```
method: put
url: http://localhost:6000/tasks/:taskId/subtasks/:subtaskId

json body:

{
  "title": "Write Conclusion Section",
  "dueDate": "2024-09-07T15:00:00Z"
}


```

## delete subtask

```
method: delete
url: http://localhost:6000/tasks/:taskId/subtasks/:subtaskId



```