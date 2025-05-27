import Form from 'next/form'
import SearchFormReset from './SearchFormReset';

function SearchForm({query}) {
    return (
        <>
            <Form action={'/'} scroll={false} className='search-form'>
                <input
                    name='query'
                    defaultValue={query}
                    className='search-input'
                    placeholder='Search StartUps'
                />
                <div className='flex gap-2'>
                    {query && (<SearchFormReset />)}
                    <button type='submit' className='search-btn text-white'>
                        <i className='bx bx-search'></i>
                    </button>
                </div>
            </Form>
        </>
    )
}

export default SearchForm