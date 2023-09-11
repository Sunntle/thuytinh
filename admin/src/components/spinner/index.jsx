import { Spin } from 'antd'


function Spinner() {
  return (
    <div style={{ height: "800px" }}>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Spin size="large" />
      </div>
    </div>
  )
}

export default Spinner