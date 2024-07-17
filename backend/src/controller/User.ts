
import { UserRepositoryDriver } from "@src/adapters/User";
import { prisma } from "@src/models/config";
import { UserRepository } from "@src/models/User/repository";
import { UserService } from "@src/service/userService";
import { Handler } from "express";
const repo = new UserRepository(prisma)
const prismaUserRepo = new UserRepositoryDriver(repo)
const service = new UserService(prismaUserRepo)
export const UserController: Record<string, Handler> = {
    register: async (req, res) => {
        const user = req.body
        try {
            await service.register(user)
            res.status(201).send()
        } catch (error) {
            res.status(400).send({error, message: 'no se pudo registrar el usuario'})
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body
        const user = await service.login(email, password)
        if (!user) return res.status(401).send()
        res.json(user)
    },
    getProfile: async (req, res) => {
        const id = Number(req.params.id)
        const user = await service.getProfile(id)
        if (!user) return res.status(404).send()
        res.send(user)
    },
    recover: async (req, res) => {
        const email = req.body.email
        const user = await service.recover(email)
        if (!user) return res.status(404).send()
        res.send(user) 
    },
    updateProfile: async (req, res) => {
        const id = Number(req.params.id)
        const user = req.body
        try {
            await service.updateProfile({ id, updateData: user })
            const updated = await service.getProfile(id)
            if (!updated) return res.status(404).send()
            res.status(200)
            
        } catch (error) {
         res.status(400).send({error, message: 'no se pudo actualizar el usuario'})   
        }
    },
    changePassword: async (req, res) => {
        const id = Number(req.params.id)
        const password = req.body.password
        try {
            await service.changePassword({ id, password })
            res.status(200)
        } catch (error) {
            res.status(400).send({error, message: 'no se pudo cambiar la contraseña'})
        }
    }
}