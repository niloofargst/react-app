import { useEffect, useState } from 'react';
import { read, insert, update, remove } from '../services/apiService';

const Student = ({ match, history }) => {

    const [id] = useState(match.params.id);
    const [student, setStudent] = useState({
        _id: '0',
        firstName: '',
        lastName: '',
        yearOfBirth: 0,
        address: ''
    });
    const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(false);
    const [isLastNameEmpty, setIsLastNameEmpty] = useState(false);

    useEffect(() => {
        if (id !== '0') {
            read('students', id, data => {
                if (data) setStudent(data);
            });
        }
    }, [id])

    function changeHandler(e) {
        if (e.target.value && e.target.name === "firstName") {
            setIsFirstNameEmpty(false);
        }
        if (e.target.value && e.target.name === "lastName") {
            setIsLastNameEmpty(false);
        }
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }

    const back = () => history.push('/students');

    const save = () => {
        if (id === '0') {
            if (!student.firstName && !student.lastName) {
                setIsFirstNameEmpty(true)
                setIsLastNameEmpty(true);
                return;
            }
            if (!student.firstName) {
                setIsFirstNameEmpty(true);
                return;
            }
            if (!student.lastName) {
                setIsLastNameEmpty(true);
                return;
            }
            insert('students', student, data => {
                if (data) return history.push('/students');
                console.log("An error occured!");
            });
        } else {
            if (!student.firstName && !student.lastName) {
                setIsFirstNameEmpty(true)
                setIsLastNameEmpty(true);
                return;
            }
            if (!student.firstName) {
                setIsFirstNameEmpty(true);
                return;
            }
            if (!student.lastName) {
                setIsLastNameEmpty(true);
                return;
            }
            update('students', id, student, data => {
                if (data) return history.push('/students');
                console.log("An error occured!");
            });
        }
    }

    const removeStudent = () => {
        remove('students', id, data => {
            history.push('/students');
        })
    }

    return (
        <div className="container">
            <div className="form-container">
                <h2 className="form-title">Student</h2>
                <form className="form-input">
                    <div className="input-field">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={student.firstName}
                            onChange={changeHandler} />
                        {isFirstNameEmpty && <p className="error">This field is required!</p>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={student.lastName}
                            onChange={changeHandler}
                            required />
                        {isLastNameEmpty && <p className="error">This field is required!</p>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="yearOfBirth">Year of Birth:</label>
                        <input
                            className="year-input"
                            type="text"
                            name="yearOfBirth"
                            value={student.yearOfBirth}
                            onChange={changeHandler}
                            required />
                    </div>
                    <div className="input-field address-field">
                        <label htmlFor="address">Address:</label>
                        <input
                            className="address-input"
                            type="text"
                            name="address"
                            value={student.address}
                            onChange={changeHandler} />
                    </div>
                    <hr />
                    <div className="button-container">
                        <div className="left">
                            {id !== '0' && (<button type="button" onClick={removeStudent}>DELETE</button>)}
                        </div>

                        <div className="right">
                            <button type="button" onClick={back}>BACK</button>
                            <button type="button" onClick={save}>SAVE</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Student;