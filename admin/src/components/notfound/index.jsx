
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <Result
            status="404"
            title="Yêu cầu tài khoản đăng nhập"
            subTitle="Xin lỗi bạn không đủ đẳng cấp"
            extra={<Link to='/'><Button type="primary">Back Login</Button></Link>}
        />
    )
}

export default NotFound