import { Link } from 'react-router-dom';

const Navigator = () => {
    return (
        <div className='navigator'>
            <Link className="link" to='/'>Home</Link>
            &nbsp; |&nbsp;
            <Link className="link" to='/courses'>Courses</Link>
            &nbsp; |&nbsp;
            <Link className="link" to='/students'>Students</Link>
        </div>
    )
}

export default Navigator;