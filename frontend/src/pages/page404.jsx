import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200">
            <div className="text-center max-w-md bg-white/90 rounded-2xl shadow-xl p-10 flex flex-col items-center">
                <span className="text-[120px] font-extrabold leading-none text-indigo-500 drop-shadow mb-2 select-none">404</span>
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Không tìm thấy trang</h1>
                <p className="text-gray-600 mb-6">
                    Trang bạn truy cập không tồn tại hoặc đã bị di chuyển.<br />
                    Vui lòng kiểm tra lại địa chỉ hoặc quay về trang chủ.
                </p>
                <Link to="/">
                    <Button type="primary" size="large" className="!rounded-full !px-8">
                        Quay về trang chủ
                    </Button>
                </Link>
            </div>
        </div>
    );
}
