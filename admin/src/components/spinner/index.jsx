import { Spin} from 'antd'


function Spinner({size = 'large', children}) {
  return (
    <div style={{ height: "800px" }}>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Spin size={size} >
        {children}
      </Spin>
      </div>
    </div>
  )
}

export default Spinner