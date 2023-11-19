
import { Form, Input, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { callLogin } from '../../services/api';
import { doLoginAction } from '../../redux/account/accountSlice';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
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
            localStorage.setItem('access_token', res.accessToken);
            dispatch(doLoginAction(res.account));
            if (res.account.role == 'R4') navigate('/admin');
            else navigate('/employee');
        } else {
            messageApi.open({
                type: 'error',
                content: 'Lỗi thông tin tài khoản'
            });
        }

    };
    return (
        <>
            {contextHolder}
            <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-gray-300 bg-[url('https://static.thehoneycombers.com/wp-content/uploads/sites/2/2022/03/sydney-restaurants-woodcut-900x643.png')]">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <Form className="z-10 space-y-6 flex flex-col justify-center items-center
             w-2/3 h-2/3 py-10 bg-transparent shadow-md sm:w-1/2 sm:bg-white sm:bg-opacity-25"
                    onFinish={onFinish}
                    initialValues={{
                        remember: true
                    }}
                >
                    <h2 className="text-center text-2xl font-medium text-white mb-4">
                        ĐĂNG NHẬP
                    </h2>
                    <Form.Item
                        className='lg:w-1/2 md:w-3/4 xs:w-full'
                        name="email"
                        rules={[
                            {
                                required: true,
                                // min: 5,
                                message: 'Ít nhất 5 kí tự !',
                            },
                            {
                                type: 'email',
                                message: 'Vui lòng nhập đúng định dạng E-mail!',
                            }
                        ]}
                    >
                        <Input className='p-2 font-medium  focus:border-orange-500' placeholder='Tài khoản (email)' />
                    </Form.Item>

                    <Form.Item
                        className='lg:w-1/2 md:w-3/4 xs:w-full'
                        name="password"
                        rules={[
                            {
                                required: true,
                                min: 5,
                                message: 'Ít nhất 5 kí tự !',
                            }
                        ]}
                    >
                        <Input.Password className='p-2 font-medium focus:border-orange-500' placeholder='Mật khẩu' />
                    </Form.Item>


                    <button className='lg:w-1/2 md:w-3/4 xs:w-full rounded bg-main p-2 text-white mt-3 font-medium text-base'>
                        Đăng nhập
                    </button>
                </Form>

            </div ></>
    )
}

export default LoginPage