import { RegisterBaseLanguage } from './core';

@RegisterBaseLanguage('en-US', 'English')
export default class LangObject {
    wb_Common = 'Common';
    wb_NextPage = 'Next';
    wb_PreviousPage = 'Prev';
    wb_Search = 'Search';
    wb_Browse = 'Browse';
    wb_NextStep = "Next";
    wb_PreviousStep = "Previous";
    wb_Done = 'Done';

    wb_Login = 'Login';
    wb_Username = "Username";
    wb_Password = "Password";

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

    mb_VersionLimitation = 'Version Limitation';
    mb_VersionNotEnough = "ServerFramework version should be greater than v{version}.";
    mb_PermissionDenied = "Permission Denied";
    mb_PermissionDeniedLong = "Your Permission Cannot Access This Area.";
    mb_ContentInvalid = "Content Invalid";

    mb_ShowEntries = 'Show {0} Entries';
    mb_ShowCurrentEntries = 'Showing {curStart} to {curEnd} of {total} entries';
    mb_PleaseSelect = 'Please Select';
    mb_ConfirmDelete = 'Are you sure to delete?';

    mb_0 = "Request Failed";
    mb_0_message = "No response from server. Generally happened because of ip / port error or server down.";
    mb_400 = "Bad Request";
    mb_400_message = "<b>Error Code {0}</b> - Server cannot process request due to client error. Check your parameters sent with request.";
    mb_401 = "Unauthorized";
    mb_401_message = "<b>Error Code {0}</b> - Authentication is required or has failed.";
    mb_404 = "Not Found";
    mb_404_message = "<b>Error Code {0}</b> - This resource cannot be accessed.";
    mb_500 = "Internal Server Error";
    mb_500_message = "<b>Error Code {0}</b> - Unknown server error.";
}
