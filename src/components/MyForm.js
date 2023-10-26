import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';

function MyForm() {
    const form = useForm();
    const { register, control, handleSubmit, formState } = form
    const { errors } = formState

    const onSubmit = (data) => {
        console.log("Form submited!", data);
    }
    return (
        <div className='my-form'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-control'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username'
                        {...register('username', {
                            required: {
                                value: true,
                                message: "Username is required!"
                            }
                        })} />
                    <p className='error'>{errors.username?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' id='email' {...register('email', {
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Invalid email provided!"
                        },
                        validate: {
                            notAdmin: (fieldValue => (fieldValue !== 'admin@example.com' || "Please enter a different email!")),
                            norBlackListed: (fieldValue => (!fieldValue.endsWith('baddomain.com') || "This domain is not supported!"))
                        }
                    })} />
                    <p className='error'>{errors.email?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor='channel'>Channel</label>
                    <input type='text' id='channel' {...register('channel', {
                        required: {
                            value: true,
                            message: "Channel name is required!"
                        }
                    })} />
                    <p className='error'>{errors.channel?.message}</p>
                </div>

                <br />
                <button type='submit'>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default MyForm