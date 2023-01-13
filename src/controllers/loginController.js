import { hashSync, compareSync } from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const salt = 12
//estas funciones nos dan acceso a los archivos  de las vista 
export function login(req, res) {
    // res.send({
    //     user: "edwin",
    //     age: 28,
    //     status: false
    // })
    res.render('auth/login')
}

export function resgister(req, res) {
    res.render('auth/register')
}

export function storeUser(req, res) {
    console.log(req.body);

    // try {
    //     const { name, email, password } = req.body;
    //     const user = await prisma.user.create({
    //         data: {
    //             name,
    //             email,
    //             password: hashSync(password, salt)
    //         }
    //     })
    //     console.log(user);
    //     res.redirect('/login')
    // } catch (error) {
    //     console.log(error);
    //     res.send("this email exist")
    // }

    const { name, email, password } = req.body;
    prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, salt)
        }
    }).then(user => {
       // console.log(user);
        res.redirect('/login')
    }).catch(error => {
        console.log(error);
        res.send("this email exist")
    })




    // const data = req.body
    // bcrypt.hash(data.password, 12).then(async hash => {
    //     data.password = hash
    //     console.log(data);
    //     const { name, email, password } = req.body;
    //     await prisma.user.create({

    //         data: {
    //             name,
    //             email,
    //             password
    //         }

    //     })

}

export async function auth({ body, session }, res) {
    const { email, password } = body
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
   
    if (user) {
        const validate = compareSync(password, user.password)
        if (validate) {
            
            session.user = {
                id: user.id,
                email: user.email,
                name: user.name
            }
            // session.Cookie.maxAge = 1000

            res.redirect("/");


        } else {
            console.log('email or pass invalid');
            res.redirect('/login')
        }
    } else {
        console.log('email or pass invalid');
        res.redirect("/login");

    }
}
 export function logouth(req, res){
    req.session.destroy();
    res.redirect('/login')
 }
