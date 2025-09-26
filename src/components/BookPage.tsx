import { useParams } from "react-router-dom";
import { useBookContext } from "../hooks/useBooksContext";
import { Category } from "../models/Book";


interface ChipProps {
    label: string;
}

const Chip = ({ label }: ChipProps) => {
    return <div className='chip'>{label}</div>
}

const Categories = (categories: Category[]) => {
    console.log(" categories", categories)
    const cats = categories.map((category: Category) => {
        return <Chip label={category.categoryName} />
    })
    return <div className="chip-labels">{cats}</div>
}


export function BookPage() {
    const { id } = useParams();
    const { books } = useBookContext();
    const book = books.find((book) => book.id === Number(id));
    if (!book) return <div>RIP IN PIECES</div>
    console.log(" book ", book)
    const { thumbnail, title, description, author, isbn, categories } = book;

    const cats = Categories(categories ?? []);
    console.log("CATS: ", cats)

    return <div className="book-page-container">
        <div className="book-page-header">
            <div className="book-page-img">
                <img src={`data:image/jpeg;base64,${book.thumbnail}`} />
            </div>
            <div className="book-page-header-wrapper">
                <h1 className="np">{title}</h1>
                <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit excepturi quia laborum labore itaque? Obcaecati iusto dolorum, temporibus exercitationem suscipit excepturi qui, quae blanditiis delectus ex est impedit illo commodi eveniet dolor quibusdam expedita numquam magnam voluptatum fugit necessitatibus aspernatur. Provident amet molestiae architecto? Enim saepe temporibus nesciunt consequatur est repudiandae iure tenetur sint neque porro. Voluptas quia reprehenderit excepturi consequatur nihil magnam aliquam!</p>
            </div>
        </div>
        <div className='book-page-details-container'>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime, quia ipsa animi, libero similique perspiciatis ipsum, reiciendis totam assumenda omnis culpa? Vel ad aut recusandae architecto tempore? Commodi, tempore?
            </p>
            {cats && cats}
        </div>
    </div>
}