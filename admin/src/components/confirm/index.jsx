import { Popconfirm } from "antd"


const ConfirmComponent = ({
    children, confirm, okText, cancelText,
    title, description, icon
}) => {
    return (
        <Popconfirm
            icon={icon || <></>}
            title={title}
            description={description || ''}
            onConfirm={confirm}
            okText={okText || "Xác nhận"}
            cancelText={cancelText || "Hủy"}
            okButtonProps={{
                danger: true
            }}
        >
            <span className='bg-amber-400 px-4 rounded-md py-2 ms-2 text-white hover:bg-orange-200'>{children}</span>
        </Popconfirm>
    )
}

export default ConfirmComponent