import { RegisterBaseLanguage } from './core';
import { IBaseLang } from './core';

@RegisterBaseLanguage('ja-JP', '日本語')
export default class LangObject implements IBaseLang {
    wb_Common = '一般的な';
    wb_NextPage = '次へ';
    wb_PreviousPage = '前へ';
    wb_Search = '検索する';
    wb_Browse = 'ブラウズ';
    wb_NextStep = "次へ";
    wb_PreviousStep = "前へ";
    wb_Done = '完了';

    wb_Login = 'ログイン';
    wb_Username = "ユーザー";
    wb_Password = "パスワード";

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
    mb_VersionNotEnough = "ServerFrameworkのバージョンは v{version} より大きくなければなりません。";
    mb_PermissionDenied = "アクセス拒否";
    mb_PermissionDeniedLong = "このエリアにアクセスできない。";
    mb_ContentInvalid = "コンテンツ無効";

    mb_ShowCurrentEntries = '{total} 件中，{curStart} 件 - {curEnd} 件';
    mb_ShowEntries = '{0} ペンデータを表示';
    mb_PleaseSelect = '選択してください';
    mb_ConfirmDelete = '本当に削除しますか？';

    mb_0 = "リクエストが失敗しました";
    mb_0_message = "サーバーから応答がありません。 一般的にはIP /ポートエラーまたはサーバーのダウンが原因で発生しました。";
    mb_400 = "リクエストが不正である";
    mb_400_message = "<b>エラーコード {0}</b> - クライアントエラーのため、サーバーは要求を処理できません。 リクエストとともに送信されたパラメータを確認してください。";
    mb_401 = "認証が必要である";
    mb_401_message = "<b>エラーコード {0}</b> - 認証が必要か、または失敗しました。";
    mb_404 = "未検出";
    mb_404_message = "<b>エラーコード {0}</b> - このリソースにアクセスできません。";
    mb_500 = "サーバ内部エラー";
    mb_500_message = "<b>エラーコード {0}</b> - 不明なサーバーエラーです。";
}
