import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';

function MyForm() {
    const form = useForm({
        defaultValues: async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
            const response_data = await response.json();
            return {
                username: response_data.name,
                email: response_data.email,
                channel: response_data.website,
                social: {
                    twitter: "",
                    facebook: "",
                },
                phoneNumbers: ["", ""],
                phNumbers: [{ number: "" }],
            }
        }
    });
    const { register, control, handleSubmit, formState } = form
    const { errors } = formState

    const { fields, append, remove } = useFieldArray({
        name: "phNumbers",
        control: control,
    })

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

                <div className='form-control'>
                    <label htmlFor='primary-phone'>Primary phone</label>
                    <input id='primary-phone' type='text' {...register('phoneNumbers[0]', {
                        required: {
                            value: true,
                            message: "Primary phone number is required!"
                        }
                    })} />
                    {errors.phoneNumbers && <p className='error'>{errors?.phoneNumbers[0]?.message}</p>}
                </div>

                <div className='form-control'>
                    <label htmlFor='secondary-phone'>Secondary phone</label>
                    <input id='secondary-phone' type='text' {...register('phoneNumbers[1]', {
                        required: {
                            value: true,
                            message: "Secondary phone number is required!"
                        }
                    })} />
                    {errors.phoneNumbers && <p className='error'>{errors?.phoneNumbers[1]?.message}</p>}
                </div>

                <div className='form-control'>
                    <label htmlFor='twitter'>Twitter</label>
                    <input id='twitter' type='text' {...register('social.twitter', {
                        required: {
                            value: true,
                            message: "Twitter handler is required!"
                        }
                    })} />
                    <p className='error'>{errors.social?.twitter?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor='facebook'>Facebook</label>
                    <input id='facebook' type='text' {...register('social.facebook', {
                        required: {
                            value: true,
                            message: "Facebook handaler is required!"
                        }
                    })} />
                    <p className='error'>{errors.social?.facebook?.message}</p>
                </div>

                <div className='form-control'>
                    <label>List of phone numbers</label>
                    <div>
                        {fields.map((field, index) => (
                            <div className='form-control' key={field.id}>
                                <input type='text' {...register(`phNumbers.${index}.number`, {
                                    required: {
                                        value: true,
                                        message: "Please add a phone number or else remove the field!"
                                    }
                                })} />
                                {index > 0 && <button type='button' onClick={() => remove(index)}>-</button>}
                                {errors.phNumbers && <p className='error'>{errors.phNumbers[index]?.number?.message}</p>}
                            </div>
                        ))}
                    </div>
                    <button type='button' onClick={() => append({ number: "" })}>+</button>
                </div>

                <br />
                <button type='submit'>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default MyForm