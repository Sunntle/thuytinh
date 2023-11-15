
import avtDefault from "../../assets/images/avtDefault.png";
import { useSelector } from "react-redux";

const Header = () => {
  const customerName = useSelector((state) => state.customerName);
  return (
    <div
      className={`tracking-wide w-full h-20 z-40 absolute  top-0 lg:hidden bg-primary rounded-b-3xl drop-shadow-md px-6 text-white flex items-center ${
        customerName ? "justify-between" : "justify-center"
      }`}
    >
      {customerName.tables.length > 0 && customerName.name.length > 0 ? (
        <>
          <div className="flex flex-col">
            <span className="text-white text-lg">
              Xin chào, <span className="font-medium">{customerName.name}</span>
            </span>
            <span className="text-base text-[#FFE6C7]">
               {customerName.tables[0] !== 0 && customerName.tables.length > 0 ? (`Bạn đang ngồi ${customerName.tables[0]}`): "Bạn chưa chọn bàn"}
            </span>
          </div>
          <div className="w-12 h-12 border-2 rounded-full border-white">
            <img className="w-full h-full" src={avtDefault} alt="" />
          </div>
        </>
      ) : (
        <>
          <span className="font-bold text-base lg:text-xl">
            Vui lòng quét mã hoặc chọn vào phần chọn bàn để đặt món
          </span>
        </>
      )}
    </div>
  );
};

export default Header;
