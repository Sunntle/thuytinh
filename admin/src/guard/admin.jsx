import { useSelector } from 'react-redux';
import NotFound from '../components/notfound';
import { useEffect } from 'react';

const RoleRoute = (props) => {
    const { isAuthenticated, user } = useSelector((state) => state.account);
    if (isAuthenticated && props.role.includes(user.role)) {
        return <>{props.children}</>;
    } else {
        return <div><NotFound /></div>;
    }
};
export default RoleRoute