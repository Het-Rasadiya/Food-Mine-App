import React, { useEffect } from 'react'
import classes from './LoginPage.module.css'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Title from '../../components/Title/Title.js'
import { useAuth } from '../../hooks/useAuth.js'
import Input from '../../components/Input/Input.js'
import { EMAIL } from '../../Constants/Patterns.js'
import Button from '../../components/Button/Button.js'

export default function LoginPage() {

    const { handleSubmit, register, formState: { errors } } = useForm()
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/');
    }, [user])

    const submit = async ({ email, password }) => {
        await login(email, password)
    }
    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title="Login" />
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input
                        type="email"
                        label="Email"
                        {...register('email', {
                            required: true,
                            pattern: EMAIL,
                        })}
                        error={errors.email}
                    />

                    <Input
                        type="password"
                        label="Password"
                        {...register('password', {
                            required: true,
                        })}
                        error={errors.password}
                    />

                    <Button type="submit" text="Login" />

                    <div className={classes.register}>
                        New user? &nbsp;
                        <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
