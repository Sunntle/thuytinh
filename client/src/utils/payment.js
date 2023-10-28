export const checkErrorCode = (code) => {
  if (code === "00") {
    return true;
  } else {
    switch (code) {
      case "09": {
        return {
          message:
            "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
        };
      }
      case "10": {
        return {
          message:
            "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
        };
      }
      case "11": {
        return {
          message:
            "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
        };
      }
      case "12": {
        return {
          message:
            "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
        };
      }
      case "13": {
        return {
          message:
            "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.",
        };
      }
      case "24": {
        return {
          message: "Giao dịch không thành công do: Khách hàng hủy giao dịch",
        };
      }
      case "51": {
        return {
          message:
            "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
        };
      }
      case "65": {
        return {
          message:
            "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
        };
      }
      case "75": {
        return {
          message: "Ngân hàng thanh toán đang bảo trì.",
        };
      }
      case "79": {
        return {
          message: "Ngân hàng thanh toán đang bảo trì.",
        };
      }
      case "99": {
        return {
          message: "Các lỗi khác",
        };
      }
    }
  }
};