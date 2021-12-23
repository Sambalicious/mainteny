export type ComponentWithChildProps = React.PropsWithChildren<{ title?: string }>;




export interface TableHeader {
    text: string,
    id: number
}

export interface CoursesProps {
    Course: string,
    Lecturer: string
}


export interface TableBody {
    Email: string,
    Name: string,
    createdAt: string,
    updatedAt: string,
    UserId: string,
    Courses?: CoursesProps[]
}