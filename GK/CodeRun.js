import { MyContextControllerProvider } from "./store/index";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./routers/Router";
import { LogBox } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';

const CodeRun = () => {

    /* useEffect(() => {
        const initData = async () => {
            const loaiMonAnRef = firestore().collection("LoaiMonAn");
            const monAnRef = firestore().collection("MonAn");

            const snapshotLoai = await loaiMonAnRef.get();
            if (!snapshotLoai.empty) {
                console.log("Dữ liệu đã tồn tại, không thêm lại.");
                return;
            }

            const cacQuocGia = [
                "Việt Nam", "Trung Quốc", "Hàn Quốc", "Nhật Bản", "Thái Lan", "Ý"
            ];

            const quocGiaDocs = {};
            for (const quocGia of cacQuocGia) {
                const docRef = await loaiMonAnRef.add({ tenLoai: quocGia });
                quocGiaDocs[quocGia] = docRef.id;
            }

            const duLieuMonAn = {
                "Việt Nam": [
                    { tenMon: "Phở Bò", gia: 45000, hinh: "https://cdn.tgdd.vn/Files/2021/06/23/1363337/..." },
                    { tenMon: "Bánh Mì Thịt", gia: 20000, hinh: "https://cdn.tgdd.vn/2021/05/CookRecipeThumb/..." }
                ],
                "Trung Quốc": [
                    { tenMon: "Há Cảo", gia: 30000, hinh: "https://cdn.tgdd.vn/Files/2020/07/28/1272573/..." }
                ],
                "Hàn Quốc": [
                    { tenMon: "Kimchi", gia: 25000, hinh: "https://cdn.tgdd.vn/Files/2021/01/08/1319133/..." }
                ],
                "Nhật Bản": [
                    { tenMon: "Sushi", gia: 80000, hinh: "https://cdn.tgdd.vn/2021/03/CookProduct/..." }
                ],
                "Thái Lan": [
                    { tenMon: "Pad Thái", gia: 60000, hinh: "https://cdn.tgdd.vn/Files/2021/07/21/1371341/..." }
                ],
                "Ý": [
                    { tenMon: "Mì Ý Spaghetti", gia: 70000, hinh: "https://cdn.tgdd.vn/2021/02/CookRecipeThumb/..." }
                ]
            };

            for (const quocGia of cacQuocGia) {
                const monList = duLieuMonAn[quocGia] || [];
                for (const mon of monList) {
                    await monAnRef.add({
                        ...mon,
                        loaiMonAnId: quocGiaDocs[quocGia],
                    });
                }
            }

            console.log("✅ Đã thêm dữ liệu mẫu vào Firestore thành công!");
        };

        initData();
    }, []); */

    return (
        <PaperProvider>
            <MyContextControllerProvider>
                <NavigationContainer>
                    <Router />
                </NavigationContainer>
            </MyContextControllerProvider>
        </PaperProvider>
    );
};

export default CodeRun;
