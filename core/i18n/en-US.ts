import { RegisterBaseLanguage } from './core';

@RegisterBaseLanguage('en-US', 'English')
export default class LangObject {
    wb_Common = 'Common';
    wb_NextPage = 'Next';
    wb_PreviousPage = 'Prev';
    wb_Search = 'Search';
    wb_Browse = 'Browse';
    wb_NextStep = 'Next';
    wb_PreviousStep = 'Previous';
    wb_Done = 'Done';

    wb_Login = 'Login';
    wb_Username = 'Username';
    wb_Password = 'Password';

    wb_Add = 'Add';
    wb_Delete = 'Delete';
    wb_Edit = 'Edit';
    wb_Export = 'Export';
    wb_Import = 'Import';
    wb_Info = 'Info';
    wb_View = 'View';
    wb_More = 'More';

    wb_Submit = 'Submit';
    wb_Reset = 'Reset';

    wb_Yes = 'Yes';
    wb_No = 'No';

    wb_Confirm = 'Confirm';
    wb_Cancel = 'Cancel';
    wb_Close = 'Close';
    wb_Back = 'Back';

    mb_FormMultipleClickToAdd = 'Click to Add';

    mb_VersionLimitation = 'Version Limitation';
    mb_VersionNotEnough = 'ServerFramework version should be greater than v{version}.';
    mb_PermissionDenied = 'Permission Denied';
    mb_PermissionDeniedLong = 'Your Permission Cannot Access This Area.';
    mb_ContentInvalid = 'Content Invalid';

    mb_ShowEntries = 'Show {0} Entries';
    mb_ShowCurrentEntries = 'Showing {curStart} to {curEnd} of {total} entries';
    mb_PleaseSelect = 'Please Select';
    mb_ConfirmDelete = 'Are you sure to delete?';

    mb_0 = 'Request Failed';
    mb_0_message = 'No response from server. Generally happened because of ip / port error or server down.';
    mb_400 = 'Bad Request';
    mb_400_message = '<b>Error Code {0}</b> - Server cannot process request due to client error. Check your parameters sent with request.';
    mb_401 = 'Unauthorized';
    mb_401_message = '<b>Error Code {0}</b> - Authentication is required or has failed.';
    mb_404 = 'Not Found';
    mb_404_message = '<b>Error Code {0}</b> - This resource cannot be accessed.';
    mb_500 = 'Internal Server Error';
    mb_500_message = '<b>Error Code {0}</b> - Unknown server error.';

    /// validation message
    mb_ValidationIp = 'Please input valid IP format.';
    mb_ValidationLicense = 'Please input valid license format.';

    // date time
    mb_DateTime_ShortWeekDay0 = 'Sun';
    mb_DateTime_ShortWeekDay1 = 'Mon';
    mb_DateTime_ShortWeekDay2 = 'Tue';
    mb_DateTime_ShortWeekDay3 = 'Wed';
    mb_DateTime_ShortWeekDay4 = 'Thu';
    mb_DateTime_ShortWeekDay5 = 'Fri';
    mb_DateTime_ShortWeekDay6 = 'Sat';

    mb_DateTime_NormalWeekDay0 = 'Sunday';
    mb_DateTime_NormalWeekDay1 = 'Monday';
    mb_DateTime_NormalWeekDay2 = 'Tuesday';
    mb_DateTime_NormalWeekDay3 = 'Wednesday';
    mb_DateTime_NormalWeekDay4 = 'Thursday';
    mb_DateTime_NormalWeekDay5 = 'Friday';
    mb_DateTime_NormalWeekDay6 = 'Saturday';

    mb_DateTime_ShortMonth01 = 'Jan';
    mb_DateTime_ShortMonth02 = 'Feb';
    mb_DateTime_ShortMonth03 = 'Mar';
    mb_DateTime_ShortMonth04 = 'Apr';
    mb_DateTime_ShortMonth05 = 'May';
    mb_DateTime_ShortMonth06 = 'Jun';
    mb_DateTime_ShortMonth07 = 'Jul';
    mb_DateTime_ShortMonth08 = 'Aug';
    mb_DateTime_ShortMonth09 = 'Sep';
    mb_DateTime_ShortMonth10 = 'Oct';
    mb_DateTime_ShortMonth11 = 'Nov';
    mb_DateTime_ShortMonth12 = 'Dec';

    mb_DateTime_NormalMonth01 = 'January';
    mb_DateTime_NormalMonth02 = 'February';
    mb_DateTime_NormalMonth03 = 'March';
    mb_DateTime_NormalMonth04 = 'April';
    mb_DateTime_NormalMonth05 = 'May';
    mb_DateTime_NormalMonth06 = 'June';
    mb_DateTime_NormalMonth07 = 'July';
    mb_DateTime_NormalMonth08 = 'August';
    mb_DateTime_NormalMonth09 = 'September';
    mb_DateTime_NormalMonth10 = 'October';
    mb_DateTime_NormalMonth11 = 'November';
    mb_DateTime_NormalMonth12 = 'December';

    mb_DateTime_LowerAM = 'am';
    mb_DateTime_LowerPM = 'pm';
    mb_DateTime_UpperAM = 'AM';
    mb_DateTime_UpperPM = 'PM';

    /// theme
    mb_iSAP_Theme_White = 'iSAP White';
    mb_iSAP_Theme_Blue = 'iSAP Blue';
}
