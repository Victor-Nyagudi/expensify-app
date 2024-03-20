import type CONST from '@src/CONST';

type DismissedReferralBanners = {
    [CONST.REFERRAL_PROGRAM.CONTENT_TYPES.MONEY_REQUEST]?: boolean;
    [CONST.REFERRAL_PROGRAM.CONTENT_TYPES.START_CHAT]?: boolean;
    [CONST.REFERRAL_PROGRAM.CONTENT_TYPES.SEND_MONEY]?: boolean;
    [CONST.REFERRAL_PROGRAM.CONTENT_TYPES.REFER_FRIEND]?: boolean;
    [CONST.REFERRAL_PROGRAM.CONTENT_TYPES.SHARE_CODE]?: boolean;
};

export default DismissedReferralBanners;
