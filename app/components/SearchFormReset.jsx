"use client"

import Link from "next/link"

function SearchFormReset() {
    const reset = () => {
        const form = document.querySelector('.search-form')

        if (form) form.reset()
    }
    return (
        <button type='reset' onClick={reset}>
            <Link href='/' className="search-btn text-white ">
                <i className='bx bx-x'></i>
            </Link>
        </button>
    )
}

export default SearchFormReset