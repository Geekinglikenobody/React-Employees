const {prisma} = require("../prisma/prisma-cliend")


const all = async (req,res) => {
    try {
        const employees = await prisma.employee.findMany()
        res.status(200).json(employees)
    } catch (error) {
        res.status(400).json({message: "Не удалось получить сотрудников"})
    }
} 

const add = async (req,res) => {
    try {
        const data = req.body
        console.log(data)
        if(!data.firstName || !data.lastName || !data.adress || !data.age) {
            return res.status(400).json({message: "Все поля обязательные"})
        }

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })

        return res.status(200).json(employee)
    } catch (error) {
        res.status(400).json("Что-то пошло не так")
    }
}

const remove = async (req,res) => {
    const {id} = req.body;
    try {
        await prisma.employee.delete({
            where:{
                id
            }
        })
        res.status(204).json("Ok")
    } catch (error) {
        return res.status(500).json({message: "Не получилось удалить сотрудника"})
    }
}

const edit = async (req,res) => {
    const data = req.body;
    const id = data.id
    try {
        await prisma.employee.update({
            where: {
                id
            },
            data
        })
        res.status(204).json("Ok")
    } catch (error) {
        return res.status(500).json({message: "Не получилось изменить сотрудника"})
    }
}

const employee = async (req,res) => {
    const {id } = req.params;
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        })
        res.status(200).json(employee)
    } catch (error) {
        return res.status(500).json({message: "Не удалось получить сотрудника"})
        
    }
}
module.exports = {
    all,
    add,
    remove,
    edit,
    employee
}