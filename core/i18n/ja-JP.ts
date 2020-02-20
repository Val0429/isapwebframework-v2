import { RegisterBaseLanguage } from './core';
import { IBaseLang } from './core';

@RegisterBaseLanguage('ja-JP', '日本語')
export default class LangObject implements IBaseLang {
    wb_Common = '一般的な';
    wb_NextPage = '次へ';
    wb_PreviousPage = '前へ';
    wb_Search = '検索する';
    wb_Browse = 'ブラウズ';
    wb_NextStep = '次へ';
    wb_PreviousStep = '前へ';
    wb_Done = '完了';

    wb_Login = 'ログイン';
    wb_Username = 'ユーザー';
    wb_Password = 'パスワード';

    wb_Add = '追加';
    wb_Delete = '削除';
    wb_Edit = '編集';
    wb_Export = 'エクスポート';
    wb_Import = 'インポート';
    wb_Info = '情報';
    wb_View = '表示';
    wb_More = 'もっと';

    wb_Submit = '入力';
    wb_Reset = 'リセット';

    wb_Yes = 'はい';
    wb_No = 'いいえ';

    wb_Confirm = '決定する';
    wb_Cancel = 'キャンセル';
    wb_Close = '閉じる';
    wb_Back = '戻る';

    mb_FormMultipleClickToAdd = 'クリックしてデータを追加';

    mb_VersionLimitation = 'バージョン制限';
    mb_VersionNotEnough = 'ServerFrameworkのバージョンは v{version} より大きくなければなりません。';
    mb_PermissionDenied = 'アクセス拒否';
    mb_PermissionDeniedLong = 'このエリアにアクセスできない。';
    mb_ContentInvalid = 'コンテンツ無効';

    mb_ShowCurrentEntries = '{total} 件中，{curStart} 件 - {curEnd} 件';
    mb_ShowEntries = '{0} ペンデータを表示';
    mb_PleaseSelect = '選択してください';
    mb_PleaseSelects = '複数の選択肢';
    mb_ConfirmDelete = '本当に削除しますか？';

    mb_0 = 'リクエストが失敗しました';
    mb_0_message = 'サーバーから応答がありません。 一般的にはIP /ポートエラーまたはサーバーのダウンが原因で発生しました。';
    mb_400 = 'リクエストが不正である';
    mb_400_message = '<b>エラーコード {0}</b> - クライアントエラーのため、サーバーは要求を処理できません。 リクエストとともに送信されたパラメータを確認してください。';
    mb_401 = '認証が必要である';
    mb_401_message = '<b>エラーコード {0}</b> - 認証が必要か、または失敗しました。';
    mb_404 = '未検出';
    mb_404_message = '<b>エラーコード {0}</b> - このリソースにアクセスできません。';
    mb_500 = 'サーバ内部エラー';
    mb_500_message = '<b>エラーコード {0}</b> - 不明なサーバーエラーです。';

    /// validation message
    mb_ValidationIp = '有効な IP 形式を入力してください。';
    mb_ValidationLicense = '有効な License 形式を入力してください。';

    // date time
    mb_DateTime_ShortWeekDay0 = '日曜';
    mb_DateTime_ShortWeekDay1 = '月曜';
    mb_DateTime_ShortWeekDay2 = '火曜';
    mb_DateTime_ShortWeekDay3 = '水曜';
    mb_DateTime_ShortWeekDay4 = '木曜';
    mb_DateTime_ShortWeekDay5 = '金曜';
    mb_DateTime_ShortWeekDay6 = '土曜';

    mb_DateTime_NormalWeekDay0 = '日曜日';
    mb_DateTime_NormalWeekDay1 = '月曜日';
    mb_DateTime_NormalWeekDay2 = '火曜日';
    mb_DateTime_NormalWeekDay3 = '水曜日';
    mb_DateTime_NormalWeekDay4 = '木曜日';
    mb_DateTime_NormalWeekDay5 = '金曜日';
    mb_DateTime_NormalWeekDay6 = '土曜日';

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

    mb_DateTime_NormalMonth01 = 'いちがつ';
    mb_DateTime_NormalMonth02 = 'にがつ';
    mb_DateTime_NormalMonth03 = 'さんがつ';
    mb_DateTime_NormalMonth04 = 'しがつ';
    mb_DateTime_NormalMonth05 = 'ごがつ';
    mb_DateTime_NormalMonth06 = 'ろくがつ';
    mb_DateTime_NormalMonth07 = 'しちがつ';
    mb_DateTime_NormalMonth08 = 'はちがつ';
    mb_DateTime_NormalMonth09 = 'くがつ';
    mb_DateTime_NormalMonth10 = 'じゅうがつ';
    mb_DateTime_NormalMonth11 = 'じゅういちがつ';
    mb_DateTime_NormalMonth12 = 'じゅうにがつ';

    mb_DateTime_LowerAM = '朝';
    mb_DateTime_LowerPM = '午後';
    mb_DateTime_UpperAM = '朝';
    mb_DateTime_UpperPM = '午後';

    /// theme
    mb_iSAP_Theme_White = '旭人白';
    mb_iSAP_Theme_Blue = '旭人藍';
}
