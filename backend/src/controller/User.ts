import { UserRepoStub, UserServiceStub } from "@src/User";
import { ForUserManagement } from "@src/User/interfaces";
import { Handler } from "express";
const repo = new UserRepoStub([
    {
        "id": 1,
        "name": "Abraham",
        "password": "passwordhash",
        "email": "abraham@email.com",
        "role": "user"
      }
])
const service = new UserServiceStub(repo)
export const UserController: Record<string, Handler> = {
    register: async (req, res) => {
        const user = req.body
        await service.register(user)
        res.status(201).send()
    },
    login: async (req, res) => {
        const { email, password } = req.body
        const user = await service.login(email, password)
        if (!user) return res.status(401).send()
        res.send(user)
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
        const updated = await service.updateProfile({ id, updateData: user })
        if (!updated) return res.status(404).send()
        res.send()
    },
    changePassword: async (req, res) => {
        const id = Number(req.params.id)
        const password = req.body.password
        const updated = await service.changePassword({ id, password })
        if (!updated) return res.status(404).send()
        res.send()
    },
    getAll: async (req, res) => {
        const users = await repo.getAll()
        res.send(users)
    }
}