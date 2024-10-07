import React from 'react'
import { z } from "zod"

export const schema = z.object({
    name: z.string().min(2, {message: "Name is required!"}),
    email: z.string()
    .email( {message:"Ivalid email format!"})
    .min(1, {message: "Email is required!"}),
    password: z.string().min(6, {message: "Password min value 6!"}),
    confirmPassword: z.string().min(6, {message: "Confirm password min value 6!"}),
}).superRefine(({confirmPassword, password}, ctx) => {
    if(confirmPassword !== password){
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        })
    }
})

export const LoginValidator = z.object({
    email: z.string().min( {message:"Ivalid email format!"}).min(1, {message: "Email is required!"}),
    password: z.string().min(6, {message: "Password min value 6!"}),
})

