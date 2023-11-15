import { useSelector } from 'react-redux';
import Unauthorized from '../components/notfound/unauthorized';

const RoleRoute = (props) => {
    const { isAuthenticated, user } = useSelector((state) => state.account);
    if (isAuthenticated && props.role.includes(user.role)) {
        return <>{props.children}</>;
    } else {
        return <div><Unauthorized /></div>;
    }
};
export default RoleRoute