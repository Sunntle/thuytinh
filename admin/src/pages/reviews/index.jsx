import { UpCircleFilled } from "@ant-design/icons"
import ColumnChart from "../../components/chart/column-chart"
import {Col, Row} from "antd"
import SearchComponent from "../../components/search";

function ReviewsPage() {
  return (
    <div className="my-7 px-5"><div className="p-5 mb-6 rounded-md border border-solid border-gray-300">
    <Row align={"middle"} justify={"center"}>
        <Col sm={24} md={8} >
        <h3 className="text-lg lg:text-2xl font-bold text-gray-700 mb-3">Phản hồi từ khách hàng</h3>
        <p className="text-gray-500 mb-6">12:00, 20-01-2023</p>
        <h4 className="lg:text-xl text-gray-700 mb-3 font-semibold">Trong tháng {new Date().getMonth() +1}</h4>
        <span className="text-3xl font-bold text-gray-700">3620</span><span className="mx-3">lượt đánh giá</span>
        <span style={{ color: "#52c41a" }} className="font-bold text-xl inline-flex items-center gap-x-1.5 my-3">
                    +15% <UpCircleFilled className="text-2xl" style={{ color: "#52c41a" }} />
        </span>
        </Col>
    <Col sm={24} md={16}>
    <ColumnChart/></Col>
    </Row>
    </div>
    <div className="mb-6 p-5 rounded-md border border-solid border-gray-300">
    <h3 className="text-lg lg:text-2xl font-bold text-gray-700 mb-3">Đánh giá gần đây</h3>
    <SearchComponent className="max-w-md"/>
    <Row gutter={[30,30]} className="my-6">
        <Col xs={8}>
        <div className="p-3 rounded-md border border-solid border-gray-300">
            <div className="mb-5 flex items-center gap-x-5 border-b border-b-gray-50">
                <div><img className="w-[50px] h-[50px] object-cover rounded-lg" src="https://fooddesk.dexignlab.com/react/demo/static/media/pic-1.6923efd54fb9b8adcb78.jpg" alt="" /></div>
                <div>
                <h4 className="lg:text-xl text-gray-700 mb-3 font-semibold">Ruby Roben</h4>
                    <p className="text-gray-500">12:00, 20-01-2023</p>
                </div>
            </div>
            <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quaerat omnis voluptatum laboriosam velit totam, repellendus labore, dolorem est nobis sed quam amet beatae provident earum. Ipsam perspiciatis non omnis.</p>
            </div>
        </Col>
        <Col xs={8}>
        <div className="p-3 rounded-md border border-solid border-gray-300">
            <div className="mb-5 flex items-center gap-x-5 border-b border-b-gray-50">
                <div><img className="w-[50px] h-[50px] object-cover rounded-lg" src="https://fooddesk.dexignlab.com/react/demo/static/media/pic-1.6923efd54fb9b8adcb78.jpg" alt="" /></div>
                <div>
                <h4 className="lg:text-xl text-gray-700 mb-3 font-semibold">Ruby Roben</h4>
                    <p className="text-gray-500">12:00, 20-01-2023</p>
                </div>
            </div>
            <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quaerat omnis voluptatum laboriosam velit totam, repellendus labore, dolorem est nobis sed quam amet beatae provident earum. Ipsam perspiciatis non omnis.</p>
            </div>
        </Col>
        <Col xs={8}>
        <div className="p-3 rounded-md border border-solid border-gray-300">
            <div className="mb-5 flex items-center gap-x-5 border-b border-b-gray-50">
                <div><img className="w-[50px] h-[50px] object-cover rounded-lg" src="https://fooddesk.dexignlab.com/react/demo/static/media/pic-1.6923efd54fb9b8adcb78.jpg" alt="" /></div>
                <div>
                <h4 className="lg:text-xl text-gray-700 mb-3 font-semibold">Ruby Roben</h4>
                    <p className="text-gray-500">12:00, 20-01-2023</p>
                </div>
            </div>
            <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quaerat omnis voluptatum laboriosam velit totam, repellendus labore, dolorem est nobis sed quam amet beatae provident earum. Ipsam perspiciatis non omnis.</p>
            </div>
        </Col>
        <Col xs={8}>
        <div className="p-3 rounded-md border border-solid border-gray-300">
            <div className="mb-5 flex items-center gap-x-5 border-b border-b-gray-50">
                <div><img className="w-[50px] h-[50px] object-cover rounded-lg" src="https://fooddesk.dexignlab.com/react/demo/static/media/pic-1.6923efd54fb9b8adcb78.jpg" alt="" /></div>
                <div>
                <h4 className="lg:text-xl text-gray-700 mb-3 font-semibold">Ruby Roben</h4>
                    <p className="text-gray-500">12:00, 20-01-2023</p>
                </div>
            </div>
            <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quaerat omnis voluptatum laboriosam velit totam, repellendus labore, dolorem est nobis sed quam amet beatae provident earum. Ipsam perspiciatis non omnis.</p>
            </div>
        </Col>
    </Row>
    </div>
    </div>
  )
}

export default ReviewsPage