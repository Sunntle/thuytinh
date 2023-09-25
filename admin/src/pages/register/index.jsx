
import { Divider, Form, Input, message, notification } from 'antd';
import { callRegister } from '../../services/api';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        const { success, mes } = await callRegister(values);
        messageApi.open({
            type: success ? 'success' : 'warning',
            content: mes ? mes : 'Đăng kí thành công'
        });
        form.resetFields()
    };
    return (<div className="relative flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-gray-300 bg-[url('https://static.thehoneycombers.com/wp-content/uploads/sites/2/2022/03/sydney-restaurants-woodcut-900x643.png')]">
        {contextHolder}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <Form
            form={form}
            name='register'
            className="z-10 space-y-6 flex flex-col justify-center items-center
             w-2/3 h-2/3 py-10 bg-transparent shadow-md sm:w-1/2 sm:bg-white sm:bg-opacity-25"
            onFinish={onFinish}
        >
            <h2 className="text-center text-2xl font-medium text-white mb-4">
                Đăng kí
            </h2>
            <Form.Item
                className='lg:w-1/2 md:w-3/4 xs:w-full'
                name="name"
                rules={[
                    {
                        required: true,
                        min: 5,
                        message: 'Ít nhất 5 kí tự !',
                    }
                ]}
                validateTrigger={true}
            >
                <Input className='p-2 font-medium  focus:border-orange-500' placeholder='Tên đăng nhập' />
            </Form.Item>
            <Form.Item
                className='lg:w-1/2 md:w-3/4 xs:w-full'
                name="email"
                rules={[
                    {
                        required: true,
                        min: 5,
                        message: 'Ít nhất 5 kí tự !',
                    },
                    {
                        type: 'email',
                        message: 'Vui lòng nhập đúng định dạng E-mail!',
                    },

                ]}
                validateTrigger={true}
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
                validateTrigger={true}
            >
                <Input.Password className='p-2 font-medium focus:border-orange-500' placeholder='Mật khẩu' />
            </Form.Item>


            <button className='lg:w-1/2 md:w-3/4 xs:w-full rounded bg-main p-2 text-white mt-3 font-medium text-base'>
                Đăng kí
            </button>
            <Divider />
            <div className='text-white cursor-pointer' onClick={() => navigate('/')}>Đăng nhập</div>
        </Form>

    </div >)
}

export default RegisterPage