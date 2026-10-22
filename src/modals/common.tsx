export interface User {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    age: number | string;
    gender: string;
    photoUrl: string;
    about: string;
    skiills: string[];
    _id: string;
    createdAt: string;
    updatedAt: string;
    fromUserId?: Partial<UserType>
}
export type UserType = Partial<User> | null;

export type FeedsType = Partial<User>[] | null;

export type ConnectionsType = Partial<User>[] | [];

export interface RequestType {
  _id: string;
  fromUserId: Partial<User>;
}

export type RequestsType = RequestType[];
