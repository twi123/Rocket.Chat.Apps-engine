import { Utilities } from '../misc/Utilities';

export enum AppInterface {
    // Messages
    IPreMessageSentPrevent = 'IPreMessageSentPrevent',
    IPreMessageSentExtend = 'IPreMessageSentExtend',
    IPreMessageSentModify = 'IPreMessageSentModify',
    IPostMessageSent = 'IPostMessageSent',
    IPreMessageDeletePrevent = 'IPreMessageDeletePrevent',
    IPostMessageDeleted = 'IPostMessageDeleted',
    // Rooms
    IPreRoomCreatePrevent = 'IPreRoomCreatePrevent',
    IPreRoomCreateExtend = 'IPreRoomCreateExtend',
    IPreRoomCreateModify = 'IPreRoomCreateModify',
    IPostRoomCreate = 'IPostRoomCreate',
    IPreRoomDeletePrevent = 'IPreRoomDeletePrevent',
    IPostRoomDeleted = 'IPostRoomDeleted',
}

export class AppImplements {
    private implemented: { [key: string]: boolean };

    constructor() {
        this.implemented = {};
        Object.keys(AppInterface).forEach((int) => this.implemented[int] = false);
    }

    public doesImplement(int: string): void {
        if (int in AppInterface) {
            this.implemented[int] = true;
        }
    }

    public getValues(): { [int: string]: boolean } {
        return Utilities.deepCloneAndFreeze(this.implemented);
    }
}
