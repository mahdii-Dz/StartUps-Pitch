
import { FormatDate } from "@/lib/utils"
import Link from "next/link"

function StartupCard({ item }) {
    const { _createdAt, views, author: { _id: authorId, name, image:profileImage }, title, category, _id, description, image } = item

    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup-card_date">
                    {FormatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path>
                    </svg>
                    <span className="text-16-medium">{views}</span>
                </div>
            </div>
            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${item.author?.id}`}>
                        <p className="text-16-medium line-clamp-1">
                            {name}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                </div>
                <Link href={`/user/${item.author?.id}`}>
                    <img src={profileImage} alt="placeholder" width={48} height={48} className="rounded-full" />
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">
                    {description}
                </p>
                <img src={image} alt="placeholder" className="startup-card_img" />
            </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <button className="startup-card_btn">
                    <Link href={`/startup/${_id}`}>
                        details
                    </Link>
                </button>
            </div>
        </li>
    )
}

export default StartupCard