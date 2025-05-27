
export function FormatViews({views}) {

    return (
        <>
            {views == 0 ?
                `${views} views`
                : views == 1 ?
                    `${views} view`
                    : `${views} views`
            }
        </>
    )
}
