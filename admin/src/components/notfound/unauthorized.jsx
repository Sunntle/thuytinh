
import { Button, Result } from 'antd';
import {  useNavigate } from 'react-router-dom';
const Unauthorized = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title="Bạn không có quyền truy cập"
            subTitle="Cần quyền admin để vào đường dẫn này"
            extra={<Button type="primary" onClick={() => navigate(-1)}>Back Login</Button>}
        />
    )
}

export default Unauthorized