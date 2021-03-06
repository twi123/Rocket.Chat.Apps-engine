import { IRoom } from '@rocket.chat/apps-ts-definition/rooms';
import { IUser } from '@rocket.chat/apps-ts-definition/users';
import { AsyncTest, Expect, SetupFixture } from 'alsatian';

import { RoomRead } from '../../../src/server/accessors';
import { IRoomBridge } from '../../../src/server/bridges';
import { TestData } from '../../test-data/utilities';

export class RoomReadAccessorTestFixture {
    private room: IRoom;
    private user: IUser;
    private mockRoomBridgeWithRoom: IRoomBridge;

    @SetupFixture
    public setupFixture() {
        this.room = TestData.getRoom();
        this.user = TestData.getUser();

        const theRoom = this.room;
        const theUser = this.user;
        this.mockRoomBridgeWithRoom = {
            getById(id, appId): Promise<IRoom> {
                return Promise.resolve(theRoom);
            },
            getByName(name, appId): Promise<IRoom> {
                return Promise.resolve(theRoom);
            },
            getCreatorById(id, appId): Promise<IUser> {
                return Promise.resolve(theUser);
            },
            getCreatorByName(name, appId): Promise<IUser> {
                return Promise.resolve(theUser);
            },
        } as IRoomBridge;
    }

    @AsyncTest()
    public async expectDataFromRoomRead() {
        Expect(() => new RoomRead(this.mockRoomBridgeWithRoom, 'testing-app')).not.toThrow();

        const rr = new RoomRead(this.mockRoomBridgeWithRoom, 'testing-app');

        Expect(await rr.getById('fake')).toBeDefined();
        Expect(await rr.getById('fake')).toBe(this.room);
        Expect(await rr.getByName('testing-room')).toBeDefined();
        Expect(await rr.getByName('testing-room')).toBe(this.room);
        Expect(await rr.getCreatorUserById('testing')).toBeDefined();
        Expect(await rr.getCreatorUserById('testing')).toBe(this.user);
        Expect(await rr.getCreatorUserByName('testing')).toBeDefined();
        Expect(await rr.getCreatorUserByName('testing')).toBe(this.user);
    }

    @AsyncTest()
    public async useTheIterators() {
        Expect(() => new RoomRead(this.mockRoomBridgeWithRoom, 'testing-app')).not.toThrow();

        const rr = new RoomRead(this.mockRoomBridgeWithRoom, 'testing-app');
        await Expect(async () => await rr.getMessages('faker')).toThrowErrorAsync(Error, 'Method not implemented.');
        await Expect(async () => await rr.getMembers('faker')).toThrowErrorAsync(Error, 'Method not implemented.');
    }
}
