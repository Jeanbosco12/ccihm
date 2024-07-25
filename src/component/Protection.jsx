import { useNavigate } from 'react-router-dom';

function Protection() {
    var navigate = useNavigate()
    const user = sessionStorage.getItem('user');
        if (user===null) {
            navigate('/');
        }
}

export default Protection;