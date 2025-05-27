"use client"
import { CreatePitch } from '@/lib/actions'
import { FormSchema } from '@/lib/Validation'
import MDEditor from '@uiw/react-md-editor'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useActionState, useState } from 'react'
import { z } from 'zod'

function StartupForm() {
    const [errors, setErrors] = useState({})
    const [pitch, setPitch] = useState("")
    const router = useRouter()

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValues = {
                title: formData.get('title'),
                description: formData.get('description'),
                category: formData.get('category'),
                link: formData.get('link'),
                pitch,
            }
            await FormSchema.parseAsync(formValues)
            const result = await CreatePitch(prevState,formData,pitch)
            if(result.status == "SUCCESS"){
                router.push(`/startup/${result._id}`)
            }
            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors
                setErrors(fieldErrors)
                return { ...prevState, error: 'Validation failed', status: 'ERROR' };
            }
            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status:'ERROR',
            }
        }
    }
    const [state, formAction, isPending] = useActionState(
        handleFormSubmit,
        {
            error: '',
            status: 'INITIAL',
        }
    )

    return (
        <form action={formAction} className='max-w-2xl mx-auto bg-white my-10 space-y-8 px-6 '>
            <div>
                <label htmlFor="title" className='startup-form_label'>title</label>
                <input
                    type="text"
                    id='title'
                    name='title'
                    className='startup-form_input'
                    required
                    placeholder='startup Title'
                />
                {errors.title && <p className='startup-form_error'>{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className='startup-form_label'>description</label>
                <textarea
                    id='description'
                    name='description'
                    className='startup-form_textarea w-full'
                    required
                    autoCapitalize='off'
                    placeholder='startup description'
                />
                {errors.description && <p className='startup-form_error'>{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className='startup-form_label'>category</label>
                <input
                    id='category'
                    name='category'
                    className='startup-form_input'
                    required
                    placeholder='startup category'
                />
                {errors.category && <p className='startup-form_error'>{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className='startup-form_label'>Image URL</label>
                <input
                    id='link'
                    name='link'
                    className='startup-form_input'
                    required
                    placeholder='startup image url'
                />
                {errors.link && <p className='startup-form_error'>{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value)}
                    id='pitch'
                    preview='edit'
                    height={300}
                    autoCapitalize='off'
                    className='rounded-3xl overflow-hidden'
                    textareaProps={{
                        placeholder:
                            'briefly describe your idea and what problem it solves'
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />
                {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
            </div>
            <button type='submit' className='startup-form_btn' disabled={isPending}>
                {isPending ? 'submitting...' : 'Submit Your Pitch'}
                <Send className='size-6 ml-2' />
            </button>
        </form>
    )
}

export default StartupForm