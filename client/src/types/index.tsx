export type ComponentWithChildProps = React.PropsWithChildren<{ title?: string }>;




export interface TableHeader {
    text: string,
    id: number
}

export interface CoursesProps {
    Course: string,
    Lecturer: string
}


export interface StudentsProps {
    Email?: string,
    Name?: string,
    createdAt: string,
    updatedAt: string,
    UserId?: string,
    Courses?: CoursesProps[]
}


export interface CourseProps {
    Course?: string,
    Lecturer?: string,
    id?: number,
    createdAt: string,
    updatedAt: string
}