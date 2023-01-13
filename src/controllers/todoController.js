import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();


export function todoApp(req, res) {
    res.render('todoList/todoView')
}

export async function addTodo( {session, body}, res) {
    //console.log(req.body);
    const { task } = body;
    const userSession =session.user;
    

    const mytask = await prisma.task.create({
        data: {
            task,
            author: {
                connect: {
                    id: userSession.id
                }
            }
        }
    })
    res.redirect('/list')
    //console.log(mytask);
}
export async function showTask({session}, res) {
    const user = session.user
    
    const listTasks = await prisma.task.findMany({    
        where:{
            authorId:user.id
        }
        
    })
    const task = listTasks
    
  
    res.render('todoList/list', { listTasks })
    // res.json(listTasks)
}

export async function deleteTask(req, res) {
    const id = req.body.id;
  
    const deleteTask = await prisma.task.delete({
        where: {
            id: String(id)
        }
    })
    res.redirect('/list')
}

export async function renderUpdateTask(req, res) {
    const { id } = req.params;
    try {
        console.log(id);
        const renderTask = await prisma.task.findUnique({
            where: {
                id
            }
        })
        res.render('todoList/updateTask', { data: renderTask })
       
    } catch (error) {
        console.log(error);
    }

}

export async function updateTask(req, res){

    const {id} = req.params;
    const {task}= req.body;
    const updateTs= await prisma.task.update({
        where:{
            id
        },
        data: {
            task
        }
    })
    res.redirect('/list')
}
