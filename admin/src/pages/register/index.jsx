
import { Form, Input } from 'antd';
import ButtonComponents from '../../components/button';

const RegisterPage = ({handleFinish}) => {
    const [form] = Form.useForm();
    const onFinish = async(values) => {
        await handleFinish(values)
        form.resetFields()
    };
    return (
      <div className="py-2">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                min: 5,
                message: "Ít nhất 5 kí tự !",
              },
            ]}
            validateTrigger={true}
          >
            <Input
              className="p-2 font-medium  focus:border-orange-500"
              placeholder="Tên người dùng"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng E-mail!",
              },
            ]}
            validateTrigger={true}
          >
            <Input
              className="p-2 font-medium  focus:border-orange-500"
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                min: 5,
                message: "Ít nhất 5 kí tự !",
              },
            ]}
            validateTrigger={true}
          >
            <Input.Password
              className="p-2 font-medium focus:border-orange-500"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <div className='text-end'>
          <ButtonComponents
            className={"bg-secondaryColor text-white border-borderSecondaryColor"}
            content={"Thêm mới"}
            type="submit"
            key="submit"
            htmlType="submit"
          />
          </div>
        </Form>
      </div>
    );
}

export default RegisterPage