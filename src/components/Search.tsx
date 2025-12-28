interface SearchProps {
    onChange: (keyWord: string) => void;
    keyword: string;
}

export default function Search({ onChange, keyword }: SearchProps) {
    return <input placeholder="Search for book..." onChange={(value) => onChange(value.target.value)} value={keyword} />
}