// import { Response } from "express";

export type ComponentWithChildProps = React.PropsWithChildren<{ title?: string }>;




export interface TableHeader {
    text: string,
    id: number
}



export interface StudentsProps {
    Email?: string,
    Name?: string,
    createdAt: string,
    updatedAt: string,
    UserId?: string,
    Courses?: CourseProps[]
}


export interface CourseProps {
    Course?: string,
    Lecturer?: string,
    id: number,
    createdAt: string,
    updatedAt: string
}


export class ResponseError extends Error {
    response?: Response
}