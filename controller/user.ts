import {Request, Response} from 'express'
import User from '../models/user'


export const getUsers = async(req: Request, res: Response)=>{
    console.log(req.body);
    
    try {
        const users = await User.findAll();
        res.json({
            users,
            body: req.body,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'internal server error'
        })
    }
    
}

export const getUser = async(req: Request, res: Response)=>{
    const {id} = req.params;
    
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(500).json({
                msg:'user doesnt exist',

            })
        }
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'internal server error'
        })
    }
    
}

export const createUser = async(req: Request, res: Response)=>{

    const {name,email} = req.body;

    try {
        const user = await User.create({name,email});
        
        res.status(200).json({
            msg: 'user created',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'internal server error'
        })
    }
}

export const updateUser = (req: Request, res: Response)=>{
    const {id} = req.params;
    const {body} = req.params;

    res.json({
        msg:'updateUser',
        body
    })
}

export const deleteUser = (req: Request, res: Response)=>{
    const {id} = req.params;
    res.json({
        msg:'deleteUser',
        id
    })
}