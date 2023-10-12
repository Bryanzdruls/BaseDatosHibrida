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
        const existEmail = await User.findOne({
            where:{
                email: req.body.email,
            }
        });
        if (existEmail) {
            return res.status(400).json({
                msg:'Email already exists'
            })
        }
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

export const updateUser = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const {body} = req;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg:'User doesnt exist'
            })
        }
        await user.update(body);
        
        res.status(200).json({
            msg: 'user updated',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'internal server error'
        })
    }
}

export const deleteUser = async(req: Request, res: Response)=>{
    const {id} = req.params;
    
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg:'User doesnt exist'
            })
        }
        
        await user.update({state: false});
        
        res.status(200).json({
            msg: 'user updated',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'internal server error'
        })
    }
}