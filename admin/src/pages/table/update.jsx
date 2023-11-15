
import { Form, Input, Modal, QRCode, Select } from 'antd';
import React, { memo, useCallback, useState } from 'react'
import ButtonComponents from '../../components/button';
import { useEffect } from 'react';
import { url } from '../../utils/constant';
import { updateTables } from '../../services/api';
const UpdateTable = ({ options, setDataUpdate, fetchData, dataUpdate, isModalOpenUpdate, setIsModalOpenUpdate, messageApi }) => {

    const [updateForm] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            const data = { ...dataUpdate, qr_code: dataUpdate.qr_code.split('-')[1] }
            updateForm.setFieldsValue(data);
        }
    }, [dataUpdate])
    const handleCancel = useCallback(() => {
        setIsModalOpenUpdate(false);
        setDataUpdate(null)
        updateForm.resetFields();
    }, [dataUpdate, isModalOpenUpdate])
    const onFinish = async (values) => {
        values.qr_code = url + values.qr_code;
        let { success, data } = await updateTables(values);
        if (success) {
            fetchData();
            handleCancel();
        }
        messageApi.open({ type: success ? 'success' : "error", content: data });
    };
    return (
        <>
            <Modal title="Cập nhật" open={isModalOpenUpdate} onCancel={handleCancel} footer={null}>
                <Form
                    form={updateForm}
                    name="update"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="id"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên bàn"
                        name="name_table"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên bàn',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Vị trí"
                        name="position"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên vị trí',
                        }]}
                    >
                        <Select options={options} />

                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="status_table"
                        rules={[{
                            required: true,
                            message: 'Vui lòng trạng thái bàn',
                        }]}
                    >
                        <Select options={[
                            { label: "Trống", value: 0 },
                            { label: "Bận", value: 1 }]}
                        />

                    </Form.Item>
                    <Form.Item
                        label={`Mã quét nhanh`}
                        name="qr_code"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập url',
                        }]}
                    >
                        <Input
                            placeholder={`Vd: 1`}
                        />
                    </Form.Item>
                    <Form.Item className='flex justify-end'>
                        <ButtonComponents className="border-borderSecondaryColor text-main" htmlType={"submit"}
                            content={"Cập nhật"} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default memo(UpdateTable)