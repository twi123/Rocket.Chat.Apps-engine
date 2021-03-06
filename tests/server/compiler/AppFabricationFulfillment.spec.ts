import { App } from '@rocket.chat/apps-ts-definition/App';
import { AppStatus } from '@rocket.chat/apps-ts-definition/AppStatus';
import { IAppInfo } from '@rocket.chat/apps-ts-definition/metadata';
import { Expect, Test } from 'alsatian';

import { AppManager } from '../../../src/server/AppManager';
import { AppFabricationFulfillment, AppInterface, ICompilerError } from '../../../src/server/compiler';
import { ProxiedApp } from '../../../src/server/ProxiedApp';
import { IAppStorageItem } from '../../../src/server/storage';

export class AppFabricationFulfillmentTestFixture {
    @Test()
    public appFabricationDefinement() {
        const expctedInfo: IAppInfo = {
            id: '614055e2-3dba-41fb-be48-c1ff146f5932',
            name: 'Testing App',
            nameSlug: 'testing-app',
            description: 'A Rocket.Chat Application used to test out the various features.',
            version: '0.0.8',
            requiredApiVersion: '>=0.9.6',
            author: {
                name: 'Bradley Hilton',
                homepage: 'https://github.com/RocketChat/Rocket.Chat.Apps-ts-definitions',
                support: 'https://github.com/RocketChat/Rocket.Chat.Apps-ts-definitions/issues',
            },
            classFile: 'TestingApp.ts',
            iconFile: 'testing.jpg',
        };

        Expect(() => new AppFabricationFulfillment()).not.toThrow();

        const aff = new AppFabricationFulfillment();
        Expect(() => aff.setAppInfo(expctedInfo)).not.toThrow();
        Expect(aff.getAppInfo()).toEqual(expctedInfo);

        const expectedInter: { [key: string]: boolean } = {};
        expectedInter[AppInterface.IPreMessageSentPrevent] = true;
        Expect(() => aff.setImplementedInterfaces(expectedInter)).not.toThrow();
        Expect(aff.getImplementedInferfaces()).toEqual(expectedInter);

        const expectedCompiledErrors: Array<ICompilerError> = new Array<ICompilerError>();
        expectedCompiledErrors.push({
            file: 'TestingApp.ts',
            line: 3,
            character: 54,
            message: 'Empty space',
        });
        Expect(() => aff.setCompilerErrors(expectedCompiledErrors)).not.toThrow();
        Expect(aff.getCompilerErrors()).toEqual(expectedCompiledErrors);

        const fakeApp = new ProxiedApp({} as AppManager, { status: AppStatus.UNKNOWN } as IAppStorageItem, {} as App, (mod: string) => mod);
        Expect(() => aff.setApp(fakeApp)).not.toThrow();
        Expect(aff.getApp()).toEqual(fakeApp);
    }
}
