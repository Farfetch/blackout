import { mockUsersResponse } from 'tests/__fixtures__/users/index.mjs';
import { StorageWrapper } from '../utils/index.js';
import TestStorage from 'test-storage';
import User from '../User.js';

describe('User', () => {
  let userInstance: User;
  let storage: StorageWrapper;

  beforeEach(async () => {
    storage = new StorageWrapper(new TestStorage());
    userInstance = new User(storage);
    await userInstance.initialize();
  });

  it('Should return the user data', async () => {
    const localId = await userInstance.localId();

    expect(await userInstance.get()).toMatchObject({
      id: null,
      traits: {},
      localId,
    });
  });

  it('Should not identify a user without parameters', async () => {
    await userInstance.set();

    const data = await userInstance.get();

    expect(data.id).toBeNull();
    expect(data.traits).toMatchObject({});
  });

  it('Should delete the user', async () => {
    await userInstance.set(123123, mockUsersResponse);

    const beforeAnonymizeLocalId = await userInstance.localId();

    userInstance.anonymize();

    const afterAnonymizeLocalId = await userInstance.localId();
    const data = await userInstance.get();

    expect(data).toMatchObject({ id: null, traits: {} });
    expect(beforeAnonymizeLocalId === afterAnonymizeLocalId).toBe(true);
  });

  it('Should identify an user with parameters', async () => {
    const userId = 12345678;

    await userInstance.set(userId, mockUsersResponse);

    const data = await userInstance.get();

    expect(data.id).toBe(userId);
    expect(data.traits).toMatchObject(mockUsersResponse);
  });

  it('Should create a local ID and store it on the storage', async () => {
    const setItemMock = jest.spyOn(storage, 'setItem');

    await storage.clear();

    const localId = await userInstance.localId();

    expect(typeof localId).toBe('string');

    expect(setItemMock).toHaveBeenCalledWith('localId', localId);
  });

  it('Should return a local ID if already in storage', async () => {
    // Force creation and storage of a new localId
    await userInstance.localId();

    const localIdInStorage = await storage.getItem('localId');
    const localId = await userInstance.localId();

    expect(localId).toEqual(localIdInStorage);
  });

  it('Should call localId when set() is executed', async () => {
    const localIdSpy = jest.spyOn(userInstance, 'localId');

    await userInstance.set();

    expect(localIdSpy).toHaveBeenCalled();
  });

  it('Should throw if an invalid storage instance is passed to the constructor', () => {
    const invalidData = undefined;

    // @ts-expect-error
    expect(() => new User(invalidData)).toThrow();
  });
});
