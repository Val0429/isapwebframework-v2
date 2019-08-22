import { RegisterBaseLanguage } from './core';
import { IBaseLang } from './core';

@RegisterBaseLanguage('zh-TW', '正體中文')
export default class LangObject implements IBaseLang {
    wb_Common = '一般';
    wb_NextPage = '下一頁';
    wb_PreviousPage = '上一頁';
    wb_Search = '搜尋';
    wb_Browse = '瀏覽';
    wb_NextStep = '下一步';
    wb_PreviousStep = '前一步';
    wb_Done = '完成';

    wb_Login = '登入';
    wb_Username = '使用者名稱';
    wb_Password = '密碼';

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

    mb_FormMultipleClickToAdd = '點擊來新增資料';

    mb_VersionLimitation = '版本限制';
    mb_VersionNotEnough = 'ServerFramework 版本需求應大於 v{version}。';
    mb_PermissionDenied = '權限不足';
    mb_PermissionDeniedLong = '您的權限無法訪問此區域。';
    mb_ContentInvalid = '內容不存在';

    mb_ShowCurrentEntries = '顯示第 {curStart} 至 {curEnd} 筆，共 {total} 筆';
    mb_ShowEntries = '顯示 {0} 筆資料';
    mb_PleaseSelect = '請選擇';
    mb_ConfirmDelete = '是否確定刪除?';

    mb_0 = '請求失敗';
    mb_0_message = '伺服器沒有回應。一般發生於ip / port錯誤，或是伺服器離線。';
    mb_400 = '錯誤請求';
    mb_400_message = '<b>錯誤代碼 {0}</b> - 客戶端錯誤，請檢查輸入資訊。';
    mb_401 = '未認證';
    mb_401_message = '<b>錯誤代碼 {0}</b> - 當前請求需要用戶認證，或是用戶認證已失敗。';
    mb_404 = '請求不存在';
    mb_404_message = '<b>錯誤代碼 {0}</b> - 此資源無法存取。';
    mb_500 = '內部伺服器錯誤';
    mb_500_message = '<b>錯誤代碼 {0}</b> - 未知的伺服器錯誤。';

    // date time
    mb_DateTime_ShortWeekDay0 = '週日';
    mb_DateTime_ShortWeekDay1 = '週一';
    mb_DateTime_ShortWeekDay2 = '週二';
    mb_DateTime_ShortWeekDay3 = '週三';
    mb_DateTime_ShortWeekDay4 = '週四';
    mb_DateTime_ShortWeekDay5 = '週五';
    mb_DateTime_ShortWeekDay6 = '週六';

    mb_DateTime_NormalWeekDay0 = '禮拜天';
    mb_DateTime_NormalWeekDay1 = '禮拜一';
    mb_DateTime_NormalWeekDay2 = '禮拜二';
    mb_DateTime_NormalWeekDay3 = '禮拜三';
    mb_DateTime_NormalWeekDay4 = '禮拜四';
    mb_DateTime_NormalWeekDay5 = '禮拜五';
    mb_DateTime_NormalWeekDay6 = '禮拜六';

    mb_DateTime_ShortMonth01 = '一月';
    mb_DateTime_ShortMonth02 = '二月';
    mb_DateTime_ShortMonth03 = '三月';
    mb_DateTime_ShortMonth04 = '四月';
    mb_DateTime_ShortMonth05 = '五月';
    mb_DateTime_ShortMonth06 = '六月';
    mb_DateTime_ShortMonth07 = '七月';
    mb_DateTime_ShortMonth08 = '八月';
    mb_DateTime_ShortMonth09 = '九月';
    mb_DateTime_ShortMonth10 = '十月';
    mb_DateTime_ShortMonth11 = '十一月';
    mb_DateTime_ShortMonth12 = '十二月';

    mb_DateTime_NormalMonth01 = '一月';
    mb_DateTime_NormalMonth02 = '二月';
    mb_DateTime_NormalMonth03 = '三月';
    mb_DateTime_NormalMonth04 = '四月';
    mb_DateTime_NormalMonth05 = '五月';
    mb_DateTime_NormalMonth06 = '六月';
    mb_DateTime_NormalMonth07 = '七月';
    mb_DateTime_NormalMonth08 = '八月';
    mb_DateTime_NormalMonth09 = '九月';
    mb_DateTime_NormalMonth10 = '十月';
    mb_DateTime_NormalMonth11 = '十一月';
    mb_DateTime_NormalMonth12 = '十二月';

    mb_DateTime_LowerAM = '上午';
    mb_DateTime_LowerPM = '下午';
    mb_DateTime_UpperAM = '上午';
    mb_DateTime_UpperPM = '下午';
}
