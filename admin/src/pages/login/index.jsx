
import { Form, Input, message, notification } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { callLogin } from '../../services/api';
import { doLoginAction } from '../../redux/account/accountSlice';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const formItemLayout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
};
const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const acc = useSelector(state => state.account);
    useEffect(() => {
        if (acc.isAuthenticated) {
            if (acc?.user?.role === 'R4') {
                navigate('/admin')
            } else {
                navigate('/employee')
            }
        }
    }, [acc])
    const onFinish = async (values) => {
        const res = await callLogin(values);
        if (res.account) {
            message.success('Đăng nhập thành công');
            localStorage.setItem('access_token', res.accessToken);
            dispatch(doLoginAction(res.account));

            if (res.account.role == 'R4') navigate('/admin');
            else navigate('/employee');
        } else {
            message.error('Lỗi thông tin tài khoản');
        }

    };
    return (
        <div className='mx-auto mt-5 w-1/4'>
            <h2 className='font-medium text-2xl text-center'> Đăng nhập </h2>
            <Form
                name="basic"
                {...formItemLayout}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email !',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                >
                    <button className='w-full bg-main p-3 text-white mt-3'  >
                        Đăng nhập
                    </button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginPage