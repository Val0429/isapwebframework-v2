import { RegisterBaseLanguage } from './core';
import { IBaseLang } from './core';

@RegisterBaseLanguage('zh-TW', '正體中文')
export default class LangObject implements IBaseLang {
    wb_Common = '一般';
    wb_NextPage = '下一頁';
    wb_PreviousPage = '上一頁';
    wb_Search = '搜尋';
    wb_Browse = '瀏覽';
    wb_NextStep = "下一步";
    wb_PreviousStep = "前一步";
    wb_Done = '完成';

    wb_Login = '登入';
    wb_Username = "使用者名稱";
    wb_Password = "密碼";

    wb_Add = '新增';
    wb_Delete = '刪除';
    wb_Edit = '修改';
    wb_Export = '匯出';
    wb_Import = '匯入';
    wb_Info = '資訊';
    wb_View = '檢視';
    wb_More = '更多';

    wb_Submit = '確定';
    wb_Reset = '重置';

    wb_Yes = '是';
    wb_No = '否';

    wb_Confirm = '確定';
    wb_Cancel = '取消';
    wb_Close = '關閉';
    wb_Back = '返回';

    mb_VersionLimitation = '版本限制';
    mb_VersionNotEnough = "ServerFramework 版本需求應大於 v{version}。";
    mb_PermissionDenied = "權限不足";
    mb_PermissionDeniedLong = "您的權限無法訪問此區域。";
    mb_ContentInvalid = "內容不存在";

    mb_ShowCurrentEntries = '顯示第 {curStart} 至 {curEnd} 筆，共 {total} 筆';
    mb_ShowEntries = '顯示 {0} 筆資料';
    mb_PleaseSelect = '請選擇';
    mb_ConfirmDelete = '是否確定刪除?';

    mb_0 = "請求失敗";
    mb_0_message = "伺服器沒有回應。一般發生於ip / port錯誤，或是伺服器離線。";
    mb_400 = "錯誤請求";
    mb_400_message = "<b>錯誤代碼 {0}</b> - 客戶端錯誤，請檢查輸入資訊。";
    mb_401 = "未認證";
    mb_401_message = "<b>錯誤代碼 {0}</b> - 當前請求需要用戶認證，或是用戶認證已失敗。";
    mb_404 = "請求不存在";
    mb_404_message = "<b>錯誤代碼 {0}</b> - 此資源無法存取。";
    mb_500 = "內部伺服器錯誤";
    mb_500_message = "<b>錯誤代碼 {0}</b> - 未知的伺服器錯誤。";
}
