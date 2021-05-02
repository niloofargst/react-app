import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { list } from '../services/apiService';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        list('courses', data => {
            setCourses(data);
        })
    }, []);

    return (
        <div className="container">
            <h1>Courses</h1>
            <table>
                <thead>
                    <tr>
                        <th>Course name</th>
                        <th>Points</th>
                        <th><Link className="link" to='/courses/0'>Add new</Link></th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => {
                        return (
                            <tr key={course._id}>
                                <td>{course.name}</td>
                                <td>{course.points}</td>
                                <td>
                                    <Link className="link" to={`/courses/${course._id}`}>Edit</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Courses;